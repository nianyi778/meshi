import { OAuth2RequestError } from "arctic";
import { getGitHub } from "@/lib/auth/providers";
import { createSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { users, oauthAccounts } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = req.cookies.get("github_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.redirect(
      new URL("/ja/generator?error=oauth_state", req.url),
    );
  }

  try {
    const github = getGitHub();
    const tokens = await github.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();

    const [profileRes, emailsRes] = await Promise.all([
      fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Meishi-App",
        },
      }),
      fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "Meishi-App",
        },
      }),
    ]);

    const profile = (await profileRes.json()) as {
      id: number;
      login: string;
      name: string | null;
      avatar_url: string;
    };
    const emails = (await emailsRes.json()) as Array<{
      email: string;
      primary: boolean;
      verified: boolean;
    }>;
    const primaryEmail = emails.find((e) => e.primary && e.verified)?.email;

    if (!primaryEmail) {
      return NextResponse.redirect(
        new URL("/ja/generator?error=no_email", req.url),
      );
    }

    const db = getDb();

    // Check if oauth account exists
    const [existingOauth] = await db
      .select({ userId: oauthAccounts.userId })
      .from(oauthAccounts)
      .where(
        and(
          eq(oauthAccounts.provider, "github"),
          eq(oauthAccounts.providerUserId, String(profile.id)),
        ),
      );

    let userId: number;
    let userPlan: "free" | "pro" = "free";

    if (existingOauth) {
      userId = existingOauth.userId;
      const [u] = await db
        .select({ plan: users.plan })
        .from(users)
        .where(eq(users.id, userId));
      userPlan = (u?.plan ?? "free") as "free" | "pro";
    } else {
      // Check if user with this email exists
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, primaryEmail));

      if (existingUser) {
        userId = existingUser.id;
        userPlan = existingUser.plan as "free" | "pro";
      } else {
        const [newUser] = await db
          .insert(users)
          .values({
            email: primaryEmail,
            name: profile.name ?? profile.login,
            avatarUrl: profile.avatar_url,
          })
          .returning({ id: users.id, plan: users.plan });
        userId = newUser!.id;
        userPlan = newUser!.plan as "free" | "pro";
      }

      // Link oauth account
      await db.insert(oauthAccounts).values({
        userId,
        provider: "github",
        providerUserId: String(profile.id),
        accessToken,
      });
    }

    const [user] = await db
      .select({ email: users.email, name: users.name })
      .from(users)
      .where(eq(users.id, userId));

    const response = NextResponse.redirect(new URL("/ja/generator", req.url));
    await createSession(response, {
      userId,
      email: user!.email,
      name: user!.name,
      plan: userPlan,
    });
    return response;
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      return NextResponse.redirect(
        new URL("/ja/generator?error=oauth_failed", req.url),
      );
    }
    console.error("GitHub OAuth error:", e);
    return NextResponse.redirect(
      new URL("/ja/generator?error=server_error", req.url),
    );
  }
}

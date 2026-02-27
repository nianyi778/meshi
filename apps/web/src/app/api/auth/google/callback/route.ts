import { OAuth2RequestError, decodeIdToken } from "arctic";
import { getGoogle } from "@/lib/auth/providers";
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
  const storedState = req.cookies.get("google_oauth_state")?.value;
  const codeVerifier = req.cookies.get("google_code_verifier")?.value;

  if (!code || !state || state !== storedState || !codeVerifier) {
    return NextResponse.redirect(
      new URL("/ja/generator?error=oauth_state", req.url),
    );
  }

  try {
    const google = getGoogle();
    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const claims = decodeIdToken(tokens.idToken()) as {
      sub: string;
      email: string;
      name: string;
      picture: string;
    };

    const db = getDb();
    const [existingOauth] = await db
      .select({ userId: oauthAccounts.userId })
      .from(oauthAccounts)
      .where(
        and(
          eq(oauthAccounts.provider, "google"),
          eq(oauthAccounts.providerUserId, claims.sub),
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
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.email, claims.email));
      if (existingUser) {
        userId = existingUser.id;
        userPlan = existingUser.plan as "free" | "pro";
      } else {
        const [newUser] = await db
          .insert(users)
          .values({
            email: claims.email,
            name: claims.name,
            avatarUrl: claims.picture,
          })
          .returning({ id: users.id, plan: users.plan });
        userId = newUser!.id;
        userPlan = newUser!.plan as "free" | "pro";
      }
      await db.insert(oauthAccounts).values({
        userId,
        provider: "google",
        providerUserId: claims.sub,
        accessToken: tokens.accessToken(),
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
    return NextResponse.redirect(
      new URL("/ja/generator?error=server_error", req.url),
    );
  }
}

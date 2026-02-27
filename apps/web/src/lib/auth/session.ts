import { SignJWT, jwtVerify } from "jose";
import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "meishi_session";

export interface SessionPayload {
  userId: number;
  email: string;
  name: string;
  plan: "free" | "pro";
}

function getSecret(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ?? "dev-secret-change-in-production-min-32chars";
  return new TextEncoder().encode(secret);
}

export async function createSession(
  response: NextResponse,
  payload: SessionPayload,
): Promise<void> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
}

export async function getSession(
  req: NextRequest,
): Promise<SessionPayload | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export function clearSession(response: NextResponse): void {
  response.cookies.set(SESSION_COOKIE, "", { maxAge: 0, path: "/" });
}

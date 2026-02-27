import { generateState } from "arctic";
import { getGitHub } from "@/lib/auth/providers";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const github = getGitHub();
  const state = generateState();
  const url = github.createAuthorizationURL(state, ["user:email"]);
  const response = NextResponse.redirect(url);
  response.cookies.set("github_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return response;
}

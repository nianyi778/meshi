import { GitHub, Google } from "arctic";

export function getGitHub() {
  return new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!,
    process.env.GITHUB_REDIRECT_URI ??
      "https://dashboard.ekagu.qzz.io/api/auth/github/callback",
  );
}

export function getGoogle() {
  return new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.GOOGLE_REDIRECT_URI ??
      "https://dashboard.ekagu.qzz.io/api/auth/google/callback",
  );
}

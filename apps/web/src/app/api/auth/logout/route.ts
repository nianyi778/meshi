import { clearSession } from "@/lib/auth/session";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  clearSession(response);
  return response;
}

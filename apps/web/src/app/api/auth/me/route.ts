import { getSession } from "@/lib/auth/session";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session) return NextResponse.json({ user: null });
  return NextResponse.json({ user: session });
}

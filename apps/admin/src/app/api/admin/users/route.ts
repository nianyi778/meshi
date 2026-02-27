import { getDb } from "@/lib/db/client";
import { users, signatures } from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";

export const runtime = "edge";

// GET /api/admin/users — list all users with signature count
export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();

  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      plan: users.plan,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));

  const sigCounts = await db
    .select({ userId: signatures.userId, total: count() })
    .from(signatures)
    .groupBy(signatures.userId);

  const countMap = Object.fromEntries(
    sigCounts.map((r) => [r.userId, r.total]),
  );

  return NextResponse.json({
    users: allUsers.map((u) => ({
      ...u,
      signatureCount: countMap[u.id] ?? 0,
    })),
  });
}

import { getDb } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { checkAdminAuth } from "@/lib/auth";

export const runtime = "edge";

// PATCH /api/admin/users/[id]/plan — set plan to "free" | "pro"
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = parseInt(id, 10);
  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const body = (await req.json()) as { plan: string };
  if (body.plan !== "free" && body.plan !== "pro") {
    return NextResponse.json(
      { error: "plan must be 'free' or 'pro'" },
      { status: 400 },
    );
  }

  const db = getDb();
  const [updated] = await db
    .update(users)
    .set({ plan: body.plan })
    .where(eq(users.id, userId))
    .returning({ id: users.id, email: users.email, plan: users.plan });

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: updated });
}

import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { signatures } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = (await req.json()) as {
    name?: string;
    data?: unknown;
    style?: unknown;
    isDefault?: boolean;
  };
  const db = getDb();

  const updateData: Record<string, unknown> = { updatedAt: new Date() };
  if (body.name !== undefined) updateData.name = body.name;
  if (body.data !== undefined) updateData.data = JSON.stringify(body.data);
  if (body.style !== undefined) updateData.style = JSON.stringify(body.style);
  if (body.isDefault !== undefined) updateData.isDefault = body.isDefault;

  await db
    .update(signatures)
    .set(updateData)
    .where(
      and(eq(signatures.id, Number(id)), eq(signatures.userId, session.userId)),
    );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const db = getDb();

  await db
    .delete(signatures)
    .where(
      and(eq(signatures.id, Number(id)), eq(signatures.userId, session.userId)),
    );

  return NextResponse.json({ ok: true });
}

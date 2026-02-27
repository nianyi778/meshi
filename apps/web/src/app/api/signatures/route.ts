import { getSession } from "@/lib/auth/session";
import { getDb } from "@/lib/db/client";
import { signatures } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const FREE_LIMIT = 3;

export async function GET(req: NextRequest) {
  const session = await getSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();
  const list = await db
    .select({
      id: signatures.id,
      name: signatures.name,
      data: signatures.data,
      style: signatures.style,
      isDefault: signatures.isDefault,
      updatedAt: signatures.updatedAt,
    })
    .from(signatures)
    .where(eq(signatures.userId, session.userId));

  return NextResponse.json({
    signatures: list.map((s) => ({
      ...s,
      data: JSON.parse(s.data),
      style: JSON.parse(s.style),
    })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getSession(req);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const db = getDb();

  // Enforce free plan limit
  if (session.plan === "free") {
    const result = await db
      .select({ total: count() })
      .from(signatures)
      .where(eq(signatures.userId, session.userId));
    if (result[0]!.total >= FREE_LIMIT) {
      return NextResponse.json(
        { error: "free_limit_reached", limit: FREE_LIMIT },
        { status: 403 },
      );
    }
  }

  const body = (await req.json()) as {
    name?: string;
    data: unknown;
    style: unknown;
  };

  const [sig] = await db
    .insert(signatures)
    .values({
      userId: session.userId,
      name: body.name ?? "My Signature",
      data: JSON.stringify(body.data),
      style: JSON.stringify(body.style),
    })
    .returning({
      id: signatures.id,
      name: signatures.name,
      isDefault: signatures.isDefault,
    });

  return NextResponse.json({ signature: sig }, { status: 201 });
}

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { orders, messages } from "@/lib/db/schema";
import { eq, and, count } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const [pendingOrders] = await db
    .select({ count: count() })
    .from(orders)
    .where(and(eq(orders.sellerId, userId), eq(orders.status, "pending")));

  const [unreadMessages] = await db
    .select({ count: count() })
    .from(messages)
    .where(and(eq(messages.receiverId, userId), eq(messages.read, false)));

  return NextResponse.json({
    pendingOrders: pendingOrders.count,
    unreadMessages: unreadMessages.count,
    total: pendingOrders.count + unreadMessages.count,
  });
}

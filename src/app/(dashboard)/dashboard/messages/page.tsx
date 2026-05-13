import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { messages, products, user } from "@/lib/db/schema";
import { eq, or, and, desc, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { ChatRoundDots } from "@solar-icons/react/ssr";
import Link from "next/link";
import { ConversationView } from "./conversation-view";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ userId?: string; productId?: string }>;
}) {
  const result = await auth.api.getSession({ headers: await headers() });
  if (!result) return null;
  const { user: currentUser } = result;
  const params = await searchParams;

  // If viewing a specific conversation
  if (params.userId) {
    const productId = params.productId || null;

    const conversationMessages = await db
      .select({
        id: messages.id,
        senderId: messages.senderId,
        content: messages.content,
        createdAt: messages.createdAt,
      })
      .from(messages)
      .where(
        and(
          or(
            and(
              eq(messages.senderId, currentUser.id),
              eq(messages.receiverId, params.userId)
            ),
            and(
              eq(messages.senderId, params.userId),
              eq(messages.receiverId, currentUser.id)
            )
          ),
          productId
            ? eq(messages.productId, productId)
            : sql`1=1`
        )
      )
      .orderBy(messages.createdAt);

    // Get other user info
    const otherUser = await db
      .select({ name: user.name })
      .from(user)
      .where(eq(user.id, params.userId))
      .then((r) => r[0]);

    // Get product name if applicable
    let productName: string | null = null;
    if (productId) {
      const prod = await db
        .select({ name: products.name })
        .from(products)
        .where(eq(products.id, productId))
        .then((r) => r[0]);
      productName = prod?.name || null;
    }

    return (
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard/messages"
          className="inline-flex items-center gap-1 text-sm font-medium text-kitov-red transition-colors hover:text-kitov-red/80"
        >
          → العودة للمحادثات
        </Link>
        <ConversationView
          messages={conversationMessages}
          currentUserId={currentUser.id}
          otherUserId={params.userId}
          productId={productId}
          otherUserName={otherUser?.name || "مستخدم"}
          productName={productName}
        />
      </div>
    );
  }

  // List all conversations
  const rawConversations = await db
    .select({
      id: messages.id,
      senderId: messages.senderId,
      receiverId: messages.receiverId,
      productId: messages.productId,
      content: messages.content,
      createdAt: messages.createdAt,
      read: messages.read,
    })
    .from(messages)
    .where(
      or(eq(messages.senderId, currentUser.id), eq(messages.receiverId, currentUser.id))
    )
    .orderBy(desc(messages.createdAt));

  // Group into conversations
  const convMap = new Map<string, {
    otherUserId: string
    productId: string | null
    lastMessage: string
    lastTime: Date
    unread: number
  }>();

  for (const msg of rawConversations) {
    const otherUserId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
    const key = `${otherUserId}_${msg.productId || "general"}`;
    if (!convMap.has(key)) {
      const unread =
        msg.receiverId === currentUser.id && !msg.read ? 1 : 0;
      convMap.set(key, {
        otherUserId,
        productId: msg.productId,
        lastMessage: msg.content,
        lastTime: msg.createdAt,
        unread,
      });
    } else {
      const existing = convMap.get(key)!;
      if (msg.createdAt > existing.lastTime) {
        existing.lastMessage = msg.content;
        existing.lastTime = msg.createdAt;
      }
      if (msg.receiverId === currentUser.id && !msg.read) {
        existing.unread += 1;
      }
    }
  }

  // Fetch names for conversation partners
  const convEntries = Array.from(convMap.entries());
  const enrichedConversations = await Promise.all(
    convEntries.map(async ([key, conv]) => {
      const otherUserRow = await db
        .select({ name: user.name })
        .from(user)
        .where(eq(user.id, conv.otherUserId))
        .then((r) => r[0]);

      let productName: string | null = null;
      if (conv.productId) {
        const prod = await db
          .select({ name: products.name })
          .from(products)
          .where(eq(products.id, conv.productId))
          .then((r) => r[0]);
        productName = prod?.name || null;
      }

      return { ...conv, otherUserName: otherUserRow?.name || "مستخدم", productName, key };
    })
  );

  enrichedConversations.sort((a, b) => b.lastTime.getTime() - a.lastTime.getTime());

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight">المحادثات</h1>
        <p className="mt-1 text-muted-foreground">تواصل مع الفلاحين والموزعين مباشرة</p>
      </div>

      {enrichedConversations.length === 0 ? (
        <div className="rounded-carton border border-dashed p-14 text-center">
          <ChatRoundDots className="mx-auto mb-4 size-14 text-muted-foreground/30" />
          <p className="font-heading text-xl font-bold text-muted-foreground">لا توجد محادثات</p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            ابدأ بالتواصل مع الفلاحين من خلال تصفح المنتجات
          </p>
          <Link
            href="/dashboard/browse"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-kitov-red px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f]"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {enrichedConversations.map((conv) => (
            <Link
              key={conv.key}
              href={`/dashboard/messages?userId=${conv.otherUserId}&productId=${conv.productId || ""}`}
              className="flex items-center gap-4 rounded-carton border bg-card p-4 shadow-kitov transition-all hover:shadow-kitov-lg"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-kitov-red/10">
                <ChatRoundDots className="size-5 text-kitov-red" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-heading font-bold">{conv.otherUserName}</p>
                  {conv.unread > 0 && (
                    <span className="rounded-full bg-kitov-red px-2 py-0.5 text-[10px] font-bold text-white">
                      {conv.unread}
                    </span>
                  )}
                </div>
                {conv.productName && (
                  <p className="text-xs text-kitov-red/70">{conv.productName}</p>
                )}
                <p className="mt-0.5 truncate text-sm text-muted-foreground">
                  {conv.lastMessage}
                </p>
              </div>
              <div className="shrink-0 text-xs text-muted-foreground">
                {conv.lastTime.toLocaleDateString("ar-DZ")}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

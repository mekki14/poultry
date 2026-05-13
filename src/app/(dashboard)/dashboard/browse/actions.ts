"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { orders, messages, user } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { sellerRoleForBuyer } from "@/lib/roles"

export async function createOrder(
  _prev: { success?: boolean; error?: string } | undefined,
  formData: FormData
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "غير مصرح" }

  const currentUser = session.user
  const buyerRole = currentUser.role as string

  const productId = formData.get("productId") as string
  const sellerId = formData.get("sellerId") as string
  const quantity = parseInt(formData.get("quantity") as string) || 1
  const price = parseFloat(formData.get("price") as string) || 0

  if (!productId || !sellerId || quantity < 1) {
    return { error: "بيانات الطلب غير صحيحة" }
  }

  // Validate supply chain: verify seller role matches what this buyer should buy from
  const seller = await db
    .select({ role: user.role })
    .from(user)
    .where(eq(user.id, sellerId))
    .then((r) => r[0])

  if (!seller) return { error: "البائع غير موجود" }

  const expectedSellerRole = sellerRoleForBuyer(buyerRole)
  if (!expectedSellerRole || seller.role !== expectedSellerRole) {
    return { error: "لا يمكنك الطلب من هذا البائع" }
  }

  const totalPrice = (price * quantity).toFixed(2)

  await db.insert(orders).values({
    productId,
    sellerId,
    buyerId: currentUser.id,
    quantity,
    totalPrice,
    status: "pending",
  })

  revalidatePath("/dashboard/orders")
  revalidatePath("/dashboard/browse")
  revalidatePath("/dashboard")

  return { success: true }
}

export async function sendMessage(formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "غير مصرح" }

  const receiverId = formData.get("receiverId") as string
  const productId = formData.get("productId") as string
  const content = formData.get("content") as string

  if (!receiverId || !content?.trim()) {
    return { error: "الرسالة فارغة" }
  }

  await db.insert(messages).values({
    senderId: session.user.id,
    receiverId,
    productId: productId || null,
    content: content.trim(),
  })

  revalidatePath("/dashboard/messages")
}

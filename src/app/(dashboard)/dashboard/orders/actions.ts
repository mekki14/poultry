"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { orders } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

const validTransitions: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["picked_up", "delivered", "cancelled"],
  picked_up: [],
  delivered: [],
  cancelled: [],
}

export async function updateOrderStatus(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "غير مصرح" }

  const orderId = formData.get("orderId") as string
  const newStatus = formData.get("status") as string

  if (!orderId || !newStatus) return { error: "بيانات غير صحيحة" }

  const order = await db
    .select({ id: orders.id, status: orders.status, sellerId: orders.sellerId })
    .from(orders)
    .where(eq(orders.id, orderId))
    .then((r) => r[0])

  if (!order) return { error: "الطلب غير موجود" }
  if (order.sellerId !== session.user.id) return { error: "غير مصرح لك بهذا الطلب" }

  const allowed = validTransitions[order.status]
  if (!allowed?.includes(newStatus)) {
    return { error: "لا يمكن تغيير الحالة إلى " + newStatus }
  }

  await db.update(orders).set({ status: newStatus }).where(eq(orders.id, orderId))

  revalidatePath("/dashboard/orders")
  revalidatePath("/dashboard")

  return { error: undefined }
}

export async function cancelOrder(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
  formData.set("status", "cancelled")
  return updateOrderStatus(undefined, formData)
}

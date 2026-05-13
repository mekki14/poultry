"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function sendReply(
  _prev: { error?: string } | undefined,
  formData: FormData
) {
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

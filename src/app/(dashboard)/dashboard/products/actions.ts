"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createProduct(prevState: { error?: string } | undefined, formData: FormData) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { error: "غير مصرح" }

  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = formData.get("price") as string
  const unit = formData.get("unit") as string
  const quantity = parseInt(formData.get("quantity") as string) || 0
  const category = formData.get("category") as string

  if (!name || !price) return { error: "الاسم والسعر مطلوبان" }

  await db.insert(products).values({
    userId: session.user.id,
    name,
    description,
    price,
    unit: unit || "kg",
    quantity,
    category,
  })

  revalidatePath("/dashboard/products")
  revalidatePath("/dashboard")
}

export async function deleteProduct(id: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Unauthorized")

  await db.delete(products).where(eq(products.id, id))

  revalidatePath("/dashboard/products")
  revalidatePath("/dashboard")
}

"use client"

import { useState, useActionState } from "react"
import { Cart3, ChatRoundDots } from "@solar-icons/react/ssr"
import { createOrder } from "./actions"
import Link from "next/link"

export function OrderDialog({
  productId,
  sellerId,
  productName,
  price,
  unit,
}: {
  productId: string
  sellerId: string
  productName: string
  price: string
  unit: string
}) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState(createOrder, undefined)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-xl bg-kitov-red px-4 py-2 text-sm font-bold text-white transition-all hover:bg-[#c81a1f]"
      >
        <Cart3 className="size-4" />
        اطلب
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-heading text-xl font-bold">طلب {productName}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              السعر: {price} د.ج / {unit}
            </p>

            <form action={action} className="mt-4 space-y-4">
              <input type="hidden" name="productId" value={productId} />
              <input type="hidden" name="sellerId" value={sellerId} />
              <input type="hidden" name="price" value={price} />

              {state?.success && (
                <div className="rounded-xl bg-green-50 p-4 text-center">
                  <p className="text-lg font-bold text-green-700">تم تأكيد الطلب بنجاح</p>
                  <p className="mt-1 text-sm text-green-600">سيتم مراجعة طلبك من قبل البائع</p>
                </div>
              )}

              {state?.error && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {state.error}
                </p>
              )}

              <div className="space-y-1.5">
                <label htmlFor="quantity" className="text-sm font-medium">
                  الكمية ({unit})
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  defaultValue={1}
                  required
                  className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={pending}
                  className="flex-1 rounded-xl bg-kitov-red px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f] disabled:opacity-50"
                >
                  {pending ? "جاري..." : "تأكيد الطلب"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border px-5 py-2.5 text-sm font-medium transition-all hover:bg-gray-50"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export function ContactButton({
  sellerId,
  productId,
}: {
  sellerId: string
  productId: string
}) {
  return (
    <Link
      href={`/dashboard/messages?userId=${sellerId}&productId=${productId}`}
      className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
    >
      <ChatRoundDots className="size-4" />
      تواصل
    </Link>
  )
}

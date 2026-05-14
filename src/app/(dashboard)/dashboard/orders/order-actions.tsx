"use client"

import { useActionState } from "react"
import { updateOrderStatus, cancelOrder } from "./actions"
import Link from "next/link"
import { ChatRoundDots } from "@solar-icons/react/ssr"

export function AcceptOrderButton({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(updateOrderStatus, undefined)

  return (
    <form action={action}>
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="status" value="confirmed" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-green-700 disabled:opacity-50"
      >
        {pending ? "..." : "تأكيد"}
      </button>
      {state?.error && <p className="mt-1 text-[10px] text-red-500">{state.error}</p>}
    </form>
  )
}

export function PickupOrderButton({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(updateOrderStatus, undefined)

  return (
    <form action={action}>
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="status" value="picked_up" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "..." : "استلام"}
      </button>
      {state?.error && <p className="mt-1 text-[10px] text-red-500">{state.error}</p>}
    </form>
  )
}

export function DeliverOrderButton({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(updateOrderStatus, undefined)

  return (
    <form action={action}>
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="status" value="delivered" />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-lg bg-purple-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-purple-700 disabled:opacity-50"
      >
        {pending ? "..." : "توصيل"}
      </button>
      {state?.error && <p className="mt-1 text-[10px] text-red-500">{state.error}</p>}
    </form>
  )
}

export function CancelOrderButton({ orderId }: { orderId: string }) {
  const [state, action, pending] = useActionState(cancelOrder, undefined)

  return (
    <form action={action}>
      <input type="hidden" name="orderId" value={orderId} />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
      >
        {pending ? "..." : "إلغاء"}
      </button>
      {state?.error && <p className="mt-1 text-[10px] text-red-500">{state.error}</p>}
    </form>
  )
}

export function ContactBuyerButton({
  buyerId,
  productId,
}: {
  buyerId: string
  productId: string
}) {
  return (
    <Link
      href={`/dashboard/messages?userId=${buyerId}&productId=${productId}`}
      className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium text-brand-red transition-all hover:bg-brand-red/5"
    >
      <ChatRoundDots className="size-3.5" />
      تواصل
    </Link>
  )
}

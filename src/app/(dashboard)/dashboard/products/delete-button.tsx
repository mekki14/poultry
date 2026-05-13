"use client"

import { deleteProduct } from "./actions"
import { TrashBinMinimalistic } from "@solar-icons/react/ssr"

export function DeleteProductButton({ id }: { id: string }) {
  return (
    <form action={deleteProduct.bind(null, id)}>
      <button
        type="submit"
        className="inline-flex items-center gap-1 text-xs text-red-500 transition-colors hover:text-red-700"
      >
        <TrashBinMinimalistic className="size-3.5" />
        حذف
      </button>
    </form>
  )
}

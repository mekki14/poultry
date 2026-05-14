"use client"

import { useActionState } from "react"
import { createProduct } from "./actions"

export function ProductForm({ categories }: { categories: { value: string; label: string }[] }) {
  const [state, action, pending] = useActionState(createProduct, undefined)

  return (
    <form action={action} className="rounded-carton border bg-card p-6 shadow-brand">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-lg bg-brand-red/10">
          <span className="text-sm font-bold text-brand-red">+</span>
        </div>
        <h2 className="font-heading text-lg font-bold">إضافة منتج جديد</h2>
      </div>
      {state?.error && (
        <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">اسم المنتج *</label>
          <input
            id="name"
            name="name"
            required
            placeholder="مثال: دجاج بلدي طازج"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="category" className="text-sm font-medium">التصنيف</label>
          <select
            id="category"
            name="category"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="price" className="text-sm font-medium">السعر (د.ج) *</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            placeholder="مثال: 500"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="quantity" className="text-sm font-medium">الكمية</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            defaultValue={1}
            placeholder="مثال: 50"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="unit" className="text-sm font-medium">الوحدة</label>
          <select
            id="unit"
            name="unit"
            defaultValue="kg"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          >
            <option value="kg">كغ</option>
            <option value="piece">حبة</option>
            <option value="box">علبة</option>
            <option value="unit">وحدة</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="description" className="text-sm font-medium">الوصف</label>
          <input
            id="description"
            name="description"
            placeholder="وصف مختصر للمنتج"
            className="w-full rounded-xl border bg-background px-4 py-2.5 text-sm outline-none ring-ring transition-all focus:ring-2"
          />
        </div>
      </div>
      <div className="mt-4 flex justify-start">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f] disabled:opacity-50"
        >
          {pending ? "جاري الحفظ..." : "إضافة المنتج"}
        </button>
      </div>
    </form>
  )
}

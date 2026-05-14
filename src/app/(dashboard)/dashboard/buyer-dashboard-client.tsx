"use client"

import { motion } from "framer-motion"
import { Magnifier, Cart3, ChatRoundDots, ArrowLeft } from "@solar-icons/react/ssr"
import Link from "next/link"

const transition = { duration: 0.9, ease: [0.01, 1, 0.484, 1.001] as const }

type Stats = {
  totalProducts: number
  pendingOrders: number
  totalOrders: number
  unreadMessages: number
}

type OrderRow = {
  id: string
  productName: string | null
  sellerName: string | null
  quantity: number
  totalPrice: string
  status: string
  slaughterWithDelivery: boolean | null
  slaughterFee: string | null
  createdAt: Date
}

export function BuyerDashboardClient({
  userName,
  role,
  stats,
  recentOrders,
}: {
  userName: string
  role: string
  stats: Stats
  recentOrders: OrderRow[]
}) {
  const buyerLabel = role === "butcher" ? "الجزار" : "المورد"
  const displayName = userName || buyerLabel

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* ── Welcome Hero ── */}
      <section className="relative overflow-hidden rounded-2xl bg-brand-dark px-8 py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand-yellow/5 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-brand-red/5 blur-3xl" />
        </div>
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="font-heading text-3xl font-bold text-white md:text-4xl"
          >
            مرحباً {displayName} 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mt-3 max-w-xl text-white/70"
          >
            {role === "butcher"
              ? "لوحة تحكم فلاحك — تصفح منتجات الموردين، تقديم الطلبات، والتواصل المباشر"
              : "لوحة تحكم فلاحك — تصفح منتجات الفلاحين، إدارة منتجاتك، وتقديم الطلبات"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              href="/dashboard/browse"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-heading font-bold text-brand-dark transition-all hover:bg-[#e6bd00] hover:shadow-lg"
            >
              <Magnifier className="size-4" />
              تصفح المنتجات
            </Link>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-heading font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Cart3 className="size-4" />
              طلباتي
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Stats ── */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "منتجات متاحة", value: stats.totalProducts.toString(), icon: Magnifier },
          { label: "طلباتي", value: stats.totalOrders.toString(), icon: Cart3 },
          { label: "قيد الانتظار", value: stats.pendingOrders.toString(), icon: Cart3 },
          { label: "رسائل غير مقروءة", value: stats.unreadMessages.toString(), icon: ChatRoundDots },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-carton border bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <Icon className="size-5 text-brand-red/60" />
              </div>
              <p className="mt-2 font-heading text-2xl font-extrabold tracking-tight">{stat.value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* ── Browse Products CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-yellow/20 to-brand-yellow/5 px-8 py-12"
      >
        <div className="relative text-center">
          <Magnifier className="mx-auto mb-4 size-12 text-brand-red/60" />
          <h2 className="font-heading text-2xl font-bold text-brand-dark">ابحث عن المنتجات</h2>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            {role === "butcher"
              ? "تصفح منتجات الموردين المتاحة. دجاج حي، بيض، أعلاف، ومعدات"
              : "تصفح آلاف المنتجات من الفلاحين في كل الولايات. دجاج حي، بيض، أعلاف، ومعدات"}
          </p>
          <Link
            href="/dashboard/browse"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-3 font-heading font-bold text-white transition-all hover:bg-[#c81a1f]"
          >
            <Magnifier className="size-4" />
            استعرض المنتجات
          </Link>
        </div>
      </motion.section>

      {/* ── Recent Orders ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">آخر طلباتي</h2>
          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-red transition-colors hover:text-brand-red/80"
          >
            عرض الكل
            <ArrowLeft className="size-4" />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="rounded-carton border border-dashed p-10 text-center">
            <Cart3 className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="font-heading text-lg font-bold text-muted-foreground">لا توجد طلبات بعد</p>
            <p className="mt-1 text-sm text-muted-foreground/60">
              {role === "butcher" ? "تصفح منتجات الموردين واطلب ما تحتاجه" : "تصفح منتجات الفلاحين واطلب ما تحتاجه"}
            </p>
            <Link
              href="/dashboard/browse"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f]"
            >
              <Magnifier className="size-4" />
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-carton border">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 font-medium text-muted-foreground">المنتج</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">البائع</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">الكمية</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">ذبح</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">المجموع</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{order.productName || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.sellerName || "—"}</td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="px-4 py-3">
                      {order.slaughterWithDelivery ? (
                        <span className="text-xs font-medium text-brand-red">نعم ✓</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium">{order.totalPrice} د.ج</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "confirmed"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status === "pending"
                          ? "قيد الانتظار"
                          : order.status === "confirmed"
                            ? "مؤكد"
                            : order.status === "shipped"
                              ? "قيد التوصيل"
                              : order.status === "delivered"
                                ? "تم التوصيل"
                                : "ملغي"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.section>
    </div>
  )
}

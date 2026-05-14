"use client"

import { motion } from "framer-motion"
import { Box, Cart3, UsersGroupRounded, ArrowLeft, AddCircle, ClockCircle, ChatRoundDots } from "@solar-icons/react/ssr"
import Link from "next/link"
import type { InferSelectModel } from "drizzle-orm"
import type { products as productsTable } from "@/lib/db/schema"
import { EvilHoverTraceBarChart } from "@/components/evilcharts/blocks/hover-trace-bar-chart"
import type { ChartConfig } from "@/components/evilcharts/ui/chart"

type Product = InferSelectModel<typeof productsTable>
type OrderRow = {
  id: string
  productName: string | null
  buyerName: string | null
  quantity: number
  totalPrice: string
  status: string
  slaughterWithDelivery: boolean | null
  slaughterFee: string | null
  createdAt: Date
}

const transition = { duration: 0.9, ease: [0.01, 1, 0.484, 1.001] as const }

export function FarmerDashboardClient({
  userName,
  recentProducts,
  recentOrders,
}: {
  userName: string
  recentProducts: Product[]
  recentOrders: OrderRow[]
}) {
  const displayName = userName || "الفلاح"

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
            لوحة تحكم فلاحك — إدارة المنتجات، متابعة الطلبات، وتطوير مزرعتك
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              href="/dashboard/products"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-heading font-bold text-brand-dark transition-all hover:bg-[#e6bd00] hover:shadow-lg"
            >
              <AddCircle className="size-4" />
              إضافة منتج جديد
            </Link>
            <Link
              href="/dashboard/orders"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-heading font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              <Cart3 className="size-4" />
              عرض الطلبات
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Statistics Chart ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
      >
        <h2 className="mb-4 font-heading text-2xl font-bold">الإحصائيات</h2>
        <div className="overflow-hidden rounded-carton border bg-card md:w-2/3">
          <EvilHoverTraceBarChart
            className="max-h-60"
            data={[
              { label: "منتجات", value: recentProducts.length },
              { label: "طلبات", value: recentOrders.length },
              { label: "قيد الانتظار", value: recentOrders.filter((o) => o.status === "pending").length },
            ]}
            chartConfig={{
              value: {
                label: "القيمة",
                colors: {
                  light: ["#E31E24"],
                  dark: ["#FFD200"],
                },
              },
            } satisfies ChartConfig}
            title="الإحصائيات"
            format={{ style: "decimal" }}
          />
        </div>
      </motion.section>

      {/* ── Products Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">منتجاتي</h2>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-red transition-colors hover:text-brand-red/80"
          >
            عرض الكل
            <ArrowLeft className="size-4" />
          </Link>
        </div>
        {recentProducts.length === 0 ? (
          <div className="rounded-carton border border-dashed p-10 text-center">
            <Box className="mx-auto mb-3 size-10 text-muted-foreground/40" />
            <p className="font-heading text-lg font-bold text-muted-foreground">لا توجد منتجات بعد</p>
            <p className="mt-1 text-sm text-muted-foreground/60">أضف منتجك الأول الآن</p>
            <Link
              href="/dashboard/products"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#c81a1f]"
            >
              <AddCircle className="size-4" />
              إضافة منتج
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentProducts.slice(0, 6).map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...transition, delay: i * 0.05 }}
                viewport={{ once: true }}
className="rounded-carton border bg-card p-5 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading font-bold">{product.name}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="whitespace-nowrap rounded-full bg-brand-yellow/20 px-3 py-1 text-sm font-bold text-brand-dark">
                    {product.price} د.ج
                  </span>
                </div>
                {product.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>الكمية: {product.quantity} {product.unit}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* ── Orders Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">الطلبات الواردة</h2>
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
            <p className="mt-1 text-sm text-muted-foreground/60">عندما يقدم الموردون طلبات، ستظهر هنا</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-carton border">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 font-medium text-muted-foreground">المنتج</th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">المشتري</th>
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
                    <td className="px-4 py-3 text-muted-foreground">{order.buyerName || "—"}</td>
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

      {/* ── Messages CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={transition}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-brand-dark/90 px-8 py-12 text-center"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-1/3 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-brand-yellow/5 blur-3xl" />
        </div>
        <div className="relative">
          <ChatRoundDots className="mx-auto mb-4 size-12 text-brand-yellow/60" />
          <h2 className="font-heading text-2xl font-bold text-white">المحادثات</h2>
          <p className="mx-auto mt-2 max-w-md text-white/60">
             تواصل مع الموردين ومناقشة الطلبات والتفاصيل مباشرة
          </p>
          <Link
            href="/dashboard/messages"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-yellow px-6 py-3 font-heading font-bold text-brand-dark transition-all hover:bg-[#e6bd00]"
          >
            <ChatRoundDots className="size-4" />
            افتح المحادثات
          </Link>
        </div>
      </motion.section>

    </div>
  )
}

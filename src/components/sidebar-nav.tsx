"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  HomeSmileAngle,
  Box,
  Cart3,
  ChatRoundDots,
  Magnifier,
} from "@solar-icons/react/ssr"

const farmerNav = [
  { label: "الرئيسية", href: "/dashboard", icon: HomeSmileAngle },
  { label: "المنتجات", href: "/dashboard/products", icon: Box },
  { label: "الطلبات", href: "/dashboard/orders", icon: Cart3 },
  { label: "المحادثات", href: "/dashboard/messages", icon: ChatRoundDots },
]

const supplierNav = [
  { label: "الرئيسية", href: "/dashboard", icon: HomeSmileAngle },
  { label: "تصفح المنتجات", href: "/dashboard/browse", icon: Magnifier },
  { label: "منتجاتي", href: "/dashboard/products", icon: Box },
  { label: "طلباتي", href: "/dashboard/orders", icon: Cart3 },
  { label: "المحادثات", href: "/dashboard/messages", icon: ChatRoundDots },
]

const butcherNav = [
  { label: "الرئيسية", href: "/dashboard", icon: HomeSmileAngle },
  { label: "تصفح المنتجات", href: "/dashboard/browse", icon: Magnifier },
  { label: "طلباتي", href: "/dashboard/orders", icon: Cart3 },
  { label: "المحادثات", href: "/dashboard/messages", icon: ChatRoundDots },
]

export function SidebarNav({
  role,
  initialPendingOrders,
  initialUnreadMessages,
}: {
  role: string
  initialPendingOrders: number
  initialUnreadMessages: number
}) {
  const pathname = usePathname()
  const [counts, setCounts] = useState({
    pendingOrders: initialPendingOrders,
    unreadMessages: initialUnreadMessages,
  })

  const items = role === "farmer" ? farmerNav : role === "supplier" ? supplierNav : butcherNav

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch("/api/notifications/count")
        if (res.ok) {
          const data = await res.json()
          setCounts(data)
        }
      } catch {}
    }

    fetchCounts()
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [])

  const badgeCount = (label: string) => {
    const isOrders = label === "الطلبات" || label === "طلباتي"
    if (isOrders && counts.pendingOrders > 0) return counts.pendingOrders
    if (label === "المحادثات" && counts.unreadMessages > 0) return counts.unreadMessages
    return null
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard"
    return pathname.startsWith(href)
  }

  return (
    <>
      {items.map((item) => {
        const Icon = item.icon
        const badge = badgeCount(item.label)
        const active = isActive(item.href)

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
              active
                ? "bg-kitov-yellow/20 text-kitov-dark"
                : "text-muted-foreground hover:bg-kitov-yellow/10 hover:text-kitov-dark"
            }`}
          >
            <Icon className="size-5 transition-transform group-hover:scale-110" />
            <span className="flex-1">{item.label}</span>
            {badge !== null && (
              <span className="rounded-full bg-kitov-red px-2 py-0.5 text-[10px] font-bold text-white">
                {badge > 99 ? "99+" : badge}
              </span>
            )}
          </Link>
        )
      })}
    </>
  )
}

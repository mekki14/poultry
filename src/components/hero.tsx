"use client"

import { KitovButton } from "@/components/kitov"
import { RoleToggle } from "@/components/role-toggle"
import { Leaf, Magnifier, Cart3 } from "@solar-icons/react/ssr"
import Link from "next/link"
import { motion } from "framer-motion"
import type { Role } from "@/lib/roles"
import type { IconProps } from "@solar-icons/react"

const linearEasing = (t: number) => {
  const pts = [
    [0, 0], [0.01, 0.013], [0.022, 0.051], [0.098, 0.404], [0.126, 0.51],
    [0.155, 0.602], [0.187, 0.683], [0.222, 0.754], [0.26, 0.813],
    [0.302, 0.861], [0.348, 0.9], [0.4, 0.931], [0.527, 0.972],
    [0.702, 0.992], [1, 1],
  ]
  for (let i = 1; i < pts.length; i++) {
    if (t <= pts[i][0]) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]
      return y0 + (t - x0) * (y1 - y0) / (x1 - x0)
    }
  }
  return 1
}

const transition = { duration: 0.9, ease: linearEasing }

const heroContent: Record<Role, { title: string; desc: string; cta: string; icon: React.ComponentType<IconProps> }> = {
  farmer: {
    title: "اعرض منتجاتك\nعلى آلاف المشترين",
    desc: "سوق رقمي مباشر يجمعك بالموردين في 48 ولاية.",
    cta: "ابدأ البيع",
    icon: Leaf,
  },
  butcher: {
    title: "ابحث عن أفضل\nالدواجن لمحلك",
    desc: "تواصل مع الموردين مباشرة واحصل على أجود الدواجن لمحل الجزارة الخاص بك.",
    cta: "اطلب الآن",
    icon: Cart3,
  },
  supplier: {
    title: "اشتري من الفلاحين\nوبع للجزارين",
    desc: "تواصل مع الفلاحين مباشرة، واعرض منتجاتك للجزارين.",
    cta: "ابدأ الآن",
    icon: Magnifier,
  },
}

export function Hero({
  role,
  onToggle,
}: {
  role: Role
  onToggle: (role: Role) => void
}) {
  const content = heroContent[role]
  const Icon = content.icon

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-kitov-dark">
      {/* subtle background decoration */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-kitov-yellow/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-kitov-red/5 blur-3xl" />
        <div className="absolute left-1/3 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-white/[0.02] blur-2xl" />
      </div>
      <div className="mx-auto w-full max-w-2xl px-6 py-20 text-center">
        <RoleToggle role={role} onToggle={onToggle} />

        <motion.h1
          key={role}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="font-heading mt-6 whitespace-pre-line text-3xl font-bold leading-tight text-white md:text-5xl"
        >
          {content.title}
        </motion.h1>

        <motion.p
          key={role + "desc"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="mx-auto mt-6 max-w-lg text-sm text-white/70 md:text-base"
        >
          {content.desc}
        </motion.p>

        <motion.div
          key={role + "cta"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="mt-10"
        >
          <Link href="/register">
            <KitovButton variant={role === "farmer" ? "primary" : "secondary"} size="lg" className="rounded-xl px-10 gap-2">
              <Icon weight="BoldDuotone" className="size-5" />
              {content.cta}
            </KitovButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

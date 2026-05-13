"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  KitovSection,
  KitovSectionHeading,
  KitovSectionSubheading,
  KitovCard,
  KitovCardHeader,
  KitovCardTitle,
  KitovCardDescription,
  KitovButton,
} from "@/components/kitov"

import { Hero } from "@/components/hero"
import {
  SproutDuotone,
  SearchDuotone,
  ChartDuotone,
  TruckDuotone,
  ShieldDuotone,
  UsersDuotone,
  SolarDeliveryBoldDuotone
} from "@/components/icons/solar"
import type { Role } from "@/lib/roles"

const transition = {
  duration: 0.9,
  ease: [0.01, 1, 0.484, 1.001] as const,
}

const farmerSections = {
  services: [
    { title: "اعرض منتجاتك", desc: "انشر الدجاج، البيض، الأعلاف مع الصور والأسعار", icon: SproutDuotone },
    { title: "تواصل مع المشترين", desc: "استقبل طلبات الموردين مباشرة", icon: UsersDuotone },
    { title: "تسعير ذكي", desc: "اطلع على أسعار السوق وحدد سعرك التنافسي", icon: ChartDuotone },
    { title: "توصيل مضمون", desc: "شبكة لوجستية توصل منتجاتك عبر 48 ولاية", icon: SolarDeliveryBoldDuotone },
  ],
  cta: {
    heading: "مستعد تبيع منتجاتك؟",
    sub: "انضم إلى 5000+ فلاح يبيعون على فلاحك. التسجيل مجاني.",
    btn: "سجل كفلاح مجاناً",
  },
}

const supplierSections = {
  services: [
    { title: "ابحث عن موردين", desc: "تصفح منتجات الفلاحين واختر ما تحتاجه", icon: SearchDuotone },
    { title: "اعرض منتجاتك", desc: "انشر منتجاتك للجزارين في كل الولايات", icon: SproutDuotone },
    { title: "طلبات مضمونة", desc: "نظام دفع آمن يضمن حقوقك حتى استلام الطلب", icon: ShieldDuotone },
    { title: "توصيل سريع", desc: "استلم منتجاتك في محلك عبر شبكة التوصيل الوطنية", icon: SolarDeliveryBoldDuotone },
  ],
  cta: {
    heading: "ابحث عن موردك الآن",
    sub: "أكبر شبكة موردي دواجن في الجزائر. البحث مجاني.",
    btn: "ابدأ البحث",
  },
}

const butcherSections = {
  services: [
    { title: "ابحث عن موردين", desc: "تصفح منتجات الموزعين في كل الولايات", icon: SearchDuotone },
    { title: "قارن الأسعار", desc: "احصل على أفضل صفقة بمقارنة عروض الموردين", icon: ChartDuotone },
    { title: "طلبات مضمونة", desc: "نظام دفع آمن يضمن حقوقك حتى استلام الطلب", icon: ShieldDuotone },
    { title: "توصيل سريع", desc: "استلم منتجاتك في محلك عبر شبكة التوصيل الوطنية", icon: SolarDeliveryBoldDuotone },
  ],
  cta: {
    heading: "ابحث عن موردك الآن",
    sub: "أكبر شبكة موردي دواجن في الجزائر. البحث مجاني.",
    btn: "ابدأ البحث",
  },
}

const sectionsMap: Record<Role, typeof farmerSections> = {
  farmer: farmerSections,
  butcher: butcherSections,
  supplier: supplierSections,
}

export function HomeClient() {
  const [role, setRole] = useState<Role>("butcher")

  const handleRoleToggle = useCallback((r: Role) => {
    setRole(r)
  }, [])

  const sections = sectionsMap[role]

  return (
    <div className="flex flex-col">
      <Hero role={role} onToggle={handleRoleToggle} />

      {/* ── Services ── */}
      <KitovSection id="services">
        <div className="mx-auto w-full max-w-6xl px-6">
          <KitovSectionHeading>خدمات فلاحك</KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto">
            كل ما تحتاجه لتطوير مزرعتك أو تأمين منتجاتك
          </KitovSectionSubheading>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sections.services.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <KitovCard
                    variant="yellow"
                    className="h-full cursor-pointer transition-all hover:shadow-kitov-lg"
                  >
                    <KitovCardHeader>
                      <Icon className="mb-2 size-8 text-kitov-dark" />
                      <KitovCardTitle>{item.title}</KitovCardTitle>
                      <KitovCardDescription>{item.desc}</KitovCardDescription>
                    </KitovCardHeader>
                  </KitovCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </KitovSection>


      {/* ── Stats ── */}
      <KitovSection variant="dark">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <KitovSectionHeading>فلاحك في أرقام</KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto">
            منصة الجزائر الأولى في قطاع الدواجن
          </KitovSectionSubheading>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { stat: "+5000", label: "فلاح مسجل" },
              { stat: "+200", label: "نقطة توزيع" },
              { stat: "+1500", label: "عملية يومية" },
              { stat: "+48", label: "ولاية مغطاة" },
            ].map((item) => (
              <KitovCard key={item.label} variant="dark" className="border-white/10">
                <KitovCardHeader>
                  <div className="font-heading text-4xl font-extrabold text-kitov-yellow md:text-5xl">{item.stat}</div>
                  <KitovCardDescription className="text-white/60">{item.label}</KitovCardDescription>
                </KitovCardHeader>
              </KitovCard>
            ))}
          </div>
        </div>
      </KitovSection>

      {/* ── CTA ── */}
      <KitovSection variant="yellow">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <KitovSectionHeading className="text-kitov-dark">
            {sections.cta.heading}
          </KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto text-kitov-dark/70">
            {sections.cta.sub}
          </KitovSectionSubheading>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <KitovButton variant="primary" size="lg">{sections.cta.btn}</KitovButton>
            <KitovButton variant="outline" size="lg">تسجيل الدخول</KitovButton>
          </div>
        </div>
      </KitovSection>

    </div>
  )
}

"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import {
  BrandSection,
  BrandSectionHeading,
  BrandSectionSubheading,
  BrandCard,
  BrandCardHeader,
  BrandCardTitle,
  BrandCardDescription,
  BrandButton,
} from "@/components/brand"

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
      <BrandSection id="services">
        <div className="mx-auto w-full max-w-6xl px-6">
          <BrandSectionHeading>خدمات فلاحك</BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto">
            كل ما تحتاجه لتطوير مزرعتك أو تأمين منتجاتك
          </BrandSectionSubheading>
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
                  <BrandCard
                    variant="yellow"
                    className="h-full cursor-pointer transition-all hover:shadow-brand-lg"
                  >
                    <BrandCardHeader>
                      <Icon className="mb-2 size-8 text-brand-dark" />
                      <BrandCardTitle>{item.title}</BrandCardTitle>
                      <BrandCardDescription>{item.desc}</BrandCardDescription>
                    </BrandCardHeader>
                  </BrandCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </BrandSection>


      {/* ── Stats ── */}
      <BrandSection variant="dark">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <BrandSectionHeading>فلاحك في أرقام</BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto">
            منصة الجزائر الأولى في قطاع الدواجن
          </BrandSectionSubheading>
          <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { stat: "+5000", label: "فلاح مسجل" },
              { stat: "+200", label: "نقطة توزيع" },
              { stat: "+1500", label: "عملية يومية" },
              { stat: "+48", label: "ولاية مغطاة" },
            ].map((item) => (
              <BrandCard key={item.label} variant="dark" className="border-white/10">
                <BrandCardHeader>
                  <div className="font-heading text-4xl font-extrabold text-brand-yellow md:text-5xl">{item.stat}</div>
                  <BrandCardDescription className="text-white/60">{item.label}</BrandCardDescription>
                </BrandCardHeader>
              </BrandCard>
            ))}
          </div>
        </div>
      </BrandSection>

      {/* ── CTA ── */}
      <BrandSection variant="yellow">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <BrandSectionHeading className="text-brand-dark">
            {sections.cta.heading}
          </BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto text-brand-dark/70">
            {sections.cta.sub}
          </BrandSectionSubheading>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BrandButton variant="primary" size="lg">{sections.cta.btn}</BrandButton>
            <BrandButton variant="outline" size="lg">تسجيل الدخول</BrandButton>
          </div>
        </div>
      </BrandSection>

    </div>
  )
}

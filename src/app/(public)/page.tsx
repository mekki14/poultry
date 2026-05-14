import {
  BrandSection,
  BrandSectionHeading,
  BrandSectionSubheading,
  BrandCard,
  BrandCardHeader,
  BrandCardTitle,
  BrandCardDescription,
  BrandCardContent,
  BrandCardFooter,
  BrandButton,
  BrandBadge,
} from "@/components/brand";

export default function Home() {
  return (
    <div className="flex flex-col">
      <BrandSection variant="yellow" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04]">
          <svg viewBox="0 0 100 100" className="size-full">
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="80" fontFamily="system-ui">🐔</text>
          </svg>
        </div>
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-start lg:flex-row lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <BrandBadge variant="sale" size="lg" className="mb-4">طازج يومياً من المزرعة</BrandBadge>
              <BrandSectionHeading>بالضبط ما تحتاجه</BrandSectionHeading>
              <BrandSectionSubheading>
                دواجن مرعية في المراعي الطليقة وبيض طازج من المزرعة يوصلك إلى باب منزلك.
                من عائلتنا إلى مائدتك — طعم الرعاية الحقيقية.
              </BrandSectionSubheading>
              <div className="mt-8 flex flex-wrap gap-4">
                <BrandButton variant="primary" size="lg">تسوق الآن</BrandButton>
                <BrandButton variant="outline" size="lg">شاهد مزرعتنا</BrandButton>
              </div>
            </div>
            <div className="glass rounded-carton flex aspect-square w-72 items-center justify-center text-8xl md:w-96">
              🥚
            </div>
          </div>
        </div>
      </BrandSection>

      <BrandSection variant="default">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <BrandBadge variant="highlight" className="mb-4">الأقسام</BrandBadge>
          <BrandSectionHeading>تشكيلتنا</BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto">
            كل ما تحتاجه لتجربة مثالية من المزرعة إلى المائدة.
          </BrandSectionSubheading>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "بيض مراعي طليقة", desc: "صفار غني، قشور ذهبية", emoji: "🥚" },
              { title: "دجاج كامل", desc: "مرعى طليق، غير مجمد", emoji: "🍗" },
              { title: "مرق عظام", desc: "مطبوخ ببطء لمدة ٢٤ ساعة", emoji: "🍲" },
              { title: "اشتراك البيض", desc: "توصيل أسبوعي إلى الباب", emoji: "📦" },
              { title: "باقات موسمية", desc: "صناديق مزرعة منتقاة", emoji: "🎁" },
              { title: "هدايا المزرعة", desc: "تيشيرتات، قبعات والمزيد", emoji: "🧢" },
            ].map((item, i) => (
              <BrandCard
                key={item.title}
                variant="yellow"
                className="animate-pop group cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <BrandCardHeader>
                  <span className="mb-1 block text-4xl">{item.emoji}</span>
                  <BrandCardTitle>{item.title}</BrandCardTitle>
                  <BrandCardDescription>{item.desc}</BrandCardDescription>
                </BrandCardHeader>
                <BrandCardContent>
                  <div className="h-1 w-12 rounded-full bg-brand-dark/10 transition-all duration-300 group-hover:w-full" />
                </BrandCardContent>
                <BrandCardFooter>
                  <BrandButton variant="outline" size="sm">
                    استكشف
                  </BrandButton>
                </BrandCardFooter>
              </BrandCard>
            ))}
          </div>
        </div>
      </BrandSection>

      <BrandSection variant="dark">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <BrandBadge variant="shell" className="mb-4">لماذا فلاحك</BrandBadge>
          <BrandSectionHeading>تربية سليمة. توصيل طازج.</BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto">
            نؤمن بالزراعة الأخلاقية، والمصادر الشفافة، والنكهة التي لا تُقاوم.
          </BrandSectionSubheading>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { stat: "١٢,٠٠٠+", label: "عميل سعيد" },
              { stat: "١٠٠٪", label: "مرعى طليق" },
              { stat: "٢٤ ساعة", label: "من المزرعة إلى الباب" },
            ].map((item) => (
              <BrandCard key={item.label} variant="dark" className="border-white/10">
                <BrandCardHeader>
                  <div className="font-heading text-4xl font-extrabold text-brand-yellow md:text-5xl">
                    {item.stat}
                  </div>
                  <BrandCardDescription className="text-white/60">
                    {item.label}
                  </BrandCardDescription>
                </BrandCardHeader>
              </BrandCard>
            ))}
          </div>
        </div>
      </BrandSection>

      <BrandSection variant="shell">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <BrandSectionHeading className="text-brand-dark">
            هل أنت مستعد لتذوق الفرق؟
          </BrandSectionHeading>
          <BrandSectionSubheading className="mx-auto text-brand-dark/70">
            انضم إلى آلاف العائلات التي تبدأ يومها مع فلاحك.
          </BrandSectionSubheading>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <BrandButton variant="primary" size="lg">ابدأ اشتراكك</BrandButton>
            <BrandButton variant="outline" size="lg">اعثر على متجر قريب منك</BrandButton>
          </div>
        </div>
      </BrandSection>
    </div>
  );
}

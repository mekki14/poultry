import {
  KitovSection,
  KitovSectionHeading,
  KitovSectionSubheading,
  KitovCard,
  KitovCardHeader,
  KitovCardTitle,
  KitovCardDescription,
  KitovCardContent,
  KitovCardFooter,
  KitovButton,
  KitovBadge,
} from "@/components/kitov";

export default function Home() {
  return (
    <div className="flex flex-col">
      <KitovSection variant="yellow" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 select-none opacity-[0.04]">
          <svg viewBox="0 0 100 100" className="size-full">
            <text x="50" y="50" textAnchor="middle" dominantBaseline="central" fontSize="80" fontFamily="system-ui">🐔</text>
          </svg>
        </div>
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-start lg:flex-row lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <KitovBadge variant="sale" size="lg" className="mb-4">طازج يومياً من المزرعة</KitovBadge>
              <KitovSectionHeading>بالضبط ما تحتاجه</KitovSectionHeading>
              <KitovSectionSubheading>
                دواجن مرعية في المراعي الطليقة وبيض طازج من المزرعة يوصلك إلى باب منزلك.
                من عائلتنا إلى مائدتك — طعم الرعاية الحقيقية.
              </KitovSectionSubheading>
              <div className="mt-8 flex flex-wrap gap-4">
                <KitovButton variant="primary" size="lg">تسوق الآن</KitovButton>
                <KitovButton variant="outline" size="lg">شاهد مزرعتنا</KitovButton>
              </div>
            </div>
            <div className="glass rounded-carton flex aspect-square w-72 items-center justify-center text-8xl md:w-96">
              🥚
            </div>
          </div>
        </div>
      </KitovSection>

      <KitovSection variant="default">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <KitovBadge variant="highlight" className="mb-4">الأقسام</KitovBadge>
          <KitovSectionHeading>تشكيلتنا</KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto">
            كل ما تحتاجه لتجربة مثالية من المزرعة إلى المائدة.
          </KitovSectionSubheading>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "بيض مراعي طليقة", desc: "صفار غني، قشور ذهبية", emoji: "🥚" },
              { title: "دجاج كامل", desc: "مرعى طليق، غير مجمد", emoji: "🍗" },
              { title: "مرق عظام", desc: "مطبوخ ببطء لمدة ٢٤ ساعة", emoji: "🍲" },
              { title: "اشتراك البيض", desc: "توصيل أسبوعي إلى الباب", emoji: "📦" },
              { title: "باقات موسمية", desc: "صناديق مزرعة منتقاة", emoji: "🎁" },
              { title: "هدايا المزرعة", desc: "تيشيرتات، قبعات والمزيد", emoji: "🧢" },
            ].map((item, i) => (
              <KitovCard
                key={item.title}
                variant="yellow"
                className="animate-pop group cursor-pointer"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <KitovCardHeader>
                  <span className="mb-1 block text-4xl">{item.emoji}</span>
                  <KitovCardTitle>{item.title}</KitovCardTitle>
                  <KitovCardDescription>{item.desc}</KitovCardDescription>
                </KitovCardHeader>
                <KitovCardContent>
                  <div className="h-1 w-12 rounded-full bg-kitov-dark/10 transition-all duration-300 group-hover:w-full" />
                </KitovCardContent>
                <KitovCardFooter>
                  <KitovButton variant="outline" size="sm">
                    استكشف
                  </KitovButton>
                </KitovCardFooter>
              </KitovCard>
            ))}
          </div>
        </div>
      </KitovSection>

      <KitovSection variant="dark">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <KitovBadge variant="shell" className="mb-4">لماذا كيتوف</KitovBadge>
          <KitovSectionHeading>تربية سليمة. توصيل طازج.</KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto">
            نؤمن بالزراعة الأخلاقية، والمصادر الشفافة، والنكهة التي لا تُقاوم.
          </KitovSectionSubheading>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { stat: "١٢,٠٠٠+", label: "عميل سعيد" },
              { stat: "١٠٠٪", label: "مرعى طليق" },
              { stat: "٢٤ ساعة", label: "من المزرعة إلى الباب" },
            ].map((item) => (
              <KitovCard key={item.label} variant="dark" className="border-white/10">
                <KitovCardHeader>
                  <div className="font-heading text-4xl font-extrabold text-kitov-yellow md:text-5xl">
                    {item.stat}
                  </div>
                  <KitovCardDescription className="text-white/60">
                    {item.label}
                  </KitovCardDescription>
                </KitovCardHeader>
              </KitovCard>
            ))}
          </div>
        </div>
      </KitovSection>

      <KitovSection variant="shell">
        <div className="mx-auto w-full max-w-6xl px-6 text-center">
          <KitovSectionHeading className="text-kitov-dark">
            هل أنت مستعد لتذوق الفرق؟
          </KitovSectionHeading>
          <KitovSectionSubheading className="mx-auto text-kitov-dark/70">
            انضم إلى آلاف العائلات التي تبدأ يومها مع كيتوف.
          </KitovSectionSubheading>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <KitovButton variant="primary" size="lg">ابدأ اشتراكك</KitovButton>
            <KitovButton variant="outline" size="lg">اعثر على متجر قريب منك</KitovButton>
          </div>
        </div>
      </KitovSection>
    </div>
  );
}

import Link from "next/link";
import { Leaf, ChatRoundDots, Smartphone, Global } from "@solar-icons/react/ssr";

const footerLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/#products" },
  { label: "اشتراك البيض", href: "/#subscription" },
  { label: "اتصل بنا", href: "/#contact" },
];

export function Footer() {
  return (
    <footer className="w-full bg-kitov-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Leaf
                weight="BoldDuotone"
                size={28}
                className="text-kitov-yellow"
              />
              <span className="font-heading text-xl font-extrabold">كيتوف</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              دواجن مرعية طليقة وبيض طازج من المزرعة إلى باب منزلك. من عائلتنا إلى
              مائدتك — طعم الرعاية الحقيقية.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold tracking-wider text-white/80">
              روابط سريعة
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-bold tracking-wider text-white/80">
              تواصل معنا
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/50">
              <li className="flex items-center gap-2">
                <ChatRoundDots
                  weight="BoldDuotone"
                  size={18}
                  className="text-kitov-yellow"
                />
                info@kitov.sa
              </li>
              <li className="flex items-center gap-2">
                <Smartphone
                  weight="BoldDuotone"
                  size={18}
                  className="text-kitov-yellow"
                />
                +966 55 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Global
                  weight="BoldDuotone"
                  size={18}
                  className="text-kitov-yellow"
                />
                الرياض، المملكة العربية السعودية
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} كيتوف. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}

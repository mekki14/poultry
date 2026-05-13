import Link from "next/link";
import { Leaf } from "@solar-icons/react/ssr";
import { KitovButton } from "@/components/kitov/kitov-button";
import type { ReactNode } from "react";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  navLinks?: NavLink[];
  buttons?: ReactNode;
}

const defaultNavLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/#products" },
  { label: "عن فلاحك", href: "/#about" },
];

const defaultButtons = (
  <>
    <Link
      href="/login"
      className="hidden text-sm font-medium text-kitov-dark/70 transition-colors hover:text-kitov-dark sm:inline"
    >
      تسجيل الدخول
    </Link>
    <Link href="/register">
      <KitovButton variant="primary" size="sm">إنشاء حساب</KitovButton>
    </Link>
  </>
);

export function Navbar({ navLinks, buttons }: NavbarProps) {
  const links = navLinks ?? defaultNavLinks;
  const btns = buttons ?? defaultButtons;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-kitov-dark/5 bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-extrabold"
        >
          <Leaf weight="BoldDuotone" size={28} className="text-kitov-red" />
          <span className="text-kitov-dark">فلاحك</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-medium text-kitov-dark/70 transition-colors hover:text-kitov-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">{btns}</div>
      </div>
    </header>
  );
}

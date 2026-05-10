"use client"

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { KitovButton } from "@/components/kitov/kitov-button";
import Link from "next/link";

const landingNavLinks = [
  { label: "الرئيسية", href: "#" },
  { label: "خدماتنا", href: "#services" },
  { label: "معلومات عنا", href: "#" },
];

const defaultNavLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المنتجات", href: "/#products" },
  { label: "عن كيتوف", href: "/#about" },
];

const authButtons = (
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

export function SiteNavbar() {
  const pathname = usePathname();

  // Don't render navbar on dashboard routes
  if (pathname.startsWith("/dashboard")) return null;

  // Root landing page → dark variant with landing-specific links
  if (pathname === "/") {
    return <Navbar variant="dark" navLinks={landingNavLinks} buttons={authButtons} />;
  }

  // All other public pages → light variant with default content
  return <Navbar variant="light" navLinks={defaultNavLinks} buttons={authButtons} />;
}

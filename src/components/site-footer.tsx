"use client"

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";
import { LandingFooter } from "@/components/landing-footer";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  if (pathname === "/") return <LandingFooter />;

  return <Footer />;
}

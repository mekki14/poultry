"use client"

import { usePathname } from "next/navigation";
import { LandingFooter } from "@/components/landing-footer";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <LandingFooter />;
}

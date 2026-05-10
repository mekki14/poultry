"use client"

import { usePathname } from "next/navigation";
import { Footer } from "@/components/footer";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <Footer />;
}

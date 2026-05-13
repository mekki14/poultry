"use client"

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";

export function SiteNavbar() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <Navbar />;
}

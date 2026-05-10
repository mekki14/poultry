import type { Metadata } from "next";
import { Geist_Mono, Readex_Pro } from "next/font/google";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const readexPro = Readex_Pro({
  variable: "--font-readex-pro",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fellahok — سوق الدواجن وفلاحك",
  description: "بوابة كاملة للبيع والشراء في قطاع الدواجن في الجزائر. فلاح، جزار، موزعون — منصة الجزائر الأولى لتجارة الدواجن.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readexPro.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

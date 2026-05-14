import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "إنشاء حساب | فلاحك",
  description: "انضم إلى منصة فلاحك لتجارة الدواجن",
};

export default async function RegisterPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/dashboard");

  return <RegisterForm />;
}

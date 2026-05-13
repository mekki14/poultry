"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export type SignUpState = { error: string } | undefined;

export async function signUp(_prev: SignUpState, formData: FormData): Promise<SignUpState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;
  const phone = formData.get("phone") as string;
  const location = formData.get("location") as string;

  if (!name || name.trim().length < 2) return { error: "الاسم يجب أن يكون على الأقل حرفين" };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "البريد الإلكتروني غير صالح" };
  if (!password || password.length < 8) return { error: "كلمة المرور يجب أن تكون 8 أحرف على الأقل" };
  if (!["farmer", "butcher", "supplier"].includes(role)) return { error: "يرجى اختيار نوع الحساب" };

  try {
    await auth.api.signUpEmail({
      body: { name, email, password, role, phone, location },
      headers: await headers(),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "فشل إنشاء الحساب";
    return { error: message };
  }

  redirect("/dashboard");
}
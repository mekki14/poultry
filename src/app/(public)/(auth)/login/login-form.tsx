"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signIn } from "./actions";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrandCard,
  BrandCardHeader,
  BrandCardTitle,
  BrandCardContent,
} from "@/components/brand/brand-card";
import { BrandButton } from "@/components/brand/brand-button";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => { emailRef.current?.focus(); }, []);

  return (
    <div dir="rtl">
      {/* background decoration */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -end-32 -top-32 h-80 w-80 rounded-full bg-brand-yellow/10 blur-3xl" />
        <div className="absolute -bottom-32 -start-32 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10"
      >
        <BrandCard className="w-full max-w-sm">
          <BrandCardHeader className="text-center">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.35 }}>
              <BrandCardTitle className="text-2xl">تسجيل الدخول</BrandCardTitle>
              <p className="mt-1.5 text-sm text-brand-dark/60">
                مرحباً بعودتك إلى منصة فلاحك
              </p>
            </motion.div>
          </BrandCardHeader>
          <BrandCardContent>
            <form action={action} className="space-y-5" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Icon icon="solar:letter-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input ref={emailRef} id="email" name="email" type="email" placeholder="you@example.com" required
                    className="ps-9" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Icon icon="solar:lock-password-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور" required
                    className="ps-9 pe-9" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-dark transition-colors" tabIndex={-1}>
                    <Icon icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} className="size-4" />
                  </button>
                </div>
              </div>

              {/* Server Error */}
              <AnimatePresence>
                {state?.error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-carton bg-red-50 px-4 py-3 text-sm text-red-600">
                    <Icon icon="solar:danger-circle-bold-duotone" className="size-4 shrink-0" />
                    {state.error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <BrandButton type="submit" variant="primary" className="w-full h-11" disabled={pending}>
                {pending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="solar:refresh-circle-bold-duotone" className="size-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  "تسجيل الدخول"
                )}
              </BrandButton>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t" /></div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">أو</span>
              </div>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-brand-dark/60">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="font-medium text-brand-red underline-offset-4 hover:underline">إنشاء حساب</Link>
            </p>
          </BrandCardContent>
        </BrandCard>
      </motion.div>
    </div>
  );
}

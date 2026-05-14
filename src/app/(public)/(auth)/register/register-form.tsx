"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { signUp, type SignUpState } from "./actions";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import {
  BrandCard,
  BrandCardHeader,
  BrandCardTitle,
  BrandCardContent,
} from "@/components/brand/brand-card";
import { BrandButton } from "@/components/brand/brand-button";

const roles = [
  { value: "farmer", label: "فلاح", icon: "solar:leaf-bold-duotone", desc: "بيع المنتجات الزراعية والبيض والدواجن الحية" },
  { value: "butcher", label: "جزار", icon: "solar:plate-bold-duotone", desc: "شراء الدواجن الحية وبيع اللحوم" },
  { value: "supplier", label: "مورد", icon: "solar:shop-bold-duotone", desc: "توزيع المنتجات بين الفلاحين والجزارين" },
] as const;

const wilayas = [
  "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة",
  "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
  "11 - تمنراست", "12 - تبسة", "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو",
  "16 - الجزائر", "17 - الجلفة", "18 - جيجل", "19 - سطيف", "20 - سعيدة",
  "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة", "25 - قسنطينة",
  "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
  "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس",
  "36 - الطارف", "37 - تندوف", "38 - تيسمسيلت", "39 - الوادي", "40 - خنشلة",
  "41 - سوق أهراس", "42 - تيبازة", "43 - ميلة", "44 - عين الدفلى", "45 - النعامة",
  "46 - عين تموشنت", "47 - غرداية", "48 - غليزان",
] as const;

type FieldErrors = Partial<Record<"name" | "email" | "password" | "phone" | "location" | "role", string>>;

function validate(formData: FormData): FieldErrors | null {
  const errors: FieldErrors = {};
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const phone = formData.get("phone") as string;
  const role = formData.get("role") as string;

  if (!name || name.trim().length < 2) errors.name = "الاسم يجب أن يكون على الأقل حرفين";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "البريد الإلكتروني غير صالح";
  if (!password || password.length < 8) errors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
  if (!role || !["farmer", "butcher", "supplier"].includes(role)) errors.role = "يرجى اختيار نوع الحساب";
  if (phone && !/^0[5-7]\d{8}$/.test(phone.replace(/\s/g, ""))) errors.phone = "رقم الهاتف غير صالح (مثال: 05xxxxxxxx)";

  return Object.keys(errors).length > 0 ? errors : null;
}

function getPasswordStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 1) return { score, label: "ضعيفة", color: "bg-red-500" };
  if (score <= 2) return { score, label: "متوسطة", color: "bg-orange-500" };
  if (score <= 3) return { score, label: "جيدة", color: "bg-yellow-500" };
  return { score, label: "قوية", color: "bg-green-500" };
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(signUp, undefined);
  const [role, setRole] = useState<string>("farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [password, setPassword] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { nameRef.current?.focus(); }, []);

  const strength = getPasswordStrength(password);

  function handleSubmit(formData: FormData) {
    const errors = validate(formData);
    setFieldErrors(errors ?? {});
    if (errors) return;
    action(formData);
  }

  function clearError(field: keyof FieldErrors) {
    if (fieldErrors[field]) setFieldErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  }

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
        <BrandCard className="w-full max-w-md">
          <BrandCardHeader className="text-center">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ delay: 0.1, duration: 0.35 }}>
              <BrandCardTitle className="text-2xl">إنشاء حساب جديد</BrandCardTitle>
              <p className="mt-1.5 text-sm text-brand-dark/60">
                انضم إلى منصة فلاحك لتجارة الدواجن
              </p>
            </motion.div>
          </BrandCardHeader>
          <BrandCardContent>
            <form action={handleSubmit} className="space-y-5" noValidate>
              {/* Role Selector */}
              <div className="space-y-2">
                <Label>نوع الحساب</Label>
                <input type="hidden" name="role" value={role} />
                <div className="grid grid-cols-3 gap-2">
                  {roles.map((r) => {
                    const isActive = role === r.value;
                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => { setRole(r.value); clearError("role"); }}
                        className={cn(
                          "relative flex flex-col items-center gap-1.5 rounded-carton border-2 px-2 py-3 text-xs font-medium transition-all duration-200",
                          isActive
                            ? "border-brand-red bg-brand-red/5 text-brand-red shadow-xs"
                            : "border-border text-muted-foreground hover:border-brand-red/30 hover:bg-brand-red/5"
                        )}
                      >
                        <Icon icon={r.icon} className={cn("size-5", isActive ? "text-brand-red" : "text-muted-foreground")} />
                        <span>{r.label}</span>
                        {isActive && (
                          <motion.div layoutId="role-check" className="absolute -top-1.5 -end-1.5">
                            <div className="flex size-4 items-center justify-center rounded-full bg-brand-red shadow-xs">
                              <Icon icon="solar:check-circle-bold-duotone" className="size-3 text-white" />
                            </div>
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {fieldErrors.role && (
                  <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.role}</p>
                )}
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">الاسم الكامل</Label>
                <div className="relative">
                  <Icon icon="solar:user-rounded-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input ref={nameRef} id="name" name="name" placeholder="أدخل اسمك الكامل" required
                    className={cn("ps-9", fieldErrors.name && "border-red-500")}
                    onChange={() => clearError("name")} />
                </div>
                {fieldErrors.name && <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Icon icon="solar:letter-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="you@example.com" required
                    className={cn("ps-9", fieldErrors.email && "border-red-500")}
                    onChange={() => clearError("email")} />
                </div>
                {fieldErrors.email && <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Icon icon="solar:lock-password-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور" required
                    className={cn("ps-9 pe-9", fieldErrors.password && "border-red-500")}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); clearError("password"); }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-brand-dark transition-colors" tabIndex={-1}>
                    <Icon icon={showPassword ? "solar:eye-closed-bold-duotone" : "solar:eye-bold-duotone"} className="size-4" />
                  </button>
                </div>
                {password.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={cn("h-1 flex-1 rounded-full transition-colors", i <= strength.score ? strength.color : "bg-muted")} />
                      ))}
                    </div>
                    <p className={cn(
                      "text-xs",
                      strength.score <= 1 ? "text-red-500" : strength.score <= 2 ? "text-orange-500" : strength.score <= 3 ? "text-yellow-500" : "text-green-500"
                    )}>
                      قوة كلمة المرور: {strength.label}
                    </p>
                  </motion.div>
                )}
                {fieldErrors.password && <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.password}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <Label htmlFor="phone">رقم الهاتف <span className="text-muted-foreground font-normal">(اختياري)</span></Label>
                <div className="relative">
                  <Icon icon="solar:phone-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="phone" name="phone" type="tel" placeholder="05xxxxxxxx"
                    className={cn("ps-9", fieldErrors.phone && "border-red-500")}
                    onChange={() => clearError("phone")} />
                </div>
                {fieldErrors.phone && <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.phone}</p>}
              </div>

              {/* Location (Wilaya) */}
              <div className="space-y-1.5">
                <Label htmlFor="location">الولاية <span className="text-muted-foreground font-normal">(اختياري)</span></Label>
                <div className="relative">
                  <Icon icon="solar:map-point-bold-duotone" className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground z-10" />
                  <select id="location" name="location"
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-transparent ps-9 pe-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      "text-muted-foreground",
                      fieldErrors.location && "border-red-500"
                    )}
                    defaultValue=""
                    onChange={() => clearError("location")}
                  >
                    <option value="" disabled>اختر الولاية</option>
                    {wilayas.map((w) => (
                      <option key={w} value={w} className="text-foreground">{w}</option>
                    ))}
                  </select>
                </div>
                {fieldErrors.location && <p className="flex items-center gap-1 text-xs text-red-500"><Icon icon="solar:danger-circle-bold-duotone" className="size-3 shrink-0" />{fieldErrors.location}</p>}
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
                    جاري إنشاء الحساب...
                  </span>
                ) : (
                  "إنشاء حساب"
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

            {/* Login Link */}
            <p className="text-center text-sm text-brand-dark/60">
              لديك حساب بالفعل؟{" "}
              <Link href="/login" className="font-medium text-brand-red underline-offset-4 hover:underline">تسجيل الدخول</Link>
            </p>
          </BrandCardContent>
        </BrandCard>
      </motion.div>
    </div>
  );
}

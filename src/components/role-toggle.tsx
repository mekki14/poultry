import { cn } from "@/lib/utils"

export function RoleToggle({
  role,
  onToggle,
}: {
  role: "farmer" | "buyer"
  onToggle: (role: "farmer" | "buyer") => void
}) {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center rounded-full bg-white/10 p-1 backdrop-blur-sm">
      <button
        onClick={() => onToggle("buyer")}
        className={cn(
          "rounded-full px-6 py-2 text-sm font-bold transition-all",
          role === "buyer" ? "bg-white text-kitov-dark shadow-sm" : "text-white/70 hover:text-white"
        )}
      >
        أنا جزار / موزع
      </button>
      <button
        onClick={() => onToggle("farmer")}
        className={cn(
          "rounded-full px-6 py-2 text-sm font-bold transition-all",
          role === "farmer" ? "bg-white text-kitov-dark shadow-sm" : "text-white/70 hover:text-white"
        )}
      >
        أنا فلاح
      </button>
    </div>
  )
}

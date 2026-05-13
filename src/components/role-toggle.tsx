import { cn } from "@/lib/utils"
import type { Role } from "@/lib/roles"

const items: { value: Role; label: string }[] = [
  { value: "butcher", label: "أنا جزار" },
  { value: "supplier", label: "أنا مورد" },
  { value: "farmer", label: "أنا فلاح" },
]

export function RoleToggle({
  role,
  onToggle,
}: {
  role: Role
  onToggle: (role: Role) => void
}) {
  return (
    <div className="mx-auto mb-8 flex w-fit items-center rounded-full bg-white/10 p-1 backdrop-blur-sm">
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onToggle(item.value)}
          className={cn(
            "rounded-full px-6 py-2 text-sm font-bold transition-all",
            role === item.value ? "bg-white text-kitov-dark shadow-sm" : "text-white/70 hover:text-white"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

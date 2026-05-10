import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const kitovBadgeVariants = cva(
  "inline-flex items-center rounded-full font-heading font-bold text-xs tracking-wide whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        sale: "bg-kitov-red text-white",
        highlight: "bg-kitov-yellow text-kitov-dark",
        neutral: "bg-kitov-dark text-white",
        shell: "bg-kitov-shell text-kitov-dark",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[10px]",
        default: "px-3 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "sale",
      size: "default",
    },
  },
);

function KitovBadge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof kitovBadgeVariants>) {
  return (
    <span
      data-slot="kitov-badge"
      className={cn(kitovBadgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { KitovBadge, kitovBadgeVariants };

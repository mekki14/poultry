import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const brandBadgeVariants = cva(
  "inline-flex items-center rounded-full font-heading font-bold text-xs tracking-wide whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        sale: "bg-brand-red text-white",
        highlight: "bg-brand-yellow text-brand-dark",
        neutral: "bg-brand-dark text-white",
        shell: "bg-brand-shell text-brand-dark",
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

function BrandBadge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof brandBadgeVariants>) {
  return (
    <span
      data-slot="brand-badge"
      className={cn(brandBadgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { BrandBadge, brandBadgeVariants };

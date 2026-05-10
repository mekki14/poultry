import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const kitovButtonVariants = cva(
  "group/btn inline-flex shrink-0 items-center justify-center rounded-carton bg-clip-padding font-heading font-bold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          "bg-kitov-red text-white shadow-kitov hover:bg-[#c81a1f] hover:shadow-kitov-lg active:scale-[0.97] data-[popup-open]:animate-bounce-soft",
        secondary:
          "bg-kitov-yellow text-kitov-dark shadow-kitov hover:bg-[#e6bd00] hover:shadow-kitov-lg active:scale-[0.97]",
        outline:
          "border-2 border-kitov-dark bg-transparent text-kitov-dark hover:bg-kitov-dark hover:text-white",
        ghost:
          "bg-transparent text-kitov-dark hover:bg-kitov-dark/5",
      },
      size: {
        default: "h-10 gap-2 px-5 text-sm",
        sm: "h-8 gap-1.5 px-3.5 text-xs",
        lg: "h-12 gap-2.5 px-7 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function KitovButton({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof kitovButtonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="kitov-btn"
      className={cn(kitovButtonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { KitovButton, kitovButtonVariants };

import { cn } from "@/lib/utils";

type Variant = "default" | "yellow" | "dark" | "shell";

const variantStyles: Record<Variant, string> = {
  default: "bg-card text-card-foreground border",
  yellow: "bg-brand-yellow text-brand-dark border-brand-yellow",
  dark: "bg-brand-dark text-white border-brand-dark",
  shell: "bg-brand-shell text-brand-dark border-brand-shell",
};

function BrandCard({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: Variant }) {
  return (
    <div
      data-slot="brand-card"
      className={cn(
        "rounded-carton shadow-brand transition-all duration-300",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

function BrandCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="brand-card-header"
      className={cn("flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

function BrandCardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="brand-card-title"
      className={cn(
        "font-heading text-xl font-bold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function BrandCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="brand-card-description"
      className={cn(
        "text-sm leading-relaxed opacity-80",
        className,
      )}
      {...props}
    />
  );
}

function BrandCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="brand-card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function BrandCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="brand-card-footer"
      className={cn("flex items-center p-6 pt-0 gap-3", className)}
      {...props}
    />
  );
}

export {
  BrandCard,
  BrandCardHeader,
  BrandCardTitle,
  BrandCardDescription,
  BrandCardContent,
  BrandCardFooter,
  variantStyles,
};
export type { Variant as BrandCardVariant };

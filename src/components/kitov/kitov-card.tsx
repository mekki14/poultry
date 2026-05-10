import { cn } from "@/lib/utils";

type Variant = "default" | "yellow" | "dark" | "shell";

const variantStyles: Record<Variant, string> = {
  default: "bg-card text-card-foreground border",
  yellow: "bg-kitov-yellow text-kitov-dark border-kitov-yellow",
  dark: "bg-kitov-dark text-white border-kitov-dark",
  shell: "bg-kitov-shell text-kitov-dark border-kitov-shell",
};

function KitovCard({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & { variant?: Variant }) {
  return (
    <div
      data-slot="kitov-card"
      className={cn(
        "rounded-carton shadow-kitov transition-all duration-300",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

function KitovCardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kitov-card-header"
      className={cn("flex flex-col gap-2 p-6", className)}
      {...props}
    />
  );
}

function KitovCardTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="kitov-card-title"
      className={cn(
        "font-heading text-xl font-bold leading-tight tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function KitovCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="kitov-card-description"
      className={cn(
        "text-sm leading-relaxed opacity-80",
        className,
      )}
      {...props}
    />
  );
}

function KitovCardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kitov-card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function KitovCardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kitov-card-footer"
      className={cn("flex items-center p-6 pt-0 gap-3", className)}
      {...props}
    />
  );
}

export {
  KitovCard,
  KitovCardHeader,
  KitovCardTitle,
  KitovCardDescription,
  KitovCardContent,
  KitovCardFooter,
  variantStyles,
};
export type { Variant as KitovCardVariant };

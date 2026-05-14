import { cn } from "@/lib/utils";

type SectionVariant = "default" | "yellow" | "dark" | "shell";

const sectionVariants: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  yellow: "bg-brand-yellow text-brand-dark",
  dark: "bg-brand-dark text-white",
  shell: "bg-brand-shell text-brand-dark",
};

function BrandSection({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"section"> & { variant?: SectionVariant }) {
  return (
    <section
      data-slot="brand-section"
      className={cn("w-full py-16 md:py-24", sectionVariants[variant], className)}
      {...props}
    />
  );
}

function BrandSectionHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="brand-section-heading"
      className={cn(
        "font-heading text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

function BrandSectionSubheading({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="brand-section-subheading"
      className={cn(
        "mt-3 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export { BrandSection, BrandSectionHeading, BrandSectionSubheading };
export type { SectionVariant as BrandSectionVariant };

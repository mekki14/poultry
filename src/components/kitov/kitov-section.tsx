import { cn } from "@/lib/utils";

type SectionVariant = "default" | "yellow" | "dark" | "shell";

const sectionVariants: Record<SectionVariant, string> = {
  default: "bg-background text-foreground",
  yellow: "bg-kitov-yellow text-kitov-dark",
  dark: "bg-kitov-dark text-white",
  shell: "bg-kitov-shell text-kitov-dark",
};

function KitovSection({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"section"> & { variant?: SectionVariant }) {
  return (
    <section
      data-slot="kitov-section"
      className={cn("w-full py-16 md:py-24", sectionVariants[variant], className)}
      {...props}
    />
  );
}

function KitovSectionHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="kitov-section-heading"
      className={cn(
        "font-heading text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
}

function KitovSectionSubheading({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="kitov-section-subheading"
      className={cn(
        "mt-3 max-w-2xl text-base leading-relaxed opacity-80 md:text-lg",
        className,
      )}
      {...props}
    />
  );
}

export { KitovSection, KitovSectionHeading, KitovSectionSubheading };
export type { SectionVariant as KitovSectionVariant };

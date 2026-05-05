import * as React from "react";

export function Section({
  className = "",
  children,
  variant = "default",
  id,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: "default" | "soft" | "deep" | "gradient";
  id?: string;
}) {
  const bg =
    variant === "soft"
      ? "bg-brand-soft-gradient"
      : variant === "deep"
        ? "bg-brand-deep text-white"
        : variant === "gradient"
          ? "bg-brand-gradient text-white"
          : "bg-background";
  return (
    <section id={id} className={`py-16 md:py-24 ${bg} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && (
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${light ? "bg-white/10 text-white border border-white/20" : "bg-brand-soft text-brand-royal border border-brand-royal/20"}`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`mt-4 text-3xl md:text-5xl font-extrabold ${light ? "text-white" : "text-brand-deep"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/80" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

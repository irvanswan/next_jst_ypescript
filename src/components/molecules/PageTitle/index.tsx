import type { LucideIcon } from "lucide-react";

type PageTitleProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function PageTitle({ icon: Icon, title, description }: PageTitleProps) {
  return (
    <section className="flex items-start gap-5">
      <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="size-7" />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-card-foreground">{title}</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">{description}</p>
      </div>
    </section>
  );
}

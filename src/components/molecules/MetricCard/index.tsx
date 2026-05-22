import type { LucideIcon } from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card } from "@/components/atoms/ui/Card";
import type { Metric } from "@/lib/data";
import { cn } from "@/lib/utils";
import { getMetricValueClass, metricToneClass } from "./MetricCard.utils";

type MetricCardProps = Metric & {
  icon: LucideIcon;
  size?: "default" | "large";
};

export function MetricCard({ label, value, note, tone, trend, icon: Icon, size = "default" }: MetricCardProps) {
  return (
    <Card className="panel-card p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className={cn("mt-3 font-extrabold leading-none tracking-tight text-card-foreground", getMetricValueClass(size))}>
            {value}
          </p>
          <p className="mt-3 flex items-center gap-1 text-sm font-semibold text-muted-foreground">
            {trend === "up" ? <ArrowUp className="size-4 text-emerald-600" /> : null}
            {trend === "down" ? <ArrowDown className="size-4 text-rose-600" /> : null}
            {note}
          </p>
        </div>
        <div className={cn("grid size-12 shrink-0 place-items-center rounded-xl", metricToneClass[tone])}>
          <Icon className="size-5" />
        </div>
      </div>
    </Card>
  );
}

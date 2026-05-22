import type { Metric } from "@/lib/data";

export const metricToneClass: Record<Metric["tone"], string> = {
  brand: "bg-brand-50 text-brand-600",
  emerald: "bg-emerald-50 text-emerald-600",
  violet: "bg-violet-50 text-violet-600",
  orange: "bg-orange-50 text-orange-600"
};

export function getMetricValueClass(size: "default" | "large") {
  return size === "large" ? "text-[44px]" : "text-4xl";
}

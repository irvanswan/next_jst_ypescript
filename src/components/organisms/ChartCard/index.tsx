"use client";

import type ApexCharts from "apexcharts";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Card } from "@/components/atoms/ui/Card";
import { cn } from "@/lib/utils";
import { createChartOptions, getChartIconClass, loadApexCharts } from "./ChartCard.utils";

type ChartCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "brand" | "emerald";
  data: number[];
  labels: string[];
};

export function ChartCard({ title, description, icon: Icon, tone, data, labels }: ChartCardProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = chartRef.current;

    if (!target) {
      return;
    }

    let disposed = false;
    let chart: ApexCharts | null = null;

    loadApexCharts().then((ApexCharts) => {
      if (disposed || !target.isConnected) {
        return;
      }

      chart = new ApexCharts(target, {
        ...createChartOptions(labels, tone),
        series: [{ name: title, data }]
      });
      void chart.render();
    });

    return () => {
      disposed = true;
      chart?.destroy();
      chart = null;
    };
  }, [data, labels, title, tone]);

  return (
    <Card className="panel-card p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn("grid size-8 place-items-center rounded-lg", getChartIconClass(tone))}>
            <Icon className="size-4" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-card-foreground sm:text-3xl">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex rounded-xl bg-secondary p-1 text-xs font-semibold">
          {["Weekly", "Monthly", "Yearly"].map((period, index) => (
            <button key={period} type="button" className={cn("rounded-lg px-3 py-1.5", index === 0 ? "bg-card text-card-foreground" : "text-muted-foreground")}>
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="h-72 rounded-xl border bg-[linear-gradient(to_bottom,transparent_24%,rgba(148,163,184,0.22)_25%,transparent_26%,transparent_49%,rgba(148,163,184,0.22)_50%,transparent_51%,transparent_74%,rgba(148,163,184,0.22)_75%,transparent_76%)] p-4">
        <div ref={chartRef} className="h-full w-full" />
      </div>
    </Card>
  );
}

import type { ApexOptions } from "apexcharts";

export function createChartOptions(labels: string[], tone: "brand" | "emerald"): ApexOptions {
  return {
    chart: {
      height: "100%",
      type: "area",
      toolbar: { show: false },
      sparkline: { enabled: false },
      animations: { enabled: true },
      fontFamily: "var(--font-plus-jakarta)"
    },
    colors: [tone === "brand" ? "#2f66e8" : "#10b981"],
    dataLabels: { enabled: false },
    grid: { show: false },
    stroke: { curve: "smooth", width: 4 },
    xaxis: { categories: labels, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { show: false },
    tooltip: { theme: "light" }
  };
}

export async function loadApexCharts() {
  const apexCharts = await import("apexcharts");
  return apexCharts.default;
}

export function getChartIconClass(tone: "brand" | "emerald") {
  return tone === "brand" ? "bg-brand-50 text-brand-600" : "bg-emerald-50 text-emerald-600";
}

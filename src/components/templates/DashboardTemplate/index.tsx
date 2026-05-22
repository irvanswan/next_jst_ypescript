"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, Download, FileText, Filter, Grid2X2, Upload } from "lucide-react";
import { Badge } from "@/components/atoms/ui/Badge";
import { Button } from "@/components/atoms/ui/Button";
import { TableCell, TableRow } from "@/components/atoms/ui/Table";
import { DataTable } from "@/components/molecules/DataTable";
import { MetricCard } from "@/components/molecules/MetricCard";
import { PageTitle } from "@/components/molecules/PageTitle";
import { AppShell } from "@/components/organisms/AppShell";
import { ChartCard } from "@/components/organisms/ChartCard";
import { getDashboardData, type Movement } from "@/lib/data";
import { queryKeys } from "@/lib/query-keys";

type DashboardData = Awaited<ReturnType<typeof getDashboardData>>;

function MovementRows({ rows }: { rows: Movement[] }) {
  return rows.map((row) => (
    <TableRow key={`${row.id}-${row.product}`}>
      <TableCell>{row.id}</TableCell>
      <TableCell className="font-medium text-card-foreground">{row.product}</TableCell>
      <TableCell>
        <Badge variant={row.category === "Parts" ? "success" : row.category === "Equipment" ? "warning" : "default"}>{row.category}</Badge>
      </TableCell>
      <TableCell>{row.quantity}</TableCell>
      <TableCell className="text-muted-foreground">{row.time}</TableCell>
    </TableRow>
  ));
}

export function DashboardTemplate({ initialData }: { initialData: DashboardData }) {
  const { data } = useQuery({ queryKey: queryKeys.dashboard, queryFn: getDashboardData, initialData });

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle icon={Grid2X2} title="Dashboard Overview" description="Track inventory performance, stock movement, and today's product activity." />
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
          <Button variant="outline">
            <Filter className="size-4" />
            Filter
          </Button>
          <Button variant="outline">
            <CalendarDays className="size-4" />
            May 25, 2025
          </Button>
        </div>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <MetricCard {...data.metrics[0]} icon={Download} size="large" />
        <MetricCard {...data.metrics[1]} icon={Upload} size="large" />
        <MetricCard {...data.metrics[2]} icon={FileText} size="large" />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <ChartCard title="Product Ready" description="Overview of product input over time." icon={Download} tone="brand" data={data.charts.ready} labels={data.charts.labels} />
        <ChartCard title="Product Outstock" description="Overview of product output over time." icon={Upload} tone="emerald" data={data.charts.outstock} labels={data.charts.labels} />
      </section>

      <section className="flex flex-col gap-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 p-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-card-foreground sm:text-4xl">Today&apos;s Product Movement</h2>
            <p className="mt-2 text-sm text-muted-foreground">Real-time summary of product input and output for today.</p>
          </div>
          <Button variant="outline">
            See More
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="grid gap-4 xl:grid-cols-2">
          <DataTable title="Product Ready Stock Today" description="Total product input: 320 items" columns={["#", "Product Name", "Category", "Quantity", "Time"]}>
            <MovementRows rows={data.inbound} />
          </DataTable>
          <DataTable title="Product Outstock Today" description="Total product output: 280 items" columns={["#", "Product Name", "Category", "Quantity", "Time"]}>
            <MovementRows rows={data.outbound} />
          </DataTable>
        </div>
      </section>
    </AppShell>
  );
}

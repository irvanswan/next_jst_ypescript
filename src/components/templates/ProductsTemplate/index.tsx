"use client";

import { useQuery } from "@tanstack/react-query";
import { CalendarCheck, CalendarDays, Laptop, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/atoms/ui/Badge";
import { Button } from "@/components/atoms/ui/Button";
import { TableCell, TableRow } from "@/components/atoms/ui/Table";
import { DataTable } from "@/components/molecules/DataTable";
import { MetricCard } from "@/components/molecules/MetricCard";
import { PageTitle } from "@/components/molecules/PageTitle";
import { AppShell } from "@/components/organisms/AppShell";
import { getProductsData } from "@/lib/data";
import { queryKeys } from "@/lib/query-keys";

type ProductsData = Awaited<ReturnType<typeof getProductsData>>;

export function ProductsTemplate({ initialData }: { initialData: ProductsData }) {
  const { data } = useQuery({ queryKey: queryKeys.products, queryFn: getProductsData, initialData });

  return (
    <AppShell>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageTitle icon={Plus} title="Incoming Inventory List" description="Manage and track your incoming inventory shipments." />
        <Button size="lg">
          <Plus className="size-5" />
          Add Incoming Item
        </Button>
      </div>

      <section className="grid gap-5 xl:grid-cols-2">
        <MetricCard {...data.metrics[0]} icon={CalendarDays} />
        <MetricCard {...data.metrics[1]} icon={CalendarCheck} />
      </section>

      <DataTable
        title="Recent Shipments"
        minWidth="min-w-[1180px]"
        columns={["Equipment Code", "Product Name", "Brand", "Product Type", "Origin Country", "Entry Date", "Quantity", "Status", "Actions"]}
        actions={
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Today</Button>
            <Button variant="outline" size="sm">Last 7 Days</Button>
          </div>
        }
      >
        {data.products.map((product) => (
          <TableRow key={product.code}>
            <TableCell className="font-extrabold">{product.code}</TableCell>
            <TableCell>
              <div className="flex items-center gap-4">
                <div className="grid size-11 place-items-center rounded-lg bg-secondary text-muted-foreground">
                  <Laptop className="size-5" />
                </div>
                <div>
                  <p className="font-extrabold text-card-foreground">{product.name}</p>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">{product.type}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-semibold text-muted-foreground">{product.brand}</TableCell>
            <TableCell className="font-bold">{product.type}</TableCell>
            <TableCell className="font-bold">{product.country}</TableCell>
            <TableCell className="font-semibold">{product.date}</TableCell>
            <TableCell className="font-extrabold">{product.quantity}</TableCell>
            <TableCell>
              <Badge variant={product.status === "In Stock" ? "success" : product.status === "Low Stock" ? "warning" : "danger"}>{product.status}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-3">
                <Button variant="outline" size="icon" aria-label={`Edit ${product.code}`}>
                  <Pencil className="size-4" />
                </Button>
                <Button variant="destructive" size="icon" aria-label={`Delete ${product.code}`}>
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </AppShell>
  );
}

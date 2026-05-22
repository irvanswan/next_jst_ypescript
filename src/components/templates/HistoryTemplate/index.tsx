"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock3, Download, Filter } from "lucide-react";
import { Badge } from "@/components/atoms/ui/Badge";
import { Button } from "@/components/atoms/ui/Button";
import { TableCell, TableRow } from "@/components/atoms/ui/Table";
import { DataTable } from "@/components/molecules/DataTable";
import { PageTitle } from "@/components/molecules/PageTitle";
import { AppShell } from "@/components/organisms/AppShell";
import { getHistoryData } from "@/lib/data";
import { queryKeys } from "@/lib/query-keys";

type HistoryData = Awaited<ReturnType<typeof getHistoryData>>;

export function HistoryTemplate({ initialData }: { initialData: HistoryData }) {
  const { data } = useQuery({ queryKey: queryKeys.history, queryFn: getHistoryData, initialData });

  return (
    <AppShell searchPlaceholder="Search history or actors...">
      <PageTitle icon={Clock3} title="Management History" description="Review the complete audit trail of product inventory movements and administrative activities." />
      <DataTable
        title="Inbound and Outbound Data"
        description="Product movement records"
        minWidth="min-w-[940px]"
        columns={["Menu", "Actions", "Actors", "Description"]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="size-4" />
              Export CSV
            </Button>
          </div>
        }
      >
        {data.rows.map((row) => (
          <TableRow key={`${row.menu}-${row.action}-${row.description}`}>
            <TableCell className="font-extrabold">{row.menu}</TableCell>
            <TableCell>
              <Badge
                variant={
                  row.action === "CREATE" ? "success" : row.action === "DELETE" ? "danger" : row.action === "REVERT" ? "warning" : row.action === "UPDATE" ? "info" : "default"
                }
              >
                {row.action}
              </Badge>
            </TableCell>
            <TableCell className="font-bold">{row.actor}</TableCell>
            <TableCell className="font-medium text-muted-foreground">{row.description}</TableCell>
          </TableRow>
        ))}
      </DataTable>
    </AppShell>
  );
}

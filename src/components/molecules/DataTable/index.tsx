import { ReactNode } from "react";
import { Card } from "@/components/atoms/ui/Card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/atoms/ui/Table";

type DataTableProps = {
  title?: string;
  description?: string;
  actions?: ReactNode;
  minWidth?: string;
  columns: string[];
  children: ReactNode;
};

export function DataTable({ title, description, actions, minWidth = "min-w-[760px]", columns, children }: DataTableProps) {
  return (
    <Card className="overflow-hidden">
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            {title ? <h2 className="text-base font-extrabold text-card-foreground">{title}</h2> : null}
            {description ? <p className="mt-1 text-sm font-medium text-muted-foreground">{description}</p> : null}
          </div>
          {actions}
        </div>
      )}
      <div className="overflow-x-auto">
        <Table className={minWidth}>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{children}</TableBody>
        </Table>
      </div>
    </Card>
  );
}

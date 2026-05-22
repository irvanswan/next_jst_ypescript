"use client";

import { useQuery } from "@tanstack/react-query";
import { Activity, Filter, Pencil, PersonStanding, ShieldCheck, UserPlus, Users } from "lucide-react";
import { Badge } from "@/components/atoms/ui/Badge";
import { Button } from "@/components/atoms/ui/Button";
import { TableCell, TableRow } from "@/components/atoms/ui/Table";
import { DataTable } from "@/components/molecules/DataTable";
import { MetricCard } from "@/components/molecules/MetricCard";
import { PageTitle } from "@/components/molecules/PageTitle";
import { AppShell } from "@/components/organisms/AppShell";
import { getUsersData } from "@/lib/data";
import { queryKeys } from "@/lib/query-keys";

type UsersData = Awaited<ReturnType<typeof getUsersData>>;

export function UsersTemplate({ initialData }: { initialData: UsersData }) {
  const { data } = useQuery({ queryKey: queryKeys.users, queryFn: getUsersData, initialData });
  const icons = [Users, Activity, PersonStanding, ShieldCheck];

  return (
    <AppShell searchPlaceholder="Search users or roles...">
      <PageTitle icon={Users} title="User Management" description="Administer user access and monitor account status." />
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {data.metrics.map((metric, index) => (
          <MetricCard key={metric.label} {...metric} icon={icons[index]} />
        ))}
      </section>
      <DataTable
        title="Users"
        description="Manage system users and their permissions."
        minWidth="min-w-[940px]"
        columns={["ID", "Name", "Email", "Role", "Status", "Actions"]}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="size-4" />
              Filter
            </Button>
            <Button size="sm">
              <UserPlus className="size-4" />
              Add User
            </Button>
          </div>
        }
      >
        {data.users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-extrabold text-muted-foreground">#{user.id}</TableCell>
            <TableCell className="font-extrabold text-card-foreground">{user.name}</TableCell>
            <TableCell className="font-medium text-muted-foreground">{user.email}</TableCell>
            <TableCell>
              <Badge variant="slate">{user.role}</Badge>
            </TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "success" : user.status === "Pending" ? "warning" : "danger"}>{user.status}</Badge>
            </TableCell>
            <TableCell>
              <Button variant="outline" size="icon" aria-label={`Edit ${user.name}`}>
                <Pencil className="size-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>
    </AppShell>
  );
}

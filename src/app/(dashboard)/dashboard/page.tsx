import { DashboardTemplate } from "@/components/templates/DashboardTemplate";
import { getDashboardData } from "@/lib/data";

export const dynamic = "force-static";

export default async function DashboardPage() {
  const data = await getDashboardData();
  return <DashboardTemplate initialData={data} />;
}

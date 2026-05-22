import { HistoryTemplate } from "@/components/templates/HistoryTemplate";
import { getHistoryData } from "@/lib/data";

export const dynamic = "force-static";

export default async function HistoryPage() {
  const data = await getHistoryData();
  return <HistoryTemplate initialData={data} />;
}

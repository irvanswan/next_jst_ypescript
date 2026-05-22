import { UsersTemplate } from "@/components/templates/UsersTemplate";
import { getUsersData } from "@/lib/data";

export const dynamic = "force-static";

export default async function UsersPage() {
  const data = await getUsersData();
  return <UsersTemplate initialData={data} />;
}

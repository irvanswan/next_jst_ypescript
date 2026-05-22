import { ProductsTemplate } from "@/components/templates/ProductsTemplate";
import { getProductsData } from "@/lib/data";

export const dynamic = "force-static";

export default async function ProductsPage() {
  const data = await getProductsData();
  return <ProductsTemplate initialData={data} />;
}

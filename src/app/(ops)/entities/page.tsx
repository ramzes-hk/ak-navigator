import Menu from "@/components/menu";
import { getEntitiesMenuData } from "@/lib/db_queries";

export default async function Home() {
  const operators = await getEntitiesMenuData();
  return <Menu route="entities" ids={operators} />;
}

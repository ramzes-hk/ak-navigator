import Menu from "@/components/menu";
import { getMenuData } from "@/lib/db_queries";

export default async function Home() {
  const operators = await getMenuData();
  return <Menu route="operators" ids={operators} />;
}

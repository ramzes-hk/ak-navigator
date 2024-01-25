import Menu from "@/components/menu";
import { getMenuData } from "@/lib/operators";

export default async function Home() {
  const operators = await getMenuData();
  return <Menu route="operators" ids={operators} />;
}

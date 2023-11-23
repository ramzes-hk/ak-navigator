import Menu from "@/components/menu";
import { getMenuData } from "@/lib/operators";

export default async function Home() {
  const operators = await getMenuData();
  return (
    <div>
      <Menu ids={operators} />
    </div>
  );
}

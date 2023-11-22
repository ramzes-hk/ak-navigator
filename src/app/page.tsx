import Menu from "@/components/menu";
import { getMenuData } from "@/lib/operators";

export default async function Home() {
  const operators = await getMenuData();
  return (
    <div className="pt-10">
      <Menu ids={operators} />
    </div>
  );
}

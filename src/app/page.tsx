import Menu from "@/components/menu";
import { getAllOpNames } from "@/lib/operators";

export default function Home() {
  const operators = getAllOpNames();
  return (
    <div>
      <Menu ids={operators}/>
    </div>
  );
}

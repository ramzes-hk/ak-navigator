import EnemyDisplay from "@/components/enemies_display";
import { getAllHandbookEnemies } from "@/lib/enemy_handbook_table";

export default function Page() {
  const enemies = getAllHandbookEnemies();
  return <EnemyDisplay enemies={enemies}/>;
}

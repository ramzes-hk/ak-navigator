import EnemiesMenu from "@/components/enemies_menu";
import { getMenuEnemies } from "@/lib/enemies";

export default async function Home() {
  const enemies = getMenuEnemies();
  return <EnemiesMenu route="enemies" ids={enemies.ids} />;
}

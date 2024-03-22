import { HandbookEnemy, getAllHandbookEnemies } from "@/lib/enemy_handbook_table";
import { Button } from "./button";

interface enemyListProps {
  enemies: Record<string, HandbookEnemy>
}

function EnemyList({ enemies }: enemyListProps) {
  return (
    <div className="flex flex-col items-start">
      {Object.keys(enemies).map((id) => (
        <Button variant="link" key={id}>
          {enemies[id].name}
        </Button>
      ))}
    </div>
  );
}

export default EnemyList;

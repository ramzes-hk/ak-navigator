import { getEnemy } from "@/lib/enemies";
import { EnemyTags } from "./tags";
import { EnemyTraits } from "./traits";
import EnemyTable from "./enemy_table";
import EnemyStats from "./enemy_stats";

interface enemyProps {
  id: string;
}

function Enemy({ id }: enemyProps) {
  const { handbook, enemy } = getEnemy(id);
  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <div className="flex flex-row space-x-4 pt-4">
        <h1 className="text-2xl">
          {handbook.name} {handbook.enemyIndex}
        </h1>
      </div>
      <h2 className="text-xl">Description</h2>
      <p>{handbook.description}</p>
      <EnemyTags tags={enemy.Value[0].enemyData.enemyTags.m_value} />
      {handbook.abilityList.length > 0 && (
        <div>
          <h2 className="text-xl">Traits</h2>
          <EnemyTraits traits={handbook.abilityList} />
        </div>
      )}
      <EnemyTable enemy={enemy} hb={handbook} />
      <EnemyStats enemy={enemy} />
    </div>
  );
}

export default Enemy;

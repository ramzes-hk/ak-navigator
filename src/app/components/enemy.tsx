import { getEnemy } from "@/lib/enemies";
import { EnemyTags } from "./tags";
import { EnemyTraits } from "./traits";
import EnemyTable from "./enemy_table";
import EnemyStats from "./enemy_stats";
import Image from "next/image";

interface enemyProps {
  id: string;
}

function Enemy({ id }: enemyProps) {
  const { handbook, enemy } = getEnemy(id);
  if (!handbook) {
    return <p>No Enemy</p>;
  }
  if (!enemy) {
    return <p>No Enemy</p>;
  }
  const val = enemy.Value;
  if (!val) {
    throw "Enemy has no Value";
  }
  const firstVal = val[0];
  if (!firstVal) {
    throw "Enemy has no first Value";
  }
  const enemyData = firstVal.enemyData;
  if (!enemyData) {
    throw "First value has no enemyData";
  }
  const enemyTags = enemyData.enemyTags;
  if (!enemyTags) {
    throw "Enemy Data has no enemyTags";
  }
  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <div className="flex flex-row space-x-4 pt-4">
        <h1 className="text-2xl pt-4">
          {handbook.name} {handbook.enemyIndex}
        </h1>
      </div>
      <Image
        width={200}
        height={200}
        alt={handbook.name}
        src={`https://raw.githubusercontent.com/Aceship/Arknight-Images/main/enemy/${encodeURIComponent(
          id,
        )}.png`}
      />
      <h2 className="text-xl">Description</h2>
      <p>{handbook.description}</p>
      <EnemyTags tags={enemyTags.m_value} />
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

import { ActivityFile } from "@/lib/activity_types";
import { getEnemy } from "@/lib/enemies";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import Link from "next/link";
import { buttonVariants } from "./button";

interface StageEnemiesProps {
  activity: ActivityFile;
}
const attributes = [
  "maxHp",
  "atk",
  "def",
  "magicResistance",
  "massLevel",
  "baseAttackTime",
];

function StageEnemies({ activity }: StageEnemiesProps) {
  const enemyCounter: Record<string, number> = {};
  activity.enemyDbRefs.forEach((dbRef) => (enemyCounter[dbRef.id] = 0));
  activity.waves.forEach((wave) =>
    wave.fragments.forEach((fragment) =>
      fragment.actions.forEach((action) => {
        if (action.actionType !== "SPAWN") {
          return;
        }
        enemyCounter[action.key]!++;
      }),
    ),
  );
  return (
    <Table className="w-full sm:w-3/4">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Count</TableHead>
          <TableHead>HP</TableHead>
          <TableHead>ATK</TableHead>
          <TableHead>DEF</TableHead>
          <TableHead>RES</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>ASPD</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activity.enemyDbRefs
          .map((enemy) => {
            const res = getEnemy(enemy.id);
            if (!res) {
              return;
            }
            return { ...res, ...enemy };
          })
          .filter((enemy) => enemy?.handbook)
          .map((dbEnemy) => {
            let value = dbEnemy?.enemy?.Value[dbEnemy.level]?.enemyData;
            const firstLvl = dbEnemy?.enemy?.Value[0]?.enemyData;
            if (!firstLvl) return;
            if (!dbEnemy.useDb && dbEnemy.overwrittenData) {
              value = dbEnemy.overwrittenData;
            }
            if (!value) return;
            return (
              <TableRow key={dbEnemy.id}>
                <TableCell>
                  <Link
                    href={`/enemies/${dbEnemy.id}`}
                    prefetch={false}
                    className={buttonVariants({ variant: "link", size: "sm" })}
                  >
                    {value.name.m_defined
                      ? value.name.m_value
                      : firstLvl.name.m_value}
                  </Link>
                </TableCell>
                <TableCell>{enemyCounter[dbEnemy.id]}x</TableCell>
                {attributes.map((key) => {
                  const attr = key as keyof (typeof value)["attributes"];
                  return (
                    <TableCell key={key}>
                      {value.attributes[attr].m_defined
                        ? value.attributes[attr].m_value
                        : firstLvl.attributes[attr].m_value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default StageEnemies;

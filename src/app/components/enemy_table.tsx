import { Enemy, Race, raceData } from "@/lib/enemy_database_types";
import { HandbookEnemy } from "@/lib/enemy_handbook_table";
import {
  damageTypes,
  motionTypes,
  applyWayTypes,
} from "@/lib/enemy_database_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";
import { levelInfoList } from "@/lib/levelInfoList";

interface enemyTableProps {
  enemy: Enemy;
  hb: HandbookEnemy;
}

function EnemyTable({ enemy, hb }: enemyTableProps) {
  const enemyValue = enemy.Value;
  if (!enemyValue) {
    throw "Enemy has no Value";
  }
  const firstValue = enemyValue[0];
  if (!firstValue) {
    throw "Enemy has no first Value";
  }
  const enemyData = firstValue.enemyData;
  if (!enemyData) {
    throw "First Value has not enemyData";
  }
  const levels = findLevel(enemyData.attributes);
  const firstRow = levels.slice(0, 4);
  const secondRow = levels.slice(4);
  return (
    <Table className="w-full sm:w-3/4">
      <TableBody>
        <TableRow>
          <TableHead>Tags</TableHead>
          <TableHead>Motion Type</TableHead>
          <TableHead>Attack Pattern</TableHead>
          <TableHead>Damage Type</TableHead>
        </TableRow>
        <TableRow className="border-b-4">
          <TableCell>
            {(enemyData.enemyTags.m_value ?? []).map(
              (tag) => raceData[tag as Race].raceName,
            )}
          </TableCell>
          <TableCell>{motionTypes[enemyData.motion.m_value]}</TableCell>
          <TableCell>{applyWayTypes[enemyData.applyWay.m_value]}</TableCell>
          <TableCell>
            {hb.damageType.map((val) => damageTypes[val]).join(", ")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>ATK</TableHead>
          <TableHead>DEF</TableHead>
          <TableHead>RES</TableHead>
          <TableHead>HP</TableHead>
        </TableRow>
        <TableRow className="border-b-4">
          {firstRow.map((attr, i) => (
            <TableCell key={i}>{attr}</TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableHead>Movement Speed</TableHead>
          <TableHead>ASPD</TableHead>
          <TableHead>Elemental Damage RES</TableHead>
          <TableHead>Elemental RES</TableHead>
        </TableRow>
        <TableRow>
          {secondRow.map((attr, i) => (
            <TableCell key={i}>{attr}</TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

type nonBoolAttrs = Exclude<
  keyof Enemy["Value"][number]["enemyData"]["attributes"],
  | "stunImmune"
  | "silenceImmune"
  | "sleepImmune"
  | "frozenImmune"
  | "levitateImmune"
>;

const attrToHandbook: Record<
  Exclude<keyof (typeof levelInfoList)[number], "classLevel">,
  nonBoolAttrs
> = {
  attack: "atk",
  def: "def",
  magicRes: "magicResistance",
  maxHP: "maxHp",
  moveSpeed: "moveSpeed",
  attackSpeed: "baseAttackTime",
  enemyDamageRes: "epDamageResistance",
  enemyRes: "epResistance",
};

function findLevel(
  attr: Omit<
    Enemy["Value"][number]["enemyData"]["attributes"],
    | "stunImmune"
    | "silenceImmune"
    | "sleepImmune"
    | "frozenImmune"
    | "levitateImmune"
  >,
): string[] {
  return Object.keys(attrToHandbook).map((key) => {
    let idx = 0;
    if (key === "attackSpeed") {
      idx = levelInfoList.findIndex(
        (lvl) =>
          lvl[key as keyof typeof attrToHandbook].max >
          attr[
            attrToHandbook[
              key as keyof typeof attrToHandbook
            ] as keyof typeof attr
          ].m_value,
      );
    } else {
      idx = levelInfoList.findIndex(
        (lvl) =>
          lvl[key as keyof typeof attrToHandbook].min <=
          attr[
            attrToHandbook[
              key as keyof typeof attrToHandbook
            ] as keyof typeof attr
          ].m_value,
      );
    }
    const currentLevelInfoList = levelInfoList[idx];
    const lastLevelInfoList = levelInfoList.at(-1);
    if (currentLevelInfoList) {
      return currentLevelInfoList.classLevel;
    } 
    if (!lastLevelInfoList) {
      throw "No LevelInfoList"
    }
    return lastLevelInfoList?.classLevel;
  });
}

export default EnemyTable;

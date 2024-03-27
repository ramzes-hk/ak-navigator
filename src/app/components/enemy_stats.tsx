import { Enemy } from "@/lib/enemy_database_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";

interface enemyStatsTableProps {
  enemyData: Enemy["Value"][number]["enemyData"];
}

interface enemyStatsProps {
  enemy: Enemy;
}

const statusEffects = ["Stun", "Silence", "Sleep", "Frozen", "Levitate"];

function EnemyStatsTable({ enemyData }: enemyStatsTableProps) {
  const attr = enemyData.attributes;
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableHead>HP</TableHead>
          <TableHead>ATK</TableHead>
          <TableHead>DEF</TableHead>
          <TableHead>RES</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>{attr.maxHp.m_value}</TableCell>
          <TableCell>{attr.atk.m_value}</TableCell>
          <TableCell>{attr.def.m_value}</TableCell>
          <TableCell>{attr.magicResistance.m_value}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Movement Speed</TableHead>
          <TableHead>Attack Time</TableHead>
          <TableHead>Elemenetal Damage RES</TableHead>
          <TableHead>Elemental RES</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>{attr.moveSpeed.m_value}</TableCell>
          <TableCell>{attr.baseAttackTime.m_value}</TableCell>
          <TableCell>{attr.epDamageResistance.m_value}</TableCell>
          <TableCell>{attr.epResistance.m_value}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Life Points</TableHead>
          <TableHead>Range</TableHead>
          <TableHead>HP Recovery/s</TableHead>
          <TableHead>Mass</TableHead>
        </TableRow>
        <TableRow>
          <TableCell>{enemyData.lifePointReduce.m_value}</TableCell>
          <TableCell>{enemyData.rangeRadius.m_value}</TableCell>
          <TableCell>{attr.hpRecoveryPerSec.m_value}</TableCell>
          <TableCell>{attr.massLevel.m_value}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead colSpan={4} className="text-center">
            Immunity
          </TableHead>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            {[
              attr.stunImmune.m_value,
              attr.silenceImmune.m_value,
              attr.sleepImmune.m_value,
              attr.frozenImmune.m_value,
              attr.levitateImmune.m_value,
            ]
              .map((val, i) => (val ? statusEffects[i] : ""))
              .join(" ")}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function EnemyStats({ enemy }: enemyStatsProps) {
  return (
    <div className="w-full sm:w-3/4">
      {enemy.Value.map((val, i) => (
        <div key={i}>
          <h2>Level {i}</h2>
          <EnemyStatsTable enemyData={val.enemyData} />
        </div>
      ))}
    </div>
  );
}

export default EnemyStats;

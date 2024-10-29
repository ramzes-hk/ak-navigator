import { getItemBatch } from "@/lib/item_table";
import { Operator } from "@/lib/operators_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { evolveGoldCost } from "@/lib/gameconst";

interface materialsProps {
  operator: Operator;
}

async function Materials({ operator }: materialsProps) {
  const rarity = parseInt(operator.rarity.replace(/TIER_/, ""));
  return (
    <div className="w-full md:w-1/2 py-4 flex flex-col space-y-4">
      {rarity > 2 && <PromotionMaterial operator={operator} />}
      {rarity > 2 && <SkillMaterials operator={operator} />}
      {rarity > 3 && <MasteryMaterials operator={operator} />}
    </div>
  );
}

async function PromotionMaterial({ operator }: materialsProps) {
  if (operator.phases.every((phase) => !phase.evolveCost)) return null;
  const promotionCost = await Promise.all(
    operator.phases.map((phase) => getItemBatch(phase.evolveCost || [])),
  );
  return (
    <div>
      <h2 className="text-xl">Promotion Materials</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>E</TableHead>
            <TableHead>Mats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {promotionCost.slice(1).map((prom, i) => (
            <TableRow key={i}>
              <TableHead>E{i + 1}</TableHead>
              <TableCell>
                {prom.map((cost, j) => {
                  const phase = operator.phases[i + 1];
                  if (!phase) {
                    throw "Operator has no Phase";
                  }
                  return `${cost.name}x${phase.evolveCost?.at(j)?.count}, `;
                })}
                LMDx
                {evolveGoldCost[
                  parseInt(operator.rarity.replace(/TIER_/, "")) - 1
                ]?.at(i)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

async function SkillMaterials({ operator }: materialsProps) {
  if (operator.allSkillLvlup.every((lvl) => !lvl.lvlUpCost)) return null;
  if (operator.allSkillLvlup.length === 0) return null;
  const skillMats = await Promise.all(
    operator.allSkillLvlup.map((lvl) => getItemBatch(lvl.lvlUpCost ?? [])),
  );
  return (
    <div>
      <h2 className="text-xl">Common Skill Materials</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Lvl</TableHead>
            <TableHead>Mats</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {skillMats.map((lvl, i) => (
            <TableRow key={`lvl-${i}`}>
              <TableCell>{i + 2}</TableCell>
              <TableCell>
                {lvl
                  .map(
                    (cost, j) =>
                      `${cost.name}x${operator.allSkillLvlup[i]?.lvlUpCost?.at(
                        j,
                      )?.count}, `,
                  )
                  .join("")
                  .slice(0, -2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

async function MasteryMaterials({ operator }: materialsProps) {
  const masteryMats = await getMasteryMats(operator);
  if (!masteryMats) return null;
  return (
    <div>
      <h2 className="text-xl">Mastery Materials</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Skill</TableHead>
            <TableHead className="text-center">M1</TableHead>
            <TableHead className="text-center">M2</TableHead>
            <TableHead className="text-center">M3</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {masteryMats.map((lvl, i) => (
            <TableRow key={`skill-${i}`}>
              <TableCell>{i + 1}</TableCell>
              {lvl.map((mastery, j) => (
                <TableCell key={`m-${i}-${j}`}>
                  {mastery.map((mats, k) => (
                    <span key={`mat-${k}`}>
                      {mats.name}x
                      {
                        operator.skills[i]?.levelUpCostCond[j]?.levelUpCost?.at(
                          k,
                        )?.count
                      }
                      <br />
                    </span>
                  ))}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

async function getMasteryMats(operator: Operator) {
  try {
    const mats = [];
    for (const skill of operator.skills) {
      const skillMats = [];
      for (const level of skill.levelUpCostCond) {
        if (!level.levelUpCost) continue;
        const batch = await getItemBatch(level.levelUpCost);
        skillMats.push(batch);
      }
      mats.push(skillMats);
    }
    return mats;
  } catch (error) {
    console.log("caramba!", error);
  }
}

export default Materials;

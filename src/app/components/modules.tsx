import { Module } from "@/lib/modules_data";
import { Phase } from "@/lib/modules_data";
import { parseDescription } from "@/lib/operators";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { getItemBatch } from "@/lib/item_table";

type modulesProps = Module;

const blackBoardMapping: Record<string, string> = {
  atk: "ATK",
  attack_speed: "ASPD",
  max_hp: "MaxHP",
  def: "DEF",
  magic_resistance: "RES",
  block_cnt: "Block",
  cost: "Cost",
  respawn_time: "Redeploy",
};

function getDescription(phase: Phase, index: number = -1): string {
  if (phase.equipLevel === 1) {
    const firstCandidate = phase.parts
      .at(0)
      ?.overrideTraitDataBundle.candidates?.at(0);
    const blackboard = firstCandidate?.blackboard;
    let desc = firstCandidate?.additionalDescription;
    desc = desc ? desc : firstCandidate?.overrideDescripton;
    return desc ? parseDescription(desc, blackboard ? blackboard : []) : "";
  }
  if (Math.abs(index) === phase.parts.length) {
    return "";
  }
  const lastElem = phase.parts.at(index);
  const isTrait = lastElem?.overrideTraitDataBundle.candidates ? true : false;
  const desc = isTrait
    ? lastElem?.overrideTraitDataBundle.candidates?.at(0)?.additionalDescription
    : lastElem?.addOrOverrideTalentDataBundle.candidates?.at(0)
        ?.upgradeDescription;
  const blackBoard = isTrait
    ? lastElem?.overrideTraitDataBundle.candidates?.at(0)?.blackboard
    : lastElem?.addOrOverrideTalentDataBundle.candidates?.at(0)?.blackboard;
  return desc
    ? parseDescription(desc, blackBoard ? blackBoard : [])
    : getDescription(phase, index - 1);
}

function Modules({ phases, equipDict, missions }: modulesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{equipDict.uniEquipName}</CardTitle>
        <CardDescription>
          {equipDict.typeName1}
          {equipDict.typeName2 && "-" + equipDict.typeName2}
        </CardDescription>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Decription</AccordionTrigger>
            <AccordionContent>{equipDict.uniEquipDesc}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardHeader>
      <CardContent>
        {phases && missions && (
          <Table>
            <TableCaption>Module</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Stage</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Missions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {phases.map((phase) => {
                return (
                  <TableRow key={phase.equipLevel}>
                    <TableCell className="text-center">
                      {phase.equipLevel}
                    </TableCell>
                    <TableCell>
                      <ul>
                        {phase.attributeBlackboard.map((blackboard, i) => (
                          <li key={`stats-${i}`}>
                            {blackBoardMapping[blackboard.key]}
                            {blackboard.value > 0 ? "+" : "-"}
                            {Math.abs(blackboard.value)}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell
                      dangerouslySetInnerHTML={{
                        __html: getDescription(phase),
                      }}
                    ></TableCell>
                    {phase.equipLevel === 1 && (
                      <TableCell rowSpan={3}>
                        <ul className="list-disc px-2">
                          {missions.map((mission, i) => (
                            <li key={`mission-${i}`}>{mission.desc}</li>
                          ))}
                        </ul>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <Materials itemCost={equipDict.itemCost} />
      </CardContent>
    </Card>
  );
}

async function Materials({
  itemCost,
}: {
  itemCost: Module["equipDict"]["itemCost"];
}) {
  if (!itemCost) return null;
  const mats = await Promise.all(
    Object.values(itemCost).map((stage) => getItemBatch(stage)),
  );
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Stage</TableHead>
          <TableHead>Mats</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mats.map((stage, i) => (
          <TableRow key={`stage-${i}`}>
            <TableCell className="text-center">{i + 1}</TableCell>
            <TableCell>
              {stage
                .map(
                  (mat, j) =>
                    `${mat.name}x${itemCost[(i + 1).toString()].at(j)
                      ?.count}, `,
                )
                .join("")
                .slice(0, -2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Modules;

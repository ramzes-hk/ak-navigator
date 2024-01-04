import { Module } from "@/lib/modules_data";
import { Phase } from "@/lib/modules_data";
import { parseDescription, TagsReplacement } from "@/lib/operators";
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
type modulesProps = Module;

const tagsReplacement: TagsReplacement = {
  "<@ba.vup>": "<span class='text-[#0098DC]'>",
  "<@ba.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@ba.rem>": "<br /><span class='text-[#F49800]'>",
  "<\\$ba.camou>": "",
  "<\\$ba.charged>": "<br />",
  "<\\$ba.barrier>": "",
  "<\\$ba.protect>": "",
  "<\\$ba.stun>": "",
  "<\\$ba.dt.element>": "",
  "<@ba.talpu>": "<span class='text-[#0098DC]'>",
  "<\\$ba.sluggish>": "",
  "<@ba.kw>": "<span class='text-[#00B0FF]'>",
};
const blackBoardMapping: { [key: string]: string } = {
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
    return desc
      ? parseDescription(desc, blackboard ? blackboard : [], tagsReplacement)
      : "";
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
    ? parseDescription(desc, blackBoard ? blackBoard : [], tagsReplacement)
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
                          <li className="px-1" key={`stats-${i}`}>
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
                      <TableCell className="" rowSpan={3}>
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
      </CardContent>
    </Card>
  );
}

export default Modules;

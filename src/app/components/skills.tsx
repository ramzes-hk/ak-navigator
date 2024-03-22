import { Level, parseDescription } from "@/lib/operators";
import { getRange } from "@/lib/ranges";
import CanvasRange from "./range_canvas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";

const spRecovery: Record<string, string> = {
  INCREASE_WITH_TIME: "Auto Recovery",
  INCREASE_WHEN_ATTACK: "Offensive Recovery",
  INCREASE_WHEN_TAKEN_DAMAGE: "Defensive Recovery",
};

const skillType: Record<string, string> = {
  MANUAL: "Manual",
  AUTO: "Auto",
  PASSIVE: "Passive",
};

interface skillProps {
  levels: Level[];
}

async function Skill({ levels }: skillProps) {
  const rangeData = levels[0].rangeId
    ? await getRange(levels[0].rangeId)
    : null;
  return (
    <div className="w-full">
      <Table className="border border-b-4">
        <TableHeader>
          <TableRow className="divide-x">
            <TableHead className="text-base text-foreground text-center">
              {levels[0].name}
            </TableHead>
            {levels[0].spData.spType !== 8 && (
              <TableHead className="text-base text-foreground text-center">
                {spRecovery[levels[0].spData.spType]}
              </TableHead>
            )}
            <TableHead className="text-base text-foreground text-center">
              {skillType[levels[0].skillType]}
            </TableHead>
            {rangeData && (
              <TableHead className="flex-auto justify-center items-center">
                <CanvasRange range={rangeData} />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
      </Table>
      <Table className="w-full border-collapse border divide-y table-fixed">
        <TableHeader>
          <TableRow className="divide-x">
            <TableHead className="text-center w-8 sm:w-12">Lvl</TableHead>
            <TableHead className="text-center">Description</TableHead>
            {(levels.at(0) ?? { duration: 0 }).duration > 1 && (
              <TableHead className="w-20 text-center">Duration</TableHead>
            )}
            <TableHead className="w-8 sm:w-12 text-center">Init SP</TableHead>
            <TableHead className="w-8 sm:w-12 text-center">SP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {levels.map((level, i) => {
            return (
              <TableRow className="divide-x" key={`level-${i}`}>
                <TableCell className="text-center">{i + 1}</TableCell>
                <TableCell
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      level.description ?? "-",
                      level.blackboard,
                      level.duration,
                    ),
                  }}
                ></TableCell>
                {level.duration > 1 && (
                  <TableCell className="text-center">
                    {level.duration}
                  </TableCell>
                )}
                <TableCell className="text-center">
                  {level.spData.initSp}
                </TableCell>
                <TableCell className="text-center">
                  {level.spData.spCost}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

interface skillTablesProps {
  skills: Level[][];
}

function SkillTables({ skills }: skillTablesProps) {
  return (
    <div className="w-full sm:w-3/4">
      {skills
        .filter((skill) => skill[0].description !== null)
        .map((skill, i) => {
          return (
            <div key={`skill-${i}`}>
              <h2>
                <b>Skill {i + 1}</b>
              </h2>
              <Skill levels={skill} />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default SkillTables;

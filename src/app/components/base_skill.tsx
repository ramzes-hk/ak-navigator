import { CharWithBuff, getBaseSkills } from "@/lib/base_skills";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { ParsedDescription } from "@/lib/parse_description";

interface baseSkillsProps {
  charId: string;
}

type BrokenBuff = CharWithBuff["buffChar"][number]["buffData"][number];

async function BaseSkills({ charId }: baseSkillsProps) {
  const bData = await getBaseSkills(charId);
  if (bData === null) return null;
  return (
    <Table className="w-full sm:w-3/4">
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Name</TableHead>
          <TableHead className="sm:w-14 text-center">Reqs</TableHead>
          <TableHead className="text-center">Desc</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bData.buffChar.map((bc) =>
          bc.buffData.map((bd) => (
            <TableRow key={bd.buffId}>
              <TableCell className="text-center">
                {(bd as BrokenBuff).buff.buffName}
              </TableCell>
              <TableCell className="text-center">
                E{bd.cond.phase.replace(/PHASE_/, "")}{" "}
                {bd.cond.level !== 1 && (
                  <>
                    <br />
                    <span className="text-nowrap">Lvl {bd.cond.level}</span>
                  </>
                )}
              </TableCell>
              <TableCell>
                <ParsedDescription
                  description={(bd as BrokenBuff).buff.description}
                  blackboard={[]}
                />
              </TableCell>
            </TableRow>
          )),
        )}
      </TableBody>
    </Table>
  );
}

export default BaseSkills;

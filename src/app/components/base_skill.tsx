import { CharWithBuff, getBaseSkills } from "@/lib/base_skills";
import { parseDescription } from "@/lib/operators";

interface baseSkillsProps {
  charId: string;
}

type BrokenBuff = CharWithBuff["buffChar"][number]["buffData"][number];

async function BaseSkills({ charId }: baseSkillsProps) {
  const bData = await getBaseSkills(charId);
  if (bData === null) return null;
  return (
    <div className="pb-8">
      <table className="border w-full sm:w-3/4">
        <caption>Base Skills</caption>
        <thead>
          <tr className="divide-x divide-y">
            <th>Name</th>
            <th className="px-0.5 w-8 sm:w-14">Reqs</th>
            <th>Desc</th>
          </tr>
        </thead>
        <tbody>
          {bData.buffChar.map((bc) =>
            bc.buffData.map((bd) => (
              <tr key={bd.buffId} className="divide-x divide-y">
                <td className="text-center border">
                  {(bd as BrokenBuff).buff.buffName}
                </td>
                <td className="text-center">
                  E{bd.cond.phase.replace(/PHASE_/, "")}{" "}
                  {bd.cond.level !== 1 && (
                    <>
                      <br />
                      <span className="text-nowrap">Lvl {bd.cond.level}</span>
                    </>
                  )}
                </td>
                <td
                  className="px-1"
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      (bd as BrokenBuff).buff.description,
                      [],
                    ),
                  }}
                ></td>
              </tr>
            )),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BaseSkills;

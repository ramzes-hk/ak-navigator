import { CharWithBuff, getBaseSkills } from "@/lib/base_skills";
import { parseDescription, TagsReplacement } from "@/lib/operators";

interface fileProps {
  charId: string;
}
const tagsReplacement: TagsReplacement = {
  "<@cc.vup>": "<span class='text-[#0098DC]'>",
  "<@cc.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@cc.rem>": "<span class='text-[#F49800]'>",
  "<\\$ba.camou>": "",
  "<\\$ba.charged>": "<br />",
  "<\\$ba.barrier>": "",
  "<\\$ba.protect>": "",
  "<\\$ba.stun>": "",
  "<\\$ba.strong>": "",
  "<\\$ba.dt.element>": "",
  "<@cc.talpu>": "<span class='text-[#0098DC]'>",
  "<\\$ba.sluggish>": "",
  "<@cc.kw>": "<span class='text-[#00B0FF]'>",
};
type BrokenBuff = CharWithBuff["buffChar"][number]["buffData"][number];

async function File({ charId }: fileProps) {
  const bData = await getBaseSkills(charId);
  if (bData === null) return null;
  return (
    <div className="pb-8">
      <table className="border w-full sm:w-3/4">
        <caption>Base Skills</caption>
        <thead>
          <tr className="divide-x divide-y">
            <th>Name</th>
            <th className="px-0.5">Requirements</th>
            <th>Description</th>
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
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      (bd as BrokenBuff).buff.description,
                      [],
                      tagsReplacement,
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

export default File;

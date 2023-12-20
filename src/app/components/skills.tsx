import { Level, parseDescription, TagsReplacement } from "@/lib/operators";
import { getRange } from "@/lib/ranges";
import CanvasRange from "./range_canvas";

const tagsReplacement: TagsReplacement = {
  "<@ba.vup>": "<span class='text-[#0098DC]'>",
  "<@ba.vdown>": "<span class='text-[#FF6237]'>",
  "</>": "</span>",
  "<@ba.rem>": "<span class='text-[#F49800]'>",
  "<\\$ba.camou>": "",
  "<\\$ba.charged>": "<br />",
  "<\\$ba.barrier>": "",
  "<\\$ba.protect>": "",
  "<\\$ba.stun>": "",
  "<\\$ba.strong>": "",
  "<\\$ba.dt.element>": "",
  "<@ba.talpu>": "<span class='text-[#0098DC]'>",
  "<\\$ba.sluggish>": "",
  "<@ba.kw>": "<span class='text-[#00B0FF]'>",
};

const spRecovery: { [key: string]: string } = {
  INCREASE_WITH_TIME: "Auto Recovery",
  INCREASE_WHEN_ATTACK: "Offensive Recovery",
  INCREASE_WHEN_TAKEN_DAMAGE: "Defensive Recovery",
};

const skillType: { [key: string]: string } = {
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
      <table className="w-full border-x border-t border-collapse">
        <tbody>
          <tr className="divide-x">
            <th>{levels[0].name}</th>
            {levels[0].spData.spType !== 8 && (
              <th>{spRecovery[levels[0].spData.spType]}</th>
            )}
            <th>{skillType[levels[0].skillType]}</th>
            {rangeData && (
              <th className="flex justify-center">
                <CanvasRange range={rangeData} />
              </th>
            )}
          </tr>
        </tbody>
      </table>

      <table className="w-full border-collapse border divide-y">
        <thead>
          <tr className="p-2 divide-x">
            <th className="text-center w-8 sm:w-12">Lvl</th>
            <th>Description</th>
            {(levels.at(0) ?? { duration: 0 }).duration > 1 && (
              <th className="sm:w-12 px-0.5 text-center">Duration</th>
            )}
            <th className="w-8 sm:w-12 px-0.5 text-center">Init SP</th>
            <th className="w-8 sm:w-12 px-0.5 text-center">SP</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {levels.map((level, i) => {
            return (
              <tr className="divide-x" key={`level-${i}`}>
                <td className="text-center">{i + 1}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      level.description,
                      level.blackboard,
                      tagsReplacement,
                      level.duration,
                    ),
                  }}
                ></td>
                {level.duration > 1 && (
                  <td className="text-center">{level.duration}</td>
                )}
                <td className="text-center">{level.spData.initSp}</td>
                <td className="text-center">{level.spData.spCost}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

interface skillTablesProps {
  skills: Level[][];
}

function SkillTables({ skills }: skillTablesProps) {
  return (
    <div className="w-full sm:w-3/4">
      {skills.map((skill: Level[], i: number) => {
        return (
          <>
            <h2>
              <b>Skill {i + 1}</b>
            </h2>
            <Skill key={i} levels={skill} />
            <br />
          </>
        );
      })}
    </div>
  );
}

export default SkillTables;

import { Level, parseDescription, TagsReplacement } from "@/lib/operators";

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

function Skill({ levels }: skillProps) {
  return (
    <div>
      <table className="border-x border-t border-collapse border-black">
        <tbody>
          <tr className="divide-x divide-black">
            <th>{levels[0].name}</th>
            {levels[0].spData.spType !== 8 && (
              <th>{spRecovery[levels[0].spData.spType]}</th>
            )}
            <th>{skillType[levels[0].skillType]}</th>
          </tr>
        </tbody>
      </table>

      <table className="border-collapse border border-black divide-y divide-black">
        <thead>
          <tr className="p-2 divide-x divide-black">
            <th>Lvl</th>
            <th>Description</th>
            {(levels.at(0) ?? { duration: 0 }).duration > 1 && (
              <th>Duration</th>
            )}
            <th>Init SP</th>
            <th>SP</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black">
          {levels.map((level, i) => {
            return (
              <tr className="divide-x divide-black" key={`level-${i}`}>
                <td>{i + 1}</td>
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
                {level.duration > 1 && <td>{level.duration}</td>}
                <td>{level.spData.initSp}</td>
                <td>{level.spData.spCost}</td>
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
    <div>
      {skills.map((skill: Level[], i: number) => {
        return (
          <>
            <Skill key={i} levels={skill} />
            <br />
          </>
        );
      })}
    </div>
  );
}

export default SkillTables;

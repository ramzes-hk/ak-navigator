import { Level, parseDescription } from "@/lib/operators";
import { getRange } from "@/lib/ranges";
import CanvasRange from "./range_canvas";

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
      <div className="flex space-x-4">
        <div>{levels[0].name}</div>
        {levels[0].spData.spType !== 8 && (
          <>
            <div>{spRecovery[levels[0].spData.spType]}</div>
          </>
        )}
        <div>{skillType[levels[0].skillType]}</div>
        {rangeData && (
          <div className="flex justify-center">
            <CanvasRange range={rangeData} />
          </div>
        )}
      </div>
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
                  className="px-1"
                  dangerouslySetInnerHTML={{
                    __html: parseDescription(
                      level.description,
                      level.blackboard,
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

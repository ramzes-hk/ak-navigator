import { Module } from "@/components/lib/modules";
import { Phase } from "@/components/lib/modules";
import { parseDescription, TagsReplacement } from "@/components/lib/operators";
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
    const firstCandidate = phase.parts.at(0)?.overrideTraitDataBundle.candidates?.at(0);
    const blackboard = firstCandidate?.blackboard;
    let desc = firstCandidate?.additionalDescription;
    desc = desc ? desc : firstCandidate?.overrideDescripton;
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", desc);
    return desc ? parseDescription(desc, blackboard ? blackboard : [], tagsReplacement) : "";
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
    <table className="border border-black border-collapse">
      <caption>{equipDict.uniEquipName}</caption>
      <thead>
        <tr className="divide-x divide-y divide-black">
          <th>Stage</th>
          <th>Stats</th>
          <th>Description</th>
          <th>Missions</th>
        </tr>
      </thead>
      <tbody>
        {phases.map((phase) => {
          return (
            <tr
              key={phase.equipLevel}
              className="divide-x divide-y divide-black border border-black"
            >
              <td>{phase.equipLevel}</td>
              <td>
                <ul>
                  {phase.attributeBlackboard.map((blackboard, i) => (
                    <li key={`stats-${i}`}>
                      {blackBoardMapping[blackboard.key]}+{blackboard.value}
                    </li>
                  ))}
                </ul>
              </td>
              <td
                dangerouslySetInnerHTML={{ __html: getDescription(phase) }}
              ></td>
              {phase.equipLevel === 1 && (
                <td rowSpan={3}>
                  <ul>
                    {missions.map((mission, i) => (
                      <li key={`mission-${i}`}>{mission.desc}</li>
                    ))}
                  </ul>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Modules;

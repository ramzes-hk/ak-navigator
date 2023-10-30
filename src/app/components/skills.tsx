import { Level } from "../../lib/operators";

interface skillProps {
  levels: Level[];
}

const tagsReplacement: { [key: string]: string } = {
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
};

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

function parseDescription(level: Level): string {
  let desc = level.description;
  for (const key in tagsReplacement) {
    desc = desc.replace(RegExp(key, "g"), tagsReplacement[key]);
  }
  level.blackboard.forEach((placeholder) => {
    let value = Math.abs(placeholder.value);
    let pattern = RegExp(
      `\{(-*)${escapeRegExp(placeholder.key)}([^}]*)\}`,
      "gi",
    );
    let match = pattern.exec(desc);
    if (match === null) {
      pattern = RegExp(`\{${placeholder.key}\}`, "i");
      desc = desc.replace(pattern, String(value));
    } else {
      if (match[0].includes("%")) {
        desc = desc.replace(match[0], Math.round(value * 100).toString() + "%");
      } else {
        desc = desc.replace(match[0], String(value));
      }
    }
  });
  desc = desc.replace(/{duration}/, String(level.duration));
  return desc;
}

function Skill({ levels }: skillProps) {
  return (
    <table className="border-collapse border border-black divide-y divide-black">
      <thead>
        <tr className="p-2 divide-x divide-black">
          <th>Lvl</th>
          <th>Description</th>
          <th>Type</th>
          <th>SP Charge</th>
          <th>Duration</th>
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
                dangerouslySetInnerHTML={{ __html: parseDescription(level) }}
              ></td>
              <td>{level.skillType}</td>
              <td>{level.spData.spType}</td>
              <td>{level.duration}</td>
              <td>{level.spData.initSp}</td>
              <td>{level.spData.spCost}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Skill;

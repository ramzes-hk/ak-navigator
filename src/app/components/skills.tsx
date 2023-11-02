import {
  Level,
  parseDescription,
  TagsReplacement,
} from "@/components/lib/operators";

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
};

interface skillProps {
  levels: Level[];
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
                dangerouslySetInnerHTML={{
                  __html: parseDescription(
                    level.description,
                    level.blackboard,
                    tagsReplacement,
                    level.duration,
                  ),
                }}
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

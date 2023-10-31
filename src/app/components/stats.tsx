import { Phase, AttributesKeyFrame } from "@/components/lib/operators";

interface statsProps {
  phases: Phase[];
}

type keyAttr = keyof AttributesKeyFrame["data"];

interface statsRowProps {
  phases: Phase[];
  name: string;
  keyAttr: keyAttr;
}

function StatsRow({ phases, name, keyAttr }: statsRowProps) {
  return (
    <tr className="divide-x divide-black">
      <th>{name}</th>
      {phases.map((phase: Phase, i: number) => {
        return phase.attributesKeyFrames.map((keyFrame, j) => {
          return <td key={`${i}-${j}`}>{keyFrame.data[keyAttr]}</td>;
        });
      })}
    </tr>
  );
}

function BaseStats({ phases }: statsProps) {
  function checkIfEquals(keyAttr: keyAttr): boolean {
    const values = phases.map((phase) => phase.attributesKeyFrames[0].data[keyAttr]);
    let temp: number = values[0];
    for (let value of values) {
      if (value !== temp) {
        return false;
      }
    }
    return true;
  }

  function getChangingStat(keyAttr: keyAttr): string {
    if (checkIfEquals(keyAttr)) {
      return String(phases[0].attributesKeyFrames[0].data[keyAttr]);
    } 
    const result = phases.reduce((accumulator, phase) => {
      return accumulator + `${phase.attributesKeyFrames[0].data[keyAttr]}->`  
    }, "");
    return result.slice(0, -2);
  }

  const data = phases[0].attributesKeyFrames[0].data;
  return (
  <table className="border border-collapse border-black divide-y divide-black">
    <caption>
      Base Stats
    </caption>
    <thead>
      <tr className="divide-x divide-black">
        <th>Cost</th>
        <th>Redeploy Time</th>
        <th>Block</th>
        <th>Attack Interval</th>
      </tr>
    </thead>
    <tbody>
      <tr className="divide-x divide-black">
      <td>{getChangingStat("cost")}</td>
      <td>{data.respawnTime}</td>
      <td>{getChangingStat("blockCnt")}</td>
      <td>{data.baseAttackTime}</td> 
      </tr>
    </tbody>
  </table>
  );
}

function Stats({ phases }: statsProps) {
  return (
    <>
    <BaseStats phases={phases} />
    <table className="border border-collapse border-black divide-y divide-black">
      <caption>Stats</caption>
      <tr className="divide-x divide-black">
        <th>Lvl</th>
        {phases.map((phase: Phase, i: number) => {
          return phase.attributesKeyFrames.map((keyFrame, j) => {
            return <th key={`${i}-${j}`}>{`E${i} ${keyFrame.level}`}</th>;
          });
        })}
      </tr>
      <StatsRow phases={phases} name="MaxHP" keyAttr="maxHp" />
      <StatsRow phases={phases} name="ATK" keyAttr="atk" />
      <StatsRow phases={phases} name="DEF" keyAttr="def" />
      <StatsRow phases={phases} name="RES" keyAttr="magicResistance" />
    </table>
    </>
  );
}

export default Stats;

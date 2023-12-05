import { Phase, FavorKeyFrame, Data } from "@/lib/operators";

interface statsProps {
  phases: Phase[];
  favorKeyFrames: FavorKeyFrame[];
}

type keyAttr = keyof Data;
interface statsRowProps {
  phases: Phase[];
  name: string;
  keyAttr: keyAttr;
  favorKeyFrames: FavorKeyFrame[];
}

function StatsRow({ phases, name, keyAttr, favorKeyFrames }: statsRowProps) {
  const lastKeyFrame = favorKeyFrames.at(-1);
  return (
    <tr key={name} className="divide-x divide-y">
      <th>{name}</th>
      {phases
        .map((phase: Phase, i: number) => {
          return phase.attributesKeyFrames.map((keyFrame, j) => {
            return (
              <td key={`${keyAttr}-${i}-${j}`}>{keyFrame.data[keyAttr]}</td>
            );
          });
        })
        .map((phase, i) =>
          phase.filter(
            (_, j) => !((i === 1 && j === 0) || (i === 2 && j === 0)),
          ),
        )}
      {lastKeyFrame && <td>{lastKeyFrame.data[keyAttr]}</td>}
    </tr>
  );
}

interface baseStatsProps {
  phases: Phase[];
}

function BaseStats({ phases }: baseStatsProps) {
  function checkIfEquals(keyAttr: keyAttr): boolean {
    const values = phases.map(
      (phase) => phase.attributesKeyFrames[0].data[keyAttr],
    );
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
      return accumulator + `${phase.attributesKeyFrames[0].data[keyAttr]}->`;
    }, "");
    return result.slice(0, -2);
  }

  const data = phases[0].attributesKeyFrames[0].data;
  return (
    <table className="w-full border border-collapse divide-y">
      <caption>Base Stats</caption>
      <thead>
        <tr className="divide-x">
          <th>Cost</th>
          <th>Redeploy Time</th>
          <th>Block</th>
          <th>Attack Interval</th>
        </tr>
      </thead>
      <tbody>
        <tr className="divide-x">
          <td>{getChangingStat("cost")}</td>
          <td>{data.respawnTime}s</td>
          <td>{getChangingStat("blockCnt")}</td>
          <td>{data.baseAttackTime}s</td>
        </tr>
      </tbody>
    </table>
  );
}

const StatsMapping: { [key: string]: keyof Data } = {
  MaxHP: "maxHp",
  ATK: "atk",
  DEF: "def",
  RES: "magicResistance",
};

function Stats({ phases, favorKeyFrames }: statsProps) {
  return (
    <div className="w-1/2 text-center">
      <BaseStats phases={phases} />
      <table className="w-full border border-collapse divide-y">
        <caption>Stats</caption>
        <thead>
          <tr className="divide-x">
            <th>Lvl</th>
            {phases
              .map((phase: Phase, i: number) => {
                return phase.attributesKeyFrames.map((keyFrame, j) => {
                  return (
                    <th key={`names-${i}-${j}`}>{`E${i} ${keyFrame.level}`}</th>
                  );
                });
              })
              .map((phase, i) =>
                phase.filter(
                  (_, j) => !((i === 1 && j === 0) || (i === 2 && j === 0)),
                ),
              )}
            <th>Trust</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(StatsMapping).map(([key, value]) => {
            return (
              <StatsRow
                key={key}
                phases={phases}
                name={key}
                keyAttr={value}
                favorKeyFrames={favorKeyFrames}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Stats;

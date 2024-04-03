import { Phase, Data, Operator } from "@/lib/operators_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import DynamicAttributes from "./attributes";

interface statsProps {
  phases: Operator["phases"];
  favorKeyFrames: Operator["favorKeyFrames"];
}

type keyAttr = keyof Data;

interface statsRowProps extends statsProps {
  name: Operator["name"];
  keyAttr: keyAttr;
}

function StatsRow({ phases, name, keyAttr, favorKeyFrames }: statsRowProps) {
  const lastKeyFrame = favorKeyFrames ? favorKeyFrames.at(-1) : null;
  return (
    <TableRow key={name} className="divide-x">
      <TableHead>{name}</TableHead>
      {phases
        .map((phase: Phase, i: number) => {
          return phase.attributesKeyFrames.map((keyFrame, j) => {
            return (
              <TableCell key={`${keyAttr}-${i}-${j}`}>
                {keyFrame.data[keyAttr]}
              </TableCell>
            );
          });
        })
        .map((phase, i) =>
          phase.filter(
            (_, j) => !((i === 1 && j === 0) || (i === 2 && j === 0)),
          ),
        )}
      {lastKeyFrame && <TableCell>{lastKeyFrame.data[keyAttr]}</TableCell>}
    </TableRow>
  );
}

interface baseStatsProps {
  phases: Phase[];
}

function BaseStats({ phases }: baseStatsProps) {
  function checkIfEquals(keyAttr: keyAttr): boolean {
    const values = phases.map(
      (phase) => phase.attributesKeyFrames[0]?.data[keyAttr],
    );
    const firstVal = values[0];
    if (firstVal === undefined) {
      throw `No first value ${keyAttr} - ${firstVal}`;
    }
    for (let value of values) {
      if (value !== firstVal) {
        return false;
      }
    }
    return true;
  }

  const firstAttrKeyFrame = phases[0]?.attributesKeyFrames[0];
  if (!firstAttrKeyFrame) {
    throw "No first Attribute Key Frame";
  }
  function getChangingStat(keyAttr: keyAttr): string {
    if (checkIfEquals(keyAttr)) {
      return String(firstAttrKeyFrame?.data[keyAttr]);
    }
    const result = phases.reduce((accumulator, phase) => {
      return accumulator + `${phase.attributesKeyFrames[0]?.data[keyAttr]}->`;
    }, "");
    return result.slice(0, -2);
  }

  const data = firstAttrKeyFrame.data;
  return (
    <Table className="w-full table-fixed border-b-4">
      <TableHeader>
        <TableRow className="divide-x">
          <TableHead>Cost</TableHead>
          <TableHead>Redeploy Time</TableHead>
          <TableHead>Block</TableHead>
          <TableHead>Attack Interval</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="divide-x">
          <TableCell>{getChangingStat("cost")}</TableCell>
          <TableCell>{data.respawnTime}s</TableCell>
          <TableCell>{getChangingStat("blockCnt")}</TableCell>
          <TableCell>{data.baseAttackTime}s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
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
    <div className="sm:w-1/2">
      <div className="border">
        <BaseStats phases={phases} />
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="divide-x">
              <TableHead>Lvl</TableHead>
              {phases
                .map((phase: Phase, i: number) => {
                  return phase.attributesKeyFrames.map((keyFrame, j) => {
                    return (
                      <TableHead
                        key={`names-${i}-${j}`}
                      >{`E${i} ${keyFrame.level}`}</TableHead>
                    );
                  });
                })
                .map((phase, i) =>
                  phase.filter(
                    (_, j) => !((i === 1 && j === 0) || (i === 2 && j === 0)),
                  ),
                )}
              {favorKeyFrames && <TableHead>Trust</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
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
          </TableBody>
        </Table>
      </div>
      <DynamicAttributes phases={phases} />
    </div>
  );
}

export default Stats;

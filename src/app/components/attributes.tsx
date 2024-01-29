"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Phase } from "@/lib/operators";
import { useState } from "react";
import { Slider } from "./slider";
import { Label } from "@/components/label";
import { RadioGroup, RadioGroupItem } from "@/components/radio_group";
import { Input } from "./input";

interface dynamicAttributesProps {
  phases: Phase[];
}

interface Attributes {
  MaxHP: number;
  ATK: number;
  DEF: number;
  RES: number;
}

function DynamicAttributes({ phases }: dynamicAttributesProps) {
  function calculateAttribute(
    baseValue: number,
    nextValue: number,
    lvl: number,
  ) {
    return (
      baseValue +
      Math.round(((lvl - 1) * (nextValue - baseValue)) / (maxLvl - minLvl))
    );
  }

  function calculateAttributes(lvl: number) {
    const phase = phases[elite].attributesKeyFrames;
    const baseData = phase[0].data;
    const nextData = phase[1].data;

    return {
      MaxHP: calculateAttribute(baseData.maxHp, nextData.maxHp, lvl),
      ATK: calculateAttribute(baseData.atk, nextData.atk, lvl),
      DEF: calculateAttribute(baseData.def, nextData.def, lvl),
      RES: phase[0].data.magicResistance,
    };
  }

  const [elite, setElite] = useState<number>(0);
  const maxLvl = phases[elite].attributesKeyFrames[1].level;
  const def = phases[elite].attributesKeyFrames[0].data;
  const minLvl = phases[elite].attributesKeyFrames[0].level;
  const [lvl, setLvl] = useState<number>(0);
  const [attributes, setAttributes] = useState<Attributes>({
    MaxHP: def.maxHp,
    ATK: def.atk,
    DEF: def.def,
    RES: def.magicResistance,
  });
  return (
    <div className="flex flex-col space-y-6 border">
      <div className="flex flex-col space-y-6 p-4">
        <div className="flex space-x-4">
          <Label htmlFor="radio-e">Promotion:</Label>
          <RadioGroup
            id="radio-e"
            onValueChange={(e) => {
              const val = parseInt(e.slice(1));
              const phase = phases[val].attributesKeyFrames[0].data;
              setAttributes({
                MaxHP: phase.maxHp,
                ATK: phase.atk,
                DEF: phase.def,
                RES: phase.magicResistance,
              });
              setElite(parseInt(e.slice(1)));
              setLvl(0);
            }}
            className="flex"
            defaultValue="E0"
            orientation="horizontal"
          >
            {phases.map((_, i) => (
              <div key={`E${i}`} className="flex">
                <RadioGroupItem value={`E${i}`} id={`E${i}`} />
                <Label htmlFor={`E${i}`}>E{i}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="lvlText">Level</Label>
          <Input
            className="w-16"
            type="number"
            min={minLvl}
            max={maxLvl}
            id="lvlText"
            value={lvl}
            onChange={(e) =>
              setLvl(
                Math.max(minLvl, Math.min(maxLvl, parseInt(e.target.value))),
              )
            }
          />
          <Slider
            value={[lvl]}
            onValueChange={(val) => {
              setLvl(val[0]);
              setAttributes(calculateAttributes(val[0]));
            }}
            defaultValue={[0]}
            min={minLvl}
            max={maxLvl}
            step={1}
          />
        </div>
      </div>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">MaxHP</TableHead>
            <TableHead className="text-center">ATK</TableHead>
            <TableHead className="text-center">DEF</TableHead>
            <TableHead className="text-center">RES</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center">{attributes.MaxHP}</TableCell>
            <TableCell className="text-center">{attributes.ATK}</TableCell>
            <TableCell className="text-center">{attributes.DEF}</TableCell>
            <TableCell className="text-center">{attributes.RES}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default DynamicAttributes;

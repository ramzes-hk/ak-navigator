"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table";
import { Phase } from "@/lib/operators_types";
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
    const phase = phases[elite];
    if (!phase) {
      throw "No phases corresponding to elite";
    }
    const attrKeyFrames = phase.attributesKeyFrames;
    const base = attrKeyFrames[0];
    if (!base) {
      throw "No base AttrKey frame";
    }
    const baseData = base.data;
    const next = attrKeyFrames[1];
    if (!next) {
      throw "No next AttrKey frame";
    }
    const nextData = next.data;

    return {
      MaxHP: calculateAttribute(baseData.maxHp, nextData.maxHp, lvl),
      ATK: calculateAttribute(baseData.atk, nextData.atk, lvl),
      DEF: calculateAttribute(baseData.def, nextData.def, lvl),
      RES: base.data.magicResistance,
    };
  }

  const [elite, setElite] = useState<number>(0);
  const phase = phases[elite];
  if (!phase) {
    throw "No phase corresponding to elite";
  }
  const phaseMax = phase.attributesKeyFrames[1];
  const phaseMin = phase.attributesKeyFrames[0];
  if (!phaseMin || !phaseMax) {
    throw "No corresponding max or min phase";
  }
  const maxLvl = phaseMax.level;
  const def = phaseMin.data;
  const minLvl = phaseMin.level;
  const [lvl, setLvl] = useState<number>(1);
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
              const phase = phases[val];
              if (!phase) {
                throw "No corresponding phase";
              }
              const attrKeyFrames = phase.attributesKeyFrames;
              if (!attrKeyFrames) {
                throw "No Attribute Key Frames";
              }
              const minAttr = attrKeyFrames[0];
              if (!minAttr) {
                throw "No min attr";
              }
              const minAttrData = minAttr.data;
              if (!minAttrData) {
                throw "No data in min attr";
              }
              setAttributes({
                MaxHP: minAttrData.maxHp,
                ATK: minAttrData.atk,
                DEF: minAttrData.def,
                RES: minAttrData.magicResistance,
              });
              setElite(parseInt(e.slice(1)));
              setLvl(1);
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
              const firstThumb = val[0];
              if (!firstThumb) {
                throw "NO THUMBS!";
              }
              setLvl(firstThumb);
              setAttributes(calculateAttributes(firstThumb));
            }}
            defaultValue={[1]}
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

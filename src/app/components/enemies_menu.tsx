"use client";

import { useState } from "react";
import { getEnemyColumns } from "./columns";
import OpTable from "./op_list";
import { enemyMenuProps } from "@/lib/enemies";
import { Input } from "./input";
import { ToggleGroup, ToggleGroupItem } from "./toggle_group";
import {
  ApplyWay,
  DamageType,
  LevelType,
  Motion,
  Race,
  applyWayTypes,
  damageTypes,
  levelTypes,
  motionTypes,
  raceData,
} from "@/lib/enemy_database_types";
import { Button } from "./button";

function EnemiesMenu({ ids, route }: enemyMenuProps) {
  const [search, setSearch] = useState<string>("");
  const [levelType, setLevelType] = useState<LevelType[]>([]);
  const [tags, setTags] = useState<Race[]>([]);
  const [motion, setMotion] = useState<Motion[]>([]);
  const [applyWay, setApplyWay] = useState<ApplyWay[]>([]);
  const [damageType, setDamageType] = useState<DamageType[]>([]);
  let enemies =
    search === ""
      ? ids
      : ids.filter((enemy) => enemy.name.toLowerCase().includes(search));
  enemies =
    levelType.length === 0
      ? enemies
      : enemies.filter((enemy) => levelType.includes(enemy.levelType));
  enemies =
    tags.length === 0
      ? enemies
      : enemies.filter(
          (enemy) =>
            tags.filter((tag) => enemy.enemyTags.includes(tag)).length > 0,
        );
  enemies =
    motion.length === 0
      ? enemies
      : enemies.filter((enemy) => motion.includes(enemy.motion));
  enemies =
    applyWay.length === 0
      ? enemies
      : enemies.filter((enemy) => applyWay.includes(enemy.applyWay));
  enemies =
    damageType.length === 0
      ? enemies
      : enemies.filter(
          (enemy) =>
            damageType.filter((dt) => enemy.damageType.includes(dt)).length > 0,
        );
  return (
    <div className="px-4 sm:container w-full flex flex-col sm:flex-row item-start">
      <div className="sm:w-1/6">
        <aside className="sm:sticky sm:top-20 sm:block sm:z-40 w-full">
          <h2 className="pb-2 text-xl">Filters</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                e.preventDefault();
                setSearch(e.target.value.toLowerCase());
              }}
            ></Input>
            <div className="py-4">
              <ToggleGroup
                value={levelType}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setLevelType(values as LevelType[])}
                type="multiple"
              >
                {levelTypes.map((lvlType) => (
                  <ToggleGroupItem key={lvlType} value={lvlType}>
                    {lvlType}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                value={tags}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setTags(values as Race[])}
                type="multiple"
              >
                {Object.values(raceData).map((race) => (
                  <ToggleGroupItem key={race.id} value={race.id}>
                    {race.raceName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                value={motion}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setMotion(values as Motion[])}
                type="multiple"
              >
                {motionTypes.map((m) => (
                  <ToggleGroupItem key={m} value={m}>
                    {m}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                value={applyWay}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) => setApplyWay(values as ApplyWay[])}
                type="multiple"
              >
                {applyWayTypes.map((val) => (
                  <ToggleGroupItem key={val} value={val}>
                    {val}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <ToggleGroup
                value={damageType}
                className="flex flex-row flex-wrap justify-start"
                onValueChange={(values) =>
                  setDamageType(values as DamageType[])
                }
                type="multiple"
              >
                {damageTypes.map((val) => (
                  <ToggleGroupItem key={val} value={val}>
                    {val}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <Button
              type="reset"
              variant="destructive"
              onClick={() => {
                setLevelType([]);
                setSearch("");
              }}
            >
              Reset
            </Button>
            {enemies && <p>Hit(s) - {enemies.length}</p>}
          </form>
        </aside>
      </div>
      <main className="w-full sm:w-5/6 sm:h-full">
        <div className="w-full sm:w-4/5 m-auto pb-4">
          <OpTable
            columns={getEnemyColumns(route)}
            data={enemies}
            title={"Enemy List"}
          />
        </div>
      </main>
    </div>
  );
}

export default EnemiesMenu;

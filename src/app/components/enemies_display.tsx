"use client";
import { HandbookEnemy } from "@/lib/enemy_handbook_table";
import EnemyList from "./enemies";
import { useState } from "react";

interface enemyDisplayProps {
  enemies: Record<string, HandbookEnemy>
}

function EnemyDisplay({ enemies }: enemyDisplayProps) {
  const [enemy, setEnemy] = useState<string>(Object.keys(enemies)[0]);
  return (<div><EnemyList enemies={enemies} /></div>);
}

export default EnemyDisplay;

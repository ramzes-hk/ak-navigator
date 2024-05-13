"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Stage } from "@/lib/stage_table_types";
import { useState } from "react";

interface StageSelectorProps {
  stageToActivity: Record<string, string[]>;
  activityId: string;
  stage: Stage;
  activities: Record<string, { id: string; name: string }>;
}

function StageSelector({
  stageToActivity,
  stage,
  activityId,
  activities,
}: StageSelectorProps) {
  const [aId, setAId] = useState<string>(activityId);
  const [sId, setSId] = useState<string>(stage.stageId);
  return (
    <div>
      <Select onValueChange={(val) => setAId(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Activity" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(activities).map((val) => (
            <SelectItem key={val.id} value={val.id}>
              {val.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={(val) => setSId(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select stage" />
        </SelectTrigger>
        <SelectContent>
          {stageToActivity[aId]?.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StageSelector;

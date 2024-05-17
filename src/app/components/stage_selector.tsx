"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { Stage } from "@/lib/stage_table_types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StageSelectorProps {
  stageToActivity: Record<string, { id: string; name: string }[]>;
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
  const router = useRouter();
  const [aId, setAId] = useState<string>(activityId);
  return (
    <div className="flex flex-row flex-wrap pt-6">
      <Select defaultValue={aId} onValueChange={(val) => setAId(val)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder={aId} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(activities).map((val) => (
            <SelectItem key={val.id} value={val.id}>
              {val.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={stage.stageId}
        onValueChange={(val) => router.push(`/stages/${val}`)}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select stage" />
        </SelectTrigger>
        <SelectContent>
          {stageToActivity[aId]?.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StageSelector;

"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StageSelectorProps {
  stageToActivity: Record<
    string,
    { name: string; id: string; stages: { id: string; name: string }[] }
  >;
  activityId: string;
  url: string;
  type: "stages" | "story";
}

function StageSelector({
  stageToActivity,
  url,
  activityId,
  type,
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
          {Object.values(stageToActivity).map((val) => (
            <SelectItem key={val.id} value={val.id}>
              {val.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={url}
        onValueChange={(val) => router.push(`/${type}/${val}`)}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder="Select stage" />
        </SelectTrigger>
        <SelectContent>
          {stageToActivity[aId]?.stages.map((s) => (
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

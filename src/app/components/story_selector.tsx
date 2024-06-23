"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { ActivityToStory } from "@/lib/story_review_table";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface StorySelectorProps {
  actType: string;
  actId: string;
  activityToStory: ActivityToStory;
  storyId: string;
}

function StorySelector({
  actType,
  actId,
  activityToStory,
  storyId,
}: StorySelectorProps) {
  const [storyType, setStoryType] = useState<string>(actType);
  const [selectActId, setSelectActId] = useState<string>(actId);
  const router = useRouter();
  return (
    <div className="flex flex-row flex-wrap">
      <Select
        onValueChange={(val) => setStoryType(val)}
        defaultValue={storyType}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="MAINLINE">Main Story</SelectItem>
          <SelectItem value="ACTIVITY">Event</SelectItem>
          <SelectItem value="MINI_ACTIVITY">Vignette</SelectItem>
          <SelectItem value="NONE">Operator Record</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) => setSelectActId(val)}
        defaultValue={selectActId}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue defaultValue={actId} />
        </SelectTrigger>
        <SelectContent>
          {activityToStory
            .filter((act) => act.entryType === storyType)
            .map((act) => (
              <SelectItem key={act.id} value={act.id}>
                {act.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(val) =>
          router.push(`/story/${encodeURIComponent(val)}`)
        }
        defaultValue={storyId}
      >
        <SelectTrigger className="w-[300px]">
          <SelectValue defaultValue={storyId} />
        </SelectTrigger>
        <SelectContent>
          {activityToStory
            .find((act) => act.id === selectActId)
            ?.stories.map((story) => (
              <SelectItem key={story.id} value={story.id}>
                {story.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default StorySelector;

import { Badge } from "./badge";
import { Operator } from "@/lib/operators";

interface tagsProps {
  position: Operator["position"];
  tagList: Operator["tagList"];
}

const positions = {
  MELEE: "Melee",
  RANGED: "Ranged",
  ALL: "All",
};

function Tags({ position, tagList }: tagsProps) {
  return (
    <div className="flex flex-row w-full mb-4">
      {position !== "NONE" && <Badge>{positions[position]}</Badge>}
      {tagList && tagList.map((tag) => <Badge key={tag}>{tag}</Badge>)}
    </div>
  );
}

interface enemyTagsProps {
  tags: string[];
}
export function EnemyTags({ tags }: enemyTagsProps) {
  return (
    <div className="flex flex-row w-full mb-4">
      {tags && tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
    </div>
  );
}

export default Tags;

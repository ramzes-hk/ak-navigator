import { Badge } from "./badge";
import { Operator, Level } from "@/lib/operators";

interface tagsProps {
  position: Operator<Level[][]>["position"];
  tagList: Operator<Level[][]>["tagList"];
}

const positions = {
  MELEE: "Melee",
  RANGED: "Ranged",
  ALL: "All",
};

function Tags({ position, tagList }: tagsProps) {
  return (
    <div className="flex flex-row w-full mb-4">
      <Badge>{positions[position]}</Badge>
      {tagList && tagList.map((tag) => <Badge key={tag}>{tag}</Badge>)}
    </div>
  );
}

export default Tags;

import { Badge } from "./badge";

interface tagsProps {
  position: "MELEE" | "RANGED";
  tagList: string[];
}

const positions = {
  MELEE: "Melee",
  RANGED: "Ranged",
};

function Tags({ position, tagList }: tagsProps) {
  return (
    <div className="flex flex-row w-full mb-4">
      <Badge>{positions[position]}</Badge>
      {tagList.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}

export default Tags;

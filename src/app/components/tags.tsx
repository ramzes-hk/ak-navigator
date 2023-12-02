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
    <div className="flex flex-col w-32">
      <Badge>{positions[position]}</Badge>
      <Badge className="flex flex-col">
        {tagList.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </Badge>
    </div>
  );
}

export default Tags;

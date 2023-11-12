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
    <div className="flex flex-col w-32 text-center">
      <p className="px-8 border border-black rounded-lg">
        {positions[position]}
      </p>
      <div className="px-8 border border-black rounded-lg">
        {tagList.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
}

export default Tags;

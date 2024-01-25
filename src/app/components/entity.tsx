import RangeGrid from "./range";
import Traits from "./traits";
import Talents from "./talents";
import SkillTables from "./skills";
import Tags from "./tags";
import Stats from "./stats";
import { getOpData } from "@/lib/operators";
import { professions } from "@/lib/professions";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

interface operatorProps {
  id: string;
}

async function Enitity({ id }: operatorProps) {
  const { operator, skills, subProfession } = await getOpData(id);
  const isSingleTrait =
    !operator.trait ||
    (operator.trait && operator.trait.candidates.length === 1);

  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <div className="flex flex-row space-x-4 pt-4">
        <h1 className="text-2xl">
          {operator.name} {convertRarity(operator.rarity)}
        </h1>
      </div>
      <h2 className="text-xl">
        {operator.appellation !== " " && operator.appellation}
      </h2>
      <h2 className="text-xl">
        {professions[operator.profession]} - {subProfession}
      </h2>
      <div>
        <RangeGrid phases={operator.phases} />
      </div>
      <h2 className="text-xl">Traits</h2>
      {operator.description && (
        <Traits
          description={operator.description}
          traits={operator.trait}
          isSingleTrait={isSingleTrait}
        />
      )}
      <Tags position={operator.position} tagList={operator.tagList} />
      <h2 className="text-xl">Stats</h2>
      <Stats
        phases={operator.phases}
        favorKeyFrames={operator.favorKeyFrames}
      />
      {operator.talents && (
        <>
          <h2 className="text-xl">Talents</h2>
          <Talents talents={operator.talents} />
        </>
      )}
      <SkillTables skills={skills} />
    </div>
  );
}

export default Enitity;

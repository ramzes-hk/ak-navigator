import Stats from "@/components/stats";
import SkillTables from "@/components/skills";
import Talents from "@/components/talents";
import Potentials from "@/components/potentials";
import Traits from "@/components/traits";
import Modules from "@/components/modules";
import Tags from "@/components/tags";
import RangeGrid from "@/components/range";
import BaseSkills from "@/components/base_skill";
import { getOpData, getAllOpIds } from "@/lib/operators";
import { getModules } from "@/lib/modules_data";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

export async function generateStaticParams() {
  return getAllOpIds();
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  const opData = await getOpData("char_" + params.id);
  const modules = await getModules(params.id);
  const isSingleTrait =
    !opData.trait || (opData.trait && opData.trait.candidates.length === 1);
  return (
    <div className="container flex flex-col flex-initial gap-6">
      <h1 className="text-2xl">
        {opData.name} - {convertRarity(opData.rarity)}
      </h1>
      <div>
        <RangeGrid phases={opData.phases} />
      </div>
      <Traits
        input={opData.description}
        traits={opData.trait}
        isSingleTrait={isSingleTrait}
      />
      <Tags position={opData.position} tagList={opData.tagList} />
      <Stats phases={opData.phases} favorKeyFrames={opData.favorKeyFrames} />
      {opData.talents && <Talents talents={opData.talents} />}
      {opData.potentialRanks && (
        <Potentials potentitalRanks={opData.potentialRanks} />
      )}
      <BaseSkills charId={"char_" + params.id} />
      <SkillTables skills={opData.skills} />
      {modules &&
        modules.map((module, i) => (
          <Modules
            key={`mod-${i}`}
            phases={module.phases}
            equipDict={module.equipDict}
            missions={module.missions}
          />
        ))}
    </div>
  );
}

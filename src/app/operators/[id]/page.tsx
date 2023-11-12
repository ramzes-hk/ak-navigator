import Link from "next/link";
import Stats from "@/components/stats";
import SkillTables from "@/components/skills";
import Talents from "@/components/talents";
import Potentials from "@/components/potentials";
import Traits from "@/components/traits";
import Modules from "@/components/modules";
import Tags from "@/components/tags";
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
    <>
      <h1>
        {opData.name} - {convertRarity(opData.rarity)}
      </h1>
      <div>
        <Traits
          input={opData.description}
          traits={opData.trait}
          isSingleTrait={isSingleTrait}
        />
      </div>
      <br />
      <Tags position={opData.position} tagList={opData.tagList} />
      <br />
      <Stats phases={opData.phases} favorKeyFrames={opData.favorKeyFrames} />
      <br />
      {opData.talents && <Talents talents={opData.talents} />}
      <br />
      {opData.potentialRanks && (
        <Potentials potentitalRanks={opData.potentialRanks} />
      )}
      <br />
      <SkillTables skills={opData.skills} />
      <br />
      {modules &&
        modules.map((module, i) => (
          <Modules
            key={`mod-${i}`}
            phases={module.phases}
            equipDict={module.equipDict}
            missions={module.missions}
          />
        ))}
      <Link className="m-2 p-2 border hover:bg-red-300" href={"/"}>
        Back
      </Link>
    </>
  );
}

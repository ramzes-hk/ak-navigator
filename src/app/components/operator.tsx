import RangeGrid from "./range";
import Traits from "./traits";
import Talents from "./talents";
import SkillTables from "./skills";
import Modules from "./modules";
import Potentials from "./potentials";
import Tags from "./tags";
import BaseSkills from "./base_skill";
import Stats from "./stats";
import { buttonVariants } from "@/components/button";
import { getOpData } from "@/lib/operators";
import { getModules } from "@/lib/modules_data";
import Link from "next/link";
import SkinCarousel from "./skin_carousel";
import { getPortraitId } from "@/lib/skin_table";
import TokenDisplay from "./tokens_display";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

interface operatorProps {
  id: string;
}

async function Operator({ id }: operatorProps) {
  const { operator, skills } = await getOpData("char_" + id);
  const modules = await getModules(id);
  const skins = await getPortraitId(id);

  const isSingleTrait =
    !operator.trait ||
    (operator.trait && operator.trait.candidates.length === 1);
  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <div className="flex flex-row space-x-4 py-4">
        <h1 className="text-2xl">
          {operator.name}
          {convertRarity(operator.rarity)}
        </h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`${id}/profile`}
          prefetch={false}
        >
          Profile
        </Link>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`${id}/voice`}
          prefetch={false}
        >
          Voice Lines
        </Link>
      </div>
      <SkinCarousel skins={skins} name={operator.name} />
      <div>
        <RangeGrid phases={operator.phases} />
      </div>
      <Traits
        input={operator.description}
        traits={operator.trait}
        isSingleTrait={isSingleTrait}
      />
      <Tags position={operator.position} tagList={operator.tagList} />
      <Stats
        phases={operator.phases}
        favorKeyFrames={operator.favorKeyFrames}
      />
      {operator.talents && <Talents talents={operator.talents} />}
      {operator.displayTokenDict && (
        <TokenDisplay tokenDisplay={operator.displayTokenDict} />
      )}
      {operator.potentialRanks && (
        <Potentials potentitalRanks={operator.potentialRanks} />
      )}
      <BaseSkills charId={"char_" + id} />
      <SkillTables skills={skills} />
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

export default Operator;

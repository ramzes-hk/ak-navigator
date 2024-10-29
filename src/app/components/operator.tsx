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
import { professions } from "@/lib/professions";
import { getModules } from "@/lib/modules_data";
import Link from "next/link";
import SkinCarousel from "./skin_carousel";
import { getPortraitId } from "@/lib/skin_table";
import TokenDisplay from "./tokens_display";
import Materials from "./materials";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

interface operatorProps {
  id: string;
}

async function Operator({ id }: operatorProps) {
  const { operator, skills, subProfession } = await getOpData(id);
  const modules = await getModules(id);
  const skins = await getPortraitId(id);
  const isSingleTrait =
    !operator.trait ||
    (operator.trait && operator.trait.candidates.length === 1);

  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <div className="flex flex-row space-x-4 pt-4">
        <h1 className="text-2xl">
          {operator.name} {convertRarity(operator.rarity)}
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
      <h2 className="text-xl">
        {operator.appellation !== " " && operator.appellation}
      </h2>
      <h2 className="text-xl">
        {professions[operator.profession]} - {subProfession}
      </h2>
      <SkinCarousel skins={skins} name={operator.name} />
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
        id={id}
        phases={operator.phases}
        favorKeyFrames={operator.favorKeyFrames}
      />
      {operator.talents && (
        <>
          <h2 className="text-xl">Talents</h2>
          <Talents talents={operator.talents} />
        </>
      )}
      {operator.displayTokenDict && (
        <>
          <h2 className="text-xl">Summons</h2>
          <TokenDisplay tokenDisplay={operator.displayTokenDict} />
        </>
      )}
      {operator.potentialRanks && (
        <>
          <h2 className="text-xl">Potentials</h2>
          <Potentials potentialRanks={operator.potentialRanks} />
        </>
      )}
      <h2 className="text-xl">Base Skills</h2>
      <BaseSkills charId={id} />
      <SkillTables skills={skills} skillIds={operator.skills}/>
      {modules.length > 0 && (
        <>
          <h2 className="text-xl">Modules</h2>
          {modules.map((module, i) => (
            <Modules
              key={`mod-${i}`}
              phases={module.phases}
              equipDict={module.equipDict}
              missions={module.missions}
            />
          ))}
        </>
      )}
      {!operator.isNotObtainable && <Materials operator={operator} />}
    </div>
  );
}

export default Operator;

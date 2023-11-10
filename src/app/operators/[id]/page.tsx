import Link from "next/link";
import Skill from "@/components/app/components/skills";
import Stats from "@/components/app/components/stats";
import Talents from "@/components/app/components/talents";
import Potentials from "@/components/app/components/potentials";
import Traits from "@/components/app/components/traits";
import Modules from "@/components/app/components/modules";
import { Level, getOpData, getAllOpIds } from "@/components/lib/operators";
import React from "react";
import { getModules } from "@/components/lib/modules_data";

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
      <Stats phases={opData.phases} favorKeyFrames={opData.favorKeyFrames} />
      <br />
      {opData.talents && <Talents talents={opData.talents} />}
      <br />
      {opData.potentialRanks && (
        <Potentials potentitalRanks={opData.potentialRanks} />
      )}
      <br />
      <div>
        {opData.skills.map((skill: Level[], i: number) => {
          return (
            <React.Fragment key={i}>
              <h2>
                <b>{skill[0].name}</b>
              </h2>
              <Skill key={`skill-${i + 1}`} levels={skill} />
              <br />
            </React.Fragment>
          );
        })}
      </div>
      {modules && modules.map((module, i) => <Modules key={`mod-${i}`} phases={module.phases} equipDict={module.equipDict} missions={module.missions} />)}
      <Link className="m-2 p-2 border hover:bg-red-300" href={"/"}>
        Back
      </Link>
    </>
  );
}

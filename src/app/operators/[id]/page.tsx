import Link from "next/link";
import Skill from "@/components/app/components/skills";
import Stats from "@/components/app/components/stats";
import Talents from "@/components/app/components/talents";
import { Level, getOpData, getAllOpIds, Trait } from "@/components/lib/operators";
import React from 'react';
function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

function replaceTags(input: string, traits: Trait | null): string {
  const trait = input
    .replace(/<@ba.kw>/g, '<span class="text-[#00B0FF]">')
    .replace(/<\/>/g, "</span>");
  if (!input.includes("{")) {
    return trait;
  }
  if (traits === null) {
    return trait;
  }
  if (traits.candidates.length === 1) {
    const key = traits.candidates[0].blackboard[0].key;
    const pattern = RegExp(`\{${key}\}`);
    return trait.replace(
      pattern,
      String(traits.candidates[0].blackboard[0].value),
    );
  }
  let table = "<table class='border-collapse'>";
  for (let i = 0; i < traits.candidates.length; i++) {
    let key = traits.candidates[i].blackboard[0].key;
    let pattern = RegExp(`\{${key}\}`);
    let value = String(traits.candidates[i].blackboard[0].value);
    table += `<tr key="${i}"><td class="p-1 border border-black">E${i}</td><td class="p-1 border border-black">${trait.replace(
      pattern,
      value,
    )}</td></tr>`;
  }
  table += "</table>";
  return table;
}

export async function generateStaticParams() {
  return  getAllOpIds();
} 

export default async function Page({ params }: { params: { id: string } }) {
  const opData = await getOpData("char_" + params.id);
  return (
    <>
      <h1>
        {opData.name} - {convertRarity(opData.rarity)}
      </h1>
      <div>
      <h2
        dangerouslySetInnerHTML={{
          __html: replaceTags(opData.description, opData.trait),
        }}
      ></h2>
      </div>
      <br />
      <Stats phases={opData.phases} />
      <br />
      {opData.talents && <Talents talents={opData.talents} />}
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
      <Link className="m-2 p-2 border hover:bg-red-300" href={"/"}>
        Back
      </Link>
    </>
  );
}

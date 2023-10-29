import Link from "next/link";
import { getOpData, Trait, getAllOpIds } from "@/components/lib/operators";

function convertRarity(rarity: string): string {
  return "\u2606".repeat(parseInt(rarity.replace(/TIER_/, "")));
}

function replaceTags(input: string, traits: Trait | null): string {
  const trait = input.replace(/<@ba.kw>/g, '<span class="text-sky-400">').replace(/<\/>/g, '</span>');
  if (!input.includes("{")) {
    return trait;
  }
  if (traits === null) {
    return trait;
  }  
  if (traits.candidates.length === 1) {
    const key = traits.candidates[0].blackboard[0].key;
    const pattern = RegExp(`\{${key}\}`);
    return trait.replace(pattern, String(traits.candidates[0].blackboard[0].value));
  }
  let table = "<table class='border-collapse'>";
  for (let i = 0; i < traits.candidates.length; i++) {
    let key = traits.candidates[i].blackboard[0].key;
    let pattern = RegExp(`\{${key}\}`);
    let value = String(traits.candidates[i].blackboard[0].value);
    table += `<tr><td class="p-1 border border-black">E${i}</td><td class="p-1 border border-black">${trait.replace(pattern, value)}</td></tr>`;
  }
  table += "</table>";
  return table;
}


export default async function Page({ params }: { params: { id: string } }) {
  const opData = await getOpData("char_" + params.id);
  return (
    <>
      <h1>
        {opData.opName} - {convertRarity(opData.rarity)}
      </h1>
      <h2 dangerouslySetInnerHTML={{ __html: replaceTags(opData.description, opData.trait)}}></h2>
      <br />
      <ul>
        {opData.skills.map((skill, i) => {
          return (
            <li key={skill.name}>
              <h2>
                <b>
                  Skill {i + 1} - {skill.name}
                </b>
              </h2>
              {skill.description}
            </li>
          );
        })}
      </ul>
      <Link className="m-2 p-2 border hover:bg-red-300" href={"/"}>Back</Link>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllOpIds();
  return {
    paths,
    fallback: false,
  };
}

import { Trait, replaceValues } from "@/lib/operators";

interface traitHeaderProps {
  dangerousHTML: string;
}

function TraitHeader({ dangerousHTML }: traitHeaderProps) {
  return <h2 dangerouslySetInnerHTML={{ __html: dangerousHTML }}></h2>;
}

interface traitProps {
  input: string;
  traits: Trait | null;
}

function Trait({ input, traits }: traitProps) {
  let trait = input
    .replace(/<@ba.kw>/g, '<span class="text-[#00B0FF]">')
    .replace(/<\/>/g, "</span>");
  if (!input.includes("{")) {
    return <TraitHeader dangerousHTML={trait} />;
  }
  if (traits === null) {
    return <TraitHeader dangerousHTML={trait} />;
  }
  return (
    <TraitHeader
      dangerousHTML={replaceValues(trait, traits.candidates[0].blackboard)}
    />
  );
}
function TraitTable({ input, traits }: traitProps) {
  let trait = input
    .replace(/<@ba.kw>/g, '<span class="text-[#00B0FF]">')
    .replace(/<\/>/g, "</span>");
  return (
    <table className="border border-collapse border-black">
      <tbody>
        {traits?.candidates.map((candidate, i) => {
          return (
            <tr className="divide-y divide-black" key={i}>
              <th className="border border-black">{`E${i}`}</th>
              <td
                dangerouslySetInnerHTML={{
                  __html: replaceValues(trait, candidate.blackboard),
                }}
              ></td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

interface traitsProps {
  input: string;
  traits: Trait | null;
  isSingleTrait: boolean;
}

function Traits({ input, traits, isSingleTrait: isSingleTrait }: traitsProps) {
  return isSingleTrait ? (
    <Trait input={input} traits={traits} />
  ) : (
    <TraitTable input={input} traits={traits} />
  );
}

export default Traits;

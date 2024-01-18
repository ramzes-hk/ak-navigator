import { Trait, parseDescription, replaceValues } from "@/lib/operators";

interface traitProps {
  description: string;
  traits: Trait | null;
}

function Trait({ description, traits }: traitProps) {
  const trait = parseDescription(
    description,
    traits?.candidates[0].blackboard ?? [],
  );
  return <p dangerouslySetInnerHTML={{ __html: trait }}></p>;
}

function TraitTable({ description, traits }: traitProps) {
  const trait = parseDescription(description, []);
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
  description: string;
  traits: Trait | null;
  isSingleTrait: boolean;
}

function Traits({ description, traits, isSingleTrait }: traitsProps) {
  return isSingleTrait ? (
    <Trait description={description} traits={traits} />
  ) : (
    <TraitTable description={description} traits={traits} />
  );
}

export default Traits;

import { getOpData } from "@/lib/operators";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Stats from "./stats";
import Talents from "./talents";
import RangeGrid from "./range";
import SkillTables from "./skills";
import Traits from "./traits";

interface tokenProps {
  tokenId: string;
}

async function Token({ tokenId }: tokenProps) {
  const { operator: token, skills } = await getOpData(tokenId);
  const isSingleTrait =
    !token.trait || (token.trait && token.trait.candidates.length === 1);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{token.name}</CardTitle>
        <CardContent>
          <div className="py-4">
            <Traits
              input={token.description}
              traits={token.trait}
              isSingleTrait={isSingleTrait}
            />
          </div>
          <div className="py-4">
            <RangeGrid phases={token.phases} />
          </div>
          <div className="py-4">
            <Stats
              phases={token.phases}
              favorKeyFrames={token.favorKeyFrames}
            />
          </div>
          <div className="py-4">
            {token.talents && <Talents talents={token.talents} />}
          </div>
          <div className="py-4">
            {token.skills && <SkillTables skills={skills} />}
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default Token;

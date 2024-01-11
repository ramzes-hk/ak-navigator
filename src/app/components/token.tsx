import { getOpData } from "@/lib/operators";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Stats from "./stats";
import Talents from "./talents";
import RangeGrid from "./range";
import SkillTables from "./skills";

interface tokenProps {
  tokenId: string;
}

async function Token({ tokenId }: tokenProps) {
  const token = await getOpData(tokenId);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{token.name}</CardTitle>
        <CardDescription>{token.description}</CardDescription>
        <CardContent>
          <RangeGrid phases={token.phases} />
          <Stats phases={token.phases} favorKeyFrames={token.favorKeyFrames} />
          {token.talents && <Talents talents={token.talents} />}
          {token.skills && <SkillTables skills={token.skills} />}
        </CardContent>
      </CardHeader>
    </Card>
  );
}

export default Token;

import { getCharword } from "@/lib/charword_data";
import { getOpName } from "@/lib/operators";
import Link from "next/link";
import { buttonVariants } from "./button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "./card";

interface voiceLinesProps {
  id: string;
}

async function VoiceLines({ id }: voiceLinesProps) {
  const charword = await getCharword(id);
  const opName = await getOpName("char_" + id);
  return (
    <div className="container w-full">
      <div className="py-4 flex flex-row space-x-4">
        <h1 className="text-2xl text-bold">{opName}</h1>
        <Link
          className={buttonVariants({ variant: "default" })}
          href={`/operators/${id}`}
          prefetch={false}
        >
          Operator
        </Link>
      </div>
      {charword.map((word) => (
        <Card key={word.voiceId}>
          <CardHeader>
            <CardTitle>{word.voiceTitle}</CardTitle>
            {word.unlockType !== "DIRECT" && (
              <CardDescription>
                {word.unlockType === "FAVOR"
                  ? `Trust ${word.unlockParam[0].valueInt}`
                  : `E${word.unlockParam[0].valueInt}`}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <p>{word.voiceText}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default VoiceLines;

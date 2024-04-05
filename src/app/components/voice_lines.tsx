import { getCharword } from "@/lib/charword_data";
import { getOpName } from "@/lib/db_queries";
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
  const opName = await getOpName(id);
  if (charword === null) return <p>No data</p>;
  const split = charword.charwordCharArr
    .slice(1)
    .find((line) => line.voiceId === charword.charwordCharArr[0]?.voiceId)
    ? true
    : false;
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
      <div className="py-4">
        <ul>
          {Object.values(charword.voiceLang.dict).map((lang) => (
            <li key={lang.voiceLangType}>
              {charword.voiceLangTypeDict[lang.voiceLangType]?.name}:{" "}
              {lang.cvName}
            </li>
          ))}
        </ul>
      </div>
      {split && <h2 className="text-3xl py-2">Original Lines</h2>}
      {charword.charwordCharArr.map((word, i) => {
        const firstWordParam = word.unlockParam[0];
        const directType = word.unlockType === "DIRECT";
        if (!directType && !firstWordParam) {
          throw "No first word param";
        }
        return (
          <div key={word.voiceId}>
            {split && i === charword.charwordCharArr.length / 2 && (
              <h2 className="text-3xl py-2">Skin Lines</h2>
            )}
            <Card key={word.voiceId}>
              <CardHeader>
                <CardTitle>{word.voiceTitle}</CardTitle>
                {!directType && (
                  <CardDescription>
                    {word.unlockType === "FAVOR"
                      ? `Trust ${firstWordParam?.valueInt}`
                      : `E${firstWordParam?.valueInt}`}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p>{word.voiceText}</p>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default VoiceLines;

import { getHandbook } from "@/lib/handbook_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { getOpName } from "@/lib/db_queries";
import { buttonVariants } from "./button";
import Link from "next/link";

interface profileProps {
  id: string;
}

async function Profile({ id }: profileProps) {
  const hbData = await getHandbook(id);
  const opName = await getOpName(id);
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
      {hbData ? (
        hbData.storyTextAudio.map((story, i) => {
          const stories = story.stories?.at(0);
          return (
            <div key={`story-${i}`}>
              <Card>
                <CardHeader>
                  <CardTitle>{story.storyTitle}</CardTitle>
                  {stories?.unLockType !== "DIRECT" &&
                    (stories?.unLockType === "FAVOR" ? (
                      <CardDescription>
                        Trust {stories.unLockParam}
                      </CardDescription>
                    ) : (
                      <CardDescription>
                        E{stories?.unLockParam.split(";")[0]}
                      </CardDescription>
                    ))}
                </CardHeader>
                <CardContent>
                  <p>
                    {stories?.storyText.split("\n").map((line, i) => (
                      <span key={`line-${i}`}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                </CardContent>
              </Card>
            </div>
          );
        })
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default Profile;

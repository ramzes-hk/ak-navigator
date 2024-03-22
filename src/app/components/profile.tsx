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
        hbData.storyTextAudio.map((story, i) => (
          <div key={`story-${i}`}>
            <Card>
              <CardHeader>
                <CardTitle>{story.storyTitle}</CardTitle>
                {story.stories[0].unLockType !== "DIRECT" &&
                  (story.stories[0].unLockType === "FAVOR" ? (
                    <CardDescription>
                      Trust {story.stories[0].unLockParam}
                    </CardDescription>
                  ) : (
                    <CardDescription>
                      E{story.stories[0].unLockParam.split(";")[0]}
                    </CardDescription>
                  ))}
              </CardHeader>
              <CardContent>
                <p>
                  {story.stories[0].storyText.split("\n").map((line, i) => (
                    <span key={`line-${i}`}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              </CardContent>
            </Card>
          </div>
        ))
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
}

export default Profile;

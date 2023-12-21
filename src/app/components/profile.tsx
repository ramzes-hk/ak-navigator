import { getHandbook } from "@/lib/handbook_data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface profileProps {
  id: string;
}

async function Profile({ id }: profileProps) {
  const hbData = await getHandbook("char_" + id);
  return (
    <>
      <h1>{id}</h1>
      {hbData.storyTextAudio.map((story, i) => (
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
                {story.stories[0].storyText.split("\n").map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              </p>
            </CardContent>
          </Card>
        </div>
      ))}
    </>
  );
}

export default Profile;

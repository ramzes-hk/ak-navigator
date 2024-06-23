import { getStory } from "@/lib/story_parser";
import parseStory from "@/lib/parsed_story";
import { ReactElement } from "react";
import { getStoryReview } from "@/lib/db_queries";
import StorySelector from "./story_selector";
import { getActivityDB } from "@/lib/db_queries";
import { ActivityToStory } from "@/lib/story_review_table";

interface StoryPageProps {
  id: string;
  name: string;
  activityToStory: ActivityToStory;
}

async function StoryPage({
  id,
  name,
  activityToStory,
}: StoryPageProps): Promise<ReactElement> {
  const story = await getStory(id);
  const storyReview = await getStoryReview(decodeURIComponent(id));
  if (!story) return <p>Story not found</p>;
  const activity = await getActivityDB(storyReview?.actId!);
  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <h1>{name}</h1>
      <StorySelector
        actType={activity?.entryType!}
        actId={activity?.id!}
        activityToStory={activityToStory}
        storyId={decodeURIComponent(id)}
      />
      <table className="table-fixed lg:w-3/4">
        <tbody>
          {parseStory(story).map((line, i) => (
            <tr key={i}>
              <td className="text-right pr-2 align-top">{line.name}</td>
              <td className={line.type === "i" ? "italic" : ""}>
                {line.content}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoryPage;

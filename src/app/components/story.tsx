import { getStory } from "@/lib/story_parser";
import parseStory from "@/lib/parsed_story";
import { ReactElement } from "react";

interface StoryPageProps {
  id: string;
  name: string;
}

async function StoryPage({ id, name }: StoryPageProps): Promise<ReactElement> {
  const story = await getStory(id);
  if (!story) return <p>Story not found</p>;
  return (
    <div className="container">
      <h1>{name}</h1>
      <table className="table-fixed lg:w-3/4">
        <tbody>
          {parseStory(story).map((line, i) => (
            <tr key={i}>
              <td className="text-right pr-2 align-top">{line.name}</td>
              <td>{line.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StoryPage;

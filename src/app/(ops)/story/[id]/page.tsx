import StoryPage from "@/components/story";
import { getActivityToStory } from "@/lib/story_review_table";
import { getStoryTable } from "@/lib/story_table";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const stage = getStoryTable();
  return Object.keys(stage).map((key) => ({ id: key }));
}

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: pageProps) {
  const params = await props.params;
  return (
    <StoryPage activityToStory={getActivityToStory()} id={params.id} name="" />
  );
}

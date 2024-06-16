import StoryPage from "@/components/story";
import { getStoryTable } from "@/lib/story_table";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const stage = getStoryTable();
  return Object.keys(stage).map((key) => ({ id: key }));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <StoryPage id={params.id} name=""/>;
}

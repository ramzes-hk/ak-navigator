import StagePage from "@/components/stage";
import { getNormalStages } from "@/lib/stage_table";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const stage = getNormalStages();
  return Object.keys(stage).map((key) => ({ id: key }));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <StagePage id={params.id} />;
}

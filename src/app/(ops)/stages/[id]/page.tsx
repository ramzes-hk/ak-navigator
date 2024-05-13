import StagePage from "@/components/stage";
import { getActivitiesNames, getStagesByActivities } from "@/lib/stage_by_activity";
import { getNormalStages } from "@/lib/stage_table";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const stage = getNormalStages();
  return Object.keys(stage).map((key) => ({ id: key.split("/").at(-1) ?? ""}));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  const stageToActivity = getStagesByActivities();
  const activities = getActivitiesNames();
  return <StagePage id={params.id} stageToActivity={stageToActivity} activities={activities} />;
}

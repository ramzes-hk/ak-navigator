import StagePage from "@/components/stage";
import {
  getActivitiesNames,
  getStagesByActivitiesWName,
} from "@/lib/stage_by_activity";
import { getNormalStages } from "@/lib/stage_table";

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const stage = getNormalStages();
  return Object.keys(stage).map((key) => ({ id: key.split("/").at(-1) ?? "" }));
}

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: pageProps) {
  const params = await props.params;
  const stageToActivity = getStagesByActivitiesWName();
  const activities = getActivitiesNames();
  return (
    <StagePage
      id={params.id}
      stageToActivity={stageToActivity}
      activities={activities}
    />
  );
}

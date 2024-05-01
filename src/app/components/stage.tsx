import { getStage } from "@/lib/stage_table";
import StageTable from "./stage_table";
import { parseDescription } from "@/lib/operators";
import { Stage } from "@/lib/stage_table_types";
import StageEnemies from "./stage_enemies";
import { getActivity } from "@/lib/activity";
import StageDrops from "./stage_drops";

interface stageProps {
  id: string;
}

async function StagePage({ id }: stageProps) {
  const decodedId = decodeURIComponent(id);
  const stage = getStage(decodedId);
  if (!stage) {
    throw `No stage ${id}`;
  }
  const stageVars: Record<string, Stage> = { Normal: stage };
  if (decodedId.includes("main")) {
    const easy = getStage(decodedId.replace("main", "easy"));
    const tough = getStage(decodedId.replace("main", "tough"));
    if (easy) {
      stageVars["Easy"] = easy;
    }
    if (tough) {
      stageVars["Tough"] = tough;
    }
  }
  const hard = stage.hardStagedId ? getStage(stage.hardStagedId) : undefined;
  if (hard) {
    stageVars["Hard"] = hard;
  }
  return (
    <div className="sm:container flex flex-col flex-initial gap-6 mb-8">
      <h1 className="text-2xl pt-4">
        {stage.code} - {stage.name}
      </h1>
      {Object.keys(stageVars).map(async (s) => {
        const st = stageVars[s];
        if (!st) return;
        const level = st.levelId
          ? await getActivity(st.levelId.replace("easy", "main"))
          : undefined;
        return (
          <div key={s} className="flex flex-col gap-4">
            <h2 className="text-xl">{s}</h2>
            {st.description ? <p
              className="w-full sm:w-3/4"
              dangerouslySetInnerHTML={{
                __html: parseDescription(st.description, []),
              }}
            ></p> : "No Description"}
            <StageTable stage={st} />
            <h3 className="text-lg">Enemies</h3>
            {level && <StageEnemies activity={level} />}
            <StageDrops stage={st} />
          </div>
        );
      })}
    </div>
  );
}

export default StagePage;

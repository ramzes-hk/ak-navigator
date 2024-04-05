import { getStage } from "@/lib/stage_table";

interface stageProps {
  id: string;
}

function Stage({ id }: stageProps) {
  const stage = getStage(decodeURIComponent(id));
  return (
    <div>
      <h1>
        {stage.code} - {stage.name}
      </h1>
    </div>
  );
}

export default Stage;

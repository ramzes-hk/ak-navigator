import { Stage } from "@/lib/stage_table_types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/table";
import { getItem } from "@/lib/item_table";
import { getFurniture } from "@/lib/building_data";
import { getCharm } from "@/lib/charm_table";
import { getOpName } from "@/lib/db_queries";

interface StageDropsProps {
  stage: Stage;
}

async function StageDrops({ stage }: StageDropsProps) {
  const firstClear = stage.stageDropInfo.displayRewards.filter(
    (reward) => reward.dropType === "ONCE" || reward.dropType === "COMPLETE",
  );
  const regular = stage.stageDropInfo.displayDetailRewards.filter(
    (reward) => reward.dropType === "NORMAL",
  );
  const additional = stage.stageDropInfo.displayDetailRewards.filter(
    (reward) => reward.dropType === "ADDITIONAL",
  );
  return (
    <Table className="w-full sm:w-3/4 table-fixed">
      <TableBody>
        <TableRow>
          <TableHead className="w-min">First Clear</TableHead>
          <TableCell>
            {await getRewardList(firstClear).then((all) =>
              all.length > 0 ? all.join(", ") : "-",
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Regular</TableHead>
          <TableCell>
            {await getRewardList(regular).then((all) =>
              all.length > 0 ? all.join(", ") : "-",
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Additional</TableHead>
          <TableCell>
            {await getRewardList(additional).then((all) =>
              all.length > 0 ? all.join(", ") : "-",
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export async function getRewardList(
  rewards: { type: string; id: string }[],
): Promise<string[]> {
  return Promise.all(
    rewards.map(async (reward) => {
      let name = reward.id;
      if (reward.type === "CHAR") {
        name = await getOpName(reward.id)
      } else if (reward.type === "FURN") {
        name = getFurniture(reward.id).name;
      } else if (reward.type === "CHARM") {
        name = getCharm(reward.id)?.name ?? "";
      } else {
        name = (await getItem(reward.id)).name;
      }
      return name;
    }),
  );
}

export default StageDrops;

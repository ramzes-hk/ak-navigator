import RecruitmentTable from "@/components/recruitment_table";
import { getOpData } from "@/lib/operators";
import { recruitIds } from "@/lib/recruitment_list";

export default async function Tags() {
  const ops = await Promise.all(recruitIds.map((id) => getOpData(id)));

  return <RecruitmentTable operators={ops.map((val) => val.operator)} />;
}

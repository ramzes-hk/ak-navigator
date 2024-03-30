import RecruitmentTable from "@/components/recruitment_table";
import { tagOperators } from "@/lib/operators";

export default async function Tags() {
  const ops = await tagOperators();

  return <RecruitmentTable operators={ops.map((val) => val)} />;
}

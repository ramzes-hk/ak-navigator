import { getAllOpNames } from "@/lib/operators";
import Operator from "@/components/operator";

export async function generateStaticParams() {
  const names = getAllOpNames("char");
  return names.map((op) => ({ id: op.id }));
}

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: pageProps) {
  const params = await props.params;
  return <Operator id={params.id} />;
}

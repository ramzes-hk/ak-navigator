import { getAllOpNames } from "@/lib/operators";
import Enitity from "@/components/entity";

export async function generateStaticParams() {
  const names = getAllOpNames("token&trap");
  return names.map((op) => ({ id: op.id }));
}

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page(props: pageProps) {
  const params = await props.params;
  return <Enitity id={params.id} />;
}

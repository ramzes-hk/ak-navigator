import { getAllOpNames } from "@/lib/operators";
import Enitity from "@/components/entity";

export async function generateStaticParams() {
  const names = getAllOpNames(false);
  return names.map(op => ({id: op.id}));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <Enitity id={params.id} />;
}

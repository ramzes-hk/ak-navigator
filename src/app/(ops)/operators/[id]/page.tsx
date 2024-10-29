import { getAllOpNames } from "@/lib/operators";
import Operator from "@/components/operator";

export async function generateStaticParams() {
  const names = getAllOpNames("char");
  return names.map((op) => ({ id: op.id }));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: pageProps) {
  return <Operator id={params.id} />;
}

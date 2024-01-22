import { getAllOpNames } from "@/lib/operators";
import Operator from "@/components/operator";

export async function generateStaticParams() {
  return getAllOpNames().map((op) => op.id);
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <Operator id={params.id} />;
}

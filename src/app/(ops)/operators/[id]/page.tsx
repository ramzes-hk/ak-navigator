import { getAllOpIds } from "@/lib/operators";
import Operator from "@/components/operator";

export async function generateStaticParams() {
  return getAllOpIds();
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <Operator id={params.id} />;
}

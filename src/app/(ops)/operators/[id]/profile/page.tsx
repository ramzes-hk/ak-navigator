import Profile from "@/components/profile";
import { getAllOpNames } from "@/lib/operators";

export async function generateStaticParams() {
  return getAllOpNames().map((op) => ({id: op.id}));
}

interface pageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: pageProps) {
  return (
    <div className="mx-2 mb-2 sm:mx-16 sm:mb-16">
      <Profile id={params.id} />
    </div>
  );
}

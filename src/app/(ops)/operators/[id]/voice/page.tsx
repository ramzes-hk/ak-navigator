import VoiceLines from "@/components/voice_lines";
import { getAllOpNames } from "@/lib/operators";

export async function generateStaticParams() {
  return getAllOpNames("char").map((op) => ({ id: op.id }));
}

interface pageProps {
  params: Promise<{
    id: string;
  }>;
}
export default async function Page(props: pageProps) {
  const params = await props.params;
  return (
    <div className="mx-2 mb-2 sm:mx-16 sm:mb-16">
      <VoiceLines id={params.id} />
    </div>
  );
}

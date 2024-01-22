import VoiceLines from "@/components/voice_lines";
import { getAllOpNames } from "@/lib/operators";

export async function generateStaticParams() {
  return getAllOpNames().map((op) => op.id);
}

interface pageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params }: pageProps) {
  return (
    <div className="mx-2 mb-2 sm:mx-16 sm:mb-16">
      <VoiceLines id={params.id} />
    </div>
  );
}

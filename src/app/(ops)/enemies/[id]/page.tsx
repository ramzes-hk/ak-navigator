import { getMenuEnemies } from "@/lib/enemies";
import Enemy from "@/components/enemy";

export async function generateStaticParams() {
  const names = getMenuEnemies();
  return names.ids.map((enemy) => ({ id: enemy.enemyId }));
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return <Enemy id={params.id} />;
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  return [];
}

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: pageProps) {
  return;
}

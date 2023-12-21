import Profile from "@/components/profile";

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

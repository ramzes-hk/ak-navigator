import { getAllOpNames } from "@/lib/operators";

export async function POST(request: Request) {
  const res = await request.json();
  const name = res["name"].toLowerCase();
  const names = getAllOpNames();
  if (name === "") {
    return Response.json(names);
  }
  return Response.json(names.filter((item) => item.name.toLowerCase().includes(name)));
}

export async function GET() {
  return new Response("salam");
}

import { ActivityFile } from "./activity_types";

export async function getActivity(id: string): Promise<ActivityFile | null> {
  const baseURL =
    "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/main/en_US/gamedata/levels/";
  const url = decodeURI(baseURL + id.toLowerCase() + ".json");
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`status: ${res.status} ${url}`);
    }
    const data = (await res.json()) as ActivityFile;
    return data;
  } catch (error) {
    console.log(`error ${url}`);
    return null;
  }
}

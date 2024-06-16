export async function getStory(levelId: string): Promise<string[] | undefined> {
  console.log(decodeURIComponent(levelId));
  const baseUrl =
    "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/main/en_US/gamedata/story/";
  try {
    const res = await fetch(baseUrl + decodeURIComponent(levelId) + ".txt");
    const data = await res.text();
    const lines = data.split("\n");
    return lines;
  } catch (e) {
    return undefined;
  }
}

import { test, expect } from "vitest";
import { getActivity } from "@/lib/activity";

test("level fetch", async () => {
  const data = await getActivity("Obt/Main/level_main_01-07");
  expect(data.bgmEvent).toBe("calamity");
});

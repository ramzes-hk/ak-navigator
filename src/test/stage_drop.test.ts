import { test, expect } from "vitest";
import { getRewardList } from "@/components/stage_drops";

let rewards: Parameters<typeof getRewardList> = [
  [
    {
      type: "FURN",
      id: "furni_guitar_poster1_01",
    },
    {
      type: "ACTIVITY_ITEM",
      id: "token_Obsidian_rep_1",
    },
    {
      type: "ET_STAGE",
      id: "et_ObsidianPass_rep_1",
    },
    {
      type: "DIAMOND",
      id: "4002",
    },
    {
      type: "CHARM",
      id: "charm_coin_1",
    },
  ],
];
const exp = [
  "Sarkaz Rock 'n' Roll Poster",
  "Siesta Obsidian",
  "Obsidian Festival Ticket",
  "Originite Prime",
  "Gold Chip",
];

test("stage drop list", () => {
  getRewardList(...rewards).then(res => expect(res).toStrictEqual(exp));
});

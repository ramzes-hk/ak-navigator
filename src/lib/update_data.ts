import fs from "fs"

async function updateData() {
  for (let file of githubFiles) {
    const response = await fetch(root+file);
    const data = await response.json()
    fs.writeFileSync("operators/" + file.split("/")[1], JSON.stringify(data))
  } 
}

const root = "https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData_YoStar/refs/heads/main/en_US/gamedata/"

const githubFiles = [
"excel/activity_table.json",
  "excel/battle_equip_table.json",
  "excel/building_data.json",
  "excel/character_table.json",
  "excel/charm_table.json",
  "excel/charword_table.json",
  "excel/enemy_handbook_table.json",
  "excel/handbook_info_table.json",
  "excel/item_table.json",
  "excel/range_table.json",
  "excel/skill_table.json",
  "excel/skin_table.json",
  "excel/stage_table.json",
  "excel/story_review_table.json",
  "excel/story_table.json",
  "excel/uniequip_table.json",
  "levels/enemydata/enemy_database.json",
];

updateData();

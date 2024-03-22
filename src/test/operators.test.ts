import { expect, test } from "vitest"
import { parseDescription } from "@/lib/operators"

const descritption = "Continuously barrages a fixed area in front of this unit at max range, <@ba.vup>expanding</> explosion area and increasing ATK to <@ba.vup>{attack@atk_scale_2:0%}</>. Enemies closer to the impact site in a smaller area will instead take <@ba.vup>{attack@atk_scale:0%}</> ATK as damage. \n<@ba.rem>Unlimited duration, can manually deactivate skill</>";

const exp = "Continuously barrages a fixed area in front of this unit at max range, <span style='color: #0098DC;'>expanding</span> explosion area and increasing ATK to <span style='color: #0098DC;'>105%</span>. Enemies closer to the impact site in a smaller area will instead take <span style='color: #0098DC;'>150%</span> ATK as damage. <br /><span style='color: #F49800;'>Unlimited duration, can manually deactivate skill</span>";

const blackboard =  [
          {
            "key": "attack@atk_scale",
            "value": 1.5,
            "valueStr": null
          },
          {
            "key": "base_attack_time",
            "value": 0.0,
            "valueStr": null
          },
          {
            "key": "attack@dist",
            "value": 1.1,
            "valueStr": null
          },
          {
            "key": "attack@atk_scale_2",
            "value": 1.05,
            "valueStr": null
          }
        ]

test("check fiam s3 skill desc", () => {
  expect(parseDescription(descritption, blackboard)).toBe(exp)
})

import {test, expect } from "vitest"
import { getStoryContentValues } from "@/components/story_content"

const line = '[Decision(options="So then you...?", values="1")]' 
const options = ["So then you...?"];
const values = ['1'];
const predicate = '[Predicate(references="1;2;3")]'
const refs = ['1', '2', '3']
const predicate2 = '[Predicate(references="2")]';
const ref = ['2']

test("decision and predicate value extraction", () => {
  expect(getStoryContentValues(line, "options")).toStrictEqual(options);
  expect(getStoryContentValues(line, "values")).toStrictEqual(values);
  expect(getStoryContentValues(predicate, "references")).toStrictEqual(refs);
  expect(getStoryContentValues(predicate2, "references")).toStrictEqual(ref);
})

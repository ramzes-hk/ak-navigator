import { Blackboard, TagsReplacement, replaceValues } from "@/lib/operators";

function ParsedDescription(
  description: string,
  blackboard: Blackboard[],
  tagsReplacement: TagsReplacement,
  duration?: number,
) {
  let desc = replaceValues(description, blackboard);
  desc = duration ? desc.replace(/{duration}/, String(duration)) : desc;
  for (const key in tagsReplacement) {
    desc = desc.replace(RegExp(key, "g"), tagsReplacement[key]);
  }
  return <span>desc</span>;
}

export default ParsedDescription;

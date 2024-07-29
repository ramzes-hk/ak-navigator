"use client";

import { ReactElement, useEffect, useState } from "react";
import { RadioGroup } from "./radio_group";
import { RadioGroupItem } from "./radio_group";
import { Label } from "./label";

interface StoryContentProps {
  lines: string[];
}

export function StoryContent({ lines }: StoryContentProps) {
  const [renderedContent, setRenderedContent] = useState<ReactElement[]>();
  const [decisions, setDecisions] = useState<Map<number, string>>(new Map());
  useEffect(() => {
    const st: ReactElement[] = [];
    let lastIdx = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!;
      let content: ReactElement | string = line;
      let name: string = "";
      if (line.includes("[name")) {
        content = line.split("]")[1]!;
        name = line.match(/name=\s*["']([^"]*)["']/)![1]!;
      } else if (line.includes("[Sticker")) {
        const text = line.match(/text=["']([^"]*)["']/);
        if (!text) {
          continue;
        }
        try {
          content = text[1]!.replace("\\n", "");
        } catch (e) {
          console.log("error on [sticker]", line);
        }
      } else if (line.includes("[Decision")) {
        const options = getStoryContentValues(line, "options");
        const values = getStoryContentValues(line, "values");
        let decision = values[0]!;
        if (decisions.has(i)) {
          decision = decisions.get(i)!;
        } else {
          decisions.set(i, decision);
        }
        lastIdx = i;
        content = (
          <RadioGroup
            onValueChange={(val) =>
              setDecisions(new Map(decisions).set(i, val))
            }
            defaultValue={decision}
          >
            {options.map((option, i) => (
              <div key={i}>
                <RadioGroupItem value={values[i]!} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      } else if (line.includes("[Predicate")) {
        const refs = getStoryContentValues(line, "references");
        const last = decisions.get(lastIdx);
        if (last && !refs.includes(last)) {
          while (i < lines.length - 1) {
            i++;
            if (lines[i]!.includes("[Predicate")) {
              i--;
              break;
            }
          }
        }
        continue;
      } else if (line.includes("[")) {
        continue;
      }
      st.push(
        <tr key={i}>
          <td>{name}</td>
          <td>{content}</td>
        </tr>,
      );
    }
    setRenderedContent(st);
  }, [lines, decisions]);
  return renderedContent;
}

export function getStoryContentValues(
  line: string,
  t: "references" | "values" | "options",
): string[] {
  const pattern = new RegExp(`${t}=["']([^"]*)["']`);
  try {
    return line.match(pattern)![1]!.split(";");
  } catch {
    console.log(line, t);
    return [];
  }
}

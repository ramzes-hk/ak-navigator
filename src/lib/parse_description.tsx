import { Blackboard } from "./operators_types";
import { getStyle } from "./rich_text_styles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import { getTerms } from "./term_description";

interface ParsedDescriptionProps {
  description: string;
  blackboard: Blackboard[];
  duration?: number;
  depth?: number;
}

export function ParsedDescription({
  description,
  blackboard,
  duration,
  depth = 0,
}: ParsedDescriptionProps) {
  const out = [];
  const char_buffer = [];
  const styles = getStyle();
  const terms = getTerms();
  description = replaceValues(description, blackboard);
  if (duration) {
    description = description.replace(/{duration}/, String(duration));
  }

  let i = 0;
  while (i < description.length) {
    if (description[i] === "\n") {
      if (char_buffer.length > 0) out.push(char_buffer.join(""));
      char_buffer.length = 0;
      out.push(<br key={i} />);
      i++;
      continue;
    }

    if (description[i] === "<") {
      if (char_buffer.length > 0) out.push(char_buffer.join(""));
      char_buffer.length = 0;

      const style_buffer = [];
      const content_buffer = [];
      let styleKey = "";
      let j = i;

      while (j < description.length && description[j] !== ">") {
        style_buffer.push(description[j]);
        j++;
      }
      style_buffer.push(">");
      styleKey = style_buffer.join("");
      const style = styles[styleKey];
      j++;

      let nestedTags = 1;
      while (j < description.length && nestedTags > 0) {
        if (description[j] === "<" && description[j + 1] === "/") {
          nestedTags--;
          if (nestedTags === 0) {
            while (description[j] !== ">") {
              j++;
            }
            j++;
            break;
          }
        } else if (description[j] === "<") {
          nestedTags++;
        }
        content_buffer.push(description[j]);
        j++;
      }

      const content = content_buffer.join("");
      if (!styleKey.includes("$") || depth > 0) {
        out.push(
          <span
            key={styleKey + i}
            style={{
              color: style,
              fontStyle:
                styleKey.includes("@cc.pn") || styleKey.includes("@ba.pn")
                  ? "italic"
                  : "normal",
            }}
          >
            {content.includes("<") ? (
              <ParsedDescription
                description={content}
                blackboard={blackboard}
                duration={duration}
              />
            ) : (
              content
            )}
          </span>,
        );
      } else {
        out.push(
          <TooltipProvider key={styleKey + i}>
            <Tooltip>
              <TooltipTrigger>
                <span
                  style={{
                    textDecorationLine: "underline",
                    textUnderlineOffset: 2,
                    color: style,
                    fontStyle:
                      styleKey.includes("@cc.pn") || styleKey.includes("@ba.pn")
                        ? "italic"
                        : "normal",
                  }}
                >
                  {content.includes("<") ? (
                    <ParsedDescription
                      description={content}
                      blackboard={blackboard}
                      duration={duration}
                    />
                  ) : (
                    content
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent className="underline">
                <ParsedDescription
                  description={terms[styleKey]?.description ?? ""}
                  blackboard={[]}
                  depth={1}
                />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>,
        );
      }
      i = j;
      continue;
    }
    char_buffer.push(description[i]);
    i++;
  }
  if (char_buffer.length > 0) out.push(char_buffer.join(""));
  return <span>{out}</span>;
}

function replaceValues(description: string, blackboard: Blackboard[]): string {
  let desc = description;
  blackboard.forEach((placeholder) => {
    let value = Math.abs(placeholder.value);
    let pattern = RegExp(
      `\{-*${escapeRegExp(placeholder.key)}(?::0%)?\}`,
      "gi",
    );
    let match = pattern.exec(desc);
    if (match === null) {
      pattern = RegExp(`\{${placeholder.key}\}`, "gi");
      desc = desc.replaceAll(pattern, String(value));
    } else {
      if (match[0].includes("%")) {
        desc = desc.replaceAll(
          match[0],
          Math.round(value * 100).toString() + "%",
        );
      } else {
        desc = desc.replaceAll(match[0], String(value));
      }
    }
  });
  return desc;
}

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

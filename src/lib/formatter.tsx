import React, { ReactNode } from "react";
import { replaceValues } from "./operators";
import { Blackboard } from "./operators_types";

interface CustomProps {
  children: ReactNode;
}

const Up: React.FC<CustomProps> = ({ children }) => {
  return <span style={{ color: "#0098DC" }}>{children}</span>;
};

const Down: React.FC<CustomProps> = ({ children }) => {
  return <span color="#FF6237">{children}</span>;
};

function getComponentForTag(tag: string): React.ComponentType<CustomProps> {
  const components: Record<string, React.ComponentType<CustomProps>> = {
    "@ba.vup": Up,
    "@ba.vdown": Down,
  };
  return components[tag] || Up;
}

function FormattedLine({
  line,
  blackboard,
  duration,
}: {
  line: string;
  blackboard: Blackboard[];
  duration?: number;
}) {
  line = replaceValues(line, blackboard);
  line = duration ? line.replace(/{duration}/, String(duration)) : line;

  const renderTextWithComponents = (text: string) => {
    const regex = /<(\S+)>(.*?)<\/>/g;
    const parts = [];
    let lastIndex = 0;

    text.replace(regex, (match, tagName, content, index) => {
      parts.push(text.slice(lastIndex, index));
      const Component = getComponentForTag(tagName);
      parts.push(<Component key={tagName + index}>{content}</Component>);
      lastIndex = index + match.length;
      return match;
    });
    parts.push(text.slice(lastIndex));

    return parts;
  };
  return <div>{renderTextWithComponents(line)}</div>;
}

export default FormattedLine;

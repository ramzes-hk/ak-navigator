function parseStory(lines: string[]) {
  const out: {
    name: string | undefined;
    content: string;
    type: "i" | undefined;
  }[] = [];
  const decisions: Map<string, string> = new Map();
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!;
    let content: string = line;
    let name: string | undefined = undefined;
    let type: (typeof out)[number]["type"] = undefined;
    if (line.includes("[name")) {
      content = line.split("]")[1]!;
      name = line.match(/name="([^"]*)"/)![1]!;
    } else if (line.includes("[Sticker")) {
      const text = line.match(/text="([^"]*)"/);
      if (!text) {
        continue;
      }
      content = text[1]!.replace("\\n", "");
    } else if (line.includes("[Decision")) {
      const options = line.match(/options="([^"]*)"/)![1]!.split(";");
      const values = line.match(/values="([^"]*)"/)![1]!.split(";");
      for (let j = 0; j < options.length; j++) {
        const value = values[j]!;
        if (decisions.has(value)) {
          decisions.clear();
          out.push({
            name: undefined,
            content: "Choise " + values.join(", "),
            type: type,
          });
        }
        decisions.set(value, options[j]!);
        out.push({ name: "Choise " + value, content: options[j]!, type: type });
      }
      continue;
    } else if (line.includes("[Predicate")) {
      const references = line.match(/references="([^"]*)"/)![1]!.split(";");
      content = "Choise " + references.join(", ");
    } else if (line.includes("[")) {
      continue;
    }
    if (line.includes("<i>")) {
      type = "i";
      content = content.replace("<i>", "");
      content = content.replace("</i>", "");
    }
    out.push({ name: name, content: content, type: type });
  }
  return out;
}

export default parseStory;

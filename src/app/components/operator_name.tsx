"use client";

import { usePopper } from "react-popper";
import { useState } from "react";
interface OperatorNameProps {
  name: string;
}

function OperatorName({ name }: OperatorNameProps) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLHeadingElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "arrow", options: { element: arrowElement } }],
  });
  return (
    <div>
      <h1 ref={setReferenceElement}>{name}</h1>
      <div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        {name}
        <div ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
}
export default OperatorName;

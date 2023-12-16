"use client";
import { useRef, useEffect } from "react";
import { Range } from "@/lib/ranges";

interface canvasRangeProps {
  range: Range;
}

function CanvasRange({ range }: canvasRangeProps) {
  let minW = 0;
  let minH = 0;
  let maxW = 0;
  let maxH = 0;
  range.grids.forEach((grid) => {
    if (grid.col < minW) minW = grid.col;
    if (grid.col > maxW) maxW = grid.col;
    if (grid.row < minH) minH = grid.row;
    if (grid.row > maxH) maxH = grid.row;
  });
  const props = {
    width: (maxW - minW + 1) * 25,
    height: (maxH - minH + 1) * 25,
  };
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    range.grids.forEach((grid) => {
      if (grid.col === 0 && grid.row === 0) {
        ctx.fillRect(
          (grid.col - minW) * 25,
          (grid.row - minH) * 25,
          20,
          20,
        );
      }
      ctx.strokeRect(
        (grid.col - minW) * 25,
        (grid.row - minH) * 25,
        20,
        20,
      );
    });
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      draw(context);
    }
  });
  return <canvas ref={canvasRef} {...props} />;
}

export default CanvasRange;

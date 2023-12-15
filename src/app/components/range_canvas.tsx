"use client";
import { useRef, useEffect } from "react";
import { Range } from "@/lib/ranges";

interface canvasRangeProps {
  grid: Range["grids"];
  sizes: number[];
}

function CanvasRange({grid, sizes}: canvasRangeProps) {
  const minW = sizes[0];
  const minH = sizes[1];
  const maxW = sizes[2];
  const maxH = sizes[3];
  const props = {
    width: (maxW - minW + 1) * 30,
    height: (maxH - minH + 1) * 30,
  }
  const center = {
    v: props.height / 5,
    h: props.width / 5,
  }
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = "#FFFFFF";
    ctx.fillStyle = "#FFFFFF";
    grid.forEach(grid => {
      if (grid.col === 0 && grid.row === 0) {
       ctx.fillRect((grid.col - minW + 0.5) * 25, (grid.row - minH + 0.5) * 25, 20, 20)
      }
      ctx.strokeRect((grid.col - minW + 0.5) * 25, (grid.row - minH + 0.5)  * 25, 20, 20)
    })
  }
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (context) {
      draw(context);
    }
  })
  return <canvas ref={canvasRef} {...props}/>
}

export default CanvasRange;

import { usePrevious } from "@uidotdev/usehooks";
import { Vector2 } from "../types/Vector2.ts";
import { RefObject, useEffect, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

const bendToRight = (
  left: number,
  top: number,
  width: number,
  height: number,
): Vector2[] => [
  [left + width / 2, top],
  [left + width / 2, top + height / 2 - height / 10],
  [left + width * 1.1, top + height / 2],
  [left + width / 4, top + height],
];

const bendToLeft = (
  left: number,
  top: number,
  width: number,
  height: number,
): Vector2[] => [
  [left + width / 2, top],
  [left + width / 2, top + height / 2 - height * 0.1],
  [left - width * 0.1, top + height / 2],
  [left + width / 2, top + height * 0.8],
  [left + width / 4, top + height],
];

interface UsePointsReturn {
  previousPoints: Vector2[];
  points: Vector2[];
}

export const usePoints = (
  ref: RefObject<HTMLElement>,
  size: Vector2,
): UsePointsReturn => {
  const { width = 0, height = 0 } = useResizeObserver({ ref });
  const [points, setPoints] = useState<Vector2[]>([]);
  const previousPoints = usePrevious(points);

  useEffect(() => {
    if (!ref.current || width === 0 || height === 0) return;

    const [left, top] = [ref.current.offsetLeft, ref.current.offsetTop];
    const args: [number, number, number, number] = [left, top, width, height];

    const options = [bendToRight, bendToLeft];
    const randomOption = options[Math.floor(Math.random() * options.length)];
    const newPoints: Vector2[] = randomOption(...args);

    setPoints(newPoints);
  }, [height, ref, width, size]);

  return {
    previousPoints,
    points,
  };
};

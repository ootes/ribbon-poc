import { Vector2 } from "../types/Vector2.ts";
import { RefObject, useEffect, useState } from "react";
import { useResizeObserver } from "usehooks-ts";

export const usePoints = (ref: RefObject<HTMLElement>): Vector2[] => {
  const { width = 0, height = 0 } = useResizeObserver({ ref });
  const [points, setPoints] = useState<Vector2[]>([]);

  useEffect(() => {
    if (!ref.current || width === 0 || height === 0) return;

    const [left, top] = [ref.current.offsetLeft, ref.current.offsetTop];
    const newPoints: Vector2[] = [
      [left + width / 2, top],
      [(left + width) * 1.1, top + height / 2],
      [left + width / 2, top + height / 2 - height / 10],
      [left + width / 4, top + height],
    ];

    setPoints((prevPoints) => [...prevPoints, ...newPoints]);
  }, [height, ref, width]);

  return points;
};

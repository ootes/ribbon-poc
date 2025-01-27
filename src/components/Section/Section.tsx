import { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import "./Section.css";
import { usePath } from "../../contexts/PathContext.tsx";
import { usePoints } from "../../hooks/usePoints.ts";

export const Section: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { addPoints, replacePoints, size } = usePath();
  const { previousPoints, points } = usePoints(ref, size);

  useEffect(() => {
    if (previousPoints) {
      replacePoints(previousPoints, points);
    } else {
      addPoints(points);
    }
  }, [addPoints, points, previousPoints, replacePoints]);

  return (
    <section className="section" ref={ref}>
      {children}
    </section>
  );
};

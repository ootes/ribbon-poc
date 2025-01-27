import { FunctionComponent, ReactNode, useEffect, useRef } from "react";
import "./Section.css";
import { usePath } from "../../contexts/PathContext.tsx";
import { usePoints } from "../../hooks/usePoints.ts";

export const Section: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const points = usePoints(ref);
  const { addPoints } = usePath();

  useEffect(() => {
    addPoints(points);
  }, [addPoints, points]);

  return (
    <section className="section" ref={ref}>
      {children}
    </section>
  );
};

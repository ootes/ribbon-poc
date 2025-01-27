import { Fragment, FunctionComponent, useRef } from "react";
import "./Ribbon.css";
import { usePathTrajectory } from "../../hooks/usePathTrajectory.ts";
import { usePath } from "../../contexts/PathContext.tsx";
import { motion, useScroll, useSpring } from "motion/react";

interface RibbonProps {
  width: number;
  height: number;
}

export const Ribbon: FunctionComponent<RibbonProps> = ({ width, height }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { points } = usePath();
  const trajectory = usePathTrajectory(
    points.sort(([, y1], [, y2]) => y1 - y2),
  );
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [
      [0, 0.5],
      [1, 1],
    ],
  });

  const springScrollYProgress = useSpring(scrollYProgress, {
    damping: 100,
    stiffness: 100,
  });

  return (
    <div ref={ref} className="ribbon-wrapper">
      <svg className="ribbon" viewBox={`0 0 ${width} ${height}`}>
        <motion.path
          d={trajectory}
          className="path"
          strokeDasharray="0 1"
          pathLength={1}
          style={{ pathLength: springScrollYProgress }}
          strokeLinecap="round"
        />

        {points.map(([x, y], i) => (
          <Fragment key={i}>
            <circle key={i} cx={x} cy={y} r={12.5} className="point" />
            <text x={x} y={y} className="point-text" width={25} height={25}>
              {i + 1}
            </text>
          </Fragment>
        ))}
      </svg>
    </div>
  );
};

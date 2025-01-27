import { FunctionComponent, ReactNode, useRef } from "react";
import "./Sections.css";
import { useDebounceCallback, useResizeObserver } from "usehooks-ts";
import { usePath } from "../../contexts/PathContext.tsx";

export const Sections: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const { setSize } = usePath();
  const ref = useRef<HTMLDivElement>(null);

  const onResize = useDebounceCallback(
    ({ width, height }) => setSize([width, height]),
    200,
  );

  useResizeObserver({
    ref,
    onResize,
  });

  return (
    <div className="wrapper" ref={ref}>
      {children}
    </div>
  );
};

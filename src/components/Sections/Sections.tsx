import { FunctionComponent, ReactNode } from "react";
import "./Sections.css";

export const Sections: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <div className="wrapper">{children}</div>;
};

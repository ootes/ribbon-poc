import { Vector2 } from "../types/Vector2.ts";
import {
  createContext,
  FunctionComponent,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

interface PathContextProps {
  points: Vector2[];
  addPoint: (point: Vector2) => void;
  addPoints: (points: Vector2[]) => void;
}

const missing = () => {
  throw new Error("Missing PathContext provider");
};

const PathContext = createContext<PathContextProps>({
  points: [],
  addPoint: missing,
  addPoints: missing,
});

export const PathProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState<Vector2[]>([]);

  const addPoint = useCallback((point: Vector2) => {
    setPoints((prevPoints) => [...prevPoints, point]);
  }, []);

  const addPoints = useCallback((points: Vector2[]) => {
    setPoints((prevPoints) => [...prevPoints, ...points]);
  }, []);

  return (
    <PathContext.Provider value={{ points, addPoint, addPoints }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);

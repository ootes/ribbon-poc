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
  size: Vector2;
  setSize: (point: Vector2) => void;
  addPoint: (point: Vector2) => void;
  addPoints: (dimensions: Vector2[]) => void;
  replacePoints: (previousPoints: Vector2[], newPoints: Vector2[]) => void;
}

const missing = () => {
  throw new Error("Missing PathContext provider");
};

const PathContext = createContext<PathContextProps>({
  points: [],
  addPoint: missing,
  addPoints: missing,
  size: [0, 0],
  setSize: missing,
  replacePoints: missing,
});

export const PathProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const [points, setPoints] = useState<Vector2[]>([]);
  const [size, setSize] = useState<Vector2>([0, 0]);

  const addPoint = useCallback((point: Vector2) => {
    setPoints((prevPoints) => [...prevPoints, point]);
  }, []);

  const addPoints = useCallback((points: Vector2[]) => {
    setPoints((prevPoints) => [...prevPoints, ...points]);
  }, []);

  const replacePoints = useCallback(
    (previousPoints: Vector2[], newPoints: Vector2[]) => {
      setPoints((prev) => [
        ...prev.filter((point) => !previousPoints.includes(point)),
        ...newPoints,
      ]);
    },
    [],
  );

  const handleResize = useCallback((size: Vector2) => {
    setSize(size);
  }, []);

  return (
    <PathContext.Provider
      value={{
        points,
        addPoint,
        addPoints,
        size,
        setSize: handleResize,
        replacePoints,
      }}
    >
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);

import "./App.css";
import { Ribbon } from "./components/Ribbon/Ribbon.tsx";
import { Sections } from "./components/Sections/Sections.tsx";
import { Section } from "./components/Section/Section.tsx";
import { useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import { PathProvider } from "./contexts/PathContext.tsx";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const sections = new Array(4).fill(null);
  const { width = 0, height = 0 } = useResizeObserver({ ref });

  return (
    <PathProvider>
      <div ref={ref}>
        <Ribbon width={width} height={height} />
        <Sections>
          {sections.map((_, i) => (
            <Section key={i}>
              <p>Section {i + 1}</p>
            </Section>
          ))}
        </Sections>
      </div>
    </PathProvider>
  );
}

export default App;

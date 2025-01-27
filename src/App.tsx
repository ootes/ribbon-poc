import "./App.css";
import { Ribbon } from "./components/Ribbon/Ribbon.tsx";
import { Sections } from "./components/Sections/Sections.tsx";
import { Section } from "./components/Section/Section.tsx";
import { PathProvider } from "./contexts/PathContext.tsx";

function App() {
  const sections = new Array(4).fill(null);

  return (
    <PathProvider>
      <Ribbon />
      <Sections>
        {sections.map((_, i) => (
          <Section key={i}>
            <p>Section {i + 1}</p>
          </Section>
        ))}
      </Sections>
    </PathProvider>
  );
}

export default App;

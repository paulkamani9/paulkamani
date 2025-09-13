import { Layout } from "./components/Layout";
import { Hero } from "./pages/Hero";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Projects } from "./pages/Projects";
import { ExperiencePage } from "./pages/Experience";
import { Achievements } from "./pages/Achievements";
import { Contact } from "./pages/Contact";

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperiencePage />
      <Achievements />
      <Contact />
    </Layout>
  );
}

export default App;

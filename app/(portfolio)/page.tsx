import Hero from '../components/Hero';
import About from '../components/About';

import TechStack from '../components/TechStack';
import Certifications from '../components/Certifications';
import Workflow from '../components/Workflow';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Workflow />
      <Certifications />

    </main>
  );
}

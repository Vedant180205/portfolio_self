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
      <section id="skills" data-stacked-section style={{ position: 'relative', overflow: 'hidden' }}>
        <div data-stacked-inner>
          <TechStack />
          <Workflow />
        </div>
      </section>
      <Certifications />
    </main>
  );
}

import AsciiLoader from '../components/AsciiLoader';
import Hero from '../components/Hero';
import About from '../components/About';

import TechStack from '../components/TechStack';
import Certifications from '../components/Certifications';
import Workflow from '../components/Workflow';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <main>
      <AsciiLoader />
      <Hero />
      <About />
      <Projects />
      <section id="skills" data-stacked-section style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-bg-light)', boxShadow: '0 -25px 50px rgba(0, 0, 0, 0.45)' }}>
        <div data-stacked-inner>
          <TechStack />
          <Workflow />
        </div>
      </section>
      <Certifications />
    </main>
  );
}

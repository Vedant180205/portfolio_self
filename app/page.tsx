import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import TechStack from './components/TechStack';
import Certifications from './components/Certifications';
import Workflow from './components/Workflow';
import Projects from './components/Projects';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <TechStack />
      <Workflow />
      <Certifications />
      <Education />
      <Footer />
    </main>
  );
}

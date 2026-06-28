const fs = require('fs');
const path = require('path');

const pageFile = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
const content = fs.readFileSync(pageFile, 'utf8');

// The new imports and data
const topSection = `import { DossierClientWrapper } from '@/app/components/dossier/DossierClientWrapper';
import MusicianSection from '@/app/components/MusicianSection';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import styles from './page.module.css';

// ---------- Data ----------
interface MissionLog {
  id: string;
  name: string;
  year: string;
  role: string;
  achievement: string;
  description: string;
  coordinates: { x: string; y: string };
  image: string;
}

const missionLogs: MissionLog[] = [
  {
    id: 'LOG-01',
    name: 'IO Hackathon 2026',
    year: '2026',
    role: 'Quant Developer',
    achievement: 'WINNER — 3RD PRIZE (IIT GUWAHATI & AQUA)',
    description: 'Secured 3rd Prize at the IO Hackathon 2026, hosted by IIT Guwahati in collaboration with AQUA (Advanced Quantitative Analytics) and organized by the Finance & Economics Club - IIT Guwahati. Worked with Sahil Rane as team QuantDevs. Developed a valuation-driven Python system accelerated via Numba JIT for pricing American options on NVIDIA (NVDA) using Binomial Cox–Ross–Rubinstein (CRR) and Black–Scholes models, live yfinance data, and Sharpe/Sortino ratios.',
    coordinates: { x: '18%', y: '20%' },
    image: '/hackathon_certs/WhatsApp Image 2026-03-08 at 8.48.49 AM.jpeg'
  },
  {
    id: 'LOG-02',
    name: 'Code Sprint',
    year: '2026',
    role: 'Logic & Implementation',
    achievement: 'WINNER — 1ST PLACE (XIE MAHIM)',
    description: 'Secured 1st Place at Code Sprint, a high-pressure 4-hour hackathon hosted at Xavier’s Institute of Engineering, Mahim. Worked with Team CodeRunners alongside Saiprasad Jamdar (Backend & AI lead), Rajnish Rao (Full-Stack & Design), and Sahil Rane (Frontend & Ideation). Contributed to logic building and implementation under extremely tight timelines.',
    coordinates: { x: '30%', y: '68%' },
    image: '/hackathon_certs/codesprint_cert.jpeg'
  },
  {
    id: 'LOG-03',
    name: 'Kaggle Knight',
    year: '2026',
    role: 'Machine Learning Engineer',
    achievement: 'WINNER — 1ST PLACE (IIT JODHPUR)',
    description: 'Secured 1st Place at the Kaggle Knight – 36 Hour ML Hackathon, hosted at IIT Jodhpur, Rajasthan and organized by Prometeo IIT Jodhpur. Partnered with Sahil Rane as Team nightknight, focusing on ML fundamentals, clean execution, and prioritizing clarity and signal over complexity under intense pressure.',
    coordinates: { x: '78%', y: '22%' },
    image: '/hackathon_certs/kagglenight_cert.png'
  },
  {
    id: 'LOG-04',
    name: 'AMUHACKS 5.0',
    year: '2026',
    role: 'Full-Stack Developer',
    achievement: 'WINNER — 1ST PLACE (AMUHACKS)',
    description: 'Secured 1st Place at AMUHACKS 5.0 (4th hackathon win). Worked with Sahil Rane as Team CyberDevs, enduring an intense coding grind and late-night coding sessions to build and launch a fully functional system. Repo: https://lnkd.in/dJUqpzp2',
    coordinates: { x: '82%', y: '70%' },
    image: '/hackathon_certs/Vedant_Patil_CyberDevs.png'
  }
];

// Extracting sketches and photos from current file
`;

const sketchesMatch = content.match(/const sketches: Sketch\[\] = \[([\s\S]*?)\];/);
const col1PhotosMatch = content.match(/const col1Photos = \[([\s\S]*?)\];/);
const col2PhotosMatch = content.match(/const col2Photos = \[([\s\S]*?)\];/);
const col3PhotosMatch = content.match(/const col3Photos = \[([\s\S]*?)\];/);

let dataSection = '';
if (sketchesMatch) dataSection += \`interface Sketch { id: string; src: string; title: string; medium: string; year: string; }\\nconst sketches: Sketch[] = [\${sketchesMatch[1]}];\\n\\n\`;
if (col1PhotosMatch) dataSection += \`const col1Photos = [\${col1PhotosMatch[1]}];\\n\\n\`;
if (col2PhotosMatch) dataSection += \`const col2Photos = [\${col2PhotosMatch[1]}];\\n\\n\`;
if (col3PhotosMatch) dataSection += \`const col3Photos = [\${col3PhotosMatch[1]}];\\n\\n\`;

// Extracting the static sections (Musician, Topper, Artist, Photography, Calculator, Scout, Ending)
// We need to carefully pull them out of the current JSX
const sectionsRegex = /(<MusicianSection \/>[\s\S]*?)(?:<Footer \/>|<\/DossierClientWrapper>|<\/main>)/;
const sectionsMatch = content.match(sectionsRegex);
let staticSections = sectionsMatch ? sectionsMatch[1] : '';

// Wait, the user specifically mentioned NOT including the mission-logs section and the ArtistRef logic.
// In the current file, mission-logs is completely removed and replaced by DossierClientWrapper already!
// Let's just remove any <section className={styles.missionLogsSection} id="mission-logs"> if it exists.
staticSections = staticSections.replace(/<section className=\{styles\.missionLogsSection\} id="mission-logs">[\s\S]*?<\/section>/, '');

const finalFileContent = \`\${topSection}\${dataSection}
export default function DossierPage() {
  const showAllSketches = true; // Hardcoded to true to bypass state error for now
  return (
    <>
      <Navbar />
      <DossierClientWrapper missionLogs={missionLogs}>
        \${staticSections}
      </DossierClientWrapper>
      <Footer />
    </>
  );
}
\`;

fs.writeFileSync(pageFile, finalFileContent);
console.log('Restored DossierPage.tsx structure');

const fs = require('fs');
const path = require('path');

const pageFile = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
const content = fs.readFileSync(pageFile, 'utf8');

const topSection = `import { DossierClientWrapper } from '@/app/components/dossier/DossierClientWrapper';
import MusicianSection from '@/app/components/MusicianSection';
import Image from 'next/image';
import Link from 'next/link';
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

`;

const sketchesIdx = content.indexOf('interface Sketch {');
const funcIdx = content.indexOf('export default function DossierPage');
const dataSection = content.substring(sketchesIdx, funcIdx);

const startSectionsIdx = content.indexOf('<section className={styles.topperSection}');
const endSectionsIdx = content.lastIndexOf('</DossierClientWrapper>');
let sections = content.substring(startSectionsIdx, endSectionsIdx);

// Ensure there is no trailing </div> closing the <div className={styles.dossierContent}> which we removed
sections = sections.replace(/<\/div>\s*$/, '');
// Ensure there is no trailing </main>
sections = sections.replace(/<\/main>\s*$/, '');

const finalFileContent = topSection + dataSection + \`export default function DossierPage() {
  return (
    <DossierClientWrapper missionLogs={missionLogs}>
      <MusicianSection />
      \` + sections + \`
    </DossierClientWrapper>
  );
}
\`;

fs.writeFileSync(pageFile, finalFileContent);
console.log('Restored DossierPage.tsx correctly');

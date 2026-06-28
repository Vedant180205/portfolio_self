const fs = require('fs');
const path = require('path');

const dossierPath = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
let content = fs.readFileSync(dossierPath, 'utf8');

// 1. Replace imports
content = content.replace(/'use client';\s+import { useState, useEffect, useRef } from 'react';/, 
`import { DossierClientWrapper } from '../components/dossier/DossierClientWrapper';`);
content = content.replace(/import { useNearViewport } from '\.\.\/hooks\/useNearViewport';\s*/, '');

// 2. We need to replace `export default function DossierPage() {` up to `<section className={styles.topperSection}`
const functionStart = content.indexOf('export default function DossierPage() {');
const topperSectionStart = content.indexOf('<section className={styles.topperSection}');

if (functionStart !== -1 && topperSectionStart !== -1) {
  const newHeader = `export default function DossierPage() {
  return (
    <DossierClientWrapper missionLogs={missionLogs}>
      <div className={styles.dossierContent}>
        `;
  content = content.substring(0, functionStart) + newHeader + content.substring(topperSectionStart);
  
  // 3. Fix the closing brackets. We just need to replace the last `</div>\n      )\n    </main>\n  );\n}`
  // with `</div>\n    </DossierClientWrapper>\n  );\n}`
  content = content.replace(/<\/div>\s*\)\s*:\s*null}\s*<\/main>\s*\);\s*}/g, 
  `</div>\n    </DossierClientWrapper>\n  );\n}`);
  
  // Actually, the original file ends with:
  /*
        </div>
      )}
    </main>
  );
  }
  */
  // Let's just use a regex for the end:
  content = content.replace(/<\/div>\s*\}\)\s*<\/main>\s*\);\s*\}/s, `</div>\n    </DossierClientWrapper>\n  );\n}`);
  content = content.replace(/<\/div>\s*\)\s*<\/main>\s*\);\s*\}/s, `</div>\n    </DossierClientWrapper>\n  );\n}`);
  content = content.replace(/<\/div>\s*\}\s*<\/main>\s*\);\s*\}/s, `</div>\n    </DossierClientWrapper>\n  );\n}`);
  
  // Let's just blindly replace the last few lines:
  const lastMain = content.lastIndexOf('</main>');
  if (lastMain !== -1) {
      // Find the start of the `{!accessGranted ? (` logic
      // But we already removed it in step 2!
      // The current content from step 2 replaced up to topperSection.
      // So at the end, we just have a bunch of closing tags.
      
      content = content.substring(0, lastMain); // remove </main> and everything after
      content += `</div>\n    </DossierClientWrapper>\n  );\n}\n`;
  }

  fs.writeFileSync(dossierPath, content, 'utf8');
  console.log("Successfully refactored DossierPage!");
} else {
  console.log("Could not find start/end markers");
}

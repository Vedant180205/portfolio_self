const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

const marker = '{activeCert && (';
const idx = content.indexOf(marker);

if (idx !== -1) {
  content = content.substring(0, idx) + `    </DossierClientWrapper>
  );
}`;
  fs.writeFileSync(file, content);
  console.log('Fixed end of DossierPage');
} else {
  console.log('Could not find activeCert marker');
}

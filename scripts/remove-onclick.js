const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/onClick=\{.*?\}/g, '');
// Also remove role="button", tabIndex={0} and aria-label if they were just for the modal
content = content.replace(/role="button"/g, '');
content = content.replace(/tabIndex=\{0\}/g, '');
content = content.replace(/aria-label="View First Year Topper Certificate"/g, '');
content = content.replace(/onKeyDown=\{.*?\}/g, '');

fs.writeFileSync(file, content);
console.log('Removed onClick handlers from Server Component');

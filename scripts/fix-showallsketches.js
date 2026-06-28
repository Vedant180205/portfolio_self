const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Replace {showAllSketches && ( with just empty, and remove the closing tags
content = content.replace(/\{showAllSketches && \(/g, '');
content = content.replace(/<button[\s\S]*?onClick=\{.*setShowAllSketches.*\}[\s\S]*?<\/button>/g, '');
// There's probably a `)}` closing the showAllSketches block.
// Wait, I can just hardcode showAllSketches to true at the top of the component!
content = content.replace(/export default function DossierPage\(\) \{/, "export default function DossierPage() {\n  const showAllSketches = true;");

fs.writeFileSync(file, content);
console.log('Fixed showAllSketches in DossierPage');

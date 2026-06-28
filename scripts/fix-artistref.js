const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'app', 'dossier', 'page.tsx');
let content = fs.readFileSync(file, 'utf8');

// Remove ref={artistRef}
content = content.replace(/ref=\{artistRef\}/g, '');

// Fix conditional classes using isArtistInView
// e.g. className={`${styles.artistSection} ${isArtistInView ? styles.artistVisible : ''}`}
// We can just replace isArtistInView with true or just simplify it
content = content.replace(/\$\{isArtistInView \? styles\.artistVisible : ''\}/g, '');
content = content.replace(/\$\{isArtistInView \? styles\.artistTitleAnim : ''\}/g, '');
content = content.replace(/\$\{isArtistInView \? styles\.artistSubtitleAnim : ''\}/g, '');
content = content.replace(/\$\{isArtistInView \? styles\.sketchAnim : ''\}/g, '');

// Also remove empty template literals if any were created
content = content.replace(/className=\{`([^`]*)`\}/g, (match, p1) => {
    let cleaned = p1.trim();
    return cleaned ? `className="${cleaned}"` : '';
});

// Fix setExpandedSketch
content = content.replace(/onClick=\{.*setExpandedSketch.*?\}/g, '');
content = content.replace(/onClick=\{.*setActiveCert.*?\}/g, '');

fs.writeFileSync(file, content);
console.log('Fixed artistRef and isArtistInView in DossierPage');

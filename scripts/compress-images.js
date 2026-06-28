const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', 'public');

const compressQueue = [
  { src: 'images/avatar/vedant.png', dest: 'images/avatar/vedant.webp', width: 600, quality: 75 },
  { src: 'ui/logo-new.png', dest: 'ui/logo-new.webp', width: 150, quality: 60 },
  { src: 'ui/logo-education.png', dest: 'ui/logo-education.webp', width: 150, quality: 60 },
  { src: 'images/education/hero_bg_custom.png', dest: 'images/education/hero_bg_custom.webp', quality: 75 },
  { src: 'images/education/journey_continues.png', dest: 'images/education/journey_continues.webp', quality: 75 },
  { src: 'images/education/sakec-v2.png', dest: 'images/education/sakec-v2.webp', quality: 75 },
  { src: 'certs/Untitled design (1).png', dest: 'certs/Untitled design (1).webp', quality: 75 },
  { src: 'certs/scout_cert.png', dest: 'certs/scout_cert.webp', quality: 75 }
];

async function run() {
  console.log('Starting image compression...');
  for (const item of compressQueue) {
    const srcPath = path.join(ROOT_DIR, item.src);
    const destPath = path.join(ROOT_DIR, item.dest);
    
    if (fs.existsSync(srcPath)) {
      console.log(`Compressing ${item.src}...`);
      let instance = sharp(srcPath).webp({ quality: item.quality });
      if (item.width) {
        instance = instance.resize({ width: item.width });
      }
      await instance.toFile(destPath);
      console.log(`-> Saved to ${item.dest}`);
    } else {
      console.log(`NOT FOUND: ${item.src}`);
    }
  }

  // Delete duplicate logo.png if it exists
  const dupLogo = path.join(ROOT_DIR, 'ui/logo.png');
  if (fs.existsSync(dupLogo)) {
    fs.unlinkSync(dupLogo);
    console.log('Deleted duplicate ui/logo.png');
  }
  
  console.log('Done!');
}

run().catch(console.error);

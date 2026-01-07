const sharp = require('sharp');
const fs = require('fs');

async function generateFavicon() {
  const inputPath = 'assets/uploads/favicon.svg';
  const outputPath = '_site/favicon.ico'; // Also write to root of repo if needed, but _site is for build
  const repoRootPath = 'favicon.ico';

  try {
    const buffer = await sharp(inputPath)
      .resize(32, 32)
      .toFormat('png')
      .toBuffer();
    
    // sharp doesn't natively write .ico, but a 32x32 PNG renamed to .ico is often accepted by modern browsers,
    // or we can just provide the PNG. For a true ICO we'd need another lib, but let's try this first.
    fs.writeFileSync(repoRootPath, buffer);
    console.log('Favicon generated at root.');
    
    if (fs.existsSync('_site')) {
        fs.writeFileSync('_site/favicon.ico', buffer);
        console.log('Favicon generated in _site.');
    }
  } catch (err) {
    console.error('Error generating favicon:', err);
  }
}

generateFavicon();

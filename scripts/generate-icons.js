const path = require('path');
const fs = require('fs');

async function generate() {
  try {
    const sharp = require('sharp');
    const source = path.resolve(__dirname, '../public/sitemap.webp');
    const iconsDir = path.resolve(__dirname, '../public/icons');
    if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

    const sizes = [192, 512];
    for (const size of sizes) {
      const out = path.join(iconsDir, `icon-${size}.png`);
      await sharp(source).resize(size, size, { fit: 'cover' }).png().toFile(out);
      console.log(`Created ${out}`);
    }

    // Create a simple any-size icon copy
    const outAny = path.join(iconsDir, 'icon-any.png');
    await sharp(source).resize(512, 512, { fit: 'cover' }).png().toFile(outAny);
    console.log(`Created ${outAny}`);
  } catch (err) {
    console.error('Make sure you have node and sharp installed: npm i -D sharp');
    console.error(err);
    process.exit(1);
  }
}

generate();

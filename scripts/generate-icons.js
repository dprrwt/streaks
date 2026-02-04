import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

if (!existsSync(publicDir)) mkdirSync(publicDir, { recursive: true });

// Create a simple icon with fire emoji representation
const createIcon = async (size, filename) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#0a0a0a"/>
    <text x="${size/2}" y="${size * 0.7}" font-size="${size * 0.5}" text-anchor="middle" font-family="system-ui">🔥</text>
  </svg>`;
  
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(join(publicDir, filename));
  
  console.log(`Generated ${filename}`);
};

await createIcon(192, 'pwa-192x192.png');
await createIcon(512, 'pwa-512x512.png');
await createIcon(180, 'apple-touch-icon.png');

console.log('All icons generated!');

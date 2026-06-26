import sharp from "sharp";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Pencil tip is exactly at (3, 45) in 48x48
// Coordinates scaled 1.5× from original 32×32 SVG design
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <defs>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0.8" dy="1" stdDeviation="0.8" flood-color="#0d0d1a" flood-opacity="0.35"/>
    </filter>
  </defs>

  <g filter="url(#sh)">
    <!-- Graphite tip -->
    <polygon points="3,45 9,39 12,42" fill="#4A5568"/>

    <!-- Wood cone -->
    <polygon points="9,39 12,42 17,38 14,35" fill="#B08B6E"/>
    <line x1="9.5" y1="39.5" x2="14.5" y2="34.5" stroke="#CEAD92" stroke-width="1.1" stroke-linecap="round" opacity="0.8"/>

    <!-- Pencil body -->
    <polygon points="14,35 17,38 36,18 33,15" fill="#FFD04E"/>
    <line x1="14.8" y1="34" x2="33.8" y2="15" stroke="#FFF0A0" stroke-width="1.4" stroke-linecap="round" opacity="0.5"/>

    <!-- Metal ferrule -->
    <polygon points="33,15 36,18 39,15 36,12" fill="#A0B4BE"/>
    <line x1="33.5" y1="15.5" x2="36.5" y2="12.5" stroke="#DDE8EC" stroke-width="1.4" stroke-linecap="round" opacity="0.9"/>

    <!-- Eraser -->
    <polygon points="36,12 39,15 42,12 39,9" fill="#F687B3"/>
    <line x1="36.5" y1="12.5" x2="39.5" y2="9.5" stroke="#FEC5DC" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
  </g>

  <!-- Outer outline as single path -->
  <path d="M3,45 L12,42 L17,38 L36,18 L39,15 L42,12 L39,9 L36,12 L33,15 L14,35 L9,39 Z"
    fill="none" stroke="#1E293B" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
  <!-- Internal dividers -->
  <line x1="9" y1="39" x2="12" y2="42" stroke="#1E293B" stroke-width="1" opacity="0.55"/>
  <line x1="14" y1="35" x2="17" y2="38" stroke="#1E293B" stroke-width="1" opacity="0.55"/>
  <line x1="33" y1="15" x2="36" y2="18" stroke="#1E293B" stroke-width="1" opacity="0.55"/>
  <line x1="36" y1="12" x2="39" y2="15" stroke="#1E293B" stroke-width="1" opacity="0.55"/>
</svg>`;

const outPath = path.join(__dirname, "../public/cursor-pencil.png");
await sharp(Buffer.from(svg)).png().toFile(outPath);

console.log("cursor-pencil.png created — tip at (3, 45) in 48×48");

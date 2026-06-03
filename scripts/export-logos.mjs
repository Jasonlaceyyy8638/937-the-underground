/**
 * One-off export script — renders SVG logos to 1200×1200 PNG/JPEG.
 * Run: node scripts/export-logos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public");
const size = 1200;

function renderSvgToPng(svgPath, outputWidth) {
  const svg = fs.readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: outputWidth },
    font: {
      loadSystemFonts: true,
    },
  });
  return resvg.render().asPng();
}

async function writePngAndJpeg(baseName, pngBuffer) {
  const pngPath = path.join(publicDir, `${baseName}.png`);
  const jpgPath = path.join(publicDir, `${baseName}.jpg`);
  const jpegPath = path.join(publicDir, `${baseName}.jpeg`);

  fs.writeFileSync(pngPath, pngBuffer);

  const jpegBuffer = await sharp(pngBuffer).jpeg({ quality: 92 }).toBuffer();
  fs.writeFileSync(jpgPath, jpegBuffer);
  fs.writeFileSync(jpegPath, jpegBuffer);

  const meta = await sharp(pngBuffer).metadata();
  console.log(`✓ ${baseName}: ${meta.width}x${meta.height}px → .png, .jpg, .jpeg`);
}

async function exportSquareIcon() {
  const png = renderSvgToPng(path.join(publicDir, "logo-icon.svg"), size);
  await writePngAndJpeg("logo-icon-1200", png);

  // Smaller default icon for site favicon/downloads page
  const icon512 = renderSvgToPng(path.join(publicDir, "logo-icon.svg"), 512);
  fs.writeFileSync(path.join(publicDir, "logo-icon.png"), icon512);
  console.log("✓ logo-icon.png: 512x512px");
}

async function exportHorizontalOnSquareCanvas(svgFile, baseName) {
  const svgPath = path.join(publicDir, svgFile);
  const rendered = renderSvgToPng(svgPath, size - 160);
  const meta = await sharp(rendered).metadata();
  const top = Math.round((size - meta.height) / 2);

  const squarePng = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([{ input: rendered, top, left: 80 }])
    .png()
    .toBuffer();

  await writePngAndJpeg(baseName, squarePng);

  const headerPng = renderSvgToPng(svgPath, 720);
  fs.writeFileSync(path.join(publicDir, "logo937.png"), headerPng);
  console.log("✓ logo937.png: header width 720px");
}

async function main() {
  await exportSquareIcon();
  await exportHorizontalOnSquareCanvas("logo.svg", "logo-1200");
  await exportHorizontalOnSquareCanvas("logo-horizontal.svg", "logo-horizontal-1200");

  console.log("\nDone — files saved to public/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import sharp from "sharp";
import { statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const inputPath = resolve(rootDir, "public/images/profile.jpg");
const outputPath = resolve(rootDir, "public/images/profile.webp");

async function optimizeProfile() {
  console.log(`Reading input: ${inputPath}`);
  const inputStats = statSync(inputPath);
  console.log(`Original size: ${(inputStats.size / (1024 * 1024)).toFixed(2)} MB (${inputStats.size} bytes)`);

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);

  // Resize so longest side is 880px, keep aspect ratio
  await image
    .resize({
      width: 880,
      height: 880,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 82 })
    .toFile(outputPath);

  const outputStats = statSync(outputPath);
  const outputKb = (outputStats.size / 1024).toFixed(2);
  console.log(`Optimized output: ${outputPath}`);
  console.log(`Output size: ${outputKb} KB (${outputStats.size} bytes)`);

  if (outputStats.size < 150 * 1024) {
    console.log("✓ Success: File is under 150 KB target.");
  } else {
    console.warn("⚠ Warning: File exceeds 150 KB target.");
  }
}

optimizeProfile().catch((err) => {
  console.error("Optimization failed:", err);
  process.exit(1);
});

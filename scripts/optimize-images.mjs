import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = path.resolve(process.cwd());
const imagesDir = path.join(projectRoot, 'public', 'images');
const outDir = path.join(imagesDir, 'opt');

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function listPngs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const ent of entries) {
    if (ent.isFile() && ent.name.toLowerCase().endsWith('.png')) {
      files.push(path.join(dir, ent.name));
    }
  }
  return files;
}

async function main() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('[optimize-images] sharp not available; skipping image optimization');
    return;
  }

  if (!(await pathExists(imagesDir))) {
    console.warn('[optimize-images] public/images not found; skipping');
    return;
  }

  await ensureDir(outDir);

  const pngs = await listPngs(imagesDir);
  if (pngs.length === 0) {
    console.warn('[optimize-images] no PNGs found; skipping');
    return;
  }

  const sizes = [640, 1280];

  for (const filePath of pngs) {
    const fileName = path.basename(filePath);
    if (fileName.toLowerCase().endsWith('.min.png')) continue;

    const baseName = fileName.slice(0, -'.png'.length);

    if (filePath.includes(path.sep + 'opt' + path.sep)) continue;

    const inStat = await fs.stat(filePath);

    for (const width of sizes) {
      const outPath = path.join(outDir, `${baseName}-${width}.webp`);
      const outExists = await pathExists(outPath);

      if (outExists) {
        const outStat = await fs.stat(outPath);
        if (outStat.mtimeMs >= inStat.mtimeMs) continue;
      }

      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(outPath);

      console.log(`[optimize-images] ${fileName} -> opt/${baseName}-${width}.webp`);
    }
  }
}

main().catch((err) => {
  console.warn('[optimize-images] failed; continuing without optimization');
  console.warn(err);
});

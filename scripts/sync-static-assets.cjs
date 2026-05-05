const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");

const annualDaySourceDir = path.join(
  rootDir,
  "ANNAUAL DAY 2025 PHOTOS",
  "ANNAUAL DAY 2025 PHOTOS"
);
const annualDayTargetDir = path.join(rootDir, "public", "annual-day-2025");
const culturalManifestPath = path.join(rootDir, "src", "data", "culturalImages.js");
const culturalPublicManifestPath = path.join(annualDayTargetDir, "manifest.json");
const annualDayThumbDir = path.join(annualDayTargetDir, "thumbs");

const resolveAnnualDayManifestSourceDir = () => {
  if (fs.existsSync(annualDaySourceDir)) {
    return annualDaySourceDir;
  }

  if (fs.existsSync(annualDayTargetDir)) {
    return annualDayTargetDir;
  }

  return null;
};

const syncDirectory = (sourceDir, targetDir) => {
  if (!fs.existsSync(sourceDir)) {
    return false;
  }

  fs.mkdirSync(targetDir, { recursive: true });

  const sourceEntries = new Set(fs.readdirSync(sourceDir));

  for (const targetEntry of fs.readdirSync(targetDir)) {
    if (targetEntry === "thumbs" || targetEntry === "manifest.json") {
      continue;
    }

    if (!sourceEntries.has(targetEntry)) {
      fs.rmSync(path.join(targetDir, targetEntry), { recursive: true, force: true });
    }
  }

  for (const entry of sourceEntries) {
    const sourcePath = path.join(sourceDir, entry);
    const targetPath = path.join(targetDir, entry);
    const sourceStat = fs.statSync(sourcePath);

    if (sourceStat.isDirectory()) {
      syncDirectory(sourcePath, targetPath);
      continue;
    }

    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }

    fs.copyFileSync(sourcePath, targetPath);
  }

  return true;
};

const writeCulturalManifest = (sourceDir) => {
  if (!sourceDir || !fs.existsSync(sourceDir)) {
    console.log("No Annual Day 2025 photos folder found. Skipping cultural manifest generation.");
    return;
  }

  const files = fs
    .readdirSync(sourceDir)
    .filter((fileName) => fs.statSync(path.join(sourceDir, fileName)).isFile())
    .filter((fileName) => fileName.toLowerCase() !== "manifest.json")
    .sort((left, right) => left.localeCompare(right));

  const imageLines = files.map((fileName) => `  '/annual-day-2025/${fileName}',`);
  const imageEntries = files.map((fileName) => {
    const thumbnailPath = path.join(annualDayThumbDir, fileName);

    return {
      full: `/annual-day-2025/${fileName}`,
      thumbnail: fs.existsSync(thumbnailPath)
        ? `/annual-day-2025/thumbs/${fileName}`
        : `/annual-day-2025/${fileName}`,
    };
  });
  const manifest = `export const culturalAnnualDayImages = [\n${imageLines.join("\n")}\n];\n\nexport const culturalAnnualDayPrimaryImage = culturalAnnualDayImages[0] || null;\n`;
  const publicManifest = JSON.stringify(
    {
      images: imageEntries,
      primaryImage: imageEntries[0] || null,
      total: files.length,
    },
    null,
    2
  );

  fs.writeFileSync(culturalManifestPath, manifest);
  fs.mkdirSync(annualDayTargetDir, { recursive: true });
  fs.writeFileSync(culturalPublicManifestPath, publicManifest);
  console.log(`Generated cultural image manifest with ${files.length} photos at ${culturalManifestPath}`);
};

if (syncDirectory(annualDaySourceDir, annualDayTargetDir)) {
  console.log(`Synced Annual Day 2025 photos from ${annualDaySourceDir} to ${annualDayTargetDir}`);
} else {
  console.log("No raw Annual Day 2025 photos folder found. Using existing public annual-day-2025 assets.");
}

writeCulturalManifest(resolveAnnualDayManifestSourceDir());

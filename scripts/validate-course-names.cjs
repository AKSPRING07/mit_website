const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const srcRoot = path.join(projectRoot, "src");

const requiredNames = [
  "DIPLOMA IN ELECTRICAL ELECTRONICS ENGINEERING",
  "DIPLOMA IN MECHANICAL ENGINEERING",
  "DIPLOMA IN AI & ML",
  "DIPLOMA IN ELECTRICAL ENGINEERING & ELECTRICAL VEHICLE TECHNOLOGY",
  "DIPLOMA IN MEDICAL LABORATORY TECHNOLOGY",
  "WIREMAN",
  "SURVEYOR",
  "COPA",
];

const forbiddenNames = [
  "Diploma in EEE (DEEE)",
  "Diploma in Mechanical (DME)",
  "Diploma in DMLT",
  "Diploma in EV Technology",
  "Diploma in EV Technology (DEE & EVT)",
  "Diploma in Electrical & Electronics Engineering",
  "Diploma in Electrical and Electronics Engineering",
  "Diploma in Mechanical Engineering",
  "Diploma in Artificial Intelligence and Machine Learning",
  "Diploma in Medical Laboratory Technology",
  "Mechanical Engineering (DME)",
  "Electrical and Electronics Engineering (DEEE)",
  "Artificial Intelligence and Machine Learning (AI & ML)",
  "Medical Laboratory Technology (DMLT)",
  "Electrical Engineering & Electrical Vehicle Technology (DEE & EVT)",
  "Computer Operator & Programming Assistant (COPA)",
  "ITI - Wireman",
  "ITI - Surveyor",
  "ITI - COPA",
  "Computer Engineering",
  "Civil Engineering",
  "Electronics & Communication",
  "Computer Science",
  "Electrician",
  "Welder",
  "Fitter",
  "Wire Man",
  "DILOMA",
];

const allowedAliasFile = path.join(srcRoot, "data", "mitPrograms.js");
const fileExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
      continue;
    }

    if (fileExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

const filesToScan = walk(srcRoot).filter((filePath) => filePath !== allowedAliasFile);
const violations = [];

for (const filePath of filesToScan) {
  const content = fs.readFileSync(filePath, "utf8");

  for (const forbiddenName of forbiddenNames) {
    if (content.includes(forbiddenName)) {
      violations.push({
        file: path.relative(projectRoot, filePath),
        forbiddenName,
      });
    }
  }
}

const canonicalFile = fs.readFileSync(allowedAliasFile, "utf8");
const missingRequiredNames = requiredNames.filter(
  (requiredName) => !canonicalFile.includes(requiredName)
);

if (violations.length > 0 || missingRequiredNames.length > 0) {
  if (violations.length > 0) {
    console.error("Found legacy or disallowed course names:");
    violations.forEach((violation) => {
      console.error(`- ${violation.file}: ${violation.forbiddenName}`);
    });
  }

  if (missingRequiredNames.length > 0) {
    console.error("Missing canonical course names:");
    missingRequiredNames.forEach((requiredName) => {
      console.error(`- ${requiredName}`);
    });
  }

  process.exit(1);
}

console.log("Course name validation passed.");

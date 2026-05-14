export const MIT_PROGRAMS = Object.freeze([
  {
    slug: "deee",
    category: "Diploma",
    courseType: "polytechnic",
    title: "DIPLOMA IN ELECTRICAL ELECTRONICS ENGINEERING",
    badge: "DIPLOMA",
    duration: "3 Years",
    qualification: "10th pass or equivalent",
    seats: 60,
    semesters: 6,
    summary:
      "Power systems, electrical machines, electronics, wiring practice, and industrial maintenance training.",
    aliases: [
      "Diploma in EEE (DEEE)",
      "Diploma in Electrical & Electronics Engineering",
      "Diploma in Electrical and Electronics Engineering",
      "Electrical and Electronics Engineering (DEEE)",
      "EEE (Electrical and Electronics Engineering)",
    ],
  },
  {
    slug: "dme",
    category: "Diploma",
    courseType: "polytechnic",
    title: "DIPLOMA IN MECHANICAL ENGINEERING",
    badge: "DIPLOMA",
    duration: "3 Years",
    qualification: "10th pass or equivalent",
    seats: 60,
    semesters: 6,
    summary:
      "Machines, manufacturing systems, workshop practice, CAD exposure, and industrial maintenance skills.",
    aliases: [
      "Diploma in Mechanical (DME)",
      "Diploma in Mechanical Engineering",
      "Mechanical Engineering (DME)",
      "Mechanical Engineering",
    ],
  },
  {
    slug: "aiml",
    category: "Diploma",
    courseType: "polytechnic",
    title: "DIPLOMA IN AI & ML",
    badge: "DIPLOMA",
    duration: "3 Years",
    qualification: "10th pass or equivalent",
    seats: 60,
    semesters: 6,
    summary:
      "Programming, data handling, applied artificial intelligence concepts, and project-based digital skills.",
    aliases: [
      "Diploma in AI & ML",
      "Diploma in Artificial Intelligence and Machine Learning",
      "Artificial Intelligence and Machine Learning (AI & ML)",
      "AI & ML",
    ],
  },
  {
    slug: "ev-tech",
    category: "Diploma",
    courseType: "polytechnic",
    title: "DIPLOMA IN ELECTRICAL ENGINEERING & ELECTRICAL VEHICLE TECHNOLOGY",
    badge: "DIPLOMA",
    duration: "3 Years",
    qualification: "10th pass or equivalent",
    seats: 60,
    semesters: 6,
    summary:
      "Electrical engineering fundamentals, EV systems, batteries, charging infrastructure, and diagnostics.",
    aliases: [
      "Diploma in EV Technology",
      "Diploma in EV Technology (DEE & EVT)",
      "Electrical Engineering & Electrical Vehicle Technology (DEE & EVT)",
      "DEE & EVT (Diploma in Electrical Engineering & Electric Vehicle Technology)",
      "DILOMA IN ELECTRICAL ENGINEERING & ELECTRICAL VEHICLE TECHNOLOGY",
    ],
  },
  {
    slug: "dmlt",
    category: "Diploma",
    courseType: "polytechnic",
    title: "DIPLOMA IN MEDICAL LABORATORY TECHNOLOGY",
    badge: "DIPLOMA",
    duration: "3 Years",
    qualification: "10th pass or equivalent",
    seats: 60,
    semesters: 6,
    summary:
      "Clinical diagnostics, laboratory procedures, sample handling, and safety-focused healthcare support training.",
    aliases: [
      "Diploma in DMLT",
      "Diploma in Medical Laboratory Technology",
      "Medical Laboratory Technology (DMLT)",
      "DMLT (Diploma in Medical Laboratory Technology)",
    ],
  },
  {
    slug: "wireman",
    category: "ITI",
    courseType: "iti",
    title: "WIREMAN",
    badge: "ITI",
    duration: "2 Years",
    qualification: "8th class pass",
    seats: 24,
    semesters: 2,
    summary:
      "Domestic and industrial wiring, installation methods, electrical safety, and hands-on field practice.",
    aliases: ["Wireman", "Wire Man", "ITI - Wireman"],
  },
  {
    slug: "surveyor",
    category: "ITI",
    courseType: "iti",
    title: "SURVEYOR",
    badge: "ITI",
    duration: "2 Years",
    qualification: "10th pass only",
    seats: 24,
    semesters: 2,
    summary:
      "Land measurement, leveling, mapping, field survey practice, and site documentation support.",
    aliases: ["Surveyor", "ITI - Surveyor"],
  },
  {
    slug: "copa",
    category: "ITI",
    courseType: "iti",
    title: "COPA",
    badge: "ITI",
    duration: "1 Year",
    qualification: "10th pass only",
    seats: 24,
    semesters: 1,
    summary:
      "Computer operation, office applications, introductory programming, and practical digital workplace skills.",
    aliases: [
      "Computer Operator & Programming Assistant (COPA)",
      "COPA (Computer Operator and Programming Assistant)",
      "COPA",
    ],
  },
]);

export const mitProgramBySlug = new Map(
  MIT_PROGRAMS.map((program) => [program.slug, program])
);

const legacyProgramNameMap = new Map();

MIT_PROGRAMS.forEach((program) => {
  legacyProgramNameMap.set(program.title, program.title);
  program.aliases.forEach((alias) => legacyProgramNameMap.set(alias, program.title));
});

export const diplomaPrograms = MIT_PROGRAMS.filter(
  (program) => program.category === "Diploma"
);

export const itiPrograms = MIT_PROGRAMS.filter(
  (program) => program.category === "ITI"
);

export const polytechnicCourseOptions = diplomaPrograms.map((program) => ({
  value: program.slug,
  label: program.title,
}));

export const itiCourseOptions = itiPrograms.map((program) => ({
  value: program.slug,
  label: program.title,
}));

export const departmentRecords = MIT_PROGRAMS.map((program, index) => ({
  id: index + 1,
  documentId: program.slug,
  slug: program.slug,
  name: program.title,
  title: program.title,
  category: program.category,
  description: program.summary,
  order: index + 1,
}));

export const normalizeProgramName = (name) => {
  if (typeof name !== "string") return name;
  return legacyProgramNameMap.get(name.trim()) || name;
};

export const normalizeCourseRecord = (record) => {
  if (!record) return record;

  const meta =
    mitProgramBySlug.get(record.slug) ||
    MIT_PROGRAMS.find((program) => normalizeProgramName(record.title) === program.title) ||
    MIT_PROGRAMS.find((program) => normalizeProgramName(record.name) === program.title);

  if (!meta) {
    return record;
  }

  return {
    ...record,
    slug: meta.slug,
    category: meta.category,
    title: meta.title,
    name: meta.title,
    shortTitle: meta.badge,
    description: meta.summary,
    duration: record.duration || meta.duration,
    seats: record.seats ?? meta.seats,
    semesters: record.semesters ?? meta.semesters,
  };
};

export const normalizeDepartmentRecord = (record) => {
  if (!record) return record;

  const meta =
    mitProgramBySlug.get(record.slug) ||
    MIT_PROGRAMS.find((program) => normalizeProgramName(record.name) === program.title) ||
    MIT_PROGRAMS.find((program) => normalizeProgramName(record.title) === program.title);

  if (!meta) {
    return record;
  }

  return {
    ...record,
    slug: meta.slug,
    name: meta.title,
    title: meta.title,
    category: meta.category,
    description: record.description || meta.summary,
  };
};

export const approvedDiplomaCourseNames = diplomaPrograms.map(
  (program) => program.title
);

import courseThumb1 from "../assets/img/home_1/about_img_1.jpg";
import courseThumb2 from "../assets/img/home_1/event_thumb_1.jpg";
import courseThumb3 from "../assets/img/home_1/post_1.jpg";
import courseThumb4 from "../assets/img/home_1/post_2.jpg";
import courseThumb5 from "../assets/img/home_1/about_img_2.jpg";
import courseThumb6 from "../assets/img/home_1/event_thumb_2.jpg";
import courseThumb7 from "../assets/img/home_1/event_thumb_3.jpg";
import courseThumb8 from "../assets/img/home_1/event_thumb_4.jpg";
import { mitProgramBySlug } from "./mitPrograms";

const makeCourse = (course) => ({
  ...course,
  name: course.title,
  detailLink: `/course-details/${course.slug}`,
});

export const diplomaCourses = [
  makeCourse({
    slug: "deee",
    category: "Diploma",
    title: mitProgramBySlug.get("deee").title,
    shortTitle: mitProgramBySlug.get("deee").badge,
    description: mitProgramBySlug.get("deee").summary,
    overview:
      "This diploma program builds a strong foundation in electrical circuits, machines, wiring systems, and electronics. Students learn through classroom teaching, workshop practice, and laboratory work that prepares them for electrical maintenance and technical service roles.",
    highlights: [
      "Electrical circuit fundamentals and machine basics",
      "Practical lab work in wiring, testing, and measurements",
      "Core electronics and control systems exposure",
      "Skill development for power and maintenance careers",
    ],
    eligibility: ["10th pass or equivalent", "Interest in electrical systems"],
    curriculum: [
      "Basic electrical engineering",
      "Electronics and digital systems",
      "Electrical machines and maintenance",
      "Workshop and practical training",
    ],
    careerPaths: [
      "Electrical technician",
      "Maintenance assistant",
      "Field service support",
      "Further study in electrical engineering",
    ],
    seats: mitProgramBySlug.get("deee").seats,
    semesters: mitProgramBySlug.get("deee").semesters,
    duration: mitProgramBySlug.get("deee").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb1,
    accent: "Electrical systems and power training",
  }),
  makeCourse({
    slug: "dme",
    category: "Diploma",
    title: mitProgramBySlug.get("dme").title,
    shortTitle: mitProgramBySlug.get("dme").badge,
    description: mitProgramBySlug.get("dme").summary,
    overview:
      "This diploma program focuses on the principles of machines, manufacturing, thermal systems, and workshop practice. It helps students understand how mechanical systems work and prepares them for industry-ready technical roles through hands-on learning.",
    highlights: [
      "Workshop practice and machine tools",
      "Thermal engineering and production basics",
      "Mechanical drawing and CAD exposure",
      "Maintenance and fabrication fundamentals",
    ],
    eligibility: ["10th pass or equivalent", "Interest in machines and workshop work"],
    curriculum: [
      "Engineering mechanics",
      "Strength of materials",
      "Manufacturing processes",
      "Workshop technology and CAD basics",
    ],
    careerPaths: [
      "Mechanical technician",
      "Production assistant",
      "Maintenance support",
      "Higher studies in mechanical engineering",
    ],
    seats: mitProgramBySlug.get("dme").seats,
    semesters: mitProgramBySlug.get("dme").semesters,
    duration: mitProgramBySlug.get("dme").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb2,
    accent: "Machines, fabrication, and industry practice",
  }),
  makeCourse({
    slug: "aiml",
    category: "Diploma",
    title: mitProgramBySlug.get("aiml").title,
    shortTitle: mitProgramBySlug.get("aiml").badge,
    description: mitProgramBySlug.get("aiml").summary,
    overview:
      "This diploma program introduces students to computing foundations, data handling, algorithmic thinking, and machine learning concepts. The curriculum is designed to build practical digital skills along with project-based learning in modern computing applications.",
    highlights: [
      "Programming fundamentals with problem solving",
      "Data handling and model-building basics",
      "Introduction to AI tools and applied projects",
      "Software and analytics-oriented learning",
    ],
    eligibility: ["10th pass or equivalent", "Interest in computers and technology"],
    curriculum: [
      "Programming basics",
      "Data structures and databases",
      "Machine learning foundations",
      "Project work and application development",
    ],
    careerPaths: [
      "Junior programmer",
      "Data assistant",
      "AI and software trainee",
      "Further study in computer science",
    ],
    seats: mitProgramBySlug.get("aiml").seats,
    semesters: mitProgramBySlug.get("aiml").semesters,
    duration: mitProgramBySlug.get("aiml").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb3,
    accent: "Digital skills for the modern technology sector",
  }),
  makeCourse({
    slug: "dmlt",
    category: "Diploma",
    title: mitProgramBySlug.get("dmlt").title,
    shortTitle: mitProgramBySlug.get("dmlt").badge,
    description: mitProgramBySlug.get("dmlt").summary,
    overview:
      "This diploma program trains students in medical laboratory procedures, diagnostic methods, sample handling, and laboratory safety. It prepares learners to support health-care services through accurate testing and laboratory assistance.",
    highlights: [
      "Laboratory testing and diagnostic procedures",
      "Sample collection and analysis basics",
      "Biochemistry, pathology, and microbiology exposure",
      "Clinical lab safety and reporting practices",
    ],
    eligibility: ["10th pass or equivalent", "Interest in medical and laboratory work"],
    curriculum: [
      "Clinical laboratory techniques",
      "Pathology and microbiology",
      "Biochemistry basics",
      "Instrumentation and lab safety",
    ],
    careerPaths: [
      "Lab technician",
      "Diagnostic assistant",
      "Hospital lab support staff",
      "Further study in allied health sciences",
    ],
    seats: mitProgramBySlug.get("dmlt").seats,
    semesters: mitProgramBySlug.get("dmlt").semesters,
    duration: mitProgramBySlug.get("dmlt").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb4,
    accent: "Healthcare diagnostics and laboratory training",
  }),
  makeCourse({
    slug: "ev-tech",
    category: "Diploma",
    title: mitProgramBySlug.get("ev-tech").title,
    shortTitle: mitProgramBySlug.get("ev-tech").badge,
    description: mitProgramBySlug.get("ev-tech").summary,
    overview:
      "This diploma program focuses on electrical engineering fundamentals, electric vehicle systems, batteries, charging infrastructure, motors, and diagnostics. Students gain exposure to the fast-growing mobility sector and its technical requirements.",
    highlights: [
      "Battery and charging system fundamentals",
      "Motor drive and vehicle electronics basics",
      "EV maintenance and fault diagnosis",
      "Future-oriented mobility and sustainability skills",
    ],
    eligibility: ["10th pass or equivalent", "Interest in electrical and automotive systems"],
    curriculum: [
      "Electric vehicle architecture",
      "Battery management and charging",
      "Motor drives and controllers",
      "Vehicle maintenance and safety",
    ],
    careerPaths: [
      "EV service technician",
      "Battery support assistant",
      "Workshop technician",
      "Further study in automotive technology",
    ],
    seats: mitProgramBySlug.get("ev-tech").seats,
    semesters: mitProgramBySlug.get("ev-tech").semesters,
    duration: mitProgramBySlug.get("ev-tech").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb5,
    accent: "Modern electric mobility and service skills",
  }),
];

export const itiCourses = [
  makeCourse({
    slug: "wireman",
    category: "ITI",
    title: mitProgramBySlug.get("wireman").title,
    shortTitle: mitProgramBySlug.get("wireman").badge,
    description: mitProgramBySlug.get("wireman").summary,
    overview:
      "This ITI trade focuses on domestic and industrial wiring, electrical safety, fault finding, and installation work. The course develops practical job skills for electrical support and maintenance roles.",
    highlights: [
      "Domestic and industrial wiring practice",
      "Electrical installation and troubleshooting",
      "Safety standards and fault diagnosis",
      "Hands-on trade skill development",
    ],
    eligibility: ["8th or 10th pass as per admission rules", "Interest in electrical work"],
    curriculum: [
      "Electrical tools and wiring methods",
      "Installation and maintenance",
      "Safety procedures",
      "Workshop practice",
    ],
    careerPaths: [
      "Wireman technician",
      "Electrical maintenance worker",
      "Installation assistant",
      "Self-employment in electrical services",
    ],
    seats: mitProgramBySlug.get("wireman").seats,
    semesters: mitProgramBySlug.get("wireman").semesters,
    duration: mitProgramBySlug.get("wireman").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb6,
    accent: "Electrical wiring and installation skills",
  }),
  makeCourse({
    slug: "surveyor",
    category: "ITI",
    title: mitProgramBySlug.get("surveyor").title,
    shortTitle: mitProgramBySlug.get("surveyor").badge,
    description: mitProgramBySlug.get("surveyor").summary,
    overview:
      "This ITI trade trains students in measurement, leveling, land mapping, and field survey methods. It supports practical work in site measurement, drawing preparation, and surveying support.",
    highlights: [
      "Land measurement and leveling practice",
      "Field survey tools and mapping basics",
      "Site documentation and drawing support",
      "Practical outdoor training",
    ],
    eligibility: ["10th pass only", "Interest in field work and measurement"],
    curriculum: [
      "Survey instruments and methods",
      "Chain and compass survey basics",
      "Leveling and plotting",
      "Field practice and records",
    ],
    careerPaths: [
      "Survey assistant",
      "Field measurement technician",
      "Site documentation support",
      "Further training in civil surveying",
    ],
    seats: mitProgramBySlug.get("surveyor").seats,
    semesters: mitProgramBySlug.get("surveyor").semesters,
    duration: mitProgramBySlug.get("surveyor").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb7,
    accent: "Field surveying and land measurement",
  }),
  makeCourse({
    slug: "copa",
    category: "ITI",
    title: mitProgramBySlug.get("copa").title,
    shortTitle: mitProgramBySlug.get("copa").badge,
    description: mitProgramBySlug.get("copa").summary,
    overview:
      "This ITI trade gives students practical computer literacy, office software experience, basic programming exposure, and digital workplace skills. It is designed for students who want a strong foundation in computer-based work.",
    highlights: [
      "Computer operation and office applications",
      "Programming basics and digital tools",
      "File handling, documentation, and data entry",
      "Useful skills for office and technical roles",
    ],
    eligibility: ["10th pass only", "Interest in computers and office work"],
    curriculum: [
      "Computer fundamentals",
      "MS Office and productivity tools",
      "Programming basics",
      "Internet, data entry, and documentation",
    ],
    careerPaths: [
      "Computer operator",
      "Office assistant",
      "Data entry support",
      "Junior programming trainee",
    ],
    seats: mitProgramBySlug.get("copa").seats,
    semesters: mitProgramBySlug.get("copa").semesters,
    duration: mitProgramBySlug.get("copa").duration,
    price: 35000,
    priceLabel: "35,000",
    src: courseThumb8,
    accent: "Computing, office tools, and digital support",
  }),
];

export const allCourses = [...diplomaCourses, ...itiCourses];

export const getCourseBySlug = (slug) =>
  allCourses.find((course) => course.slug === slug) || null;

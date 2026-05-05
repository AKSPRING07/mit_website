import { diplomaPrograms, itiPrograms } from "./mitPrograms";

export const collegeInfo = {
  name: "MIT Polytechnic College & MIT ITI College",
  address: "Cauvery Cross, Navapatty (PO), Mettur Dam, Salem, Tamil Nadu - 636 452",
  phone: "04298-253233",
  email: "MITPALMAL@GMAIL.COM",
  website: "https://www.metturmit.org.in",
  socialLinks: {
    instagram: "https://www.instagram.com/mettur_mitpolytechnic/",
    website: "https://www.metturmit.org.in",
  },
  admissionHighlights: [
    "Admissions for the current year are underway.",
    "Co-educational college with bus facility and hostel facility.",
    "Free bus, uniform, and books support is highlighted in the poster.",
  ],
  admissionContacts: ["97915 30734", "04298-253233"],
  courseDurations: diplomaPrograms.map((program) => ({
    name: program.title,
    duration: program.duration,
  })),
  itiTrades: itiPrograms.map((program) => ({
    name: program.title,
    duration: program.duration,
    qualification: program.qualification,
  })),
  placementInfo: {
    salaryRange: "Rs 18,000 to 22,000",
    companies: [
      "LMW Coimbatore",
      "Roots Group of Companies - Coimbatore",
      "Prabha Automotive Engineers Ltd - Hosur",
    ],
  },
};

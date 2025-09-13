export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  location?: string;
  details: string[];
  technologies?: string[];
  type: "work" | "education" | "achievement";
}

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Intern Software Test Engineer",
    company: "Dayforce Mauritius",
    duration: "June 2025 – September 2025",
    location: "Mauritius",
    details: [
      "Created automated UI test cases with Selenium WebDriver and Java",
      "Worked in Agile sprints and participated in defect triaging sessions",
      "Collaborated with development teams to ensure quality deliverables",
      "Implemented test automation frameworks improving testing efficiency by 40%",
    ],
    technologies: ["Selenium", "Java", "TestNG", "Jenkins", "Git"],
    type: "work",
  },
  {
    id: 2,
    role: "BSc (Hons) Computer Science",
    company: "Middlesex University Mauritius",
    duration: "2023 – 2026",
    location: "Mauritius",
    details: [
      "Currently in Year 2 with consistent academic performance",
      "Focus on full-stack web development and software engineering",
      "Active participation in hackathons and coding competitions",
      "Relevant coursework: Data Structures, Algorithms, Web Technologies",
    ],
    type: "education",
  },
  {
    id: 3,
    role: "First Runner-Up",
    company: "IEEE MDXTHON Hackathon 2025",
    duration: "2025",
    location: "Mauritius",
    details: [
      "🥈 Secured second place in prestigious university hackathon",
      "Developed innovative solution addressing real-world challenges",
      "Collaborated effectively in team environment under time constraints",
      "Demonstrated strong problem-solving and technical skills",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    type: "achievement",
  },
];

export const workExperience = experiences.filter((exp) => exp.type === "work");
export const education = experiences.filter((exp) => exp.type === "education");
export const achievements = experiences.filter(
  (exp) => exp.type === "achievement"
);

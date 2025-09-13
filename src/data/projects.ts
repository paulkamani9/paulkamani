export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  link?: string;
  image?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Horizon",
    description:
      "Collaborative Note-taking Web App with real-time editing, user authentication, and seamless document sharing across teams.",
    technologies: [
      "Next.js",
      "Convex DB",
      "Tailwind CSS",
      "Clerk",
      "TypeScript",
    ],
    github: "https://github.com/paulkamani9/horizon",
    link: "https://horizon.vercel.app",
    featured: true,
  },
  {
    id: 2,
    title: "Console.log Champions",
    description:
      "🥈 First Runner-Up at IEEE MDXTHON Hackathon 2025 - Innovative solution for modern development challenges.",
    technologies: ["React", "Next.js", "WebSockets", "TypeScript", "Zego Cloud"],
    github: "https://github.com/ieeemumsb/Console.log-Champions-",
    featured: true,
  },
  {
    id: 3,
    title: "Portfolio Website",
    description:
      "Modern, animated portfolio showcasing projects and skills with stunning 3D effects and smooth interactions.",
    technologies: [
      "React",
      "TypeScript",
      "Framer Motion",
      "Three.js",
      "Tailwind CSS",
    ],
    github: "https://github.com/paulkamani9/portfolio",
    link: "https://paulkamani.dev",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

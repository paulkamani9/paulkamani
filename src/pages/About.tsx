import { motion } from "framer-motion";
import { MapPin, GraduationCap, Languages, Heart } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/StaggerContainer";
import { fadeUpVariants, cardHoverVariants } from "../lib/animations";

const aboutData = {
  summary:
    "Enthusiastic Computer Science student with a strong interest in full-stack web development and test automation. Experienced with Next.js, React, Selenium, Java, Drizzle ORM, and Better Auth. Passionate about real-world projects, clean architecture, and teamwork.",
  education:
    "BSc (Hons) Computer Science, Middlesex University Mauritius (2023 – 2026, Year 2)",
  location: "Flic en Flac, Mauritius",
  languages: [
    { name: "English", level: "Fluent" },
    { name: "French", level: "Basic (learning)" },
  ],
  hobbies: [
    "Content creation (YouTube videos about emotions and growth)",
    "Video editing",
    "Reading history",
    "Gaming (video & card games)",
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "C#", "Java", "C"],
    webDev: ["React", "Next.js", "Tailwind CSS", "Node.js", "Prisma ORM"],
    testing: ["Selenium Java", "Cucumber", "Gherkin"],
    databases: ["PostgreSQL", "MySQL", "Convex DB", "Drizzle ORM"],
    auth: ["Clerk", "Auth.js", "Better Auth"],
    design: ["Figma", "ShadCN UI"],
    tools: ["GitHub", "Vercel", "CapCut"],
  },
};

const InfoCard = ({
  icon: Icon,
  title,
  children,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) => (
  <motion.div
    variants={cardHoverVariants}
    whileHover="hover"
    className="glass p-6 rounded-xl"
  >
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Icon className="w-6 h-6 text-primary-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
        {children}
      </div>
    </div>
  </motion.div>
);

const SkillCategory = ({
  title,
  skills,
}: {
  title: string;
  skills: string[];
}) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-primary-400 uppercase tracking-wider">
      {title}
    </h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <motion.span
          key={skill}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="px-3 py-1 bg-dark-800/60 text-gray-300 text-sm rounded-full border border-dark-700/50"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </div>
);

export const About = () => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-b from-dark-900 to-dark-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Get to know the person behind the code - my journey, passions, and
            what drives me forward
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Image & Summary */}
          <Reveal>
            <div className="space-y-8">
              <motion.div
                className="relative"
                variants={cardHoverVariants}
                whileHover="hover"
              >
                <div className="relative w-80 h-80 mx-auto lg:mx-0 rounded-2xl overflow-hidden glass">
                  <img
                    src={`${import.meta.env.BASE_URL}paul.jpg`}
                    alt="Paul Kamani"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {aboutData.summary}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Info Cards */}
          <div className="space-y-6">
            <StaggerContainer>
              <StaggerItem>
                <InfoCard icon={GraduationCap} title="Education">
                  <p className="text-gray-300">{aboutData.education}</p>
                </InfoCard>
              </StaggerItem>

              <StaggerItem>
                <InfoCard icon={MapPin} title="Location">
                  <p className="text-gray-300 flex items-center">
                    <span>{aboutData.location}</span>
                    <span className="ml-2">🇲🇺</span>
                  </p>
                </InfoCard>
              </StaggerItem>

              <StaggerItem>
                <InfoCard icon={Languages} title="Languages">
                  <div className="space-y-2">
                    {aboutData.languages.map((lang) => (
                      <div
                        key={lang.name}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-300">{lang.name}</span>
                        <span className="text-primary-400 text-sm">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </InfoCard>
              </StaggerItem>

              <StaggerItem>
                <InfoCard icon={Heart} title="Hobbies & Interests">
                  <ul className="space-y-2">
                    {aboutData.hobbies.map((hobby, index) => (
                      <li
                        key={index}
                        className="text-gray-300 flex items-start"
                      >
                        <span className="text-primary-400 mr-2">•</span>
                        {hobby}
                      </li>
                    ))}
                  </ul>
                </InfoCard>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>

        {/* Skills Section */}
        <Reveal className="mt-20">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Technical <span className="text-gradient">Skills</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkillCategory
                title="Programming Languages"
                skills={aboutData.skills.languages}
              />
              <SkillCategory
                title="Web Development"
                skills={aboutData.skills.webDev}
              />
              <SkillCategory
                title="Testing"
                skills={aboutData.skills.testing}
              />
              <SkillCategory
                title="Databases"
                skills={aboutData.skills.databases}
              />
              <SkillCategory
                title="Authentication"
                skills={aboutData.skills.auth}
              />
              <SkillCategory
                title="Design & Tools"
                skills={[...aboutData.skills.design, ...aboutData.skills.tools]}
              />
            </div>
          </div>
        </Reveal>

        {/* Personal Quote */}
        <Reveal className="mt-16 text-center">
          <motion.blockquote
            className="text-2xl md:text-3xl font-light text-gray-300 italic max-w-4xl mx-auto"
            variants={fadeUpVariants}
          >
            "Passionate about real-world projects, clean architecture, and
            teamwork - always eager to learn and contribute to meaningful
            solutions."
          </motion.blockquote>
          <motion.div className="mt-4" variants={fadeUpVariants}>
            <span className="text-primary-400 font-medium">— Paul Kamani</span>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

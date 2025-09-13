import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { Code, Database, TestTube } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { AnimatedButton } from "../components/AnimatedButton";
import { fadeUpVariants, scaleInVariants } from "../lib/animations";

const skillsData = [
  { category: "Frontend", value: 90, color: "#38bdf8" },
  { category: "Backend", value: 85, color: "#10b981" },
  { category: "Database", value: 80, color: "#f59e0b" },
  { category: "Testing", value: 75, color: "#ef4444" },
  { category: "DevOps", value: 70, color: "#8b5cf6" },
  { category: "UI/UX", value: 85, color: "#ec4899" },
];

const detailedSkills = {
  frontend: [
    { name: "React/Next.js", level: 90, years: 2 },
    { name: "TypeScript", level: 85, years: 1.5 },
    { name: "Tailwind CSS", level: 95, years: 2 },
    { name: "Framer Motion", level: 80, years: 1 },
    { name: "HTML/CSS", level: 95, years: 3 },
  ],
  backend: [
    { name: "Node.js", level: 85, years: 2 },
    { name: "Java", level: 80, years: 2 },
    { name: "Python", level: 75, years: 1.5 },
    { name: "C#", level: 70, years: 1 },
    { name: "REST APIs", level: 85, years: 2 },
  ],
  database: [
    { name: "PostgreSQL", level: 85, years: 2 },
    { name: "MySQL", level: 80, years: 2 },
    { name: "Convex DB", level: 85, years: 1 },
    { name: "Prisma ORM", level: 90, years: 1.5 },
    { name: "Drizzle ORM", level: 85, years: 1 },
  ],
  testing: [
    { name: "Selenium", level: 85, years: 1 },
    { name: "Jest", level: 75, years: 1 },
    { name: "Cucumber", level: 80, years: 1 },
    { name: "Unit Testing", level: 80, years: 1.5 },
    { name: "E2E Testing", level: 75, years: 1 },
  ],
};

interface SkillCardProps {
  skill: { name: string; level: number; years: number };
  index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="glass p-4 rounded-lg"
  >
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-white font-medium">{skill.name}</h4>
      <span className="text-primary-400 text-sm">{skill.years}y</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Proficiency</span>
        <span className="text-white">{skill.level}%</span>
      </div>
      <div className="w-full bg-dark-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </div>
  </motion.div>
);

export const Skills = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof detailedSkills>("frontend");

  const tabs = [
    { id: "frontend", label: "Frontend", icon: Code },
    { id: "backend", label: "Backend", icon: Database },
    { id: "database", label: "Database", icon: Database },
    { id: "testing", label: "Testing", icon: TestTube },
  ] as const;

  return (
    <section id="skills" className="py-20 lg:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and proficiency
            levels
          </p>
        </Reveal>

        {/* Skills Overview Chart */}
        <Reveal className="mb-20">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Skills <span className="text-gradient">Overview</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Radar Chart */}
              <motion.div
                className="h-80"
                variants={scaleInVariants}
                initial="hidden"
                whileInView="visible"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skillsData}>
                    <PolarGrid stroke="#374151" strokeWidth={1} />
                    <PolarAngleAxis
                      dataKey="category"
                      tick={{ fill: "#9ca3af", fontSize: 12 }}
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fill: "#9ca3af", fontSize: 10 }}
                      tickCount={6}
                    />
                    <Radar
                      name="Skills"
                      dataKey="value"
                      stroke="#38bdf8"
                      fill="#38bdf8"
                      fillOpacity={0.1}
                      strokeWidth={2}
                      dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Skills Summary */}
              <div className="space-y-4">
                {skillsData.map((skill, index) => (
                  <motion.div
                    key={skill.category}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-dark-800/30"
                  >
                    <span className="text-white font-medium">
                      {skill.category}
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-dark-700 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: skill.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <span className="text-gray-400 text-sm w-8">
                        {skill.value}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Detailed Skills */}
        <Reveal>
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              Detailed <span className="text-gradient">Breakdown</span>
            </h3>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <AnimatedButton
                    key={tab.id}
                    variant={activeTab === tab.id ? "primary" : "ghost"}
                    size="md"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center space-x-2"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </AnimatedButton>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {detailedSkills[activeTab].map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Call to Action */}
        <Reveal className="text-center mt-16">
          <motion.div
            variants={fadeUpVariants}
            className="glass p-8 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to <span className="text-gradient">Collaborate</span>?
            </h3>
            <p className="text-gray-400 mb-6">
              I'm always excited to work on new projects and learn cutting-edge
              technologies. Let's build something amazing together!
            </p>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get In Touch
            </AnimatedButton>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

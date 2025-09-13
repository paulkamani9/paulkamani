import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Trophy, Star, ExternalLink, X } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/StaggerContainer";
import { AnimatedButton } from "../components/AnimatedButton";
import {
  modalVariants,
  cardHoverVariants,
  scaleInVariants,
} from "../lib/animations";

const achievements = [
  {
    id: 1,
    title: "IEEE MDXTHON Hackathon 2025",
    subtitle: "First Runner-Up 🥈",
    description:
      "Secured second place in the prestigious IEEE MDXTHON Hackathon 2025 at Middlesex University Mauritius",
    details: [
      "Collaborated with a team to develop an innovative solution within 48 hours",
      "Demonstrated strong problem-solving and technical skills under pressure",
      "Presented to a panel of industry experts and judges",
      "Showcased expertise in full-stack development and team collaboration",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Express"],
    date: "2025",
    type: "hackathon",
    certificate: "/certificate.png",
    projectLink: "https://github.com/ieeemumsb/Console.log-Champions-",
    icon: Trophy,
    color: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    title: "Academic Excellence",
    subtitle: "Consistent Performance",
    description:
      "Maintaining strong academic performance throughout Computer Science degree program",
    details: [
      "Year 2 Computer Science student with consistent performance",
      "Active participation in university projects and assignments",
      "Strong foundation in programming fundamentals and algorithms",
      "Engaged in extracurricular tech activities and learning",
    ],
    date: "2023-2026",
    type: "academic",
    icon: Award,
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    title: "Self-Driven Learning",
    subtitle: "Continuous Growth",
    description:
      "Demonstrated commitment to continuous learning and skill development beyond formal education",
    details: [
      "Self-taught modern web development technologies",
      "Built multiple personal projects showcasing diverse skills",
      "Active contributor to open-source learning resources",
      "Passionate about staying current with industry trends",
    ],
    date: "Ongoing",
    type: "personal",
    icon: Star,
    color: "from-green-400 to-teal-500",
  },
];

interface AchievementModalProps {
  achievement: (typeof achievements)[0] | null;
  isOpen: boolean;
  onClose: () => void;
}

const AchievementModal = ({
  achievement,
  isOpen,
  onClose,
}: AchievementModalProps) => {
  if (!achievement) return null;

  const IconComponent = achievement.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-dark-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {/* Header */}
            <div className="flex items-start space-x-4 mb-6">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color}`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {achievement.title}
                </h3>
                <p className="text-lg text-primary-400 font-medium mb-2">
                  {achievement.subtitle}
                </p>
                <p className="text-gray-400 text-sm">{achievement.date}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                {achievement.description}
              </p>

              <div className="space-y-2">
                {achievement.details.map((detail, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            {achievement.technologies && (
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {achievement.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-dark-800/60 text-primary-300 text-sm rounded-full border border-dark-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate */}
            {achievement.certificate && (
              <div className="mb-6">
                <h4 className="text-white font-medium mb-3">Certificate</h4>
                <div className="relative rounded-lg overflow-hidden glass p-4">
                  <img
                    src={`${
                      import.meta.env.BASE_URL
                    }${achievement.certificate.replace(/^\//, "")}`}
                    alt="Achievement Certificate"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {achievement.projectLink && (
                <AnimatedButton
                  variant="primary"
                  onClick={() => window.open(achievement.projectLink, "_blank")}
                  className="flex items-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Project</span>
                </AnimatedButton>
              )}
              <AnimatedButton variant="secondary" onClick={onClose}>
                Close
              </AnimatedButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AchievementCard = ({
  achievement,
  onClick,
}: {
  achievement: (typeof achievements)[0];
  onClick: () => void;
}) => {
  const IconComponent = achievement.icon;

  return (
    <StaggerItem>
      <motion.div
        variants={cardHoverVariants}
        whileHover="hover"
        whileTap="tap"
        className="glass p-6 rounded-xl cursor-pointer"
        onClick={onClick}
      >
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <motion.div
            className={`p-3 rounded-xl bg-gradient-to-br ${achievement.color}`}
            whileHover={{ rotate: 5, scale: 1.05 }}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">
              {achievement.title}
            </h3>
            <p className="text-primary-400 font-medium text-sm mb-1">
              {achievement.subtitle}
            </p>
            <p className="text-gray-400 text-xs">{achievement.date}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {achievement.description}
        </p>

        {/* View More Button */}
        <div className="flex justify-between items-center">
          <span className="text-primary-400 text-sm font-medium">
            Click to view details
          </span>
          <ExternalLink className="w-4 h-4 text-primary-400" />
        </div>
      </motion.div>
    </StaggerItem>
  );
};

export const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<
    (typeof achievements)[0] | null
  >(null);

  return (
    <section
      id="achievements"
      className="py-20 lg:py-32 bg-gradient-to-b from-dark-900 to-dark-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Milestones and recognitions that mark my journey of growth,
            learning, and contribution to the tech community
          </p>
        </Reveal>

        {/* Achievement Stats */}
        <Reveal className="mb-16">
          <motion.div
            className="glass p-8 rounded-2xl"
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-4xl font-bold text-gradient mb-2">🥈</div>
                <div className="text-white font-medium">
                  Hackathon Runner-Up
                </div>
                <div className="text-gray-400 text-sm">IEEE MDXTHON 2025</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-4xl font-bold text-gradient mb-2">📚</div>
                <div className="text-white font-medium">
                  Academic Excellence
                </div>
                <div className="text-gray-400 text-sm">
                  Consistent Performance
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-4xl font-bold text-gradient mb-2">🚀</div>
                <div className="text-white font-medium">Self-Driven Growth</div>
                <div className="text-gray-400 text-sm">Continuous Learning</div>
              </motion.div>
            </div>
          </motion.div>
        </Reveal>

        {/* Achievement Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => setSelectedAchievement(achievement)}
            />
          ))}
        </StaggerContainer>

        {/* Call to Action */}
        <Reveal className="text-center">
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
            className="glass p-8 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              The Journey <span className="text-gradient">Continues</span>
            </h3>
            <p className="text-gray-400 mb-6">
              These achievements are just the beginning. I'm always looking for
              new challenges and opportunities to grow, learn, and make a
              meaningful impact.
            </p>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's Build Something Together
            </AnimatedButton>
          </motion.div>
        </Reveal>
      </div>

      {/* Achievement Detail Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </section>
  );
};

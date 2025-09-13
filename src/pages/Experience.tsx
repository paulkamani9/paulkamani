import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { workExperience, education, achievements } from "../data/experience";
import type { Experience } from "../data/experience";
import { Reveal } from "../components/Reveal";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import {
  slideInLeftVariants,
  slideInRightVariants,
  scaleInVariants,
} from "../lib/animations";

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast?: boolean;
}

const getIcon = (type: Experience["type"]) => {
  switch (type) {
    case "work":
      return Briefcase;
    case "education":
      return GraduationCap;
    case "achievement":
      return Award;
    default:
      return Briefcase;
  }
};

const getTypeColor = (type: Experience["type"]) => {
  switch (type) {
    case "work":
      return "bg-primary-500";
    case "education":
      return "bg-green-500";
    case "achievement":
      return "bg-yellow-500";
    default:
      return "bg-primary-500";
  }
};

const TimelineItem = ({
  experience,
  index,
  isLast = false,
}: TimelineItemProps) => {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.3 });
  const IconComponent = getIcon(experience.type);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="relative flex items-center"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={isEven ? slideInLeftVariants : slideInRightVariants}
      transition={{ delay: 0.2 }}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-dark-600 h-full" />

      {/* Timeline Dot */}
      <motion.div
        className={`absolute left-1/2 transform -translate-x-1/2 w-12 h-12 ${getTypeColor(
          experience.type
        )} rounded-full flex items-center justify-center z-10 shadow-lg`}
        variants={scaleInVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ delay: 0.1 }}
      >
        <IconComponent className="w-6 h-6 text-white" />
      </motion.div>

      {/* Content */}
      <div
        className={`w-full flex ${
          isEven ? "justify-start pr-8" : "justify-end pl-8"
        }`}
      >
        <motion.div
          className={`glass p-6 rounded-xl max-w-md ${
            isEven ? "mr-8" : "ml-8"
          }`}
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Header */}
          <div className="space-y-2 mb-4">
            <h3 className="text-xl font-bold text-white">{experience.role}</h3>
            <h4 className="text-lg text-primary-400 font-medium">
              {experience.company}
            </h4>

            <div className="flex flex-wrap gap-3 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{experience.duration}</span>
              </div>
              {experience.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            {experience.details.map((detail, detailIndex) => (
              <motion.div
                key={detailIndex}
                initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                animate={
                  inView
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: isEven ? -10 : 10 }
                }
                transition={{ delay: 0.3 + detailIndex * 0.1 }}
                className="flex items-start space-x-3"
              >
                <ChevronRight className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  {detail}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Technologies */}
          {experience.technologies && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 pt-4 border-t border-dark-700/50"
            >
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-dark-800/60 text-primary-300 text-xs rounded-md border border-dark-600/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = ({
  title,
  experiences,
  icon: Icon,
  description,
}: {
  title: string;
  experiences: Experience[];
  icon: any;
  description: string;
}) => (
  <Reveal className="mb-20">
    <div className="text-center mb-12">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <Icon className="w-8 h-8 text-primary-400" />
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
    </div>

    <div className="relative space-y-16">
      {experiences.map((exp, index) => (
        <TimelineItem
          key={exp.id}
          experience={exp}
          index={index}
          isLast={index === experiences.length - 1}
        />
      ))}
    </div>
  </Reveal>
);

export const ExperiencePage = () => {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-dark-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            From academic pursuits to professional experiences - a timeline of
            growth, learning, and achievements that shaped my career
          </p>
        </Reveal>

        {/* Achievement Highlight */}
        <ExperienceSection
          title="🏆 Recent Achievements"
          experiences={achievements}
          icon={Award}
          description="Recognition and milestones that mark significant career moments"
        />

        {/* Work Experience */}
        <ExperienceSection
          title="💼 Professional Experience"
          experiences={workExperience}
          icon={Briefcase}
          description="Real-world experience applying technical skills in professional environments"
        />

        {/* Education */}
        <ExperienceSection
          title="🎓 Education"
          experiences={education}
          icon={GraduationCap}
          description="Academic foundation building the knowledge base for my technical career"
        />

        {/* Summary Stats */}
        <Reveal className="mt-20">
          <motion.div
            className="glass p-8 rounded-2xl text-center"
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              Journey <span className="text-gradient">Summary</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="text-3xl font-bold text-gradient mb-2">2+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Years in Tech
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-3xl font-bold text-gradient mb-2">3</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Years Academic
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-gradient mb-2">1</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">
                  Hackathon Award
                </div>
              </motion.div>
            </div>

            <motion.p
              className="mt-6 text-gray-400 italic"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              "Every experience is a stepping stone to the next level of growth
              and innovation."
            </motion.p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

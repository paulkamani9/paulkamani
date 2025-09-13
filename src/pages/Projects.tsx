import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";
import { projects, featuredProjects } from "../data/projects";
import type { Project } from "../data/projects";
import { Reveal } from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/StaggerContainer";
import { AnimatedButton } from "../components/AnimatedButton";
import { cardHoverVariants, scaleInVariants } from "../lib/animations";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  return (
    <StaggerItem>
      <motion.div
        variants={cardHoverVariants}
        whileHover="hover"
        whileTap="tap"
        className={`glass rounded-xl overflow-hidden ${
          featured ? "lg:col-span-2 lg:row-span-1" : ""
        }`}
      >
        {/* Project Image Placeholder */}
        <div
          className={`relative bg-gradient-to-br from-primary-500/20 to-primary-600/20 ${
            featured ? "h-48" : "h-40"
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary-500/30 rounded-full flex items-center justify-center backdrop-blur-sm">
              <span className="text-2xl font-bold text-white">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>

          {/* Featured Badge */}
          {featured && (
            <motion.div
              className="absolute top-4 right-4 flex items-center space-x-1 bg-yellow-500/20 backdrop-blur-sm px-3 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-yellow-400 text-sm font-medium">
                Featured
              </span>
            </motion.div>
          )}
        </div>

        <div className="p-6">
          {/* Project Title & Description */}
          <div className="space-y-3 mb-6">
            <h3
              className={`font-bold text-white ${
                featured ? "text-2xl" : "text-xl"
              }`}
            >
              {project.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-medium text-primary-400 uppercase tracking-wider">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-dark-800/60 text-gray-300 text-sm rounded-full border border-dark-700/50"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            {project.github && (
              <AnimatedButton
                variant="secondary"
                size="sm"
                onClick={() => window.open(project.github, "_blank")}
                className="flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </AnimatedButton>
            )}
            {project.link && (
              <AnimatedButton
                variant="primary"
                size="sm"
                onClick={() => window.open(project.link, "_blank")}
                className="flex items-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </AnimatedButton>
            )}
          </div>
        </div>
      </motion.div>
    </StaggerItem>
  );
};

const ProjectShowcase = ({
  projects,
  title,
  description,
}: {
  projects: Project[];
  title: string;
  description: string;
}) => (
  <Reveal className="mb-20">
    <div className="text-center mb-12">
      <h3 className="text-3xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
    </div>

    <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          featured={project.featured}
        />
      ))}
    </StaggerContainer>
  </Reveal>
);

const Stats = () => {
  const stats = [
    { label: "Projects Completed", value: projects.length, suffix: "+" },
    { label: "Technologies Used", value: 15, suffix: "+" },
    { label: "Years of Experience", value: 2, suffix: "+" },
    { label: "Hackathon Awards", value: 1, suffix: "" },
  ];

  return (
    <Reveal className="mb-20">
      <motion.div
        className="glass p-8 rounded-2xl"
        variants={scaleInVariants}
        initial="hidden"
        whileInView="visible"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                className="text-3xl lg:text-4xl font-bold text-gradient mb-2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {stat.value}
                {stat.suffix}
              </motion.div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
};

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 lg:py-32 bg-gradient-to-b from-dark-800 to-dark-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            A showcase of my work - from hackathon winners to personal
            experiments, each project tells a story of learning and innovation
          </p>
        </Reveal>

        {/* Stats */}
        <Stats />

        {/* Featured Projects */}
        <ProjectShowcase
          projects={featuredProjects}
          title="🌟 Featured Projects"
          description="Highlighting my most impactful and technically challenging work"
        />

        {/* All Projects */}
        <ProjectShowcase
          projects={projects.filter((p) => !p.featured)}
          title="Other Projects"
          description="Additional projects showcasing diverse skills and experimentation"
        />

        {/* Call to Action */}
        <Reveal className="text-center">
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
            className="glass p-8 rounded-2xl max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Like What You See?
            </h3>
            <p className="text-gray-400 mb-6">
              I'm always working on new projects and exploring cutting-edge
              technologies. Check out my GitHub for the latest updates!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={() =>
                  window.open("https://github.com/paulkamani99", "_blank")
                }
                className="flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span>View All Projects</span>
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  const element = document.querySelector("#contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Let's Collaborate
              </AnimatedButton>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

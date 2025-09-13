import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { ThreeBackground } from "../components/ThreeBackground";
import { AnimatedButton } from "../components/AnimatedButton";
import {
  containerVariants,
  fadeUpVariants,
  floatVariants,
} from "../lib/animations";
import { useReducedMotion } from "../hooks/useReducedMotion";

const roles = [
  "Full-Stack Developer",
  "Software Engineer",
  "Problem Solver",
  "UI/UX Enthusiast",
  "Tech Innovator",
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleScrollToNext = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDownloadCV = () => {
    // In a real implementation, you would link to your actual CV file
    console.log("Download CV");
  };

  const handleViewProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const HeroContent = () => (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      {!prefersReducedMotion && <ThreeBackground />}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/90 via-dark-900/70 to-dark-800/90" />

      {/* Animated Background Elements */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-primary-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-1 h-1 bg-primary-300 rounded-full"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-primary-500 rounded-full"
            animate={{
              y: [-10, 10, -10],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Greeting */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2"
          >
            <p className="text-lg md:text-xl text-primary-400 font-medium">
              Hey there! 👋 I'm
            </p>
          </motion.div>

          {/* Name */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
              variants={fadeUpVariants}
            >
              Paul{" "}
              <span className="text-gradient bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
                Kamani
              </span>
            </motion.h1>
          </motion.div>

          {/* Role Animation */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="h-12 md:h-16"
          >
            <motion.p
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light"
            >
              {roles[currentRole]}
            </motion.p>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
              Passionate Computer Science student crafting innovative web
              solutions with modern technologies. Let's build something amazing
              together! 🚀
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={handleViewProjects}
              className="group px-8 py-4"
            >
              <span className="flex items-center space-x-2">
                <span>View My Work</span>
                <ExternalLink className="w-5 h-5 transition-transform group-hover:scale-110" />
              </span>
            </AnimatedButton>

            <AnimatedButton
              variant="secondary"
              size="lg"
              onClick={handleDownloadCV}
              className="group px-8 py-4"
            >
              <span className="flex items-center space-x-2">
                <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>Download CV</span>
              </span>
            </AnimatedButton>
          </motion.div>

          {/* Achievement Badge */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
            className="pt-8"
          >
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
              <span className="text-yellow-400">🥈</span>
              <span className="text-sm text-gray-300">
                First Runner-Up, IEEE MDXTHON Hackathon 2025
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          variants={floatVariants}
          animate="animate"
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <button
            onClick={handleScrollToNext}
            className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors group"
          >
            <span className="text-sm uppercase tracking-wider">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );

  if (prefersReducedMotion) {
    return (
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <p className="text-lg md:text-xl text-primary-400 font-medium">
              Hey there! 👋 I'm
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Paul <span className="text-gradient">Kamani</span>
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-light">
              Full-Stack Developer
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                Passionate Computer Science student crafting innovative web
                solutions with modern technologies. Let's build something
                amazing together! 🚀
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={handleViewProjects}
                className="group px-8 py-4"
              >
                <span className="flex items-center space-x-2">
                  <span>View My Work</span>
                  <ExternalLink className="w-5 h-5" />
                </span>
              </AnimatedButton>

              <AnimatedButton
                variant="secondary"
                size="lg"
                onClick={handleDownloadCV}
                className="group px-8 py-4"
              >
                <span className="flex items-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download CV</span>
                </span>
              </AnimatedButton>
            </div>
            <div className="pt-8">
              <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <span className="text-yellow-400">🥈</span>
                <span className="text-sm text-gray-300">
                  First Runner-Up, IEEE MDXTHON Hackathon 2025
                </span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={handleScrollToNext}
              className="flex flex-col items-center space-y-2 text-gray-400 hover:text-white transition-colors group"
            >
              <span className="text-sm uppercase tracking-wider">Scroll</span>
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>
    );
  }

  return <HeroContent />;
};

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import { ThreeBackground } from "../components/ThreeBackground";
import { AnimatedButton } from "../components/AnimatedButton";
import { DreamySkyOverlay, StarDots } from "../components/DreamySkyOverlay";
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

  // Set up role rotation interval
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

  // This is the main content of the hero section
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      {!prefersReducedMotion && <ThreeBackground />}

      {/* Dreamy Sky Overlay */}
      {!prefersReducedMotion && <DreamySkyOverlay />}
      {/* Subtle multi-size pulsing star dots */}
      {!prefersReducedMotion && (
        <StarDots
          count={28}
          sizeRange={[1, 5]}
          opacityRange={[0.45, 0.9]}
          pulseRange={[2.6, 4.0]}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900/85 via-dark-900/75 to-dark-800/85" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Greeting - only animate once on initial page load */}
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

          {/* Name - only animate once on initial page load */}
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

          {/* Role Animation - only the text changes */}
          <div className="h-16">
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </div>

          {/* Description - only animate once on initial page load */}
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

          {/* CTA Buttons - only animate once on initial page load */}
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

          {/* Achievement Badge - only animate once on initial page load */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
            className="pt-8"
          >
            <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full backdrop-blur-sm bg-white/5">
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
            aria-label="Scroll to next section"
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
};

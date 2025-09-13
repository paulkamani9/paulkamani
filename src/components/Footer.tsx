import { motion } from "framer-motion";
import { Heart, Github, Mail, MapPin, Phone } from "lucide-react";
import { fadeUpVariants } from "../lib/animations";
import { useReducedMotion } from "../hooks/useReducedMotion";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/paulkamani9", icon: Github },
  { name: "Email", href: "mailto:paulkamani9@gmail.com", icon: Mail },
];

const contactInfo = [
  { icon: MapPin, text: "Flic en Flac, Mauritius" },
  { icon: Phone, text: "+230 57475246" },
  { icon: Mail, text: "paulkamani9@gmail.com" },
];

export const Footer = () => {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const FooterContent = () => (
    <footer className="bg-dark-900 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">Paul Kamani</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enthusiastic Computer Science student passionate about full-stack
              web development and creating innovative solutions that make a
              difference.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="sr-only">{link.name}</span>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {["About", "Skills", "Projects", "Experience", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(
                        `#${item.toLowerCase()}`
                      );
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Get In Touch</h4>
            <div className="space-y-3">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <IconComponent className="w-4 h-4 text-primary-400 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{info.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-dark-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm flex items-center space-x-1">
              <span>© {currentYear} Paul Kamani. Made with</span>
              <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
              <span>and lots of coffee ☕</span>
            </p>
            <p className="text-gray-500 text-xs">
              Built with React, TypeScript, Framer Motion & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );

  if (prefersReducedMotion) {
    return <FooterContent />;
  }

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <FooterContent />
    </motion.div>
  );
};

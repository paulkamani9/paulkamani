import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
} from "lucide-react";
import { Reveal } from "../components/Reveal";
import { AnimatedButton } from "../components/AnimatedButton";
import {
  fadeUpVariants,
  scaleInVariants,
  cardHoverVariants,
} from "../lib/animations";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "paulkamani9@gmail.com",
    link: "mailto:paulkamani9@gmail.com",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+230 57475246",
    link: "tel:+23057475246",
    color: "from-green-400 to-green-600",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Flic en Flac, Mauritius",
    link: null,
    color: "from-purple-400 to-purple-600",
  },
];

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    username: "paulkamani9",
    link: "https://github.com/paulkamani9",
    color: "from-gray-400 to-gray-600",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    username: "paulkamani",
    link: "https://linkedin.com/in/paulkamani",
    color: "from-blue-400 to-blue-600",
  },
];

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to collaborate on your next project? I'd love to hear from
            you! Whether it's a job opportunity, project collaboration, or just
            a friendly chat about tech.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Get <span className="text-gradient">In Touch</span>
                </h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  I'm always excited to discuss new opportunities, innovative
                  projects, and ways to contribute to meaningful solutions. Feel
                  free to reach out!
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                {contactInfo.map((contact) => {
                  const IconComponent = contact.icon;
                  const content = (
                    <motion.div
                      variants={cardHoverVariants}
                      whileHover="hover"
                      className="flex items-center space-x-4 glass p-4 rounded-xl"
                    >
                      <div
                        className={`p-3 rounded-lg bg-gradient-to-br ${contact.color}`}
                      >
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-400 uppercase tracking-wider">
                          {contact.label}
                        </div>
                        <div className="text-white font-medium">
                          {contact.value}
                        </div>
                      </div>
                    </motion.div>
                  );

                  return contact.link ? (
                    <motion.a
                      key={contact.label}
                      href={contact.link}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="block"
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {content}
                    </motion.div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">
                  Find Me Online
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl bg-gradient-to-br ${social.color} group`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal>
            <motion.div
              className="glass p-8 rounded-2xl"
              variants={scaleInVariants}
              initial="hidden"
              whileInView="visible"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                Send a <span className="text-gradient">Message</span>
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-400">
                    Thanks for reaching out! I'll get back to you as soon as
                    possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800/60 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800/60 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-800/60 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tell me about your project, opportunity, or just say hello!"
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </AnimatedButton>
                </form>
              )}
            </motion.div>
          </Reveal>
        </div>

        {/* Bottom Message */}
        <Reveal className="text-center mt-16">
          <motion.div
            variants={fadeUpVariants}
            className="glass p-6 rounded-xl max-w-2xl mx-auto"
          >
            <p className="text-gray-400 italic">
              "The best projects come from great collaborations. Let's create
              something amazing together!"
            </p>
            <p className="text-primary-400 font-medium mt-2">— Paul Kamani</p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
};

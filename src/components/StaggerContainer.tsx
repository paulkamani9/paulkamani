import { motion } from "framer-motion";
import { staggerContainer, listItemVariants } from "../lib/animations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Container that staggers animation of its children
 */
export const StaggerContainer = ({
  children,
  className = "",
  delay = 0,
}: StaggerContainerProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Individual item that works with StaggerContainer
 */
export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={listItemVariants}>
      {children}
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { buttonVariants } from "../lib/animations";
import { useReducedMotion } from "../hooks/useReducedMotion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

/**
 * Animated button component with hover and tap effects
 */
export const AnimatedButton = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) => {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700",
    secondary:
      "bg-dark-800 text-white border border-dark-600 hover:bg-dark-700",
    ghost: "text-primary-400 hover:text-primary-300 hover:bg-primary-500/10",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const combinedClassName = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (prefersReducedMotion) {
    return (
      <button
        className={combinedClassName}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  );
};

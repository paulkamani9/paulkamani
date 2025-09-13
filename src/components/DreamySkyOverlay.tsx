import { useRef, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

export const DreamySkyOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Create and animate the canvas with clouds
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Cloud class
    class Cloud {
      x: number;
      y: number;
      width: number;
      height: number;
      speed: number;
      opacity: number;

      constructor() {
        this.width = Math.random() * 200 + 100;
        this.height = this.width * 0.6;
        this.x = Math.random() * (canvas.width + 200) - 100;
        this.y = Math.random() * canvas.height * 0.6;
        this.speed = Math.random() * 0.2 + 0.05;
        this.opacity = Math.random() * 0.2 + 0.1;
      }

      draw() {
        if (!ctx) return;

        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();

        // Draw cloud shape
        const centerX = this.x + this.width * 0.5;
        const centerY = this.y + this.height * 0.5;

        // Main cloud puff
        ctx.arc(centerX, centerY, this.width * 0.3, 0, Math.PI * 2);

        // Additional cloud puffs
        ctx.arc(
          centerX - this.width * 0.35,
          centerY,
          this.width * 0.25,
          0,
          Math.PI * 2
        );
        ctx.arc(
          centerX + this.width * 0.35,
          centerY,
          this.width * 0.25,
          0,
          Math.PI * 2
        );
        ctx.arc(
          centerX - this.width * 0.2,
          centerY - this.height * 0.2,
          this.width * 0.25,
          0,
          Math.PI * 2
        );
        ctx.arc(
          centerX + this.width * 0.2,
          centerY - this.height * 0.2,
          this.width * 0.28,
          0,
          Math.PI * 2
        );

        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.speed;

        // Reset cloud position when it goes off-screen
        if (this.x - this.width > canvas.width) {
          this.x = -this.width;
          this.y = Math.random() * canvas.height * 0.6;
        }

        this.draw();
      }
    }

    // Create clouds
    const cloudCount = 7;
    const clouds: Cloud[] = [];

    for (let i = 0; i < cloudCount; i++) {
      clouds.push(new Cloud());
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(135, 206, 250, 0.2)"); // Light sky blue
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparent

      // Clear canvas with gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw clouds
      clouds.forEach((cloud) => cloud.update());

      // Continue animation loop
      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    let animationId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion]);

  // Don't render if reduced motion is preferred
  if (prefersReducedMotion) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
      />

      {/* Subtle animated gradient stars */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "20px 20px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Blue tint overlay */}
      <div className="absolute inset-0 z-0 bg-blue-500/5 pointer-events-none" />
    </>
  );
};

// Helper: generate a list of star dots with random-ish sizes, colors and positions
const generateStarDots = (count = 30) => {
  const colors = ["#7dd3fc", "#60a5fa", "#38bdf8", "#93c5fd", "#bfdbfe"];

  const dots = Array.from({ length: count }).map((_, i) => {
    const size = Math.round(1 + Math.random() * 3); // 1..4 px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.round(Math.random() * 10000) / 100; // percent with 2dp
    const top = Math.round(Math.random() * 10000) / 100;
    const opacity = 0.7 + Math.random() * 0.3; // 0.7..1.0
    const pulseDelay = Math.random() * 3;

    return { id: i, size, color, left, top, opacity, pulseDelay };
  });

  return dots;
};

// We'll export a small StarDots component for overlaying static pulsing dots
type Range = [number, number];

interface StarDotsProps {
  count?: number;
  sizeRange?: Range; // px
  opacityRange?: Range;
  pulseRange?: Range; // duration seconds
}

export const StarDots = ({
  count = 28,
  sizeRange = [1, 4],
  opacityRange = [0.5, 0.95],
  pulseRange = [2.4, 4.2],
}: StarDotsProps) => {
  const prefersReducedMotion = useReducedMotion();
  const dots = useMemo(() => generateStarDots(count), [count]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {dots.map((d) => {
        // scale size and opacity into provided ranges
        const size = Math.max(sizeRange[0], Math.min(sizeRange[1], d.size));
        const opacity = Math.max(
          opacityRange[0],
          Math.min(opacityRange[1], d.opacity)
        );
        const pulseDuration =
          pulseRange[0] + Math.random() * (pulseRange[1] - pulseRange[0]);

        return (
          <motion.span
            key={d.id}
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: size,
              height: size,
              background: d.color,
              opacity,
              boxShadow: `0 0 ${Math.max(6, size * 3)}px ${d.color}33`,
              borderRadius: 9999,
              position: "absolute",
              transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.35, 1] }}
            transition={{
              duration: pulseDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: d.pulseDelay,
            }}
            className="will-change-transform"
          />
        );
      })}
    </div>
  );
};

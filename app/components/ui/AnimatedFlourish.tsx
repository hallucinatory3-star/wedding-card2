"use client";

import { motion } from "framer-motion";

interface AnimatedFlourishProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: "sm" | "md" | "lg";
}

// Decorative corner flourish animation
export const AnimatedFlourish = ({
  position = "top-left",
  size = "md",
}: AnimatedFlourishProps) => {
  const sizeMap = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-40 h-40",
  };

  const positionMap = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-[-1]",
  };

  return (
    <motion.div
      className={`absolute ${positionMap[position]} ${sizeMap[size]} opacity-10 pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path
          d="M10 10 Q 50 10 50 50 L 50 10 Q 50 50 90 50"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          className="text-[#4a90d9]"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="30"
          cy="30"
          r="3"
          fill="currentColor"
          className="text-[#4a90d9]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
        <motion.circle
          cx="70"
          cy="30"
          r="2"
          fill="currentColor"
          className="text-[#4a90d9]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.circle
          cx="70"
          cy="70"
          r="2"
          fill="currentColor"
          className="text-[#4a90d9]"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        <motion.path
          d="M15 15 L 25 25 M85 15 L 75 25"
          stroke="currentColor"
          strokeWidth="1"
          className="text-[#7fb3d5]"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1.5 }}
        />
      </svg>
    </motion.div>
  );
};

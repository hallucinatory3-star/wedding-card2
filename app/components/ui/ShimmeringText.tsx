"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ShimmeringTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Shimmering text effect for elegant emphasis
export const ShimmeringText = ({
  children,
  className = "",
  delay = 0,
}: ShimmeringTextProps) => {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div
        className="relative"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, rgba(74, 144, 217, 0.3) 25%, rgba(127, 179, 213, 0.5) 50%, rgba(74, 144, 217, 0.3) 75%, transparent 100%)",
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

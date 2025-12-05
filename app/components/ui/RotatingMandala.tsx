"use client";

import { motion } from "framer-motion";

interface RotatingMandalaProps {
  position?: "left" | "right" | "center";
  delay?: number;
}

// Rotating mandala pattern for elegant background decoration
export const RotatingMandala = ({
  position = "center",
  delay = 0,
}: RotatingMandalaProps) => {
  const positionClasses = {
    left: "left-[-10%] top-1/3",
    right: "right-[-10%] top-1/3",
    center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  };

  return (
    <motion.div
      className={`absolute ${positionClasses[position]} w-96 h-96 opacity-40 pointer-events-none`}
      initial={{ opacity: 0, rotate: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.4, rotate: 360, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full text-[#4a90d9]">
        <defs>
          <pattern
            id={`mandala-pattern-${position}`}
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="2" fill="currentColor" />
          </pattern>
          <filter id={`glow-${position}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id={`mandala-grad-${position}`}>
            <stop offset="0%" stopColor="#4a90d9" stopOpacity="1" />
            <stop offset="100%" stopColor="#7fb3d5" stopOpacity="0.8" />
          </radialGradient>
        </defs>
        <g filter={`url(#glow-${position})`}>

        {/* Center circle */}
        <circle
          cx="100"
          cy="100"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="100"
          cy="100"
          r="5"
          fill="currentColor"
          opacity="0.6"
        />

        {/* Inner rings */}
        {[20, 30, 40, 50, 60, 70].map((radius, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={i % 2 === 0 ? "3,3" : "6,6"}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + i * 0.1, duration: 1 }}
          />
        ))}

        {/* Petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.5 + i * 0.05, duration: 0.8 }}
            >
              <ellipse
                cx="100"
                cy="30"
                rx="8"
                ry="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                transform={`rotate(${angle} 100 100)`}
              />
              <ellipse
                cx="100"
                cy="30"
                rx="5"
                ry="16"
                fill="currentColor"
                opacity="0.25"
                transform={`rotate(${angle} 100 100)`}
              />
            </motion.g>
          );
        })}

        {/* Outer decorative elements */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8;
          const x = 100 + 85 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 85 * Math.sin((angle * Math.PI) / 180);
          return (
            <g key={`outer-group-${i}`}>
              <motion.circle
                cx={x}
                cy={y}
                r="5"
                fill="currentColor"
                opacity="0.85"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 1 + i * 0.1, duration: 0.5 }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.6"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 1 + i * 0.1, duration: 0.5 }}
              />
            </g>
          );
        })}
        </g>
      </svg>
    </motion.div>
  );
};

"use client";

import { motion } from "framer-motion";

// Decorative Divider
export const Divider = () => (
  <div className="flex items-center justify-center gap-4 my-12">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      transition={{ duration: 0.8 }}
      className="h-px bg-linear-to-r from-transparent to-[#4a90d9]"
    />
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      whileInView={{ scale: 1, rotate: 45 }}
      transition={{ duration: 0.5 }}
      className="w-3 h-3 border-2 border-[#4a90d9]"
    />
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      transition={{ duration: 0.8 }}
      className="h-px bg-linear-to-l from-transparent to-[#4a90d9]"
    />
  </div>
);

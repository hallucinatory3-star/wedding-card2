"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function IntroPage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/invitation");
    }, 14000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleNextPage = () => {
    router.push("/invitation");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#eed3a4]">
      {/* Video Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto z-0 min-h-screen min-w-full"
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="bg-black/40" />
      </motion.div>

      {/* Enter Button - Bottom Right */}
      <motion.button
        onClick={handleNextPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
    absolute bottom-50 right-8 z-10
    px-8 py-2 rounded-full
    text-[#eed3a4] font-playfair text-lg bg-[#0B3D2E] hover:bg-[#0a3226]
    border border-[#0B3D2E]
    shadow-lg shadow-[#0B3D2E]/30

    transition-all duration-300
  "
      >
        Click here
      </motion.button>


    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function IntroPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }, []);

  const handleNextPage = () => {
    router.push("/invitation");
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error:", e);
    const target = e.target as HTMLVideoElement;
    if (target.error) {
      console.error("Video error code:", target.error.code);
      console.error("Video error message:", target.error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#eed3a4]">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedData={() => console.log("Video loaded successfully")}
        onCanPlay={() => console.log("Video can play")}
        className="fixed inset-0 w-full h-full z-[1]"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-black/40 z-[2]"
      />

      {/* Enter Button - Bottom Right */}
      <motion.button
        onClick={handleNextPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
    absolute bottom-50 right-8 z-20
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

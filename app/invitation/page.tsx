"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Import components
import {
  Divider,
  FloatingParticles,
  FloatingHearts,
  FloatingFlowers,
  AnimatedFlourish,
  RotatingMandala,
  AnimatedRings,
} from "../components/ui";
import {
  CountdownTimer,
  EventCard,
  SaveTheDateButton,
  ShareButton,
} from "../components/features";

// Import constants
import {
  WEDDING_DATE,
  GROOM_NAME,
  BRIDE_NAME,
} from "../constants/wedding-data";

// Main Page Component
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll(); // Remove containerRef target to fix conflicts
  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollCompleted, setScrollCompleted] = useState(false);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Buttery smooth continuous auto-scroll (optimized for performance)
  useEffect(() => {
    if (autoScroll && !scrollCompleted) {
      let animationId: number;
      let lastTime = 0;
      let accumulatedScroll = 0;
      const scrollSpeed = 80; // pixels per second - elegant and relaxed pace
      const targetFPS = 60;
      const frameInterval = 1000 / targetFPS;
      
      const butterySmoothScroll = (currentTime: number) => {
        if (!lastTime) {
          lastTime = currentTime;
          accumulatedScroll = 0;
        }
        
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        // Only scroll if enough time has passed for target FPS
        if (deltaTime >= frameInterval) {
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.pageYOffset;
          
          if (currentScroll < scrollHeight - 50) {
            // Calculate precise scroll distance for this frame
            const scrollDelta = (scrollSpeed * deltaTime) / 1000;
            accumulatedScroll += scrollDelta;
            
            // Apply accumulated scroll immediately
            if (accumulatedScroll >= 0.5) {
              window.scrollTo(0, currentScroll + accumulatedScroll);
              accumulatedScroll = 0;
            }
          } else {
            // End of content - stop scrolling permanently
            setAutoScroll(false);
            setScrollCompleted(true); // Mark as completed
            return;
          }
        }
        
        animationId = requestAnimationFrame(butterySmoothScroll);
      };
      
      // Start immediately
      animationId = requestAnimationFrame(butterySmoothScroll);

      return () => {
        if (animationId) {
          cancelAnimationFrame(animationId);
        }
      };
    }
  }, [autoScroll, scrollCompleted]);

  // Pause auto-scroll on meaningful user interaction, resume when idle
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    let isInteracting = false;
    
    const handleUserInteraction = (e: Event) => {
      // Only pause if auto-scroll is currently active (not already paused)
      if (autoScroll && !isInteracting && ['wheel', 'touchstart', 'mousedown', 'keydown'].includes(e.type)) {
        isInteracting = true;
        setAutoScroll(false);
        
        // Clear any existing idle timer
        if (idleTimer) clearTimeout(idleTimer);
        
        // Resume after 1 second of inactivity
        idleTimer = setTimeout(() => {
          isInteracting = false;
          setAutoScroll(true);
        }, 1000);
      }
    };

    // Listen to meaningful interactions only
    const events = ['wheel', 'touchstart', 'mousedown', 'keydown'];
    events.forEach(event => {
      window.addEventListener(event, handleUserInteraction, { passive: true });
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserInteraction);
      });
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);



  return (
    <div ref={containerRef} className="min-h-screen bg-[#eed3a4] relative overflow-x-hidden w-full">
      <FloatingParticles />
      <FloatingHearts />
      <FloatingFlowers />

      {/* Hero Section */}
      <section className="px-4 pt-8 pb-4 flex flex-col items-center justify-center relative overflow-hidden w-full max-w-full min-h-screen">
        {/* Animated Background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#0B3D2E] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#0B3D2E] rounded-full blur-[150px]" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Wedding Invitation Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[#0B3D2E]/70 uppercase tracking-[0.3em] text-sm md:text-base font-inter mb-8"
          >
            We&apos;re Getting Married
          </motion.p>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mb-8 w-full max-w-full px-4"
          >
            {/* <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight text-center">
              {BRIDE_NAME}
            </h1> */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="my-2 sm:my-4 md:my-6"
            >
              {/* <span className="text-3xl sm:text-4xl md:text-6xl text-[#8B3A5A] font-cormorant">
                &amp;
              </span> */}
            </motion.div>
            {/* <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight text-center">
              {GROOM_NAME}
            </h1> */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair text-[#0B3D2E] leading-tight text-center">
              #ShaiVikmeSauGun
              </h1>
          </motion.div>

          <Divider />

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-cormorant text-[#0B3D2E]">
              Wednesday, February 4th, 2026
            </p>
          </motion.div>

          
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <AnimatedFlourish position="top-left" size="md" />
        <AnimatedFlourish position="top-right" size="md" />
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-playfair text-[#0B3D2E] mb-4 zoom-in-out">
              Counting Down To Forever
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-[#0B3D2E]/80 mb-12 font-cormorant text-xl"
          >
            The beginning of our beautiful journey together
          </motion.p>
          <CountdownTimer targetDate={WEDDING_DATE} />
        </div>
      </section>


      {/* New Invitation Section */}
      <section className="py-20 md:py-32 relative">
        {/* Subtle decorative lines */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-0"
        >
          <div className="absolute top-0 left-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#0B3D2E]/30 to-transparent" />
          <div className="absolute bottom-0 left-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#0B3D2E]/30 to-transparent" />
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#eed3a4]/40 backdrop-blur-sm p-8 md:p-12 border border-[#0B3D2E]/20 relative overflow-hidden rounded-2xl"
          >
            {/* header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-playfair text-[#0B3D2E]">
                Invitation
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block h-px w-16 bg-[#0B3D2E]/30" />
                <svg
                  className="w-4 h-4 text-[#0B3D2E]/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                <span className="block h-px w-16 bg-[#0B3D2E]/30" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 max-w-4xl text-2xl mx-auto font-cormorant text-[#0B3D2E]">
              {/* Opening Line */}
              <p className="text-center md:text-xl italic">
                &quot;He carried a quiet certainty in his heart for years, and when her smile finally met that faith - their forever began. To him, she was the moment that turned time into destiny.&quot;
              </p>

              {/* Grandparents Blessing */}
              <div className="text-center space-y-2">
                <p className="text-2xl">With folded hands and grateful hearts, seeking the eternal blessings of late grandparents</p>
                <p className="font-bold">Lt. Sh. Roop Lal Dubey & <span className="block">Lt. Smt. Nirmala Dubey,</span></p>
              </div>

              {/* Parents Names */}
              <div className="text-center space-y-2">
                <div><span className="font-bold">Mrs. Madhu Dubey</span> & <span className="font-semibold block">Mr. Desh Rattan Dubey</span>
                <p>together with</p>
                 <span className="font-bold">Mrs. Uma Sharma & <span className="block">Lt. Mr. Sham Lal Sharma</span></span> joyfully open hearts to invite you to witness a tale of hearts entwining, where promises are whispered, dreams are shared, and a lifetime begins in the glow of sacred vows— at the Reception of Baraat of their beloved daughter,</div>
              </div>

              {/* Bride and Groom Names */}
              <div className="text-center space-y-2">
                <h3 className="text-4xl md:text-4xl font-playfair text-[#0B3D2E]">
                  Dr. Shagun
                </h3>
                <p className="text-lg">as she begins a timeless journey hand in hand with</p>
                <h3 className="text-4xl md:text-4xl font-playfair text-[#0B3D2E]">
                  Dr. Vikram
                </h3>
                <p className="text-lg">Beloved son of </p>
                <p className="font-semibold">Mrs. Koshaliya Devi & <span className="block">Mr. Chamail Singh</span></p>
              </div>

              {/* Date and Venue */}
              <div className="text-center space-y-2 py-4">
                <p className="text-xl font-semibold">On 4th February 2026</p>
                <p className="text-lg">Zone by the Park, Jammu</p>
                <p className="text-lg">7:00 PM Onwards</p>
              </div>

              {/* Blessing line */}
              <p className="text-center italic py-4">
                May your presence be the blessing that turns moments into memories and celebration into forever.
              </p>

              {/* Compliments */}
              <div className="text-center space-y-3 pt-4">
                <h4 className="text-2xl font-playfair text-[#0B3D2E] mb-3">
                  Best Compliments:
                </h4>
                <div className="flex items-center justify-between gap-2 space-y-1">
                  <p className="font-semibold">Adv. <span className="block">Achyut</span> <span>Dubey</span></p>
                  <p className="font-semibold">Mr. <span className="block">Munish</span> <span>Sharma</span></p>
                  <p className="font-semibold">Mr. <span className="block">Anish</span> <span>Sharma</span></p>
                </div>
                <p className="flex flex-col gap-2 pt-2">
                  <span className="text-md">Count a special invite from her newly married Twin and brother-in-law:</span>
                  <span className="font-semibold">Aditi Akshay Sharma.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Events Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <AnimatedFlourish position="top-left" size="lg" />
        <AnimatedFlourish position="top-right" size="lg" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-playfair text-[#0B3D2E] mb-4">
              Wedding Event
            </h2>
            <p className="text-[#0B3D2E]/80 font-cormorant text-xl mb-2">
              Join us for this  special celebration
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              title="Baraat & Grand Dinner"
              date="Wednesday, February 4th, 2026"
              time="7:00 PM Onwards"
              venue="Zone by the Park"
              address="Trikuta Nagar, Jammu"
              delay={0.3}
            />
          </div>

          {/* Venue Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="mt-12 bg-[#eed3a4]/40 backdrop-blur-sm rounded-2xl pt-4 md:p-8 border border-[#0B3D2E]/20"
          >
            <h3 className="text-2xl md:text-3xl font-playfair text-[#0B3D2E] mb-6 text-center">
              Venue Location
            </h3>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0B3D2E]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#0B3D2E]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-cormorant text-xl md:text-2xl text-[#0B3D2E]">
                  Zone by the Park
                </p>
                <p className="text-sm text-[#0B3D2E]/70">Trikuta Nagar, Jammu</p>
              </div>
            </div>

            {/* Map */}
            <div className="map-container relative h-64 md:h-96 rounded-none sm:rounded-2xl overflow-hidden mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.5!2d74.8723!3d32.7266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzM1LjgiTiA3NMKwNTInMjAuMyJF!5e0!3m2!1sen!2sin!4v1645564756836!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Zone+by+the+Park+Trikuta+Nagar+Jammu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#0B3D2E]/30 hover:bg-[#0B3D2E]/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 text-[#0B3D2E]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span className="font-inter text-sm">Get Directions</span>
            </motion.a>
          </motion.div>

          {/* Save the Date Button */}
          <SaveTheDateButton
            eventDate={WEDDING_DATE}
            eventTitle={`${BRIDE_NAME} & ${GROOM_NAME}'s Wedding`}
          />
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Footer */}
      <footer className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair text-[#0B3D2E] mb-6">
            {BRIDE_NAME} & {GROOM_NAME}
          </h2>
          <p className="text-[#0B3D2E]/80 font-cormorant text-xl mb-4">
            {WEDDING_DATE.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col gap-2 text-[#0B3D2E]/70 text-xs font-inter">
            <p>For queries reach out to Dubey Family:</p>
            <div>
              <a
                href="tel:+919419200672"
                className="hover:text-[#0B3D2E] transition-colors"
              >
                9419200672
              </a>{" "}
              •{" "}
              <a
                href="tel:+919419135747"
                className="hover:text-[#0B3D2E] transition-colors"
              >
                9419135747
              </a>{" "}
              •{" "}
              <a
                href="tel:+918007459659"
                className="hover:text-[#0B3D2E] transition-colors"
              >
                8007459659
              </a>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-6 items-center">
            {/* Share Button */}
            <ShareButton />
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

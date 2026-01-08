"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
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
} from "./components/ui";
import {
  CountdownTimer,
  EventCard,
  SaveTheDateButton,
  ShareButton,
} from "./components/features";
import { MusicPlayer } from "./components/layout";

// Import constants
import {
  WEDDING_DATE,
  GROOM_NAME,
  BRIDE_NAME,
  MUSIC_URL,
} from "./constants/wedding-data";

// Main Page Component
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-start music on component mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    const startMusic = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch {
        console.log("Autoplay failed, user can use music button");
      }
    };

    startMusic();
  }, []);

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-x-hidden w-full">
      <FloatingParticles />
      <FloatingHearts />
      <FloatingFlowers />

      {/* Hero Section */}
      <section className="p-4 flex flex-col items-center justify-center relative overflow-hidden w-full max-w-full">
        {/* Animated Background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20 overflow-hidden"
        >
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#8B3A5A] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-[#8B3A5A] rounded-full blur-[150px]" />
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
            className="text-muted uppercase tracking-[0.3em] text-sm md:text-base font-inter"
          >
            We&apos;re Getting Married
          </motion.p>
          <div className="ganesha-bg w-fit mx-auto">
            <Image
              src="/lord-ganesha-2.png"
              width={200}
              height={200}
              alt="lord-ganesha"
              className="w-40 h-40 mx-auto mb-4"
            />
          </div>

          {/* Ganesha Mantra - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-xs md:text-sm font-playfair text-[#bc7777] opacity-80">
                ॐ श्री गणेशाय नमः
              </p>
            </div>
            <p className="text-[10px] md:text-xs font-cormorant text-muted leading-tight max-w-md mx-auto">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center flex-wrap gap-2 sm:gap-4 mb-8 w-full max-w-full px-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight text-center">
              {BRIDE_NAME}
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="my-2 sm:my-4 md:my-6"
            >
              <span className="text-3xl sm:text-4xl md:text-6xl text-[#8B3A5A] font-cormorant">
                &amp;
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight text-center">
              {GROOM_NAME}
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
            <p className="text-xl sm:text-2xl md:text-3xl font-cormorant)] text-foreground">
              Wednesday, February 4th, 2026
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#8B3A5A]/50 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-[#8B3A5A] rounded-full"
              />
            </div>
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
            <h2 className="text-3xl md:text-5xl font-playfair gradient-text mb-4 zoom-in-out">
              Counting Down To Forever
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-muted mb-12 font-cormorant text-xl"
          >
            The beginning of our beautiful journey together
          </motion.p>
          <CountdownTimer targetDate={WEDDING_DATE} />
        </div>
      </section>


      {/* New Invitation Section */}
      <section className="py-20 md:py-32 relative">
        <RotatingMandala position="center" delay={4} />
        {/* soft background accents */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute top-10 left-1/4 w-52 h-52 sm:w-80 sm:h-80 rounded-full bg-[#8B3A5A]/15 blur-[140px]" />
          <div className="absolute -bottom-6 right-1/4 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-[#A04A6A]/15 blur-[160px]" />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass rounded-3xl p-8 md:p-12 border border-[#8B3A5A]/20 relative overflow-hidden"
          >
            {/* header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-playfair gradient-text">
                Invitation
              </h2>
              <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block h-px w-16 bg-[#8B3A5A]/30" />
                <svg
                  className="w-4 h-4 text-[#8B3A5A]/70"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 3l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5 2.5-5z" />
                </svg>
                <span className="block h-px w-16 bg-[#8B3A5A]/30" />
              </div>
            </div>

            {/* opening quote */}
            <blockquote className="relative mb-8">
              <svg
                aria-hidden
                className="absolute -top-4 -left-5 w-8 h-8 text-[#8B3A5A]/30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 11H5a4 4 0 014-4V3C5.582 3 3 5.582 3 9v8h6v-6zm12 0h-4a4 4 0 014-4V3c-3.418 0-6 2.582-6 6v8h6v-6z" />
              </svg>
              <p className="text-center text-lg md:text-2xl font-cormorant leading-relaxed text-foreground italic">
                He carried a quiet certainty in his heart for years, and when
                her smile finally met that faith - their forever began. To him,
                she was the moment that turned time into destiny.
              </p>
              <svg
                aria-hidden
                className="absolute -bottom-2 -right-2 w-8 h-8 rotate-180 text-[#8B3A5A]/30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 11H5a4 4 0 014-4V3C5.582 3 3 5.582 3 9v8h6v-6zm12 0h-4a4 4 0 014-4V3c-3.418 0-6 2.582-6 6v8h6v-6z" />
              </svg>
            </blockquote>

            {/* body content */}
            <div className="space-y-5 text-center">
              <p className="font-cormorant text-lg md:text-xl text-foreground leading-relaxed">
                With folded hands and grateful hearts, seeking the eternal
                blessings of late grandparents
                <br />
                <span className="font-semibold">
                  Sh. Roop Lal Dubey &amp; Smt. Nirmala Dubey,
                </span>
              </p>
              <p className="font-cormorant text-lg md:text-xl text-foreground leading-relaxed">
                Mrs. Madhu Dubey &amp; Mr. Desh Rattan Dubey together with Mrs.
                Uma Sharma and late Mr. Shyamlal Sharma joyfully open hearts to
                invite you to witness a tale of hearts entwining, where promises
                are whispered, dreams are shared, and a lifetime begins in the
                glow of sacred vows— at the Reception of Baraat of their beloved
                daughter,
              </p>

              {/* names */}
              <div className="mt-6">
                <motion.h3
                  className="text-3xl md:text-5xl font-playfair gradient-text"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Dr. Shagun
                </motion.h3>
              </div>
              <p className="font-cormorant text-lg md:text-xl text-muted">
                as she begins a timeless journey hand in hand with
              </p>
              <div className="my-4">
                <AnimatedRings />
              </div>
              <div className="mt-2 mb-4">
                <motion.h3
                  className="text-3xl md:text-5xl font-playfair gradient-text"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  Dr. Vikram
                </motion.h3>
              </div>
              <p className="font-cormorant text-lg md:text-xl text-foreground">
                Beloved son of Mr. Chamail Singh and Mrs. Koshaliya Devi
              </p>

              {/* event details */}
              <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mt-8">
                <div className="flex flex-row sm:flex-col items-center justify-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#8B3A5A]/10 flex items-center justify-center border border-[#8B3A5A]/30 bounce-subtle">
                    <svg
                      className="w-5 h-5 text-[#8B3A5A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="font-cormorant text-lg">On 4th February 2026</p>
                </div>
                <div className="flex flex-row sm:flex-col items-center justify-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#8B3A5A]/10 flex items-center justify-center border border-[#8B3A5A]/30"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <svg
                      className="w-5 h-5 text-[#8B3A5A]"
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
                  </motion.div>
                  <p className="font-cormorant text-lg">
                    Zone by the Park, Jammu
                  </p>
                </div>
                <div className="flex flex-row sm:flex-col items-center justify-center gap-2">
                  <motion.div
                    className="w-10 h-10 rounded-full bg-[#8B3A5A]/10 flex items-center justify-center border border-[#8B3A5A]/30"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <svg
                      className="w-5 h-5 text-[#8B3A5A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                  <p className="font-cormorant text-lg">7:00 PM Onwards</p>
                </div>
              </div>

              {/* blessing line */}
              <p className="mt-8 text-center text-base md:text-lg text-foreground italic font-cormorant">
                May your presence be the blessing that turns moments into
                memories and celebration into forever.
              </p>

              {/* compliments */}
              <div className="mt-10">
                <h4 className="text-xl md:text-2xl font-playfair gradient-text mb-3">
                  Best Compliments,
                </h4>
                <div className="flex items-center justify-between space-y-1 text-left mx-auto font-cormorant text-lg">
                  <p className="font-semibold">Adv. Achyut Dubey</p>
                  <p className="font-semibold">Mr. Munish Sharma</p>
                  <p className="font-semibold">Mr. Anish Sharma</p>
                </div>
                <p className="text-center text-base md:text-lg text-foreground italic font-cormorant">
                  Count a special invite from her newly married Twin and brother-in-law: <span className="font-semibold">Aditi Akshay Sharma.</span>
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
            <h2 className="text-3xl md:text-5xl font-playfair gradient-text mb-4">
              Wedding Events
            </h2>
            <p className="text-muted font-cormorant text-xl mb-2">
              Join us for these special celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              title="Mehandi Night"
              date="Tuesday, February 3rd, 2026"
              time=""
              venue="Zone by the Park"
              address="Trikuta Nagar, Jammu"
              subEvent="Cocktail & Dinner"
              dressCode="Saree / Western"
              delay={0}
            />
            <EventCard
              title="Saant / Haldi Ceremony"
              date="Wednesday, February 4th, 2026"
              time="10:00 AM"
              venue="Zone by the Park"
              address="Trikuta Nagar, Jammu"
              dressCode="Yellow Theme"
              delay={0.15}
            />
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
            className="mt-12 glass rounded-3xl pt-4 md:p-8 border border-[#8B3A5A]/20"
          >
            <h3 className="text-2xl md:text-3xl font-playfair gradient-text mb-6 text-center">
              Venue Location
            </h3>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#8B3A5A]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#8B3A5A]"
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
                <p className="font-cormorant text-xl md:text-2xl">
                  Zone by the Park
                </p>
                <p className="text-sm text-muted">Trikuta Nagar, Jammu</p>
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
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#8B3A5A]/30 hover:bg-[#8B3A5A]/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 text-[#8B3A5A]"
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
          <h2 className="text-4xl md:text-6xl font-playfair gradient-text mb-6">
            {BRIDE_NAME} & {GROOM_NAME}
          </h2>
          <p className="text-muted font-cormorant text-xl mb-4">
            {WEDDING_DATE.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col gap-2 text-muted text-xs font-inter">
            <p>For queries reach out to Dubey Family:</p>
            <div>
              <a
                href="tel:+919419200672"
                className="hover:text-[#8B3A5A] transition-colors"
              >
                9419200672
              </a>{" "}
              •{" "}
              <a
                href="tel:+919419135747"
                className="hover:text-[#8B3A5A] transition-colors"
              >
                9419135747
              </a>{" "}
              •{" "}
              <a
                href="tel:+918007459659"
                className="hover:text-[#8B3A5A] transition-colors"
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

      {/* Music Player */}
      <MusicPlayer
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-gray-300 via-gray-200 to-white"
    >
      {/* ============ MOBILE LAYOUT (text top, photo bottom) ============ */}
      <div className="md:hidden flex flex-col h-full w-full pt-25 pb-15 px-6">
        {/* Text Block - TOP */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="flex flex-col items-center text-center z-20 mt-1.5"
        >
          <div className="relative">
            {/* "Anjef" — overlapping DANGOL */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="font-script text-brand-red text-4xl leading-none absolute -top-5 -left-2 z-10"
              style={{ transform: "rotate(-5deg)" }}
            >
              Anjef
            </motion.h1>

            {/* "DANGOL" */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-bold text-brand-grey text-5xl tracking-wider leading-[0.9]"
            >
              DANGOL
            </motion.h2>
          </div>

          {/* "FrontEnd.dev" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-baseline mt-3"
          >
            <span className="font-script text-black text-2xl leading-none">
              FrontEnd
            </span>
            <span className="font-arapey italic text-black text-base ml-1">
              .dev
            </span>
          </motion.div>

          {/* Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContactClick}
            className="mt-10 px-10 py-2 bg-gray-300/80 hover:bg-gray-400/80 backdrop-blur-sm rounded-full text-xs font-body uppercase tracking-widest text-gray-800 shadow-md transition-colors"
          >
            Get in touch
          </motion.button>
        </motion.div>

        {/* Photo - BOTTOM (fills remaining space) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex-1 w-full mt-4 pointer-events-none"
        >
          <Image
            src="/assets/hero-photo.png"
            alt="Anjef Dangol"
            fill
            priority
            className="object-contain object-bottom"
            sizes="450vw"
          />
        </motion.div>
      </div>

      {/* ============ DESKTOP LAYOUT (photo center-left, text right) ============ */}
      <div className="hidden md:block w-full h-full">
        {/* PHOTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-[35%] -translate-x-1/2 h-[140vh] w-auto z-10 pointer-events-none"
        >
          <div className="relative h-full aspect-[3/4]">
            <Image
              src="/assets/hero-photo.png"
              alt="Anjef Dangol"
              fill
              priority
              className="object-contain object-top"
              sizes="100vh"
            />
          </div>
        </motion.div>

        {/* TEXT BLOCK */}
        <div className="relative w-full h-full z-20">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="absolute top-1/2 -translate-y-1/2 right-[18%] flex flex-col items-end"
          >
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-script text-brand-red text-5xl lg:text-7xl leading-none absolute -top-8 lg:-top-13 -left-4 lg:-left-17 z-10"
                style={{ transform: "rotate(-5deg)" }}
              >
                Anjef
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="font-bold text-brand-grey text-6xl lg:text-8xl tracking-wider leading-[0.9]"
              >
                DANGOL
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-baseline mt-3 lg:mt-4 self-end mr-4"
            >
              <span className="font-script text-black text-3xl lg:text-5xl leading-none">
                FrontEnd
              </span>
              <span className="font-arapey italic text-black text-lg lg:text-2xl ml-1">
                .dev
              </span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onContactClick}
              className="mt-5 lg:mt-6 self-end mr-8 px-7 py-2.5 bg-gray-300/80 hover:bg-gray-400/80 backdrop-blur-sm rounded-full text-xs lg:text-sm font-body uppercase tracking-widest text-gray-800 shadow-md transition-colors"
            >
              Get in touch
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
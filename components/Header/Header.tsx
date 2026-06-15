"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-8 py-4 flex justify-between items-center"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24">
        <Image
          src="/logo.svg"
          alt="Anjef Dangol Logo"
          fill
          priority
          className="object-contain"
        />
      </div>
    </motion.header>
  );
}
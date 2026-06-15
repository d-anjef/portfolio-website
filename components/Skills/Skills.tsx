"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WindowFrame from "@/components/ui/WindowFrame";
import { skillsData } from "@/lib/data/skills";
import type { ModalProps } from "@/types";

// Map iconName to emoji (or replace with image URL later)
const iconMap: Record<string, string> = {
  html: "🌐",
  css: "🎨",
  tailwind: "💨",
  javascript: "📜",
  typescript: "📘",
  react: "⚛️",
  nextjs: "▲",
  framer: "🎬",
  node: "🟢",
  express: "🚂",
  mongodb: "🍃",
  php: "🐘",
  mysql: "🗄️",
  java: "☕",
  c: "©️",
  cpp: "➕",
  git: "🔀",
  github: "🐙",
  gitlab: "🦊",
  vscode: "💙",
  figma: "🎨",
  xd: "🅧",
  wordpress: "📝",
  premiere: "🎞️",
  ae: "✨",
  camera: "📷",
  video: "🎥",
};

const categories = ["All", "Frontend", "Backend", "Programming", "Tools", "Design", "Media"] as const;
type Category = (typeof categories)[number];

export default function Skills({ isOpen, onClose }: ModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredSkills = useMemo(
    () =>
      selectedCategory === "All"
        ? skillsData
        : skillsData.filter((s) => s.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <WindowFrame
      isOpen={isOpen}
      onClose={onClose}
      title="My Professional Skills"
      icon="🧠"
      size="lg"
      glowColor="#63b3ed"
    >
      {/* Description */}
      <div className="px-6 py-4 bg-[#252525] border-b border-white/10 text-gray-300 text-sm md:text-base leading-relaxed">
        Explore my diverse skill set spanning frontend development, backend
        technologies, programming languages, design tools, and creative media
        production.
      </div>

      {/* Category Filter */}
      <div className="px-6 py-3 border-b border-white/10 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition-all ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-500/80 to-indigo-500/80 border-blue-400 text-white shadow-md shadow-blue-500/30"
                : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="group bg-white/8 backdrop-blur-md border border-white/15 rounded-2xl p-5 flex flex-col items-center justify-center min-h-[160px] cursor-pointer hover:bg-white/12 hover:border-white/25 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              >
                <div className="text-4xl md:text-5xl mb-3 transition-transform group-hover:scale-125 group-hover:rotate-12">
                  {iconMap[skill.iconName] ?? "🔹"}
                </div>
                <h3 className="text-white text-sm md:text-base font-semibold font-heading text-center mb-2">
                  {skill.title}
                </h3>
                <span className="text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 font-medium">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredSkills.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-500">
            No skills found in this category.
          </div>
        )}
      </div>
    </WindowFrame>
  );
}
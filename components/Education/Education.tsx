"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import WindowFrame from "@/components/ui/WindowFrame";
import { educationData } from "@/lib/data/education";
import type { ModalProps } from "@/types";

const statusStyles: Record<string, string> = {
  "Currently Studying": "bg-purple-500/20 text-purple-200 border-purple-300",
  Completed: "bg-green-500/20 text-green-300 border-green-300",
};

export default function Education({ isOpen, onClose }: ModalProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <WindowFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Education"
      icon="🎓"
      size="lg"
      glowColor="#a78bfa"
    >
      {/* Description */}
      <div className="px-6 py-4 bg-[#252525] border-b border-white/10 text-gray-300 text-sm md:text-base leading-relaxed">
        My educational journey showcasing formal qualifications and academic
        achievements. Each stage of education has built upon the previous one,
        creating a strong foundation in computer science and technology.
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="flex flex-col gap-4 max-w-4xl mx-auto">
          {educationData.map((edu, index) => {
            const isExpanded = expandedId === edu.id;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300 ${
                  isExpanded
                    ? "bg-gradient-to-br from-[#2a254a] to-[#1a1a3a] border-purple-400 shadow-lg shadow-purple-500/25"
                    : "bg-gradient-to-br from-[#2b2b2b] to-[#242424] border-white/10 hover:border-purple-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/20"
                }`}
              >
                {/* Header */}
                <div className="flex gap-4 mb-3">
                  <div className="text-3xl md:text-4xl flex-shrink-0">{edu.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold font-heading text-base md:text-lg leading-tight mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-400 font-semibold text-sm md:text-base">
                      {edu.institution}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm italic mb-2">
                      {edu.fieldOfStudy}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Calendar size={12} />
                        {edu.duration}
                      </span>
                      <span
                        className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider border ${
                          statusStyles[edu.status]
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  {edu.description}
                </p>

                {/* Expanded details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-3 border-t border-purple-500/20 flex flex-col gap-3">
                        {/* Highlights */}
                        <div>
                          <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                            Highlights
                          </h4>
                          <ul className="space-y-1">
                            {edu.highlights.map((h, i) => (
                              <li
                                key={i}
                                className="text-gray-400 text-sm flex items-start gap-2"
                              >
                                <span className="text-purple-400 font-bold">✓</span>
                                {h}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Courses */}
                        {edu.courses && (
                          <div>
                            <h4 className="text-purple-400 text-xs font-bold uppercase tracking-wider mb-2">
                              Key Courses
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((c, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-medium"
                                >
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expand indicator */}
                <div className="flex justify-end items-center gap-1 text-purple-400 text-xs font-semibold mt-2">
                  {isExpanded ? (
                    <>
                      <ChevronDown size={14} /> Less Details
                    </>
                  ) : (
                    <>
                      <ChevronRight size={14} /> More Details
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WindowFrame>
  );
}
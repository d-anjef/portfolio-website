"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import WindowFrame from "@/components/ui/WindowFrame";
import { experienceData } from "@/lib/data/experience";
import type { ModalProps } from "@/types";

const statusStyles: Record<string, string> = {
  "Currently Working": "bg-green-500/20 text-green-400 border-green-400",
  Internship: "bg-blue-500/20 text-blue-300 border-blue-300",
  "Full-time": "bg-purple-500/20 text-purple-300 border-purple-300",
  "Part-time": "bg-orange-500/20 text-orange-400 border-orange-400",
};

export default function Experience({ isOpen, onClose }: ModalProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <WindowFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Work Experience"
      icon="💼"
      size="lg"
      glowColor="#4a9eff"
    >
      {/* Description */}
      <div className="px-6 py-4 bg-[#252525] border-b border-white/10 text-gray-300 text-sm md:text-base leading-relaxed">
        My professional journey showcasing diverse roles in web management,
        content creation, photography, and data annotation. Each experience has
        contributed to my growth as a developer and creative professional.
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
        <div className="relative max-w-4xl mx-auto pl-8">
          {/* Timeline line */}
          <div className="absolute left-1.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-700 rounded-full" />

          {experienceData.map((job, index) => {
            const isExpanded = expandedId === job.id;

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative mb-7"
              >
                {/* Timeline marker */}
                <div className="absolute -left-8 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 border-[3px] border-[#1e1e1e] shadow-[0_0_0_4px_rgba(74,158,255,0.2)] transition-all group-hover:scale-125" />

                <div
                  onClick={() => setExpandedId(isExpanded ? null : job.id)}
                  className={`group cursor-pointer overflow-hidden rounded-xl border p-4 md:p-5 transition-all duration-300 ${
                    isExpanded
                      ? "bg-gradient-to-br from-[#2a3a4a] to-[#1a2a3a] border-blue-400 shadow-lg shadow-blue-500/25"
                      : "bg-gradient-to-br from-[#2b2b2b] to-[#242424] border-white/10 hover:border-blue-400 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                  }`}
                >
                  {/* Header */}
                  <div className="flex gap-4 mb-3">
                    <div className="text-2xl md:text-3xl flex-shrink-0">{job.icon}</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold font-heading text-base md:text-lg leading-tight mb-1">
                        {job.jobTitle}
                      </h3>
                      <p className="text-blue-400 font-semibold text-sm md:text-base mb-2">
                        {job.company}
                      </p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Calendar size={12} />
                          {job.duration}
                        </span>
                        <span
                          className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider border ${
                            statusStyles[job.status]
                          }`}
                        >
                          {job.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    {job.description}
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
                        <div className="pt-4 mt-3 border-t border-blue-500/20 flex flex-col gap-3">
                          {/* Responsibilities */}
                          <div>
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                              Responsibilities
                            </h4>
                            <ul className="space-y-1">
                              {job.responsibilities.map((r, i) => (
                                <li
                                  key={i}
                                  className="text-gray-400 text-sm flex items-start gap-2"
                                >
                                  <span className="text-blue-400 font-bold">▸</span>
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                              Technologies & Skills
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {job.technologies.map((t, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 font-medium"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Location */}
                          {job.location && (
                            <div>
                              <h4 className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
                                Location
                              </h4>
                              <p className="text-gray-400 text-sm">{job.location}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand indicator */}
                  <div className="flex justify-end items-center gap-1 text-blue-400 text-xs font-semibold mt-2">
                    {isExpanded ? (
                      <>
                        <ChevronDown size={14} /> Less
                      </>
                    ) : (
                      <>
                        <ChevronRight size={14} /> More
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </WindowFrame>
  );
}
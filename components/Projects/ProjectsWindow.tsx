"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import WindowFrame from "@/components/ui/WindowFrame";
import ProjectShowcaseModal from "./ProjectShowcaseModal";
import { projectsData } from "@/lib/data/projects";
import type { ModalProps, Project } from "@/types";

// Custom GitHub icon
const GithubIcon = ({ size = 12 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const VISIBLE_CARDS = 5;
const CARD_OFFSET_X = 65; // px to the right per card behind
const CARD_OFFSET_Y = 25; // px upward per card behind
const CARD_SKEW = 2; // degrees skew per card
const CARD_SCALE_STEP = 0.025;

export default function ProjectsWindow({ isOpen, onClose }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const total = projectsData.length;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotate
  useEffect(() => {
    if (!isOpen || !isAutoplay || selectedProject) return;
    const interval = setInterval(goNext, 4500);
    return () => clearInterval(interval);
  }, [isOpen, isAutoplay, goNext, selectedProject]);

  // Keyboard nav
  useEffect(() => {
    if (!isOpen || selectedProject) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setIsAutoplay(false);
        goNext();
      }
      if (e.key === "ArrowLeft") {
        setIsAutoplay(false);
        goPrev();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goNext, goPrev, selectedProject]);

  // Stack: front → back (current is index 0, others are upcoming)
  const visibleCards = useMemo(() => {
    const cards = [];
    const count = Math.min(VISIBLE_CARDS, total);
    for (let i = 0; i < count; i++) {
      const index = (currentIndex + i) % total;
      cards.push({
        project: projectsData[index],
        stackIndex: i,
        originalIndex: index,
      });
    }
    // Render back cards first so front card sits on top
    return cards.reverse();
  }, [currentIndex, total]);

  return (
    <>
      <WindowFrame
        isOpen={isOpen}
        onClose={onClose}
        title="My Projects"
        icon="📂"
        size="xl"
        glowColor="#5227FF"
      >
        <div className="flex-1 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 md:px-12 py-8 h-full max-w-7xl mx-auto items-center">
            {/* LEFT: Title + Controls */}
            <div className="flex flex-col justify-center gap-4 z-20 relative">
              <h1 className="text-white text-3xl md:text-5xl font-bold font-display tracking-tight">
                Featured Projects
              </h1>
              <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                Below is a showcase of my projects. Each card represents a
                different project with unique features and technologies.
                Explore how I blend code, design, and creativity into
                everything I do.
              </p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsAutoplay(false);
                    goPrev();
                  }}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => {
                    setIsAutoplay(false);
                    goNext();
                  }}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>

                <button
                  onClick={() => setIsAutoplay((p) => !p)}
                  className={`ml-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    isAutoplay
                      ? "bg-green-500/20 border border-green-500/40 text-green-300"
                      : "bg-white/5 border border-white/20 text-white/50"
                  }`}
                >
                  {isAutoplay ? "● Auto" : "○ Manual"}
                </button>
              </div>

              <div className="text-white/40 text-xs font-mono mt-2">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </div>
            </div>

            {/* RIGHT: Card Stack */}
            <div className="relative w-full h-[460px] md:h-[500px] flex items-center justify-center">
              <div className="relative w-[380px] md:w-[420px] h-[420px] md:h-[440px]">
                <AnimatePresence mode="popLayout">
                  {visibleCards.map(({ project, stackIndex, originalIndex }) => {
                    const isFront = stackIndex === 0;
                    return (
                      <motion.div
                        key={originalIndex}
                        layout
                        initial={{
                          opacity: 0,
                          x: -100,
                          y: 100,
                          scale: 0.8,
                          rotate: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: stackIndex * CARD_OFFSET_X,
                          y: -stackIndex * CARD_OFFSET_Y,
                          scale: 1 - stackIndex * CARD_SCALE_STEP,
                          rotate: stackIndex * CARD_SKEW,
                        }}
                        exit={{
                          opacity: 0,
                          y: 400,
                          x: -100,
                          rotate: -25,
                          scale: 0.7,
                          transition: { duration: 0.6, ease: "easeIn" },
                        }}
                        transition={{
                          duration: 0.6,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        style={{
                          zIndex: VISIBLE_CARDS - stackIndex,
                          transformOrigin: "bottom right",
                        }}
                        className="absolute inset-0"
                        onClick={() =>
                          isFront && setSelectedProject(project)
                        }
                        whileHover={
                          isFront
                            ? { scale: 1.02, y: 3 }
                            : undefined
                        }
                      >
                        <ProjectCard
                          project={project}
                          isFront={isFront}
                          cardNumber={originalIndex + 1}
                        />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs flex items-center gap-3 font-mono z-10">
            <span className="font-semibold text-white/70">
              {total} Projects
            </span>
            <span className="text-white/20">•</span>
            <span className="italic">Swipe or wait for auto-rotation</span>
          </div>
        </div>
      </WindowFrame>

      <ProjectShowcaseModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

// ===== Project Card =====
function ProjectCard({
  project,
  isFront,
  cardNumber,
}: {
  project: Project;
  isFront: boolean;
  cardNumber: number;
}) {
  return (
    <div
      className={`w-full h-full rounded-2xl border bg-gradient-to-br from-[#111] to-[#0a0a0a] flex flex-col overflow-hidden shadow-2xl transition-all ${
        isFront
          ? "border-white/30 cursor-pointer"
          : "border-white/10 pointer-events-none"
      }`}
      style={{
        boxShadow: isFront
          ? `0 25px 60px ${project.color}40, 0 0 0 1px ${project.color}30`
          : `0 10px 30px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${project.color}, ${project.color}CC)`,
            boxShadow: `0 10px 30px ${project.color}50, inset 0 0 0 1px rgba(255,255,255,0.1)`,
          }}
        >
          {project.icon}
        </div>
        <div
          className="px-3 py-1 rounded-full border text-xs font-bold font-mono"
          style={{ borderColor: project.color, color: project.color }}
        >
          #{cardNumber}
        </div>
      </div>

      {/* Image (if exists) */}
      {project.image && (
        <div className="relative w-[calc(100%-2.5rem)] h-28 mx-5 mb-2 overflow-hidden rounded-lg border border-white/10">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="500px"
          />
        </div>
      )}

      {/* Body */}
      <div className="flex-1 px-6 pb-3 flex flex-col gap-3">
        <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
          {project.title}
        </h3>
        <p className="text-white/65 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
              style={{
                background: `${project.color}20`,
                borderColor: `${project.color}40`,
                color: project.color,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-white/60">
          {project.live ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
              Live
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              Repository
            </span>
          )}
          {project.github && <GithubIcon size={12} />}
        </div>
        {isFront && (
          <span className="text-white/40 italic">Click to explore →</span>
        )}
      </div>
    </div>
  );
}
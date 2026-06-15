"use client";

import dynamic from "next/dynamic";
import WindowFrame from "@/components/ui/WindowFrame";
import TextType from "./TextType";
import { FileText } from "lucide-react";
import type { ModalProps } from "@/types";

// Lazy-load Lanyard (heavy 3D component, client-only)
const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-[#00ffa3] text-sm bg-[#1a1a1a]">
      Loading 3D Card...
    </div>
  ),
});

const bioText =
  "A passionate Web Developer focused on creating engaging and dynamic web applications. If you're looking to build something amazing for the web, whether it's a new application or collaborating on an existing project, feel free to reach out. Let's connect and develop something incredible together! Beyond the world of code, I'm also a creative professional with a keen eye for photography and videography. I love merging technical skills with artistic vision, and I'm proficient in the Adobe Creative Suite, including Premiere Pro for video editing, color grading, and motion graphics. Whether it's capturing stunning visuals or bringing stories to life through video, I'm always eager to explore new creative ventures.";

export default function Profile({ isOpen, onClose }: ModalProps) {
  return (
    <WindowFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Profile.exe"
      icon="👤"
      size="lg"
      glowColor="#00ffa3"
    >
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-[#1e1e1e]">
        {/* Left: 3D Lanyard - dark background */}
        <div className="w-full lg:w-2/5 h-[350px] lg:h-full border-b lg:border-b-0 lg:border-r border-white/5 relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
          <Lanyard />
        </div>

        {/* Right: Bio */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex flex-col justify-center scrollbar-dark bg-[#1e1e1e]">
          <div className="max-w-2xl mx-auto w-full">
            {/* Intro */}
            <div className="text-[#00ffa3] font-mono text-base md:text-xl tracking-wider mb-3">
              <TextType
                text="Let me introduce myself."
                typingSpeed={70}
                showCursor={false}
              />
            </div>

            {/* Main heading */}
            <h1 className="text-white text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
              <TextType
                text="Hey! It's me Anjef Dangol."
                typingSpeed={40}
                initialDelay={1500}
                showCursor={false}
              />
            </h1>

            {/* Bio */}
            <div className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
              <TextType
                text={bioText}
                typingSpeed={15}
                initialDelay={3000}
                cursorCharacter="_"
              />
            </div>

            {/* Hint */}
            <p className="text-[#00ffa3] text-xs md:text-sm mb-4">
              Explore: Try dragging the card!
            </p>

            {/* Download Resume */}
            <a
              href="/assets/Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border border-gray-600 hover:border-green-500 text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5"
            >
              <FileText size={18} />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
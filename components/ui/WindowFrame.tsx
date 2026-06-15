"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";

interface WindowFrameProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  glowColor?: string; // hex color for title glow
}

const sizeClasses = {
  sm: "w-[90vw] max-w-2xl h-auto max-h-[85vh]",
  md: "w-[92vw] max-w-5xl h-[88vh]",
  lg: "w-[95vw] max-w-[1400px] h-[88vh]",
  xl: "w-[95vw] max-w-[1500px] h-[90vh]",
};

export default function WindowFrame({
  isOpen,
  onClose,
  title,
  icon,
  children,
  size = "md",
  glowColor = "#a78bfa",
}: WindowFrameProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-md bg-black/50 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`${sizeClasses[size]} bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-[#1f1f1f] px-5 py-3 border-b border-white/10 flex-shrink-0">
              <div
                className="flex items-center gap-2 text-white font-semibold text-base md:text-lg font-heading"
                style={{ textShadow: `0 0 8px ${glowColor}88` }}
              >
                {icon && <span>{icon}</span>}
                <span>{title}</span>
              </div>

              <div className="flex gap-2">
                <button
                  className="w-3 h-3 rounded-full bg-mac-yellow hover:scale-110 transition-transform"
                  aria-label="Minimize"
                  title="Minimize"
                />
                <button
                  className="w-3 h-3 rounded-full bg-mac-green hover:scale-110 transition-transform"
                  aria-label="Maximize"
                  title="Maximize"
                />
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-mac-red hover:scale-110 transition-transform"
                  aria-label="Close"
                  title="Close"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col text-white">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
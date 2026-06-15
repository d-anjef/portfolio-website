"use client";

import { useEffect, useState, useRef } from "react";

interface TextTypeProps {
  text: string;
  typingSpeed?: number;
  initialDelay?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  loop?: boolean;
  className?: string;
  onComplete?: () => void;
}

export default function TextType({
  text,
  typingSpeed = 50,
  initialDelay = 0,
  showCursor = true,
  cursorCharacter = "|",
  loop = false,
  className = "",
  onComplete,
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Reset on text change
    setDisplayedText("");
    setIsComplete(false);
    indexRef.current = 0;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    const startTyping = () => {
      const typeNextChar = () => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.slice(0, indexRef.current + 1));
          indexRef.current++;
          const t = setTimeout(typeNextChar, typingSpeed);
          timeoutsRef.current.push(t);
        } else {
          setIsComplete(true);
          onComplete?.();
          if (loop) {
            const t = setTimeout(() => {
              indexRef.current = 0;
              setDisplayedText("");
              setIsComplete(false);
              typeNextChar();
            }, 2000);
            timeoutsRef.current.push(t);
          }
        }
      };
      typeNextChar();
    };

    const initialTimer = setTimeout(startTyping, initialDelay);
    timeoutsRef.current.push(initialTimer);

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [text, typingSpeed, initialDelay, loop, onComplete]);

  return (
    <span className={`inline-block whitespace-pre-wrap break-words ${className}`}>
      {displayedText}
      {showCursor && (
        <span
          className={`ml-1 inline-block ${
            isComplete && !loop ? "animate-pulse" : "animate-pulse"
          }`}
          style={{
            animation: "blink 1s step-end infinite",
          }}
        >
          {cursorCharacter}
        </span>
      )}
      <style jsx>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
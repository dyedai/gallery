"use client";

import { useEffect, useRef, useState } from "react";

interface TypingTextProps {
  textArray: string[];
  typeSpeed?: number;
  cursorSpeed?: number;
  pauseEnd?: number;
  pauseStart?: number;
  className?: string;
}

export function TypingText({ textArray, typeSpeed = 110, cursorSpeed = 550, pauseEnd = 1500, pauseStart = 20, className = "" }: TypingTextProps) {
  const [text, setText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [showCursor, setShowCursor] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startTyping = () => {
      const current = textArray[textIndex];

      if (charIndex > current.length) {
        setDirection("backward");
        clearInterval(intervalRef.current!);
        intervalRef.current = setTimeout(() => {
          intervalRef.current = setInterval(startTyping, typeSpeed);
        }, pauseEnd) as unknown as NodeJS.Timeout;
        return;
      }

      if (direction === "forward") {
        setText(current.substring(0, charIndex));
        setCharIndex((prev) => prev + 1);
      } else {
        if (charIndex === 0) {
          setDirection("forward");
          clearInterval(intervalRef.current!);
          intervalRef.current = setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % textArray.length);
            intervalRef.current = setInterval(startTyping, typeSpeed);
          }, pauseStart) as unknown as NodeJS.Timeout;
        } else {
          setText(current.substring(0, charIndex));
          setCharIndex((prev) => prev - 1);
        }
      }
    };

    intervalRef.current = setInterval(startTyping, typeSpeed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [textIndex, charIndex, direction, textArray, typeSpeed, pauseEnd, pauseStart]);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorSpeed);
    return () => clearInterval(blink);
  }, [cursorSpeed]);

  return (
    <div className="flex items-center justify-center mx-auto text-center max-w-7xl">
      <div className="relative flex items-center justify-center h-auto">
        <p className={`text-2xl font-black leading-tight ${className}`}>
          {text}
          <span className={`inline-block w-[2px] h-6 bg-black ml-1 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
        </p>
      </div>
    </div>
  );
}

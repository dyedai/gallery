"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const currentText = textArray[textIndex];

    const handleTyping = () => {
      if (direction === "forward") {
        if (charIndex <= currentText.length) {
          setText(currentText.slice(0, charIndex));
          setCharIndex((prev) => prev + 1);
        } else {
          setTimeout(() => setDirection("backward"), pauseEnd);
        }
      } else {
        if (charIndex > 0) {
          setText(currentText.slice(0, charIndex));
          setCharIndex((prev) => prev - 1);
        } else {
          setTimeout(() => {
            setDirection("forward");
            setTextIndex((prev) => (prev + 1) % textArray.length);
          }, pauseStart);
        }
      }
    };

    const interval = setInterval(handleTyping, typeSpeed);
    return () => clearInterval(interval);
  }, [charIndex, direction, textIndex, textArray, typeSpeed, pauseEnd, pauseStart]);

  useEffect(() => {
    const cursorBlink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, cursorSpeed);
    return () => clearInterval(cursorBlink);
  }, [cursorSpeed]);

  return (
    <p className={`leading-tight justify-center ${className}`}>
      {text}
      <span className={`inline-block w-[1px] h-4 bg-gray-700 ml-1 transition-opacity ${showCursor ? "opacity-100" : "opacity-0"}`} />
    </p>
  );
}

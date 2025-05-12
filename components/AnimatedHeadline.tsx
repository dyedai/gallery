"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

export function AnimatedHeadline({ text, className = "" }: AnimatedHeadlineProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // テキストを1文字ずつ <span> に分割
    const chars = text.split("").map((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      if (char.trim()) span.className = "inline-block";
      return span;
    });

    el.innerHTML = "";
    chars.forEach((span) => el.appendChild(span));

    // アニメーション
    gsap.fromTo(
      el.children,
      { opacity: 0, scale: 4 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "expo.out",
        stagger: 0.07,
      }
    );
  }, [text]);

  return (
    <h1 ref={containerRef} className={`block${className}`}>
      {text}
    </h1>
  );
}

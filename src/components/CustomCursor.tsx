"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    document.body.classList.add("custom-cursor-active");
    const cursor = cursorRef.current;
    if (!cursor) return;

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const addHover = () => cursor.classList.add("hovering");
    const removeHover = () => cursor.classList.remove("hovering");

    document.addEventListener("mousemove", move);

    const observer = new MutationObserver(() => {
      const interactives = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button']"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", addHover);
        el.addEventListener("mouseleave", removeHover);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Initial binding
    const interactives = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}

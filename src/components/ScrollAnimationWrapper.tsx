"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  animation?: "fadeUp" | "slideLeft" | "slideRight" | "scaleUp";
  delay?: number;
  className?: string;
}

export function ScrollAnimationWrapper({
  children,
  animation = "fadeUp",
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animations = {
      fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
      slideLeft: { from: { opacity: 0, x: -80 }, to: { opacity: 1, x: 0 } },
      slideRight: { from: { opacity: 0, x: 80 }, to: { opacity: 1, x: 0 } },
      scaleUp: {
        from: { opacity: 0, scale: 0.85 },
        to: { opacity: 1, scale: 1 },
      },
    };

    const anim = animations[animation];

    gsap.set(el, anim.from);
    gsap.to(el, {
      ...anim.to,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animation, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

const testimonials = [
  {
    name: "Sarah Al-Rashid",
    text: "Savvy Dental Clinic transformed my smile completely. The team was incredibly professional and made me feel comfortable throughout the entire process. I couldn't be happier with my results!",
    service: "Cosmetic Dentistry",
  },
  {
    name: "Ahmed Al-Mohsen",
    text: "Best dental experience I've ever had. The orthodontic treatment was smooth and the results exceeded my expectations. The staff is friendly and the clinic is spotless.",
    service: "Orthodontics",
  },
  {
    name: "Fatima Al-Qahtani",
    text: "My children actually look forward to their dental visits now! The pediatric team is wonderful with kids. They make the whole experience fun and stress-free.",
    service: "Pediatric Dentistry",
  },
  {
    name: "Omar Al-Saud",
    text: "The dental implant procedure was painless and the results are amazing. It looks and feels just like my natural tooth. Highly recommend Savvy Dental Clinic!",
    service: "Dental Implants",
  },
  {
    name: "Noura Al-Dosari",
    text: "I got my teeth whitened here and the difference is incredible. The process was quick, comfortable, and the results are stunning. Everyone keeps complimenting my smile!",
    service: "Teeth Whitening",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[var(--muted)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-4">
            What Our Patients Say
          </h2>
          <p className="text-brand-700 dark:text-brand-300">
            Real stories from real patients who trust us with their smiles.
          </p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="scaleUp">
          <div className="relative bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-8 md:p-12 min-h-[280px] flex flex-col justify-center">
            <div className="absolute top-6 left-8 text-brand-primary/40 dark:text-brand-accent/30">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <p className="text-lg md:text-xl text-brand-800 dark:text-brand-200 leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-brand-900 dark:text-white">
                    {testimonials[current].name}
                  </p>
                  <p className="text-sm text-brand-accent">
                    {testimonials[current].service}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                onClick={prev}
                className="p-2 rounded-full border border-[var(--card-border)] hover:bg-brand-primary/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === current
                        ? "bg-brand-accent w-6"
                        : "bg-brand-primary/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <motion.button
                onClick={next}
                className="p-2 rounded-full border border-[var(--card-border)] hover:bg-brand-primary/10 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>
          </div>
        </ScrollAnimationWrapper>
      </div>
    </section>
  );
}

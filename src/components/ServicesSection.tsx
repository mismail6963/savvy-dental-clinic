"use client";

import { motion } from "framer-motion";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

const services = [
  {
    title: "Orthodontics",
    description:
      "Straighten your teeth with modern braces and clear aligners for a perfect, confident smile.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: "Dental Implants",
    description:
      "Permanent tooth replacement solutions that look, feel, and function like natural teeth.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with veneers, bonding, and complete smile makeovers tailored to you.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Teeth Whitening",
    description:
      "Professional whitening treatments for a brighter, more radiant smile in just one visit.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Pediatric Dentistry",
    description:
      "Gentle, child-friendly dental care that makes every visit comfortable and fun for kids.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Oral Surgery",
    description:
      "Expert surgical procedures including wisdom teeth removal, jaw surgery, and more.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-brand-700 dark:text-brand-300 max-w-2xl mx-auto">
            Comprehensive dental care for the whole family, delivered with
            expertise and a gentle touch.
          </p>
        </ScrollAnimationWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <ScrollAnimationWrapper
              key={service.title}
              animation="scaleUp"
              delay={i * 0.1}
            >
              <motion.div
                className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8 h-full hover:shadow-xl transition-shadow duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-brand-primary/20 dark:bg-brand-accent/20 flex items-center justify-center text-brand-accent dark:text-brand-primary mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-700 dark:text-brand-300 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

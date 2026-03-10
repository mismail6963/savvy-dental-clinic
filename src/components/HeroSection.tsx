"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./HeroBackground";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-brand-900 dark:text-white mb-4">
            Savvy Dental Clinic
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-brand-accent dark:text-brand-primary font-medium mb-2">
            Aesthetic & Dental Care
          </p>
          <p className="text-base sm:text-lg text-brand-700 dark:text-brand-300 max-w-2xl mx-auto mb-8">
            Experience premium dental care in Riyadh. From cosmetic dentistry to
            advanced orthodontics, we craft confident smiles with precision and
            care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#booking")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-brand-accent text-white rounded-full font-medium text-lg shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Appointment
          </motion.a>
          <motion.a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border-2 border-brand-accent text-brand-accent dark:text-brand-primary rounded-full font-medium text-lg hover:bg-brand-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6 text-brand-accent"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
}

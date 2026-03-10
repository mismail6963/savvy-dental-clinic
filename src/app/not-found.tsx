"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-primary/20 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-brand-accent"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="font-heading text-6xl font-bold text-brand-accent mb-4">
          404
        </h1>
        <h2 className="text-xl font-bold text-brand-900 dark:text-white mb-2">
          Page Not Found
        </h2>
        <p className="text-brand-700 dark:text-brand-300 mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist. Let&apos;s
          get you back on track.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-brand-accent text-white rounded-full font-medium hover:bg-brand-dark transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

const faqs = [
  {
    question: "What services does Savvy Dental Clinic offer?",
    answer:
      "We offer a comprehensive range of dental services including orthodontics, dental implants, cosmetic dentistry, teeth whitening, pediatric dentistry, and oral surgery. Our team of specialists ensures you receive the best care for your specific needs.",
  },
  {
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment directly through our website using the booking section above. Simply select your preferred date and time, fill in your details, and we'll confirm your appointment instantly. You can also call us or use our AI chat assistant for help.",
  },
  {
    question: "Do you offer emergency dental services?",
    answer:
      "Yes, we understand that dental emergencies can happen at any time. Contact us immediately if you're experiencing severe pain, a knocked-out tooth, or any other dental emergency, and we'll do our best to see you as soon as possible.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit/debit cards, and most major insurance plans. We also offer flexible payment plans for certain procedures to make dental care accessible to everyone.",
  },
  {
    question: "Is teeth whitening safe?",
    answer:
      "Yes, professional teeth whitening performed at our clinic is completely safe. We use clinically proven whitening agents and carefully monitor the process to ensure your comfort and safety. Results can last from several months to a few years with proper care.",
  },
  {
    question: "At what age should children first visit the dentist?",
    answer:
      "We recommend bringing your child for their first dental visit by their first birthday or when their first tooth appears. Early visits help establish good dental habits and allow us to monitor your child's oral development from the start.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border border-[var(--card-border)] rounded-xl overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-[var(--card-bg)] hover:bg-[var(--muted)] transition-colors"
      >
        <span className="font-medium text-brand-900 dark:text-white pr-4">
          {question}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-5 h-5 text-brand-accent flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 text-brand-700 dark:text-brand-300 leading-relaxed bg-[var(--card-bg)]">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[var(--muted)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-brand-700 dark:text-brand-300">
            Find answers to common questions about our services and care.
          </p>
        </ScrollAnimationWrapper>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollAnimationWrapper key={i} animation="fadeUp" delay={i * 0.05}>
              <FAQItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

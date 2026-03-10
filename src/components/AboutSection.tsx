"use client";

import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollAnimationWrapper animation="slideLeft">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand-primary/30 to-brand-accent/30 overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-brand-accent/20 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-brand-accent"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <p className="text-brand-accent font-heading text-2xl font-bold">
                    Modern Facility
                  </p>
                  <p className="text-brand-700 dark:text-brand-300 mt-2">
                    State-of-the-art equipment
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-accent/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-primary/20 rounded-full -z-10" />
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper animation="slideRight">
            <div>
              <span className="text-brand-accent font-medium text-sm uppercase tracking-wider">
                About Us
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mt-2 mb-6">
                Your Trusted Partner in Dental Excellence
              </h2>
              <div className="space-y-4 text-brand-700 dark:text-brand-300 leading-relaxed">
                <p>
                  At Savvy Dental Clinic, we combine cutting-edge technology with
                  compassionate care to deliver exceptional dental experiences.
                  Our team of highly skilled specialists is dedicated to helping
                  you achieve and maintain a healthy, beautiful smile.
                </p>
                <p>
                  Located in the heart of Riyadh, we serve individuals and
                  families with a comprehensive range of dental services, from
                  routine check-ups to advanced cosmetic and surgical procedures.
                </p>
                <p>
                  We believe that every patient deserves personalized attention
                  and a treatment plan tailored to their unique needs. Our
                  commitment to excellence drives everything we do.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { number: "10+", label: "Years Experience" },
                  { number: "5000+", label: "Happy Patients" },
                  { number: "15+", label: "Expert Dentists" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-brand-accent">
                      {stat.number}
                    </div>
                    <div className="text-xs md:text-sm text-brand-700 dark:text-brand-300 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}

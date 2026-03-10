"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { ScrollAnimationWrapper } from "./ScrollAnimationWrapper";
import "react-datepicker/dist/react-datepicker.css";

interface Slot {
  start: string;
  end: string;
  display: string;
}

export function BookingSection() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [booking, setBooking] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedTime, setConfirmedTime] = useState("");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 14);

  useEffect(() => {
    if (!selectedDate) return;

    setLoading(true);
    setSelectedSlot(null);
    const dateStr = selectedDate.toISOString().split("T")[0];

    fetch(`/api/calendar/slots?date=${dateStr}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.slots) {
          setSlots(data.slots);
        } else {
          setSlots([]);
          if (data.error) {
            toast.error(data.error);
          }
        }
      })
      .catch(() => {
        toast.error("Failed to load available slots");
        setSlots([]);
      })
      .finally(() => setLoading(false));
  }, [selectedDate]);

  const handleBook = async () => {
    if (!selectedSlot || !name.trim() || !email.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setBooking(true);
    try {
      const res = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          startTime: selectedSlot.start,
          endTime: selectedSlot.end,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmedTime(selectedSlot.display);
        setShowConfirmation(true);
        setName("");
        setEmail("");
        setSelectedSlot(null);
        setSelectedDate(null);
        setSlots([]);
      } else {
        toast.error(data.error || "Booking failed");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setBooking(false);
    }
  };

  return (
    <section id="booking" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimationWrapper className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-900 dark:text-white mb-4">
            Book Your Appointment
          </h2>
          <p className="text-brand-700 dark:text-brand-300 max-w-xl mx-auto">
            Select a date and time that works for you. We&apos;ll confirm your
            appointment right away.
          </p>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper animation="scaleUp">
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-medium text-brand-800 dark:text-brand-200 mb-3">
                  Select a Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={minDate}
                  maxDate={maxDate}
                  inline
                  calendarClassName="!border-0 !bg-transparent"
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-brand-800 dark:text-brand-200 mb-3">
                  Available Times
                </label>

                {!selectedDate && (
                  <p className="text-brand-600 dark:text-brand-400 text-sm py-8 text-center">
                    Please select a date to see available times
                  </p>
                )}

                {loading && (
                  <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="skeleton h-10 w-full" />
                    ))}
                  </div>
                )}

                {!loading && selectedDate && slots.length === 0 && (
                  <p className="text-brand-600 dark:text-brand-400 text-sm py-8 text-center">
                    No available slots for this date. Please try another day.
                  </p>
                )}

                {!loading && slots.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {slots.map((slot) => (
                      <motion.button
                        key={slot.start}
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                          selectedSlot?.start === slot.start
                            ? "bg-brand-accent text-white border-brand-accent"
                            : "border-[var(--card-border)] hover:border-brand-accent text-brand-800 dark:text-brand-200"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {slot.display}
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Booking Form */}
            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-[var(--card-border)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-800 dark:text-brand-200 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-800 dark:text-brand-200 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-brand-700 dark:text-brand-300">
                    Selected: <strong>{selectedSlot.display}</strong>
                  </p>
                  <motion.button
                    onClick={handleBook}
                    disabled={booking}
                    className="px-6 py-2.5 bg-brand-accent text-white rounded-lg font-medium hover:bg-brand-dark transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {booking ? "Booking..." : "Confirm Booking"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollAnimationWrapper>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--card-bg)] rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">
                Appointment Confirmed!
              </h3>
              <p className="text-brand-700 dark:text-brand-300 mb-2">
                Your appointment has been booked for:
              </p>
              <p className="text-brand-accent font-medium text-lg mb-6">
                {confirmedTime}
              </p>
              <p className="text-sm text-brand-600 dark:text-brand-400 mb-6">
                A confirmation has been added to the calendar. We look forward to
                seeing you!
              </p>
              <motion.button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2.5 bg-brand-accent text-white rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

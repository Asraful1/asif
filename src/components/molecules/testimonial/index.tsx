"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Graphic Designer",
    company: "CreativeCo",
    content:
      "YEX has transformed the way I showcase my work. The sleek design and intuitive interface make it a joy to use, both for me and my clients.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Photographer",
    company: "Capture Studios",
    content:
      "As a photographer, image quality is everything. YEX not only maintains the integrity of my photos but presents them in a way that truly captivates viewers.",
  },
  {
    id: 3,
    name: "Michael Torres",
    role: "UX Designer",
    company: "InnovateUX",
    content:
      "The customization options in YEX are unparalleled. I can tailor my portfolio to match my personal brand perfectly, which has been crucial in landing new clients.",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]); // Depend on currentIndex instead of nextTestimonial

  return (
    <div className="relative overflow-hidden max-w-[1440px] mx-auto px-6 py-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={testimonials[currentIndex].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center text-center px-6 py-12 text-white"
        >
          <blockquote className="text-xl md:text-2xl mb-6 max-w-2xl">
            &apos;{testimonials[currentIndex].content}&apos;
          </blockquote>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">
              {testimonials[currentIndex].name}
            </p>
            <p className="text-gray-400">
              {testimonials[currentIndex].role},{" "}
              {testimonials[currentIndex].company}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      <button
        onClick={prevTestimonial}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextTestimonial}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";

// Define flexible type for Sanity image
interface SanityImageSource {
  asset?: {
    _ref?: string;
  };
  [key: string]: unknown;
}

type PortableTextBlock = {
  _type: string;
  children: { _type: string; text: string }[];
};

type Testimonial = {
  _key?: string;
  name?: string;
  role?: string;
  company: string;
  address?: string;
  rating?: number;
  image?: SanityImageSource;
  content: PortableTextBlock[];
};

const fallbackTestimonials: Testimonial[] = [
  {
    _key: "1",
    company: "Hotel The Al Aqsa",
    address:
      "Shamim Center, Zakir hossain Road, Khulsi, Chittagong, Bangladesh",
    rating: 5,
    content: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "“CodeLimes delivered clean and modern graphics for our hotel. Fast work, great communication, and excellent quality. Highly satisfied!”",
          },
        ],
      },
    ],
  },
];

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsData =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  }, [testimonialsData.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  }, [testimonialsData.length]);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, nextTestimonial]);

  const currentTestimonial = testimonialsData[currentIndex];

  if (!currentTestimonial) return null;

  return (
    <div className="relative w-full max-w-[700px] mx-auto min-h-[500px] flex flex-col justify-center items-center">
      {/* Left Navigation Button */}
      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C1E08C] hover:text-black transition-all duration-300 shadow-lg"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial._key || currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-[#1a1a1a] text-white p-8 md:p-12 rounded-[2rem] shadow-xl text-center relative flex flex-col items-center border border-white/5"
        >
          {/* Image */}
          <div className="mb-6 relative">
            <div className="w-24 h-24 rounded-full border-4 border-[#C1E08C] p-1 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
              {currentTestimonial.image &&
              urlForImage(currentTestimonial.image)?.src ? (
                <Image
                  src={urlForImage(currentTestimonial.image)!.src}
                  alt={currentTestimonial.company}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl">
                  {currentTestimonial.company?.charAt(0) || "T"}
                </div>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex gap-1 mb-6 text-[#FFC107]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < (currentTestimonial.rating || 5)
                    ? "fill-current"
                    : "text-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Quote */}
          <div className="text-gray-300 mb-8 leading-relaxed text-lg italic">
            <PortableTextComponent value={currentTestimonial.content} />
          </div>

          {/* Footer Info */}
          <div className="mt-auto space-y-2">
            <h3 className="text-[#C1E08C] font-bold text-xl">
              {currentTestimonial.company}
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              {currentTestimonial.address}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Right Navigation Button */}
      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white hover:bg-[#C1E08C] hover:text-black transition-all duration-300 shadow-lg"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#C1E08C]" : "bg-gray-600"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

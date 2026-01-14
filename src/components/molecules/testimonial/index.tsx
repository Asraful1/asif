"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PortableText as PortableTextComponent } from "@portabletext/react";

type PortableTextBlock = {
  _type: string;
  children: { _type: string; text: string }[];
};

export function TestimonialCarousel({
  testimonials,
}: {
  testimonials?: {
    _key?: string;
    name: string;
    role: string;
    company: string;
    content: PortableTextBlock[];
  }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsData = testimonials && testimonials.length > 0 ? testimonials : [
    {
      _key: "1",
      name: "Alex Johnson",
      role: "Graphic Designer",
      company: "CreativeCo",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "YEX has transformed the way I showcase my work. The sleek design and intuitive interface make it a joy to use, both for me and my clients.",
            },
          ],
        },
      ],
    },
    {
      _key: "2",
      name: "Samantha Lee",
      role: "Photographer",
      company: "Capture Studios",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "As a photographer, image quality is everything. YEX not only maintains the integrity of my photos but presents them in a way that truly captivates viewers.",
            },
          ],
        },
      ],
    },
    {
      _key: "3",
      name: "Michael Torres",
      role: "UX Designer",
      company: "InnovateUX",
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "The customization options in YEX are unparalleled. I can tailor my portfolio to match my personal brand perfectly, which has been crucial in landing new clients.",
            },
          ],
        },
      ],
    },
  ];

  const currentTestimonial = testimonialsData[currentIndex];

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  }, [testimonialsData.length]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length
    );
  }, [testimonialsData.length]);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, nextTestimonial]);

  return (
    <div className="relative overflow-hidden max-w-[1440px] mx-auto px-6 py-24">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTestimonial._key || currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col items-center text-center px-6 py-12 text-white"
        >
          <blockquote className="text-xl md:text-2xl mb-6 max-w-2xl">
            <PortableTextComponent value={currentTestimonial.content} />
          </blockquote>
          <div className="flex flex-col items-center">
            <p className="font-bold text-lg">{currentTestimonial.name}</p>
            <p className="text-gray-400">
              {currentTestimonial.role}, {currentTestimonial.company}
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

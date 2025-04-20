"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/sanity/lib/image";
import { SanityImage } from "@/types";

interface ParallaxProjectProps {
  title: string;
  mainImage: SanityImage;
}

export function ParallaxProject({ title, mainImage }: ParallaxProjectProps) {
  const imageUrl = mainImage && urlForImage(mainImage)?.src;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#0a0a0a", "#0a0a0a"]
  );

  return (
    <motion.div
      ref={ref}
      style={{ backgroundColor }}
      className="relative h-[300px] md:h-[800px] overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
        {imageUrl && (
          <Image src={imageUrl} alt={title} fill className="object-cover" />
        )}
      </motion.div>
      <div className="absolute inset-0 bg-black/10 flex items-end p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

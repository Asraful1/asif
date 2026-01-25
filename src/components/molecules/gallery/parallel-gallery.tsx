"use client";

import { useRef } from "react";
import {
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  motion,
} from "motion/react";
import { wrap } from "motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { urlForImage } from "@/sanity/lib/image";

// Define a flexible type for Sanity images
interface SanityImageSource {
  asset?: {
    _ref?: string;
  };
  [key: string]: unknown;
}

interface ParallelGalleryProps {
  images?: SanityImageSource[] | string[];
  className?: string;
}

interface ParallaxSlideProps {
  images: (SanityImageSource | string)[];
  baseVelocity: number;
  className?: string;
}

function ParallaxSlide({
  images,
  baseVelocity = 100,
  className,
}: ParallaxSlideProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /**
   * This is a magic number for the transform(x) logic.
   * We need to wrap the x position to create an infinite loop.
   * If we render 4 copies of the content, we wrap at -25% (because 1/4 = 25%).
   * However, since we are using flex gap, the exact percentage might be slightly off if width isn't perfect.
   * For a robust marquee, we wrap effectively.
   *
   * Let's try wrapping -20% -> -45% for smoother transitions if we duplicate enough.
   * A simpler standard approach: Wrap between -20% and -45% if we have 4 sets of images.
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This makes the scrolling speed change based on scroll velocity.
     * Scroll down -> move faster in current direction.
     * Scroll up -> move faster/reverse (optional, but here just acceleration).
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={cn("flex flex-nowrap gap-8", className)}
        style={{ x }}
      >
        {/* Render multiple copies to ensure seamless loop */}
        {/* 4 copies is usually safe for most screen widths */}
        {images.map((image, index) => (
          <SlideImage key={`orig-${index}`} image={image} index={index} />
        ))}
        {images.map((image, index) => (
          <SlideImage key={`copy-1-${index}`} image={image} index={index} />
        ))}
        {images.map((image, index) => (
          <SlideImage key={`copy-2-${index}`} image={image} index={index} />
        ))}
        {images.map((image, index) => (
          <SlideImage key={`copy-3-${index}`} image={image} index={index} />
        ))}
      </motion.div>
    </div>
  );
}

function SlideImage({
  image,
  index,
}: {
  image: SanityImageSource | string;
  index: number;
}) {
  let imageUrl: string | null = null;

  if (typeof image === "string") {
    imageUrl = image;
  } else if (image && typeof image === "object" && "asset" in image) {
    imageUrl = urlForImage(image as SanityImageSource)?.src || null;
  }

  if (!imageUrl) return null;

  return (
    <div className="relative h-[30vh] md:h-[40vh] aspect-[4/3] rounded-2xl overflow-hidden shrink-0 grayscale hover:grayscale-0 transition-all duration-500 ease-out hover:scale-105 cursor-pointer">
      <Image
        src={imageUrl}
        alt={`Gallery image ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

export function ParallelGallery({
  images = [],
  className,
}: ParallelGalleryProps) {
  // Fallback if empty
  const displayImages =
    images && images.length > 0
      ? images
      : Array.from({ length: 8 }, (_, i) => `/CPX/${66 + (i % 10)}.png`); // Ensure valid fallback logic

  // Split logic is good, but for full marquee, maybe just one long strip per row?
  // Let's stick to the dual opposing directions Plan.

  const half = Math.ceil(displayImages.length / 2);
  const row1 = displayImages.slice(0, half);
  const row2 = displayImages.slice(half);

  // Ensure rows have enough items for the marquee to look dense initially
  // We duplicate inside the component, so minimal set is fine.
  // But if row is tiny (1 item), duplicates might not be enough.
  const robustRow1 = row1.length < 3 ? [...row1, ...row1, ...row1] : row1;
  const robustRow2 = row2.length < 3 ? [...row2, ...row2, ...row2] : row2;

  return (
    <div
      className={cn(
        "flex flex-col gap-8 py-20 bg-[#111] overflow-hidden",
        className,
      )}
    >
      <ParallaxSlide images={robustRow1} baseVelocity={-2} />
      <ParallaxSlide images={robustRow2} baseVelocity={2} />
    </div>
  );
}

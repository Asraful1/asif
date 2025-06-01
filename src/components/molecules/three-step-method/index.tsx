"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function ThreeStepMethod() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const scale7 = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 1.9]);
  const scale10 = useTransform(scrollYProgress, [0, 1], [1, 2]);
  const scale11 = useTransform(scrollYProgress, [0, 1], [1, 2.1]);
  const scale12 = useTransform(scrollYProgress, [0, 1], [1, 2.2]);

  const scales = [
    scale,
    scale4,
    scale5,
    scale6,
    scale7,
    scale8,
    scale9,
    scale10,
    scale11,
    scale12,
  ];

  const pictures = Array.from({ length: 35 }, (_, i) => {
    const imageNumber = 66 + i;
    return {
      src: `/CPX/${imageNumber}.png`,
      scale: scales[i % scales.length],
    };
  });

  return (
    <div ref={container} className={"container max-w-[1920px] mx-auto"}>
      <div className={"sticky"}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={"el"}>
              <div className={"imageContainer"}>
                <Image src={src} fill alt="image" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

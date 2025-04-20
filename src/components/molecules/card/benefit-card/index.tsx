"use client";

import { motion } from "motion/react";

interface BenefitCardProps {
  title: string;
  description: string;
}

export function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <motion.div
      className="p-6 bg-[#1a1a1a] rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
    >
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import Image from "next/image";

import logo from "../../../../public/logo.webp";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import { ParallaxProject } from "@/components/molecules/parallax";
import { BenefitCard } from "@/components/molecules/card/benefit-card";
import { ThreeStepMethod } from "@/components/molecules/three-step-method";
import { TestimonialCarousel } from "@/components/molecules/testimonial";
import { ContactForm } from "@/components/molecules/contact-form";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";

const benefits = [
  {
    title: "Stunning Visuals",
    description:
      "Showcase your work with high-resolution images and smooth animations.",
  },
  {
    title: "Responsive Design",
    description:
      "Your portfolio looks great on any device, from mobile to desktop.",
  },
  {
    title: "Easy Customization",
    description:
      "Tailor your portfolio to your unique style with simple customization options.",
  },
  {
    title: "Fast Loading",
    description:
      "Optimized for speed to ensure visitors have a seamless experience.",
  },
  {
    title: "SEO Friendly",
    description:
      "Built with best practices to help your work get discovered online.",
  },
  {
    title: "Regular Updates",
    description:
      "Continuous improvements and new features to keep your portfolio cutting-edge.",
  },
];
function Hero({
  heroTitle,
  heroImage,
}: {
  heroTitle: string;
  heroImage: SanityImage;
}) {
  const imageUrl = heroImage && urlForImage(heroImage).src;
  return (
    <motion.section
      id="home"
      className="relative min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl || logo}
          alt="Background"
          fill
          placeholder="blur"
          blurDataURL="/logo.webp"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center space-y-12 text-white">
        <p className="text-sm tracking-[0.2em]">{heroTitle}</p>
        <Link
          href={"/projects"}
          className="bracket inline-block cursor-pointer group transition-all duration-300 ease-in-out"
        >
          <span className="text-sm tracking-[0.2em] text-white group-hover:font-medium group-hover:scale-[1.2]">
            Projects
          </span>
        </Link>
      </div>
    </motion.section>
  );
}

function About({ data }) {
  return (
    <motion.section
      id="about"
      className="py-24 bg-[#111]"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-[1440px] mx-auto px-6 py-28">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h2 className="text-4xl font-bold tracking-tight text-white">
            {data.title}
          </h2>
          <div className="text-lg text-gray-400 leading-relaxed">
            {data.content && <PortableTextComponent value={data.content} />}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Demos({ posts }) {
  return (
    <section id="demos" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-6 space-y-6">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-16 text-white">
          DEMOS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((project, index) => (
            <ParallaxProject key={index} {...project} />
          ))}
        </div>
        <div className="flex justify-center pt-16">
          <Link
            href="/projects"
            className="bracket inline-block hover:opacity-70 transition-opacity"
          >
            <span className="text-sm tracking-[0.2em] text-white">
              MORE PROJECTS
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Benefit() {
  return (
    <section id="benefits" className="py-28 bg-[#111]">
      <div className="max-w-[1440px] mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-16 text-white">
          BENEFITS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ImageGallery() {
  return (
    <section id="gallery" className="py-28 bg-[#111]">
      <h2 className="text-4xl font-bold tracking-tight text-center mb-16 text-white">
        Design, Upload, Publish
      </h2>

      <ThreeStepMethod />
    </section>
  );
}

function Testimonial() {
  return (
    <section id="testimonial" className="py-24 bg-[#111] min-h-[60vh]">
      <h2 className="text-4xl font-bold tracking-tight text-center mb-16 text-white">
        What My Clients Say
      </h2>

      <TestimonialCarousel />
    </section>
  );
}

function ContactMe() {
  return (
    <section id="contact" className="py-28 bg-[#0a0a0a]">
      <div className="max-w-screen mx-auto px-6">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-1 text-white">
          CONTACT ME
        </h2>
        <ContactForm />
      </div>
    </section>
  );
}

export function HomeTemplate({ posts, about }) {
  return (
    <div className="bg-[#111]">
      <AnimatePresence mode="wait">
        <Hero heroTitle={about.heroTitle} heroImage={about.heroImage} />
        <About data={about} />
        <Demos posts={posts} />
        <Benefit />
        <ImageGallery />
        <Testimonial />
        <ContactMe />
      </AnimatePresence>
    </div>
  );
}

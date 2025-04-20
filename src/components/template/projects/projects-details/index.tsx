/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { urlForImage } from "@/sanity/lib/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortableText as PortableTextComponent } from "@portabletext/react";

export function ProjectsDetailsTemplate({ post }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const galleryImages = post?.gallery || [];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className=" py-28 flex min-h-screen flex-col bg-[#111]">
      <header className="py-6 max-w-7xl px-6 mx-auto max w-full">
        <div className="mx-auto flex justify-between items-center">
          <Link
            href="/projects"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <ChevronLeft className="inline-block mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-white">
            {post?.title || "Project"}
          </h1>
        </div>
      </header>

      {galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6  py-8 w-full">
          <h2 className="text-2xl font-bold text-white mb-6">
            Project Gallery
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video w-full h-64 cursor-pointer overflow-hidden "
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsFullScreen(true);
                }}
              >
                <Image
                  src={urlForImage(image) || "/placeholder.svg"}
                  alt={image.alt || `Project image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="prose max-w-7xl px-6 mx-auto w-full py-8 prose-strong:text-white prose-headings:text-white text-white prose:!text-white prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-a:text-white prose-li:text-white prose-ul:text-white prose-ol:text-white prose-p:text-white prose-blockquote:text-white">
        {post?.body && <PortableTextComponent value={post.body} />}
      </div>

      <AnimatePresence>
        {isFullScreen && galleryImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullScreen(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>
            <Image
              src={
                galleryImages[currentImageIndex]
                  ? urlForImage(galleryImages[currentImageIndex])
                  : "/placeholder.svg"
              }
              alt={
                galleryImages[currentImageIndex]?.alt ||
                `Full screen project image ${currentImageIndex + 1}`
              }
              fill
              className="object-contain"
              placeholder={
                galleryImages[currentImageIndex]?.blurDataURL ? "blur" : "empty"
              }
              blurDataURL={galleryImages[currentImageIndex]?.blurDataURL}
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft className="w-8 h-8 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight className="w-8 h-8 text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

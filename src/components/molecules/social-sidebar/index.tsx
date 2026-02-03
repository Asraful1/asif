"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";

interface SocialLink {
  platform: string;
  url: string;
  icon: {
    asset: {
      _ref: string;
      _type: string;
    };
    alt: string;
  };
  order?: number;
}

interface SocialSidebarProps {
  socialLinks?: SocialLink[];
}

export function SocialSidebar({ socialLinks = [] }: SocialSidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !socialLinks || socialLinks.length === 0) {
    return null;
  }

  // Sort links by order
  const sortedLinks = [...socialLinks].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col gap-4">
        {sortedLinks.map((link, index) => {
          const imageUrl = link.icon?.asset
            ? urlFor(link.icon).width(32).height(32).url()
            : null;

          if (!imageUrl) return null;

          return (
            <a
              key={`${link.platform}-${index}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
              aria-label={link.platform}
            >
              <div className="relative w-5 h-5">
                <Image
                  src={imageUrl}
                  alt={link.icon.alt || `${link.platform} icon`}
                  fill
                  className="object-contain"
                />
              </div>
              
              {/* Tooltip */}
              <span className="absolute left-full ml-3 px-3 py-1.5 bg-black/90 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {link.platform}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

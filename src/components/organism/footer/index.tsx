"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathName = usePathname();

  if (pathName.includes("/studio")) return null;

  return (
    <footer className="bg-[#0a0a0a] text-white py-12">
      <div className="max-w-[1440px] mx-auto px-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-2xl font-bold max-sm:text-center">
              Asif
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Showcase your creativity with elegance
            </p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <Link href="/#" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link
              href="/#about"
              className="hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/#demos"
              className="hover:text-gray-300 transition-colors"
            >
              Demos
            </Link>
            <Link
              href="/#benefits"
              className="hover:text-gray-300 transition-colors"
            >
              Benefits
            </Link>
            <Link
              href="/#contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Asif. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

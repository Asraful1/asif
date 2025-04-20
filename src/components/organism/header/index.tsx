"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { usePathname } from "next/navigation";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  return (
    <div
      className={`fixed inset-0 z-50 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
      aria-hidden={!isOpen}
    >
      {/* Overlay for the rest of the screen */}
      <div className="fixed inset-0 bg-black bg-opacity-50"></div>
      {/* Sidebar content */}
      <div
        ref={sidebarRef}
        className="w-64 h-full bg-white shadow-lg p-4 relative"
      >
        <div className="flex items-center justify-end w-full">
          <button
            onClick={toggleSidebar}
            className="text-lg font-bold mb-4"
            aria-label="Close sidebar"
          >
            X
          </button>
        </div>
        <nav aria-label="Main navigation" className="h-full">
          <div className="flex flex-col items-center justify-center h-full text-2xl font-medium gap-8">
            <Link
              href="/"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Home"
              onClick={toggleSidebar}
            >
              HOME
            </Link>
            <Link
              href="/#about"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to About"
              onClick={toggleSidebar}
            >
              ABOUT
            </Link>
            <Link
              href="/projects"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Demos"
              onClick={toggleSidebar}
            >
              PROJECTS
            </Link>
            <Link
              href="/#benefits"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Benefits"
              onClick={toggleSidebar}
            >
              BENEFITS
            </Link>
            <Link
              href="/#testimonial"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to 3-Step Method"
              onClick={toggleSidebar}
            >
              TESTIMONIALS
            </Link>
            <Link
              href="/#contact"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Contact"
              onClick={toggleSidebar}
            >
              CONTACT
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

export function Header() {
  const pathName = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Use Framer Motion's useScroll to track scroll position
  const { scrollY } = useScroll();

  // Update state when scroll position changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  if (pathName.includes("/studio")) return null;

  return (
    <>
      <motion.header
        className="fixed w-full z-40 px-6 py-8 duration-300 transition-all ease-in-out"
        initial={{ backgroundColor: "transparent", color: "white" }}
        animate={{
          backgroundColor: isScrolled ? "white" : "transparent",
          color: isScrolled ? "black" : "white",
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold"
            aria-label="Go to homepage"
          >
            Asif
          </Link>
          <div className="hidden md:flex items-center space-x-8 text-sm tracking-widest">
            <Link
              scroll={true}
              href="/"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Home"
            >
              HOME
            </Link>
            <Link
              onScroll={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              href="/#about"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to About"
            >
              ABOUT
            </Link>
            <Link
              onScroll={(e) => {
                e.preventDefault();
              }}
              href="/projects"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to projects"
            >
              PROJECTS
            </Link>
            <Link
              onScroll={(e) => {
                e.preventDefault();
              }}
              href="/#benefits"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Benefits"
            >
              BENEFITS
            </Link>

            <Link
              onScroll={(e) => {
                e.preventDefault();
              }}
              href="/#testimonial"
              className="hover:opacity-70 transition-opacity uppercase"
              aria-label="Go to Testimonial"
            >
              Testimonial
            </Link>
            <Link
              onScroll={(e) => {
                e.preventDefault();
              }}
              href="/#contact"
              className="hover:opacity-70 transition-opacity"
              aria-label="Go to Contact"
            >
              CONTACT
            </Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden"
            aria-label="Open menu"
            aria-expanded={isSidebarOpen}
          >
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </nav>
      </motion.header>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

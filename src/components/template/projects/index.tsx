/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";

import { Pagination } from "@/components/atoms/pagination";
import { ProjectCard } from "@/components/molecules/card/project-card";
import { getAllPaginatedPosts } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

export function ProjectsTemplate({
  searchParams,
  categories,
}: {
  searchParams: { page?: string; category?: string };
  categories: { title: string; slug: { current: string } }[];
}) {
  const allCategories = [
    { title: "All", slug: { current: "All" } },
    ...categories,
  ];
  console.log("allCategories", allCategories);

  const [activeCategory, setActiveCategory] = useState(
    searchParams.category || "All"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.page || "1", 10)
  );
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const projectsPerPage = 6;

  const offset = (currentPage - 1) * projectsPerPage;
  const limit = projectsPerPage;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { posts, total } = await getAllPaginatedPosts({
          offset,
          limit,
          category: activeCategory,
        });
        setPosts(posts);

        console.log("posts", posts);
        setTotalPosts(total);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }
    fetchPosts();
  }, [activeCategory, currentPage, offset, limit]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.history.pushState(
      {},
      "",
      `?page=${pageNumber}&category=${activeCategory}`
    );
  };

  return (
    <div className="min-h-screen mx-auto px-6 flex flex-col py-28 bg-[#111]">
      <section className="flex-grow w-full  py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {allCategories.map((category) => (
            <button
              key={category.slug.current}
              onClick={() => {
                setActiveCategory(category.slug.current);
                setCurrentPage(1);
                window.history.pushState(
                  {},
                  "",
                  `?page=1&category=${category.slug.current}`
                );
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.slug.current
                  ? "bg-white text-black"
                  : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {posts.map((post) => {
              const imageUrl = post.mainImage && urlForImage(post.mainImage);
              return (
                <ProjectCard
                  key={post._id}
                  project={{
                    slug: post?.slug,
                    title: post.title,
                    category: post.categories?.join(", ") || "Uncategorized",
                    image: imageUrl || "/placeholder.svg",
                  }}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12">
          <Pagination
            projectsPerPage={projectsPerPage}
            totalProjects={totalPosts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </section>
    </div>
  );
}

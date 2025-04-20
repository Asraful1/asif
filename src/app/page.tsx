import { HomeTemplate } from "@/components/template/home";
import { getAboutPage, getFeaturedPosts } from "@/sanity/lib/client";
import { Suspense } from "react";

export const revalidate = 1500;

export default async function Home() {
  const [posts, about] = await Promise.all([
    getFeaturedPosts({ category: "All", pageIndex: 0, limit: 6 }),
    getAboutPage(),
  ]);
  return (
    <Suspense>
      <HomeTemplate posts={posts} about={about} />
    </Suspense>
  );
}

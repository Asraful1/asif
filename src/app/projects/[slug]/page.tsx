import { ProjectsDetailsTemplate } from "@/components/template/projects/projects-details";
import { getPostBySlug } from "@/sanity/lib/client";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface TherapyTypeProps {
  params: {
    slug: string;
  };
}

export const revalidate = 30;

export default async function page({ params: { slug } }: TherapyTypeProps) {
  if (!slug) {
    redirect("/projects");
  }
  const post = await getPostBySlug(slug);
  return (
    <Suspense>
      <ProjectsDetailsTemplate post={post} />
    </Suspense>
  );
}

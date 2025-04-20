import { ProjectsTemplate } from "@/components/template/projects";
import { getCategories } from "@/sanity/lib/client";
import { Suspense } from "react";

type Props = {
  searchParams: {
    page: string;
    category: string;
  };
};

export default async function ProjectsPage({ searchParams }: Props) {
  const categories = await getCategories();
  return (
    <Suspense key={searchParams.page || "1"}>
      <ProjectsTemplate searchParams={searchParams} categories={categories} />
    </Suspense>
  );
}

import Image from "next/image";
import Link from "next/link";

interface Project {
  slug: { current: string };
  title: string;
  category: string;
  image: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  console.log("project", project);
  return (
    <Link href={`/projects/${project?.slug}`} className="group">
      <div className="relative overflow-hidden rounded-lg aspect-[4/3]">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 className="text-white text-lg font-bold">{project.title}</h3>
            <p className="text-gray-300 text-sm">{project.category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

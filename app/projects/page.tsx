import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected case studies covering architecture, delivery, and production problem solving.",
};

export default function ProjectsPage() {
  return (
    <div className="relative pt-32 pb-24">
      {/* Ambient header glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(110,231,183,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_45%_35%_at_80%_15%,rgba(34,211,238,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Case studies"
          title="Projects."
          description="Each entry highlights practical engineering across product UI, APIs, queues, AI workflows, cloud deployment, and production constraints."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

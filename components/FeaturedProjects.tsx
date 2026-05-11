"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies that show real engineering ownership."
            description="Full-stack apps, AI agent infrastructure, role-based review systems, cloud deployment automation, and mobile foundations."
          />
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-emerald-200/30 hover:text-white"
            >
              All projects
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

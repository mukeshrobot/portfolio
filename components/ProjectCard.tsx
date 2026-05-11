"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import type { Project } from "@/lib/projects";

const accents = [
  "from-cyan-300/70 via-sky-300/30 to-transparent",
  "from-emerald-300/70 via-teal-300/30 to-transparent",
  "from-amber-300/70 via-orange-300/30 to-transparent",
  "from-violet-300/70 via-fuchsia-300/30 to-transparent",
  "from-rose-300/70 via-orange-300/30 to-transparent",
  "from-lime-300/70 via-cyan-300/30 to-transparent",
];

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useTransform(my, [-0.5, 0.5], [4, -4]);
  const ry = useTransform(mx, [-0.5, 0.5], [-4, 4]);
  const sx = useSpring(rx, { stiffness: 200, damping: 22 });
  const sy = useSpring(ry, { stiffness: 200, damping: 22 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6 }}
      className="h-full perspective-[1200px]"
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: sx, rotateY: sy, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        <Link
          href={`/projects/${project.slug}`}
          className="group spotlight relative block h-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 p-6 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        >
          <div
            className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${
              accents[index % accents.length]
            }`}
          />
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-300/[0.07] blur-2xl transition-opacity duration-500 group-hover:bg-cyan-300/15" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-xs text-zinc-500">
                {project.period}
              </p>
              <h3 className="text-lg font-medium text-zinc-50 transition-colors group-hover:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {project.tagline}
              </p>
            </div>
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 group-hover:border-cyan-300/40 group-hover:bg-cyan-300/10 group-hover:text-cyan-100">
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
          </div>

          <p className="relative mt-5 rounded-lg border border-white/10 bg-white/[0.035] p-3 text-sm leading-relaxed text-zinc-300 transition-colors group-hover:border-white/15">
            {project.highlight}
          </p>

          <div className="relative mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-xs text-zinc-400 transition-colors group-hover:border-white/15 group-hover:text-zinc-300"
              >
                {tech}
              </span>
            ))}
            {project.stack.length > 5 && (
              <span className="px-2 py-0.5 font-mono text-xs text-zinc-500">
                +{project.stack.length - 5}
              </span>
            )}
          </div>

          {project.metrics && (
            <div className="relative mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="relative bg-zinc-950/80 p-3 transition-colors group-hover:bg-zinc-900/90"
                >
                  <p className="text-base font-semibold text-zinc-100">
                    {m.value}
                  </p>
                  <p className="mt-1 text-[10px] uppercase leading-tight tracking-wider text-zinc-500">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
}

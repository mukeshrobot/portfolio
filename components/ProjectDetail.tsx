"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Sparkles } from "lucide-react";
import type { Project } from "@/lib/projects";

const reveal = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article className="relative pt-32 pb-24">
      {/* Ambient header glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(110,231,183,0.16),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(ellipse_45%_35%_at_80%_15%,rgba(34,211,238,0.10),transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <Link
          href="/projects"
          className="group mb-10 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-300 group-hover:-translate-x-0.5"
          />
          All projects
        </Link>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={reveal}
            className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-emerald-200"
          >
            {project.period} / {project.role}
          </motion.p>
          <motion.h1
            variants={reveal}
            className="text-3xl font-semibold leading-[1.05] tracking-tight text-zinc-50 md:text-5xl"
          >
            {project.title}
          </motion.h1>
          <motion.p
            variants={reveal}
            className="mt-4 text-lg leading-relaxed text-zinc-300"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            variants={reveal}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100"
          >
            <Sparkles size={12} />
            {project.highlight}
          </motion.div>

          {(project.links?.github || project.links?.live) && (
            <motion.div variants={reveal} className="mt-6 flex flex-wrap gap-2">
              {project.links?.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-md bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-zinc-900 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(167,243,208,0.30)]"
                >
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  Live
                </a>
              )}
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-emerald-200/40 hover:text-white"
                >
                  <Github
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-[8deg]"
                  />
                  Code
                </a>
              )}
            </motion.div>
          )}
        </motion.div>

        {project.metrics && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10"
          >
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="relative overflow-hidden bg-zinc-950/85 p-5"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-300/[0.07] blur-2xl" />
                <p className="relative text-xl font-semibold text-zinc-50 md:text-2xl">
                  {m.value}
                </p>
                <p className="relative mt-1 text-[10px] uppercase tracking-wider text-zinc-500">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        <Section title="Problem">
          <p className="leading-relaxed text-zinc-300">{project.problem}</p>
        </Section>

        <Section title="Architecture">
          <ul className="space-y-2.5">
            {project.architecture.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex gap-3 leading-relaxed text-zinc-300"
              >
                <span className="mt-1.5 font-mono text-xs text-emerald-300">
                  &gt;
                </span>
                <span>{line}</span>
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section title="Features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-sm leading-6 text-zinc-300"
              >
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.7)]" />
                {f}
              </motion.li>
            ))}
          </ul>
        </Section>

        <Section title="Challenges solved">
          <div className="space-y-3">
            {project.challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-5 transition-colors hover:border-emerald-200/30"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-300/[0.07] blur-2xl" />
                <h3 className="relative font-medium text-zinc-100">{c.title}</h3>
                <p className="relative mt-2 text-sm leading-6 text-zinc-400">
                  {c.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section title="Tech stack">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.03, duration: 0.35 }}
                whileHover={{ y: -2, scale: 1.04 }}
                className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-300/35 hover:text-white"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </Section>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center"
        >
          <p className="text-sm leading-6 text-zinc-400">
            Want to talk about a system like this?
          </p>
          <Link
            href="/#contact"
            className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(167,243,208,0.30)]"
          >
            Start a conversation
          </Link>
        </motion.div>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="mt-14"
    >
      <h2 className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
        <span className="h-px w-6 bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

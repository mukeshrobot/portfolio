"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers3,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const interviewerSignals = [
  {
    icon: Workflow,
    title: "Owns workflows end to end",
    body: "From Angular and React screens to Node APIs, queues, Temporal jobs, reporting, and deployment.",
  },
  {
    icon: Zap,
    title: "Understands production pressure",
    body: "Rate limits, retries, DLQs, payload size, concurrency, token usage, autoscaling, and cost control.",
  },
  {
    icon: ShieldCheck,
    title: "Builds controlled systems",
    body: "RBAC, validation, authentication flows, environment separation, SSL, image scanning, and release checks.",
  },
];

const tracks = [
  "AI agent infrastructure",
  "Apartment operations platform",
  "Project checklist review system",
  "Cloud deployment automation",
  "React Native mobile flows",
  "Authentication and credits modules",
];

export function ExperienceMatrix() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <SectionHeading
            eyebrow="Interview snapshot"
            title="Signals an interviewer can verify quickly."
            description="This portfolio is now organized around outcomes and engineering ownership, so your experience reads as production capability instead of a list of tools."
          />
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="ring-conic relative rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.06] p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-200 text-zinc-950 shadow-[0_8px_30px_rgba(110,231,183,0.30)]">
                <Layers3 size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-50">Positioning</p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Full-stack engineer with backend depth, AI infrastructure
                  exposure, and practical cloud release ownership.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {interviewerSignals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-6 card-lift hover:border-emerald-200/30"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-300/15 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-zinc-950 text-emerald-200 transition-all duration-300 group-hover:border-emerald-300/30 group-hover:bg-emerald-300/10">
                  <Icon
                    size={20}
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="relative text-lg font-semibold text-zinc-50">
                  {signal.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-zinc-400">
                  {signal.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-5 rounded-xl border border-white/10 bg-zinc-950/70 p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {tracks.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-sm text-zinc-300 transition-colors hover:border-emerald-200/30 hover:text-white"
                >
                  <CheckCircle2 size={14} className="text-emerald-300" />
                  {item}
                </motion.span>
              ))}
            </div>
            <a
              href="#projects"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-emerald-200 hover:text-white"
            >
              Review projects{" "}
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

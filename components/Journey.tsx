"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Rocket, Bot, Cloud } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const milestones = [
  {
    year: "2022",
    icon: Briefcase,
    title: "Started shipping production frontends",
    body: "Angular, React Native, and TypeScript across real product surfaces — admin tools, dashboards, mobile flows.",
    chip: "Foundation",
  },
  {
    year: "2023",
    icon: Rocket,
    title: "Full-stack ownership",
    body: "Node.js + Express APIs, RBAC, dynamic forms, Excel reporting, and the apartment operations platform end-to-end.",
    chip: "Delivery",
  },
  {
    year: "2024",
    icon: Bot,
    title: "AI agent infrastructure",
    body: "Temporal workflows, Redis/KeyDB rate limits, Kafka and SQS, Bedrock and multi-provider LLM execution at scale.",
    chip: "AI platform",
  },
  {
    year: "2025+",
    icon: Cloud,
    title: "Cloud delivery & autoscaling",
    body: "Docker, ECR, GitHub Actions across DEV/UAT/PROD, KEDA-driven autoscaling, image scans, and release ownership.",
    chip: "Operate",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Journey"
          title="Four years of shipping real software."
          description="Each year folded in a new layer — frontends, full-stack APIs, AI infrastructure, and cloud delivery."
        />

        <div ref={ref} className="relative mt-14">
          {/* Vertical line: base */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-px" />
          {/* Vertical line: animated progress */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-300 via-cyan-300 to-amber-300 md:left-1/2 md:-translate-x-px"
          />

          <ul className="space-y-10 md:space-y-16">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              const isLeft = i % 2 === 0;
              return (
                <li key={m.year} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 top-2 -translate-x-1/2 md:left-1/2">
                      <div className="relative">
                        <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300/50" />
                        <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-emerald-200/60 bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.7)]" />
                      </div>
                    </div>

                    {/* Year label - opposite side on desktop */}
                    <div
                      className={`hidden md:flex md:items-start ${
                        isLeft ? "md:order-2 md:justify-start md:pl-10" : "md:order-1 md:justify-end md:pr-10"
                      }`}
                    >
                      <div className="font-mono text-sm uppercase tracking-[0.18em] text-emerald-200">
                        {m.year}
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className={`group ${
                        isLeft
                          ? "md:order-1 md:pr-10 md:text-right"
                          : "md:order-2 md:pl-10"
                      }`}
                    >
                      <div className="md:hidden mb-2 font-mono text-xs uppercase tracking-[0.18em] text-emerald-200">
                        {m.year}
                      </div>
                      <div className="spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 card-lift hover:border-emerald-200/30">
                        <div
                          className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-zinc-300 ${
                            isLeft ? "md:float-right md:ml-3" : ""
                          }`}
                        >
                          <Icon size={12} className="text-emerald-200" />
                          {m.chip}
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-50">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-zinc-400">
                          {m.body}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

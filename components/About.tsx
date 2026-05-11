"use client";

import { motion } from "framer-motion";
import { Bot, Code2, DatabaseZap, Rocket } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const pillars = [
  {
    icon: Bot,
    title: "AI systems in production",
    body: "Agent execution, LLM rate limits, Bedrock usage patterns, token controls, retry flows, and provider-aware scaling.",
    accent: "from-emerald-300/30 via-cyan-300/20 to-transparent",
  },
  {
    icon: Code2,
    title: "Full-stack product delivery",
    body: "Angular, React, React Native, Node.js, Express, REST APIs, dynamic forms, RBAC screens, and admin workflows.",
    accent: "from-cyan-300/30 via-sky-300/20 to-transparent",
  },
  {
    icon: DatabaseZap,
    title: "Distributed backend thinking",
    body: "Temporal, Redis, KeyDB, Kafka, SQS, DLQ strategy, queues, idempotency, high concurrency, and payload design.",
    accent: "from-amber-300/30 via-orange-300/20 to-transparent",
  },
  {
    icon: Rocket,
    title: "Cloud and release ownership",
    body: "Docker, AWS, Cloud Run, ECR, GitHub Actions, SSL setup, image scans, DEV/UAT/PROD deployments.",
    accent: "from-violet-300/30 via-fuchsia-300/20 to-transparent",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionHeading
            eyebrow="About"
            title="I turn messy product ideas into working systems."
            description="My strongest signal is practical production ownership: frontend business logic, backend APIs, AI execution pipelines, queues, cloud deployments, and the operational details that keep software reliable after launch."
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={item}
                  whileHover={{ y: -6 }}
                  className="group spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 card-lift hover:border-cyan-300/30 hover:bg-white/[0.055]"
                >
                  <div
                    className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${p.accent} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-cyan-200 transition-all duration-300 group-hover:border-cyan-300/35 group-hover:bg-cyan-300/10">
                    <Icon
                      size={19}
                      className="transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[6deg]"
                    />
                  </div>
                  <h3 className="relative text-base font-medium text-zinc-100">
                    {p.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

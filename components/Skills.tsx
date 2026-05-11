"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import {
  Cpu,
  Server,
  Database,
  Cloud,
} from "lucide-react";

const groups = [
  {
    label: "Frontend",
    icon: Cpu,
    accent: "from-cyan-300/25 to-sky-300/10",
    items: [
      "Angular",
      "React",
      "React Native",
      "TypeScript",
      "Tailwind CSS",
      "Material UI",
      "DevUI",
      "Nebular",
    ],
  },
  {
    label: "Backend",
    icon: Server,
    accent: "from-emerald-300/25 to-teal-300/10",
    items: [
      "Node.js",
      "Express.js",
      "Sequelize",
      "REST APIs",
      "Authentication",
      "Queue processing",
      "Payment credits",
    ],
  },
  {
    label: "Data and Messaging",
    icon: Database,
    accent: "from-amber-300/25 to-orange-300/10",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "KeyDB",
      "Amazon Aurora",
      "Kafka",
      "Amazon SQS",
      "DLQ design",
    ],
  },
  {
    label: "AI and Cloud",
    icon: Cloud,
    accent: "from-violet-300/25 to-fuchsia-300/10",
    items: [
      "OpenAI",
      "Claude",
      "Gemini",
      "Bedrock",
      "Temporal",
      "AWS",
      "Docker",
      "Kubernetes",
      "KEDA",
      "Cloud Run",
    ],
  },
];

const marqueeRow = [
  "Node.js",
  "Angular",
  "React",
  "TypeScript",
  "Temporal",
  "Kafka",
  "Redis",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "Docker",
  "Kubernetes",
  "Bedrock",
  "OpenAI",
  "Claude",
  "KEDA",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Stack"
          title="The toolkit behind the delivery."
          description="Grouped by where each skill shows up in your work: interfaces, APIs, data flow, AI execution, and deployment."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 card-lift hover:border-cyan-300/25"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${g.accent} opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-cyan-200">// capability</p>
                    <h3 className="mt-1 text-base font-medium text-zinc-100">
                      {g.label}
                    </h3>
                  </div>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950 transition-transform duration-500 group-hover:rotate-6">
                    <Icon size={18} className="text-cyan-200" />
                  </div>
                </div>
                <div className="relative flex flex-wrap gap-1.5">
                  {g.items.map((it, idx) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, y: 6 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        delay: 0.15 + idx * 0.025,
                        duration: 0.35,
                      }}
                      whileHover={{ y: -2, scale: 1.04 }}
                      className="rounded-md border border-white/10 bg-zinc-950/60 px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-cyan-300/35 hover:text-white"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech marquee */}
        <div className="mask-fade-x mt-14 overflow-hidden">
          <div className="flex w-max gap-3 animate-scroll-x">
            {[...marqueeRow, ...marqueeRow].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-zinc-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.65)]" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

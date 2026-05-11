"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CloudCog,
  Download,
  Github,
  Linkedin,
  Mail,
  ServerCog,
  Sparkles,
} from "lucide-react";
import { site } from "@/lib/site";
import { WordCycle } from "./WordCycle";
import { AnimatedBackground } from "./AnimatedBackground";
import { AnimatedCounter } from "./AnimatedCounter";
import { MagneticButton } from "./MagneticButton";
import { TiltCard } from "./TiltCard";

const proof = [
  { value: "AI Agents", label: "LLM workflows, rate limits, queues" },
  { value: "Full Stack", label: "Angular, React, Node.js, APIs" },
  { value: "Cloud", label: "AWS, Docker, CI/CD, autoscaling" },
];

const focus = [
  { icon: Bot, label: "Agent execution" },
  { icon: ServerCog, label: "Backend systems" },
  { icon: CloudCog, label: "Cloud delivery" },
];

const cycleWords = [
  "AI platforms",
  "cloud products",
  "distributed systems",
  "agent infra",
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-24">
      {/* Animated background layers */}
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <AnimatedBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.028)_1px,transparent_1px)] bg-[size:96px_96px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,black,transparent_78%)] pointer-events-none" />

      {/* Drifting aurora blobs */}
      <div
        className="aurora-blob -left-20 top-10 h-72 w-72"
        style={{ background: "rgba(34, 211, 238, 0.35)", animationDelay: "0s" }}
      />
      <div
        className="aurora-blob right-0 top-40 h-80 w-80"
        style={{ background: "rgba(110, 231, 183, 0.28)", animationDelay: "-4s" }}
      />
      <div
        className="aurora-blob left-1/3 bottom-0 h-72 w-72"
        style={{ background: "rgba(251, 191, 36, 0.18)", animationDelay: "-8s" }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16"
      >
        <div>
          <motion.div
            variants={itemVariants}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-sm text-zinc-300 shadow-2xl shadow-black/20 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(110,231,183,0.85)]" />
            </span>
            Available for high-ownership engineering roles
            <Sparkles
              size={13}
              className="text-emerald-200 transition-transform duration-300 group-hover:rotate-12"
            />
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-6xl lg:text-[78px]"
          >
            Engineering{" "}
            <span className="relative inline-block">
              <WordCycle words={cycleWords} />
              <span className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />
            </span>
            <span className="block">that ships to production.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl"
          >
            I build production systems across Angular, React, Node.js, queues,
            Temporal workflows, AI agent infrastructure, and multi-environment
            cloud deployments.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3"
          >
            {proof.map((item, idx) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.55 + idx * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur transition-colors hover:border-emerald-300/30 hover:bg-white/[0.06]"
              >
                <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-emerald-300/0 via-cyan-300/0 to-amber-300/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-300/[0.08] group-hover:via-cyan-300/[0.05] group-hover:to-amber-300/[0.06] group-hover:opacity-100" />
                <p className="relative text-sm font-semibold text-zinc-100">
                  {item.value}
                </p>
                <p className="relative mt-1 text-xs leading-5 text-zinc-500">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton strength={0.3}>
              <Link
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-[0_8px_30px_rgba(255,255,255,0.10)] transition-all hover:shadow-[0_18px_44px_rgba(167,243,208,0.30)]"
              >
                View case studies
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.25}>
              <Link
                href={site.resumeUrl}
                target="_blank"
                className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-zinc-200 transition-all hover:border-emerald-200/40 hover:text-white"
              >
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Resume
              </Link>
            </MagneticButton>
            <div className="flex items-center gap-1">
              <IconLink href={site.social.github} label="GitHub">
                <Github size={18} />
              </IconLink>
              <IconLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin size={18} />
              </IconLink>
              <IconLink href={`mailto:${site.email}`} label="Email">
                <Mail size={18} />
              </IconLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          {/* Halo behind card */}
          <div className="halo-conic absolute -inset-10 -z-10 animate-pulse-glow rounded-full opacity-70" />

          <TiltCard className="relative" max={6}>
            <div className="ring-conic relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-zinc-950 shadow-2xl shadow-black/40">
              <div className="grain relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/1771869736681.png"
                  alt="Mukesh Arya"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 460px, 90vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-emerald-200/40 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-100 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]" />
                  Online
                </motion.div>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-200">
                  {site.name}
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {site.role}
                </p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-300">
                  Backend depth, frontend execution, AI systems, and cloud
                  release ownership.
                </p>
              </div>
            </div>
          </TiltCard>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {focus.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.55 + idx * 0.07,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-950/70 px-3 py-3 text-sm text-zinc-300 backdrop-blur transition-colors hover:border-emerald-200/30"
                >
                  <Icon
                    size={16}
                    className="text-emerald-200 transition-transform duration-300 group-hover:scale-110"
                  />
                  <span>{item.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Animated stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-6xl px-6 pb-12"
      >
        <div className="relative grid overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 shadow-2xl shadow-black/20 backdrop-blur md:grid-cols-4">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.025] to-transparent" />
          <CounterStat value={4} suffix="+" label="Years building production systems" />
          <CounterStat value={20} suffix="+" label="Shipped features across projects" />
          <CounterStat value={10} suffix="+" label="Cloud and AI services in use" />
          <CounterStat value={99.9} decimals={1} suffix="%" label="Uptime mindset on releases" />
        </div>
      </motion.div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group relative inline-flex h-11 w-11 items-center justify-center rounded-md text-zinc-400 transition-colors hover:text-white"
    >
      <span className="absolute inset-0 rounded-md bg-white/0 transition-colors group-hover:bg-white/[0.07]" />
      <span className="relative transition-transform duration-300 group-hover:-translate-y-0.5">
        {children}
      </span>
    </Link>
  );
}

function CounterStat({
  value,
  label,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="relative border-white/10 bg-white/[0.025] px-5 py-5 md:border-r md:last:border-r-0">
      <p className="text-xl font-semibold text-zinc-50 md:text-2xl">
        <AnimatedCounter to={value} suffix={suffix} decimals={decimals} />
      </p>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{label}</p>
    </div>
  );
}

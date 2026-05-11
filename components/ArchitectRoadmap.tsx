"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  GitBranch,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

/* -------------------------------------------------------------------------- */
/*  Diagram data                                                              */
/* -------------------------------------------------------------------------- */

type Node = {
  id: string;
  label: string;
  sub?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind?: "default" | "db";
};

type Subgraph = {
  id: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const subgraphs: Subgraph[] = [
  { id: "client", title: "CLIENTS", x: 180, y: 20, w: 920, h: 70 },
  { id: "api", title: "API LAYER", x: 40, y: 130, w: 380, h: 170 },
  { id: "orch", title: "ORCHESTRATION", x: 460, y: 130, w: 360, h: 170 },
  { id: "ai", title: "AI EXECUTION PLANE", x: 860, y: 130, w: 380, h: 170 },
  { id: "cloud", title: "CLOUD DELIVERY", x: 40, y: 330, w: 380, h: 230 },
  { id: "workers", title: "WORKERS", x: 460, y: 330, w: 360, h: 230 },
  { id: "data", title: "PERSISTENCE", x: 860, y: 330, w: 380, h: 230 },
  { id: "obs", title: "OBSERVABILITY", x: 180, y: 590, w: 920, h: 90 },
];

const nodes: Record<string, Node> = {
  /* Clients */
  web: { id: "web", x: 200, y: 40, w: 240, h: 36, label: "Web · Mobile" },
  dash: { id: "dash", x: 460, y: 40, w: 220, h: 36, label: "Admin Dashboard" },
  ext: { id: "ext", x: 700, y: 40, w: 380, h: 36, label: "Webhooks · Integrations" },

  /* API */
  ctrl: {
    id: "ctrl",
    x: 60,
    y: 155,
    w: 340,
    h: 38,
    label: "API Controller",
    sub: "REST · validation",
  },
  auth: {
    id: "auth",
    x: 60,
    y: 203,
    w: 340,
    h: 38,
    label: "Auth · RBAC",
    sub: "JWT · OAuth · scopes",
  },
  rl: {
    id: "rl",
    x: 60,
    y: 251,
    w: 340,
    h: 38,
    label: "Rate Limiter",
    sub: "Redis token bucket",
  },

  /* Orchestration */
  temporal: {
    id: "temporal",
    x: 480,
    y: 155,
    w: 320,
    h: 38,
    label: "Temporal",
    sub: "workflows · retries",
  },
  kafka: { id: "kafka", x: 480, y: 203, w: 152, h: 38, label: "Kafka" },
  sqs: { id: "sqs", x: 648, y: 203, w: 152, h: 38, label: "SQS" },
  dlq: { id: "dlq", x: 480, y: 251, w: 320, h: 38, label: "DLQ · replay" },

  /* AI Plane */
  router: {
    id: "router",
    x: 880,
    y: 155,
    w: 340,
    h: 38,
    label: "LLM Router",
    sub: "provider-agnostic",
  },
  openai: { id: "openai", x: 880, y: 203, w: 78, h: 38, label: "OpenAI" },
  claude: { id: "claude", x: 968, y: 203, w: 80, h: 38, label: "Claude" },
  bedrock: { id: "bedrock", x: 1058, y: 203, w: 82, h: 38, label: "Bedrock" },
  gemini: { id: "gemini", x: 1150, y: 203, w: 70, h: 38, label: "Gemini" },
  budget: {
    id: "budget",
    x: 880,
    y: 251,
    w: 340,
    h: 38,
    label: "Token budget · cost-aware fallback",
  },

  /* Cloud */
  docker: { id: "docker", x: 60, y: 355, w: 340, h: 36, label: "Docker images · ECR" },
  k8s: { id: "k8s", x: 60, y: 401, w: 340, h: 36, label: "Kubernetes" },
  keda: {
    id: "keda",
    x: 60,
    y: 447,
    w: 340,
    h: 36,
    label: "KEDA autoscaler (queue-aware)",
  },
  gha: {
    id: "gha",
    x: 60,
    y: 493,
    w: 340,
    h: 36,
    label: "GitHub Actions · SSL · scans",
  },

  /* Workers */
  agent: {
    id: "agent",
    x: 480,
    y: 355,
    w: 320,
    h: 38,
    label: "Agent Worker",
    sub: "executes tools",
  },
  tool: { id: "tool", x: 480, y: 403, w: 320, h: 38, label: "Tool Runner" },
  retry: {
    id: "retry",
    x: 480,
    y: 451,
    w: 320,
    h: 38,
    label: "Retry · backoff · jitter",
  },
  idem: { id: "idem", x: 480, y: 499, w: 320, h: 38, label: "Idempotency keys" },

  /* Persistence */
  pg: { id: "pg", x: 880, y: 355, w: 160, h: 52, label: "PostgreSQL", kind: "db" },
  aurora: {
    id: "aurora",
    x: 1060,
    y: 355,
    w: 160,
    h: 52,
    label: "Aurora",
    kind: "db",
  },
  redis: {
    id: "redis",
    x: 880,
    y: 423,
    w: 160,
    h: 52,
    label: "Redis · KeyDB",
    kind: "db",
  },
  mongo: {
    id: "mongo",
    x: 1060,
    y: 423,
    w: 160,
    h: 52,
    label: "MongoDB",
    kind: "db",
  },
  s3: { id: "s3", x: 880, y: 491, w: 340, h: 38, label: "S3 · payload codec" },

  /* Observability */
  metrics: {
    id: "metrics",
    x: 210,
    y: 615,
    w: 270,
    h: 38,
    label: "Metrics · P95 · queue depth",
  },
  logs: {
    id: "logs",
    x: 510,
    y: 615,
    w: 270,
    h: 38,
    label: "Structured logs · trace IDs",
  },
  traces: {
    id: "traces",
    x: 810,
    y: 615,
    w: 270,
    h: 38,
    label: "Token cost · provider latency",
  },
};

type Edge = {
  from: keyof typeof nodes;
  to: keyof typeof nodes;
  dashed?: boolean;
  label?: string;
  color?: "emerald" | "cyan" | "amber" | "violet" | "rose";
  dur?: number;
};

const edges: Edge[] = [
  // Clients → API
  { from: "web", to: "ctrl", label: "request", color: "cyan" },
  { from: "dash", to: "ctrl", color: "cyan" },
  { from: "ext", to: "ctrl", color: "cyan", dashed: true },

  // API → Orchestration
  { from: "rl", to: "temporal", label: "enqueue", color: "emerald" },

  // Orch internal fan-out
  { from: "temporal", to: "kafka", color: "emerald" },
  { from: "temporal", to: "sqs", color: "emerald" },
  { from: "kafka", to: "dlq", dashed: true, color: "amber" },
  { from: "sqs", to: "dlq", dashed: true, color: "amber" },

  // Orch → Workers
  { from: "kafka", to: "agent", label: "consume", color: "emerald" },
  { from: "sqs", to: "agent", color: "emerald" },

  // Workers → AI
  { from: "agent", to: "router", label: "invoke LLM", color: "violet" },

  // AI internal fan-out
  { from: "router", to: "openai", color: "violet" },
  { from: "router", to: "claude", color: "violet" },
  { from: "router", to: "bedrock", color: "violet" },
  { from: "router", to: "gemini", color: "violet" },

  // Workers → Persistence
  { from: "tool", to: "pg", label: "persist", color: "rose" },
  { from: "tool", to: "redis", label: "cache", color: "rose" },
  { from: "tool", to: "s3", label: "large payload", color: "rose" },

  // Cloud → Workers / Orch
  { from: "k8s", to: "agent", dashed: true, label: "schedule", color: "cyan" },
  { from: "keda", to: "sqs", dashed: true, label: "depth → scale", color: "amber" },

  // Observability
  { from: "agent", to: "logs", dashed: true, color: "amber" },
  { from: "router", to: "traces", dashed: true, color: "amber" },
  { from: "retry", to: "metrics", dashed: true, color: "amber" },
];

/* -------------------------------------------------------------------------- */
/*  Geometry helpers                                                          */
/* -------------------------------------------------------------------------- */

type Side = "top" | "bottom" | "left" | "right";

function anchorOf(n: Node, side: Side): [number, number] {
  switch (side) {
    case "top":
      return [n.x + n.w / 2, n.y];
    case "bottom":
      return [n.x + n.w / 2, n.y + n.h];
    case "left":
      return [n.x, n.y + n.h / 2];
    case "right":
      return [n.x + n.w, n.y + n.h / 2];
  }
}

function pickSides(from: Node, to: Node): [Side, Side] {
  const fCx = from.x + from.w / 2;
  const fCy = from.y + from.h / 2;
  const tCx = to.x + to.w / 2;
  const tCy = to.y + to.h / 2;
  const dx = tCx - fCx;
  const dy = tCy - fCy;

  if (Math.abs(dx) > Math.abs(dy) * 1.1) {
    return [dx > 0 ? "right" : "left", dx > 0 ? "left" : "right"];
  }
  return [dy > 0 ? "bottom" : "top", dy > 0 ? "top" : "bottom"];
}

function edgePath(from: Node, to: Node): string {
  const [fSide, tSide] = pickSides(from, to);
  const [x1, y1] = anchorOf(from, fSide);
  const [x2, y2] = anchorOf(to, tSide);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const handle = Math.max(40, Math.min(140, Math.hypot(dx, dy) * 0.45));

  const c1: [number, number] =
    fSide === "right"
      ? [x1 + handle, y1]
      : fSide === "left"
        ? [x1 - handle, y1]
        : fSide === "bottom"
          ? [x1, y1 + handle]
          : [x1, y1 - handle];

  const c2: [number, number] =
    tSide === "right"
      ? [x2 + handle, y2]
      : tSide === "left"
        ? [x2 - handle, y2]
        : tSide === "bottom"
          ? [x2, y2 + handle]
          : [x2, y2 - handle];

  return `M ${x1} ${y1} C ${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${x2} ${y2}`;
}

function edgeMidpoint(from: Node, to: Node): [number, number] {
  const [fSide, tSide] = pickSides(from, to);
  const [x1, y1] = anchorOf(from, fSide);
  const [x2, y2] = anchorOf(to, tSide);
  return [(x1 + x2) / 2, (y1 + y2) / 2];
}

/* -------------------------------------------------------------------------- */
/*  Colour helpers                                                            */
/* -------------------------------------------------------------------------- */

const dotColor: Record<NonNullable<Edge["color"]>, string> = {
  emerald: "#6ee7b7",
  cyan: "#67e8f9",
  amber: "#fcd34d",
  violet: "#c4b5fd",
  rose: "#fda4af",
};

const edgeStroke: Record<NonNullable<Edge["color"]>, string> = {
  emerald: "rgba(110, 231, 183, 0.45)",
  cyan: "rgba(103, 232, 249, 0.45)",
  amber: "rgba(252, 211, 77, 0.40)",
  violet: "rgba(196, 181, 253, 0.40)",
  rose: "rgba(253, 164, 175, 0.40)",
};

/* -------------------------------------------------------------------------- */
/*  Rendering                                                                 */
/* -------------------------------------------------------------------------- */

function BoxNode({ node, delay }: { node: Node; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={8}
        fill="rgba(15, 17, 22, 0.85)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth={1}
      />
      <text
        x={node.x + node.w / 2}
        y={node.sub ? node.y + 16 : node.y + node.h / 2 + 4.5}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize={node.sub ? 12 : 13}
        fontWeight={500}
        fill="#f4f4f5"
      >
        {node.label}
      </text>
      {node.sub && (
        <text
          x={node.x + node.w / 2}
          y={node.y + 30}
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize={9.5}
          fill="#a1a1aa"
        >
          {node.sub}
        </text>
      )}
    </motion.g>
  );
}

function DBNode({ node, delay }: { node: Node; delay: number }) {
  const rx = node.w / 2;
  const ry = 6;
  const bodyPath = `M ${node.x} ${node.y + ry} L ${node.x} ${node.y + node.h - ry} A ${rx} ${ry} 0 0 0 ${node.x + node.w} ${node.y + node.h - ry} L ${node.x + node.w} ${node.y + ry} Z`;
  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <path
        d={bodyPath}
        fill="rgba(15, 17, 22, 0.85)"
        stroke="rgba(167,243,208,0.28)"
        strokeWidth={1}
      />
      <ellipse
        cx={node.x + node.w / 2}
        cy={node.y + ry}
        rx={rx}
        ry={ry}
        fill="rgba(20, 23, 30, 0.95)"
        stroke="rgba(167,243,208,0.35)"
        strokeWidth={1}
      />
      <text
        x={node.x + node.w / 2}
        y={node.y + node.h / 2 + 6}
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize={13}
        fontWeight={500}
        fill="#f4f4f5"
      >
        {node.label}
      </text>
    </motion.g>
  );
}

function Subgraph({ sg, delay }: { sg: Subgraph; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      <rect
        x={sg.x}
        y={sg.y}
        width={sg.w}
        height={sg.h}
        rx={14}
        fill="rgba(255,255,255,0.02)"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={1}
        strokeDasharray="4 6"
      />
      <text
        x={sg.x + 14}
        y={sg.y + 18}
        fontFamily="ui-monospace, monospace"
        fontSize={10}
        letterSpacing="0.18em"
        fill="#a7f3d0"
      >
        {sg.title}
      </text>
    </motion.g>
  );
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const principles = [
  {
    icon: Activity,
    title: "Idempotency by default",
    body: "Every consumer and handler must be safe to replay. Stable request keys, dedup tables, Temporal-deterministic execution.",
  },
  {
    icon: ShieldCheck,
    title: "Fail loud, isolate fast",
    body: "Transient errors retry with jitter and DLQ. Permanent ones surface immediately with structured context — no silent swallow.",
  },
  {
    icon: GitBranch,
    title: "Provider-agnostic AI",
    body: "Prompts and tools live above providers. Fallback is a config change, not a code branch. Cost and latency drive routing.",
  },
  {
    icon: Network,
    title: "Observable from day one",
    body: "Queue depth, P95, error rate, token usage, and unit cost stream to dashboards before launch — not after the outage.",
  },
];

const decisions = [
  {
    picked: "Temporal",
    over: "Raw BullMQ",
    why: "Long-running flows need replay, history, and visibility — not just retries.",
  },
  {
    picked: "KeyDB",
    over: "Vanilla Redis",
    why: "Multi-threading matched our burst write patterns for rate-limit token buckets.",
  },
  {
    picked: "KEDA",
    over: "Fixed HPA",
    why: "Queue-depth scaling beats CPU/memory signals for IO-bound LLM workers.",
  },
  {
    picked: "Bedrock + OpenAI",
    over: "Single provider",
    why: "Diversifies rate limits and gives a real failover when one provider degrades.",
  },
];

export function ArchitectRoadmap() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-40 h-[28rem] w-[28rem] rounded-full bg-emerald-300/[0.05] blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-80 h-[26rem] w-[26rem] rounded-full bg-cyan-300/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            eyebrow="Architect roadmap"
            title="How I wire systems end to end."
            description="A live, scroll-revealed view of the production architecture I design — from edge to data, with the patterns and trade-offs that keep it reliable."
          />
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="ring-conic relative rounded-2xl border border-emerald-300/20 bg-emerald-300/[0.05] p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-200 text-zinc-950 shadow-[0_8px_30px_rgba(110,231,183,0.3)]">
                <Sparkles size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold text-zinc-50">
                  Architect mindset
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  I think in layers, contracts, and failure modes — not files or
                  frameworks. Each box below earns its place by what it isolates.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 shadow-2xl shadow-black/30"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-2.5 font-mono text-[11px] text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-300/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-zinc-500">system.architecture.mmd</span>
            </div>
            <div className="hidden items-center gap-3 sm:flex">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-px w-4 bg-emerald-300/70" />
                solid · request path
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-px w-4 bg-amber-300/60 [border-top:1px_dashed_currentColor] bg-transparent" />
                dashed · async / signal
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1100px] px-4 py-4">
              <FlowDiagram />
            </div>
          </div>
        </motion.div>

        {/* Architect principles */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-200">
              Principles
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -5 }}
                  className="group spotlight relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-6 card-lift hover:border-emerald-200/30"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-300/[0.06] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-zinc-950 text-emerald-200 transition-all duration-300 group-hover:border-emerald-300/35 group-hover:bg-emerald-300/10">
                    <Icon
                      size={18}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h4 className="relative text-base font-semibold text-zinc-50">
                    {p.title}
                  </h4>
                  <p className="relative mt-2 text-sm leading-6 text-zinc-400">
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Decisions */}
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-emerald-300/0 via-emerald-300/70 to-emerald-300/0" />
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-200">
              Decisions I&apos;ve defended
            </p>
          </motion.div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70">
            {decisions.map((d, i) => (
              <motion.div
                key={d.picked}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                className="group relative grid items-center gap-4 border-t border-white/5 p-5 transition-colors hover:bg-white/[0.025] md:grid-cols-[1fr_auto_1fr_2fr] first:border-t-0"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Picked
                  </span>
                  <span className="rounded-md border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 font-mono text-xs text-emerald-100">
                    {d.picked}
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="hidden text-zinc-600 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-300 md:block"
                />
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Over
                  </span>
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-zinc-300">
                    {d.over}
                  </span>
                </div>
                <p className="text-sm leading-6 text-zinc-400">{d.why}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Flow diagram (SVG)                                                        */
/* -------------------------------------------------------------------------- */

function FlowDiagram() {
  return (
    <svg
      viewBox="0 0 1280 700"
      className="block h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="System architecture flow diagram"
    >
      <defs>
        {/* Subtle grid */}
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(255,255,255,0.025)"
            strokeWidth="1"
          />
        </pattern>
        <radialGradient id="grid-fade" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask">
          <rect width="1280" height="700" fill="url(#grid-fade)" />
        </mask>

        {/* Arrowhead markers */}
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          markerWidth="6"
          markerHeight="6"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
        </marker>
        <marker
          id="arrow-dashed"
          viewBox="0 0 10 10"
          markerWidth="6"
          markerHeight="6"
          refX="8"
          refY="5"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(252,211,77,0.7)" />
        </marker>

        {/* Glow filter for dots */}
        <filter id="dot-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid (masked to fade at edges) */}
      <g mask="url(#grid-mask)">
        <rect width="1280" height="700" fill="url(#grid)" />
      </g>

      {/* Subgraphs (containers) */}
      {subgraphs.map((sg, i) => (
        <Subgraph key={sg.id} sg={sg} delay={0.05 + i * 0.04} />
      ))}

      {/* Edges first so nodes paint above */}
      {edges.map((e, i) => {
        const from = nodes[e.from];
        const to = nodes[e.to];
        if (!from || !to) return null;
        const d = edgePath(from, to);
        const [mx, my] = edgeMidpoint(from, to);
        const colorKey = e.color ?? "emerald";
        const stroke = e.dashed ? edgeStroke.amber : edgeStroke[colorKey];
        const dot = dotColor[colorKey];
        const dur = e.dur ?? (3 + (i % 4) * 0.6);
        const startBegin = 0.7 + i * 0.045;

        return (
          <g key={`edge-${i}`}>
            <motion.path
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeDasharray={e.dashed ? "5 5" : undefined}
              markerEnd={e.dashed ? "url(#arrow-dashed)" : "url(#arrow)"}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.9,
                delay: 0.12 + i * 0.03,
                ease: "easeInOut",
              }}
            />

            {/* Traveling dot #1 */}
            <circle r={2.6} fill={dot} filter="url(#dot-glow)" opacity={0}>
              <animate
                attributeName="opacity"
                from="0"
                to="1"
                begin={`${startBegin}s`}
                dur="0.4s"
                fill="freeze"
              />
              <animateMotion
                begin={`${startBegin}s`}
                dur={`${dur}s`}
                repeatCount="indefinite"
                path={d}
                rotate="auto"
              />
            </circle>

            {/* Traveling dot #2 (staggered) for solid edges only */}
            {!e.dashed && (
              <circle r={1.8} fill={dot} filter="url(#dot-glow)" opacity={0}>
                <animate
                  attributeName="opacity"
                  from="0"
                  to="0.85"
                  begin={`${startBegin + dur / 2}s`}
                  dur="0.4s"
                  fill="freeze"
                />
                <animateMotion
                  begin={`${startBegin + dur / 2}s`}
                  dur={`${dur}s`}
                  repeatCount="indefinite"
                  path={d}
                  rotate="auto"
                />
              </circle>
            )}

            {/* Edge label */}
            {e.label && (
              <motion.text
                x={mx}
                y={my - 6}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize={9.5}
                fill="#cbd5e1"
                stroke="#08090d"
                strokeWidth={3}
                paintOrder="stroke"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 1 + i * 0.03 }}
              >
                {e.label}
              </motion.text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {Object.values(nodes).map((n, i) =>
        n.kind === "db" ? (
          <DBNode key={n.id} node={n} delay={0.15 + i * 0.018} />
        ) : (
          <BoxNode key={n.id} node={n} delay={0.15 + i * 0.018} />
        ),
      )}

      {/* Live pulse on key nodes */}
      <PulseDot cx={nodes.router.x + 14} cy={nodes.router.y + 19} color="#c4b5fd" />
      <PulseDot cx={nodes.temporal.x + 14} cy={nodes.temporal.y + 19} color="#6ee7b7" />
      <PulseDot cx={nodes.agent.x + 14} cy={nodes.agent.y + 19} color="#67e8f9" />
    </svg>
  );
}

function PulseDot({
  cx,
  cy,
  color,
}: {
  cx: number;
  cy: number;
  color: string;
}) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={3} fill={color} filter="url(#dot-glow)" />
      <circle cx={cx} cy={cy} r={3} fill={color} opacity={0.6}>
        <animate
          attributeName="r"
          from="3"
          to="9"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          from="0.55"
          to="0"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/**
 * Zero-dependency PDF resume generator.
 * Run: node scripts/gen-resume.js
 * Output: public/resume.pdf
 */
const fs = require("fs");
const path = require("path");

const PAGE_W = 612; // US Letter, points
const PAGE_H = 792;
const LEFT = 50;
const RIGHT = PAGE_W - 50;

/* ------------------------------ Content ----------------------------------- */

const NAME = "MUKESH KASIMAHANTHI";
const ROLE = "Full Stack and AI Platform Engineer";
const CONTACT =
  "mukeshrobot@gmail.com  |  github.com/mukeshrobot  |  linkedin.com/in/mukesh-kasimahanthi";

const SECTIONS = [
  {
    title: "SUMMARY",
    body: [
      "Full-stack engineer with 4 years of production experience across Angular, React, React Native,",
      "Node.js, distributed queues, Temporal workflows, AI agent infrastructure, and multi-environment",
      "cloud deployments. Comfortable owning systems end to end: frontend, backend, data, AI execution,",
      "and release.",
    ],
  },
  {
    title: "EXPERIENCE",
    body: [
      "AI Platform Engineer   (2024 - Present)",
      "  - Distributed agent execution platform on Temporal, Kafka, SQS, Redis, and KeyDB.",
      "  - LLM rate-limit control across OpenAI, Anthropic, Gemini, and Amazon Bedrock.",
      "  - KEDA-driven queue-aware autoscaling and DLQ replay flows for failed jobs.",
      "  - Payload codec that offloads large prompts and workflow state to S3 transparently.",
      "",
      "Full-Stack Engineer   (2023 - 2024)",
      "  - Apartment operations platform: Angular + DevUI / Nebular + Node / Express + Sequelize.",
      "  - Dynamic FormArray flows, water bill and maintenance calculation, Excel reporting.",
      "  - Project Checklist Review System with RBAC, L1/L2/L3 review stages, React + MUI.",
      "",
      "Frontend / Mobile Engineer   (2022 - 2023)",
      "  - React Native cross-platform mobile flows with typed navigation and forms.",
      "  - Angular admin tooling and TypeScript fixes across product surfaces.",
    ],
  },
  {
    title: "SELECTED PROJECTS",
    body: [
      "AI Agent Workflow Platform - Temporal, Kafka, SQS, Redis, KeyDB, KEDA, Bedrock",
      "Apartment Maintenance Management System - Angular, Node.js, Sequelize, Excel export",
      "Project Checklist Review System - React, Node.js, MongoDB, MUI, RBAC",
      "Cloud Deployment Automation - Docker, GitHub Actions, ECR, AWS, SSL",
      "Unified Social Media Hub - Node.js, OAuth, feed and messaging architecture",
    ],
  },
  {
    title: "TECH STACK",
    body: [
      "Frontend:    Angular, React, React Native, TypeScript, Tailwind, Material UI, DevUI, Nebular",
      "Backend:     Node.js, Express.js, Sequelize, REST APIs, RBAC, OAuth, JWT",
      "Data:        PostgreSQL, Amazon Aurora, MongoDB, Redis, KeyDB",
      "Messaging:   Temporal, Kafka, Amazon SQS, DLQ design, idempotency, payload codecs",
      "AI:          OpenAI, Claude, Gemini, Amazon Bedrock, token buckets, fallback routing",
      "Cloud:       AWS, Docker, Kubernetes, KEDA, Cloud Run, ECR, GitHub Actions, NGINX, SSL",
    ],
  },
  {
    title: "ARCHITECT MINDSET",
    body: [
      "- Idempotency by default: replay-safe consumers, dedup keys, deterministic workflows.",
      "- Fail loud, isolate fast: jittered retries, DLQ routing, structured failure context.",
      "- Provider-agnostic AI: prompts and tools live above providers; fallback is a config change.",
      "- Observable from day one: queue depth, P95, error rate, and token cost streamed pre-launch.",
    ],
  },
];

/* ------------------------------ Helpers ----------------------------------- */

function escStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

/* ------------------------- Build content stream --------------------------- */

const ops = [];
let y = PAGE_H - 60;

function textAt(font, size, x, yPos, str) {
  ops.push("BT");
  ops.push(`/${font} ${size} Tf`);
  ops.push(`${x} ${yPos} Td`);
  ops.push(`(${escStr(str)}) Tj`);
  ops.push("ET");
}

function rule(yPos, weight = 0.5, gray = 0.5) {
  ops.push(`${gray} ${gray} ${gray} RG`);
  ops.push(`${weight} w`);
  ops.push(`${LEFT} ${yPos} m ${RIGHT} ${yPos} l S`);
}

// Header
textAt("F1", 22, LEFT, y, NAME);
y -= 22;
textAt("F2", 11, LEFT, y, ROLE);
y -= 14;
textAt("F2", 9.5, LEFT, y, CONTACT);
y -= 10;
rule(y);
y -= 18;

// Sections
for (const s of SECTIONS) {
  textAt("F1", 11, LEFT, y, s.title);
  y -= 4;
  ops.push("0.65 0.65 0.65 RG");
  ops.push("0.4 w");
  ops.push(`${LEFT} ${y} m ${LEFT + 90} ${y} l S`);
  y -= 14;
  for (const line of s.body) {
    textAt("F2", 9.8, LEFT, y, line);
    y -= 12.5;
  }
  y -= 6;
}

const stream = ops.join("\n");

/* -------------------------- Assemble PDF objects -------------------------- */

const objects = [];

// 1: Catalog
objects.push("<< /Type /Catalog /Pages 2 0 R >>");

// 2: Pages
objects.push("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");

// 3: Page
objects.push(
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>`,
);

// 4: Contents
const streamBytes = Buffer.byteLength(stream, "latin1");
objects.push(`<< /Length ${streamBytes} >>\nstream\n${stream}\nendstream`);

// 5: Helvetica-Bold (F1)
objects.push(
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
);

// 6: Helvetica (F2)
objects.push(
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
);

/* ------------------------------ Serialise --------------------------------- */

let buf = Buffer.alloc(0);
function push(s) {
  buf = Buffer.concat([buf, Buffer.from(s, "latin1")]);
}

push("%PDF-1.4\n");
push("%\xE2\xE3\xCF\xD3\n"); // binary marker so tools detect this as binary

const offsets = [0];
for (let i = 0; i < objects.length; i++) {
  offsets.push(buf.length);
  push(`${i + 1} 0 obj\n${objects[i]}\nendobj\n`);
}

const xrefStart = buf.length;
let xref = `xref\n0 ${objects.length + 1}\n`;
xref += "0000000000 65535 f \n";
for (let i = 1; i <= objects.length; i++) {
  xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
push(xref);
push(
  `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`,
);

const out = path.join(__dirname, "..", "public", "resume.pdf");
fs.writeFileSync(out, buf);
console.log(`wrote ${out} (${buf.length} bytes)`);

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { posts } from "@/lib/blog";
import { SectionHeading } from "./SectionHeading";

const accents = [
  "from-cyan-300/25 via-sky-300/10 to-transparent",
  "from-emerald-300/25 via-teal-300/10 to-transparent",
  "from-amber-300/25 via-orange-300/10 to-transparent",
];

export function BlogTeaser() {
  const top = posts.slice(0, 3);
  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Writing"
            title="Notes from production."
            description="Things I learned the slow, expensive way — so you don't have to. Temporal scale, LLM rate limits, OAuth integrations."
          />
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm text-zinc-300 transition-all hover:-translate-y-0.5 hover:border-emerald-200/30 hover:text-white"
            >
              All posts
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {top.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group spotlight relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 p-6 transition-all hover:border-white/20 hover:bg-zinc-900/80"
              >
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br ${
                    accents[i % accents.length]
                  } opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative flex items-center gap-3 font-mono text-[11px] text-zinc-500">
                  <time>{formatDate(post.date)}</time>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={11} />
                    {post.readingTime}
                  </span>
                </div>
                <h3 className="relative mt-3 text-lg font-semibold leading-snug text-zinc-50 group-hover:text-white">
                  {post.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-zinc-400">
                  {post.excerpt}
                </p>
                <div className="relative mt-auto pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[10px] text-zinc-400 transition-colors group-hover:border-white/15 group-hover:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200">
                    Read post
                    <ArrowUpRight
                      size={12}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

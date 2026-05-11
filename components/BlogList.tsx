"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import type { Post } from "@/lib/blog";

const accents = [
  "from-cyan-300/30 via-sky-300/10 to-transparent",
  "from-emerald-300/30 via-teal-300/10 to-transparent",
  "from-amber-300/30 via-orange-300/10 to-transparent",
  "from-violet-300/30 via-fuchsia-300/10 to-transparent",
];

export function BlogList({ posts }: { posts: Post[] }) {
  if (!posts.length) return null;
  const [feature, ...rest] = posts;

  return (
    <div className="space-y-12">
      {/* Featured */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          href={`/blog/${feature.slug}`}
          className="group spotlight relative grid overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 p-8 transition-all hover:border-white/20 hover:bg-zinc-900/80 md:grid-cols-[1.2fr_1fr] md:p-10"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-300/25 via-cyan-300/10 to-transparent opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-2.5 py-1 text-[11px] font-medium text-emerald-100">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]" />
              Featured
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-tight text-zinc-50 md:text-3xl">
              {feature.title}
            </h2>
            <p className="mt-3 text-zinc-400 leading-relaxed">
              {feature.excerpt}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-500">
              <time>{formatDate(feature.date)}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={11} />
                {feature.readingTime}
              </span>
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-200">
              Read the full article
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 md:pl-8">
            <div className="flex flex-wrap gap-1.5">
              {feature.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                >
                  <Tag size={10} className="text-cyan-200" />
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4 font-mono text-xs text-zinc-400">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                from the post
              </div>
              <p className="mt-2 leading-6 line-clamp-5 text-zinc-300">
                {firstPara(feature.body)}
              </p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Rest as cards */}
      {rest.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group spotlight relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-zinc-950/70 p-6 transition-all hover:border-white/20 hover:bg-zinc-900/80"
              >
                <div
                  className={`pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-gradient-to-br ${
                    accents[(i + 1) % accents.length]
                  } opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
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
      )}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function firstPara(body: string) {
  const first = body.split(/\n\n+/).find((b) => !b.startsWith("##"));
  return first ?? body.slice(0, 240);
}

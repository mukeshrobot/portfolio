import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { getPost, posts } from "@/lib/blog";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlogPostBody } from "@/components/BlogPostBody";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === post.slug);
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index >= 0 && index < posts.length - 1 ? posts[index + 1] : null;

  return (
    <>
      <ReadingProgress />
      <article className="relative pt-32 pb-24">
        {/* Ambient header glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(110,231,183,0.10),transparent_70%)]" />

        <div className="relative mx-auto max-w-3xl px-6">
          <Link
            href="/blog"
            className="group mb-10 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            All posts
          </Link>

          <div className="mb-4 flex items-center gap-3 font-mono text-xs text-zinc-500">
            <time>{formatDate(post.date)}</time>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} />
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-zinc-50 md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-300">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-zinc-300"
              >
                <Tag size={10} className="text-cyan-200" />
                {t}
              </span>
            ))}
          </div>

          <div className="relative my-10 h-px">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          <BlogPostBody body={post.body} />

          {/* Author + share footer */}
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/10 font-mono text-sm font-semibold text-emerald-100 shadow-[0_0_25px_rgba(110,231,183,0.18)]">
                MK
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-100">
                  Written by Mukesh Kasimahanthi
                </p>
                <p className="mt-1 text-sm leading-6 text-zinc-400">
                  Full-stack and AI platform engineer. I write about the
                  decisions behind production systems — queues, agents, cloud
                  delivery, and the small details that keep software reliable.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-emerald-200/40 hover:text-white"
                  >
                    Get in touch
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-emerald-200/40 hover:text-white"
                  >
                    See projects
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <nav className="mt-10 grid gap-3 md:grid-cols-2">
              {prev ? (
                <Link
                  href={`/blog/${prev.slug}`}
                  className="group rounded-xl border border-white/10 bg-zinc-950/70 p-5 transition-all hover:-translate-y-0.5 hover:border-white/20"
                >
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    <ArrowLeft size={11} /> Previous
                  </span>
                  <p className="mt-2 text-sm font-medium text-zinc-100 group-hover:text-white">
                    {prev.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link
                  href={`/blog/${next.slug}`}
                  className="group rounded-xl border border-white/10 bg-zinc-950/70 p-5 text-right transition-all hover:-translate-y-0.5 hover:border-white/20"
                >
                  <span className="inline-flex items-center justify-end gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                    Next <ArrowRight size={11} />
                  </span>
                  <p className="mt-2 text-sm font-medium text-zinc-100 group-hover:text-white">
                    {next.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}
        </div>
      </article>
    </>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

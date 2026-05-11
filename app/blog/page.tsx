import type { Metadata } from "next";
import { posts } from "@/lib/blog";
import { SectionHeading } from "@/components/SectionHeading";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on distributed systems, AI in production, and the engineering decisions behind the projects.",
};

export default function BlogPage() {
  return (
    <div className="relative pt-32 pb-24">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(110,231,183,0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from production engineering."
          description="Things I learned the slow, expensive way — Temporal at scale, LLM rate limits, OAuth integrations that don't rot."
        />

        <div className="mt-14">
          <BlogList posts={posts} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={
        align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-2xl"
      }
    >
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2">
          <span className="h-px w-6 bg-gradient-to-r from-emerald-300/0 via-emerald-300 to-emerald-300/0" />
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-emerald-200">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-50">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-zinc-400 leading-relaxed">{description}</p>
      )}
    </motion.div>
  );
}

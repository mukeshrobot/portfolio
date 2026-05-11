"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="ring-conic relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/70 p-10 shadow-2xl shadow-cyan-950/10 md:p-14"
        >
          {/* Animated gradient field */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="aurora-blob -left-10 top-0 h-72 w-72" style={{ background: "rgba(34, 211, 238, 0.30)" }} />
            <div className="aurora-blob right-0 bottom-0 h-72 w-72" style={{ background: "rgba(110, 231, 183, 0.25)", animationDelay: "-6s" }} />
          </div>
          <div
            className="absolute inset-0 opacity-[0.05] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.26), transparent 45%), radial-gradient(circle at 15% 90%, rgba(251,191,36,0.16), transparent 35%)",
            }}
          />

          <div className="relative max-w-2xl">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something solid."
              description="Open to full-stack, backend, cloud, and AI platform roles where practical delivery matters."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton strength={0.25}>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-center gap-2 rounded-md bg-zinc-50 px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-white hover:shadow-[0_18px_44px_rgba(167,243,208,0.30)]"
                >
                  <Mail
                    size={16}
                    className="transition-transform duration-300 group-hover:rotate-[8deg]"
                  />
                  {site.email}
                </a>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:border-emerald-200/40 hover:text-white"
                >
                  LinkedIn
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </MagneticButton>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-zinc-400">
              <Sparkles size={13} className="text-emerald-200" />
              Typical reply within 24 hours
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/10 bg-zinc-950/60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center"
      >
        <div>
          <p className="font-mono text-sm text-zinc-300">
            <span className="text-emerald-300">MK</span> {site.name}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            {site.role} / {site.tagline}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <SocialLink href={`mailto:${site.email}`} label="Email">
            <Mail size={16} />
          </SocialLink>
          <SocialLink href={site.social.github} label="GitHub">
            <Github size={16} />
          </SocialLink>
          <SocialLink href={site.social.linkedin} label="LinkedIn">
            <Linkedin size={16} />
          </SocialLink>
          <SocialLink href={site.social.twitter} label="Twitter">
            <Twitter size={16} />
          </SocialLink>
        </div>
      </motion.div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-xs text-zinc-600">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="font-mono">Built with Next.js / Tailwind</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
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
      className="group inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-zinc-400 transition-all hover:-translate-y-0.5 hover:border-emerald-200/40 hover:text-white hover:shadow-[0_8px_22px_rgba(110,231,183,0.18)]"
    >
      <span className="transition-transform duration-300 group-hover:scale-110">
        {children}
      </span>
    </Link>
  );
}

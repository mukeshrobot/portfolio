"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-[#08090d]/85 shadow-[0_10px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      )}
    >
      <nav
        className={clsx(
          "mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-3 text-zinc-100"
          aria-label={site.name}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-300/25 bg-emerald-300/10 font-mono text-sm font-semibold text-emerald-100 shadow-[0_0_25px_rgba(110,231,183,0.18)] transition-all group-hover:border-emerald-300/50 group-hover:shadow-[0_0_30px_rgba(110,231,183,0.35)]">
            <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-emerald-300/0 via-cyan-300/0 to-emerald-300/0 opacity-0 transition-opacity group-hover:opacity-30" />
            MK
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold">{site.name}</span>
            <span className="block text-[11px] text-zinc-500">
              AI Platform Engineer
            </span>
          </span>
        </Link>

        <ul
          className="relative hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onMouseEnter={() => setHovered(l.href)}
                  className={clsx(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    active ? "text-zinc-950" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {hovered === l.href && !active && (
                    <motion.span
                      layoutId="nav-hover"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-md bg-white/[0.06]"
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 -z-10 rounded-md bg-white"
                    />
                  )}
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-emerald-200/40 hover:text-white"
          >
            <Mail
              size={15}
              className="transition-transform duration-300 group-hover:rotate-[8deg]"
            />
            Email
          </a>
          <Link
            href={site.resumeUrl}
            target="_blank"
            className="group inline-flex items-center gap-2 rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(167,243,208,0.30)]"
          >
            <Download
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            Resume
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-zinc-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#08090d]/97 backdrop-blur-xl lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-300 hover:bg-white/[0.06] hover:text-white"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-medium text-zinc-200"
                >
                  <Mail size={15} />
                  Email
                </a>
                <Link
                  href={site.resumeUrl}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-950"
                >
                  <Download size={15} />
                  Resume
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

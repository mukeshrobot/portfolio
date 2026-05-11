"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function WordCycle({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-flex items-baseline align-baseline ${className ?? ""}`}
      style={{ minWidth: width ?? undefined }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          ref={(el) => {
            if (el) setWidth(el.offsetWidth);
          }}
          initial={{ y: "0.45em", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-0.45em", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

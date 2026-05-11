"use client";

import { motion } from "framer-motion";

export function BlogPostBody({ body }: { body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="prose-portfolio"
    >
      {renderBody(body)}
    </motion.div>
  );
}

function renderBody(body: string) {
  const lines = body.split(/\n\n+/);
  return lines.map((block, i) => {
    if (block.startsWith("## ")) {
      return <h2 key={i}>{block.slice(3)}</h2>;
    }
    if (block.startsWith("### ")) {
      return <h3 key={i}>{block.slice(4)}</h3>;
    }
    return <p key={i}>{renderInline(block)}</p>;
  });
}

function renderInline(text: string) {
  const parts: (string | React.ReactNode)[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(<code key={key++}>{token.slice(1, -1)}</code>);
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description = `${site.name} - ${site.role}. ${site.yearsExperience}+ years building production AI agent infrastructure, full-stack applications, distributed systems on Temporal/Kafka/SQS, and multi-environment cloud deployments.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.role}`,
    template: `%s - ${site.name}`,
  },
  description,
  keywords: [
    site.name,
    "Mukesh Kasimahanthi",
    "Mukesh Kasimahanthi portfolio",
    "Mukesh Kasimahanthi engineer",
    "Mukesh Kasimahanthi resume",
    "Full Stack Engineer India",
    "AI Platform Engineer",
    "AI Agent Engineer",
    "Node.js Engineer",
    "Angular Engineer",
    "React Engineer",
    "Temporal Workflows",
    "LLM infrastructure",
    "Distributed systems engineer",
    "Cloud engineer",
    "Software engineer portfolio",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  applicationName: `${site.name} Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} - Portfolio`,
    title: `${site.name} - ${site.role}`,
    description,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} - ${site.role}`,
    description,
    images: [site.ogImage],
    creator: "@mukeshrobot",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/1771869736681.png",
  },
  verification: {
    // Add Google Search Console verification token here once you have it
    // google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: "Mukesh",
  url: site.url,
  image: `${site.url}${site.ogImage}`,
  jobTitle: site.role,
  description,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressCountry: site.location,
  },
  sameAs: [site.social.github, site.social.linkedin],
  knowsAbout: [
    "AI Agent Infrastructure",
    "Large Language Models",
    "Temporal Workflows",
    "Distributed Systems",
    "Node.js",
    "Angular",
    "React",
    "React Native",
    "TypeScript",
    "AWS",
    "Kubernetes",
    "Cloud Engineering",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} - Portfolio`,
  url: site.url,
  description,
  author: { "@type": "Person", name: site.name },
  inLanguage: "en-US",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ScrollProgress />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

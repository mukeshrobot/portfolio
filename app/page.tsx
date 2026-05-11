import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Contact } from "@/components/Contact";
import { ExperienceMatrix } from "@/components/ExperienceMatrix";
import { Journey } from "@/components/Journey";
import { BlogTeaser } from "@/components/BlogTeaser";
import { ArchitectRoadmap } from "@/components/ArchitectRoadmap";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <ExperienceMatrix />
      <Journey />
      <ArchitectRoadmap />
      <FeaturedProjects />
      <Skills />
      <BlogTeaser />
      <Contact />
    </>
  );
}

import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function FeaturedProjects() {
  return (
    <section id="projects" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Selected WordPress, WooCommerce, and CMS work."
          description="A focused sample of shipped websites and platform implementations across backend development, CMS architecture, performance optimization, and polished frontend delivery."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.href} project={project} index={index} />
          ))}
        </div>

        <Reveal className="mt-10 rounded-2xl border border-white/10 bg-white/[0.045] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Need a maintainable WordPress build?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Send the project scope, site URL, or Figma file and get a practical implementation path.
            </p>
          </div>
          <a href="#contact" className="button-primary mt-5 sm:mt-0">
            Discuss Project
          </a>
        </Reveal>
      </div>
    </section>
  );
}

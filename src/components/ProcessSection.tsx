import { processSteps } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ProcessSection() {
  return (
    <section id="process" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Process"
          title="A simple delivery path from audit to launch."
          description="The workflow keeps decisions visible, code maintainable, and launch risk low for both new builds and existing WordPress platforms."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item, index) => (
            <Reveal key={item.step} delay={index * 0.06} className="h-full">
              <article className="glass-card h-full p-6">
                <span className="font-mono text-sm font-semibold text-emerald-300">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

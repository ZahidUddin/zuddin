import { BadgeCheck, GraduationCap } from "lucide-react";
import { aboutHighlights } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="About"
          title="WordPress engineering for teams that need reliable delivery."
          description="Zahid combines PHP backend depth with production CMS experience, turning design and product requirements into clean, editable, fast WordPress systems."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="glass-card p-6 sm:p-8">
            <div className="space-y-6 text-base leading-8 text-slate-300 sm:text-lg">
              <p>
                I am a Senior WordPress Developer and PHP backend engineer with
                8+ years of experience building scalable web solutions, custom
                CMS implementations, APIs, and performance-focused platforms.
              </p>
              <p>
                My strongest implementation area is WordPress theme and plugin
                engineering with Gutenberg, ACF, dynamic content architecture,
                API integrations, caching strategies, CDN integration, and Core
                Web Vitals optimization.
              </p>
            </div>
          </Reveal>

          <Reveal className="grid gap-4" delay={0.08}>
            {aboutHighlights.map((item) => (
              <div key={item} className="surface-line flex gap-4 rounded-lg p-5">
                <BadgeCheck className="mt-1 shrink-0 text-emerald-300" size={22} aria-hidden="true" />
                <p className="text-sm leading-7 text-slate-300">{item}</p>
              </div>
            ))}
            <div className="surface-line rounded-lg p-5">
              <div className="flex items-center gap-3 text-white">
                <GraduationCap size={22} className="text-amber-300" aria-hidden="true" />
                <h3 className="text-lg font-semibold">Education</h3>
              </div>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <p>B.Sc. in Computer Science, Northern University Bangladesh</p>
                <p>
                  Diploma in Computer Engineering, Ahsanullah Institute of
                  Technical and Vocational Education and Training
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

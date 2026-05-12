"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import type { ExperienceItem } from "@/data/experience";
import { SectionHeader } from "./SectionHeader";

type ExperienceTimelineProps = {
  items: ExperienceItem[];
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <section id="experience" className="section-pad">
      <div className="container-page">
        <SectionHeader
          eyebrow="Experience"
          title="Eight years of backend-focused WordPress delivery."
          description="A career path centered on custom CMS architecture, PHP engineering, performance, integrations, and production stability."
        />

        <div className="relative mt-14">
          <div
            className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-300 via-cyan-300 to-transparent md:block"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {items.map((item, index) => (
              <motion.article
                key={`${item.company}-${item.range}`}
                className="relative grid gap-4 md:grid-cols-[220px_1fr] md:pl-12"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
              >
                <motion.span
                  className="absolute left-[9px] top-7 hidden h-4 w-4 rounded-full border-2 border-ink bg-emerald-300 md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 + 0.2 }}
                  aria-hidden="true"
                />
                <div className="flex items-center gap-2 text-sm font-medium text-slate-400 md:block md:pt-6">
                  <CalendarDays size={16} className="text-emerald-300 md:mb-3" aria-hidden="true" />
                  <p>{item.range}</p>
                </div>
                <div className="glass-card p-5 sm:p-6">
                  <p className="font-mono text-sm font-semibold uppercase text-cyan-300">
                    {item.role}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{item.company}</h3>
                  <ul className="mt-5 grid gap-3 text-sm leading-7 text-slate-300">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

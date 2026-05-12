"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      className="glass-card group flex h-full flex-col overflow-hidden"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.58, delay: index * 0.045 }}
      whileHover={{ y: -8 }}
    >
      <div className="border-b border-white/10 bg-slate-950/70 p-4">
        <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" aria-hidden="true" />
            <span className="ml-2 truncate text-xs text-slate-500">{project.domain}</span>
          </div>
          <div className="space-y-2" aria-hidden="true">
            <span className="block h-3 w-2/3 rounded-full bg-emerald-300/30" />
            <span className="block h-3 w-full rounded-full bg-white/10" />
            <span className="block h-3 w-4/5 rounded-full bg-white/10" />
            <span className="block h-10 w-full rounded-lg bg-cyan-300/10" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-200">
            {project.category}
          </span>
          <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
            {project.impact}
          </span>
        </div>
        <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400"
            >
              {item}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition-colors hover:text-white"
        >
          Visit Project
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Blocks, Code2, Gauge, GitBranch, Layers3 } from "lucide-react";
import type { IconName, SkillCategory } from "@/data/skills";

const icons: Record<IconName, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  blocks: Blocks,
  gauge: Gauge,
  workflow: GitBranch
};

type SkillCardProps = {
  skill: SkillCategory;
  index: number;
};

export function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = icons[skill.icon];

  return (
    <motion.article
      className="glass-card h-full p-5 sm:p-6"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
        <Icon size={23} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-white">{skill.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-400">{skill.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {skill.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-slate-300"
          >
            {tool}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Blocks, Code2, Gauge, GitBranch, Layers3 } from "lucide-react";
import type { IconName } from "@/data/skills";
import type { Service } from "@/data/services";

const icons: Record<IconName, LucideIcon> = {
  code: Code2,
  layers: Layers3,
  blocks: Blocks,
  gauge: Gauge,
  workflow: GitBranch
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

export function ServiceCard({ service, index }: ServiceCardProps) {
  const Icon = icons[service.icon];

  return (
    <motion.article
      className="glass-card h-full p-6"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.55, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
        <Icon size={23} aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
      <ul className="mt-5 grid gap-2 text-sm text-slate-400">
        {service.outcomes.map((outcome) => (
          <li key={outcome} className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300" aria-hidden="true" />
            {outcome}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

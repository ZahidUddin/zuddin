"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { profile, socialLinks, stats } from "@/data/profile";

const socialIcon = {
  GitHub: Github,
  LinkedIn: Linkedin
};

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-28">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="pill mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald-300" aria-hidden="true" />
              Available for senior WordPress and PHP projects
            </p>
            <p className="mb-4 font-mono text-sm font-semibold uppercase text-emerald-300">
              {profile.role}
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
              {profile.name}
              <span className="block accent-text">builds fast WordPress systems.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Senior WordPress Developer with 8+ years building custom themes,
              plugins, WooCommerce platforms, headless CMS setups, REST API
              integrations, and performance-focused PHP backends.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <motion.a
                href="#projects"
                className="button-primary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                View Featured Work
                <ArrowRight size={18} aria-hidden="true" />
              </motion.a>
              <motion.a
                href={profile.cvPath}
                download
                className="button-secondary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={18} aria-hidden="true" />
                Download CV
              </motion.a>
              <motion.a
                href={`mailto:${profile.email}`}
                className="button-secondary"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
              >
                <Mail size={18} aria-hidden="true" />
                Email Me
              </motion.a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3" aria-label="Social links">
              {socialLinks.map((link) => {
                const Icon = socialIcon[link.label as keyof typeof socialIcon];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-300/40 hover:text-white"
                  >
                    <Icon size={16} aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>

            <dl className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="surface-line rounded-lg p-4">
                  <dt className="text-3xl font-semibold text-white">{stat.value}</dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-400">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.aside
            className="relative"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            aria-label="Zahid Uddin profile preview"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-glow backdrop-blur-xl">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-white/10 bg-slate-900">
                <Image
                  src={profile.portrait}
                  alt="Portrait of Zahid Uddin"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-white/10 bg-slate-950/86 p-5 font-mono text-sm text-slate-300 shadow-glass backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-amber-300" aria-hidden="true" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" aria-hidden="true" />
                <span className="ml-2 text-xs text-slate-500">profile.php</span>
              </div>
              <p>
                <span className="text-emerald-300">$role</span> = &quot;Senior WordPress Developer&quot;;
              </p>
              <p className="mt-2">
                <span className="text-cyan-300">$stack</span> = [&quot;PHP&quot;, &quot;WordPress&quot;, &quot;MySQL&quot;];
              </p>
              <p className="mt-2">
                <span className="text-amber-200">$focus</span> = &quot;performance + maintainability&quot;;
              </p>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {["Custom plugins", "Core Web Vitals"].map((item) => (
                <div key={item} className="surface-line flex items-center gap-3 rounded-lg p-4">
                  <CheckCircle2 className="text-emerald-300" size={20} aria-hidden="true" />
                  <span className="text-sm font-medium text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

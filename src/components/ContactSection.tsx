"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function ContactSection() {
  return (
    <section id="contact" className="section-pad pb-10">
      <div className="container-page">
        <SectionHeader
          eyebrow="Contact"
          title="Let us build a faster, cleaner WordPress platform."
          description="Open to collaborations on WordPress themes, plugins, WooCommerce, CMS architecture, backend integrations, and performance optimization."
        />

        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.055] shadow-glow backdrop-blur-xl">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div>
              <h3 className="text-2xl font-semibold text-white">Project-ready contact</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Share your existing website, Figma file, plugin requirements, or
                performance issue. I will respond with the clearest next step.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <motion.a
                  href={`mailto:${profile.email}?subject=WordPress%20Project%20Inquiry`}
                  className="button-primary"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Send size={18} aria-hidden="true" />
                  Send Inquiry
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
              </div>
            </div>

            <address className="grid gap-3 not-italic sm:grid-cols-2">
              <a
                href={`mailto:${profile.email}`}
                className="surface-line rounded-lg p-5 transition-colors hover:border-emerald-300/40"
              >
                <Mail className="mb-4 text-emerald-300" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">Email</span>
                <span className="mt-1 block break-words font-medium text-white">{profile.email}</span>
              </a>
              <a
                href={profile.phoneHref}
                className="surface-line rounded-lg p-5 transition-colors hover:border-emerald-300/40"
              >
                <Phone className="mb-4 text-cyan-300" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">Phone</span>
                <span className="mt-1 block font-medium text-white">{profile.phone}</span>
              </a>
              <div className="surface-line rounded-lg p-5">
                <MapPin className="mb-4 text-amber-300" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">Location</span>
                <span className="mt-1 block font-medium text-white">{profile.location}</span>
              </div>
              <div className="surface-line rounded-lg p-5">
                <ArrowUpRight className="mb-4 text-rose-300" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">Languages</span>
                <span className="mt-1 block font-medium text-white">
                  English, Bangla, Hindi, Japanese
                </span>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-line rounded-lg p-5 transition-colors hover:border-emerald-300/40"
              >
                <Github className="mb-4 text-slate-200" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">GitHub</span>
                <span className="mt-1 block font-medium text-white">github.com/ZahidUddin</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="surface-line rounded-lg p-5 transition-colors hover:border-emerald-300/40"
              >
                <Linkedin className="mb-4 text-cyan-300" size={22} aria-hidden="true" />
                <span className="block text-sm text-slate-400">LinkedIn</span>
                <span className="mt-1 block font-medium text-white">zahid-uddin-4267b816b</span>
              </a>
            </address>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

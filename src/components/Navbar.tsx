"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems, profile } from "@/data/profile";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3">
      <nav
        className="container-page flex h-16 items-center justify-between rounded-full border border-white/10 bg-ink/78 shadow-glass backdrop-blur-xl"
        aria-label="Primary navigation"
      >
        <a
          href="#hero"
          className="flex items-center gap-3 text-sm font-semibold text-white"
          aria-label="Zahid Uddin home"
          onClick={() => setIsOpen(false)}
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-black text-slate-950">
            ZU
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <motion.a
            href={profile.cvPath}
            download
            className="button-secondary px-4 py-2.5"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download size={16} aria-hidden="true" />
            CV
          </motion.a>
          <motion.a
            href="#contact"
            className="button-primary px-4 py-2.5"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Start a Project
            <ArrowUpRight size={16} aria-hidden="true" />
          </motion.a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="container-page mt-3 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            <div className="rounded-2xl border border-white/10 bg-ink/95 p-3 shadow-glass backdrop-blur-xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-2 grid gap-2 border-t border-white/10 pt-3 sm:grid-cols-2">
                <a
                  href={profile.cvPath}
                  download
                  className="button-secondary"
                  onClick={() => setIsOpen(false)}
                >
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="button-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Start a Project
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

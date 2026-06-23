import { motion } from "framer-motion";
import { ExternalLink, Heart, Code2, Shield, Star, Package } from "lucide-react";

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

const DEVELOPERS = [
  {
    name: "ElectroIoT",
    role: "Lead Developer",
    github: "ElectroIoT",
    email: "electroiot.in@gmail.com",
    avatar: "https://github.com/ElectroIoT.png",
    bio: "IoT enthusiast, ESP32 hacker, open-source builder.",
    color: "green",
    badge: "Lead Dev",
  },
  {
    name: "Manoranjan",
    role: "Co-Developer",
    github: "manoranjan2050",
    email: "manoranjan2050@live.com",
    avatar: "https://github.com/manoranjan2050.png",
    bio: "Embedded systems developer and firmware engineer.",
    color: "cyan",
    badge: "Co-Dev",
  },
];

const DEPS = [
  { name: "Tauri 2",          desc: "Native desktop shell (Rust)",         license: "MIT / Apache-2.0", url: "https://tauri.app" },
  { name: "React 19",         desc: "UI framework",                        license: "MIT",              url: "https://react.dev" },
  { name: "TypeScript",       desc: "Type-safe JavaScript",                license: "Apache-2.0",       url: "https://typescriptlang.org" },
  { name: "Tailwind CSS v4",  desc: "Utility-first CSS",                   license: "MIT",              url: "https://tailwindcss.com" },
  { name: "Framer Motion",    desc: "Animation library",                   license: "MIT",              url: "https://www.framer.com/motion" },
  { name: "Zustand",          desc: "State management",                    license: "MIT",              url: "https://github.com/pmndrs/zustand" },
  { name: "React Router v6",  desc: "Client-side routing",                 license: "MIT",              url: "https://reactrouter.com" },
  { name: "Lucide React",     desc: "Icon library",                        license: "ISC",              url: "https://lucide.dev" },
  { name: "Vite 7",           desc: "Build tool & dev server",             license: "MIT",              url: "https://vitejs.dev" },
  { name: "esptool.py",       desc: "ESP chip flash tool by Espressif",    license: "GPL-2.0",          url: "https://github.com/espressif/esptool" },
  { name: "clsx",             desc: "Class name utility",                  license: "MIT",              url: "https://github.com/lukeed/clsx" },
  { name: "tailwind-merge",   desc: "Tailwind class merging",              license: "MIT",              url: "https://github.com/dcastil/tailwind-merge" },
];

const BADGE_COLOR: Record<string, string> = {
  green: "bg-green-500/10 text-green-400 border-green-500/30",
  cyan:  "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
};

const CARD_COLOR: Record<string, string> = {
  green: "border-green-500/25",
  cyan:  "border-cyan-500/25",
};

export default function About() {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Heart size={22} className="text-red-400" /> About & Credits
        </h1>
        <p className="text-sm text-slate-500 mt-1">FirmFlow FlashKit — Open-source ESP firmware manager</p>
      </motion.div>

      {/* App identity card */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass rounded-xl p-6 border border-green-500/20 flex flex-col sm:flex-row gap-5 items-center sm:items-start">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center text-3xl glow-green shrink-0">
          ⚡
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-white">FirmFlow FlashKit</h2>
          <p className="text-green-400 font-mono text-sm mt-0.5">Version 1.0.0</p>
          <p className="text-slate-400 text-sm mt-2 max-w-lg">
            A professional, beautiful desktop application for flashing, backing up, and managing
            ESP32 / ESP8266 devices. Built with modern web tech wrapped in a native Tauri shell.
          </p>
          <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
            {["ESP32", "ESP8266", "ESP32-S3", "ESP32-C3"].map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">{c}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Open source declaration */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5 border border-amber-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Shield size={16} className="text-amber-400" />
          <h2 className="text-sm font-semibold text-white">Open Source Declaration</h2>
          <span className="ml-auto px-2 py-0.5 rounded-full text-[10px] border bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono">MIT License</span>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          FirmFlow FlashKit is <span className="text-white font-medium">free and open-source software</span> released
          under the <span className="text-amber-400 font-mono">MIT License</span>. You are free to use, copy,
          modify, merge, publish, distribute, sublicense, and/or sell copies of this software, provided the
          original copyright notice and this permission notice appear in all copies.
        </p>
        <div className="mt-4 p-3 rounded-lg bg-[#060c17] border border-[#1c2845] font-mono text-xs text-slate-500 leading-relaxed">
          Copyright © 2026 ElectroIoT &amp; Manoranjan<br/>
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software...<br/>
          <button onClick={() => openUrl("https://github.com/ElectroIoT/FirmFlow-FlashKit/blob/master/LICENSE")}
            className="text-green-400 hover:text-green-300 mt-1 flex items-center gap-1">
            Read full MIT License <ExternalLink size={10} />
          </button>
        </div>
      </motion.div>

      {/* Developers */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <div className="flex items-center gap-2 mb-3">
          <Code2 size={15} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest font-mono">Developers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DEVELOPERS.map((dev, i) => (
            <motion.div key={dev.github}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}
              className={`glass rounded-xl p-5 border ${CARD_COLOR[dev.color]}`}>
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <img src={dev.avatar} alt={dev.name} onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${dev.name}&background=1c2845&color=4ade80&size=64`; }}
                    className="w-14 h-14 rounded-xl object-cover border-2 border-[#1c2845]" />
                  <span className={`absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono border ${BADGE_COLOR[dev.color]}`}>
                    {dev.badge}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{dev.name}</p>
                  <p className={`text-xs font-mono mt-0.5 ${dev.color === "green" ? "text-green-400" : "text-cyan-400"}`}>{dev.role}</p>
                  <p className="text-xs text-slate-500 mt-1.5 leading-snug">{dev.bio}</p>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => openUrl(`https://github.com/${dev.github}`)}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${BADGE_COLOR[dev.color]} hover:opacity-80`}>
                      <ExternalLink size={11} /> GitHub
                    </button>
                    <button onClick={() => openUrl(`mailto:${dev.email}`)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-[#1c2845] text-slate-400 hover:text-white transition-colors">
                      ✉ Email
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Open source credits */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="glass rounded-xl border border-[#1c2845] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-4 border-b border-[#1c2845]">
          <Package size={15} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-white">Open Source Libraries Used</h2>
          <span className="ml-auto text-xs text-slate-600">{DEPS.length} packages</span>
        </div>
        <div className="divide-y divide-[#1c2845]">
          {DEPS.map((dep) => (
            <motion.button key={dep.name} whileHover={{ backgroundColor: "rgba(255,255,255,0.02)" }}
              onClick={() => openUrl(dep.url)}
              className="w-full flex items-center gap-4 px-5 py-3 text-left transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-200 font-medium">{dep.name}</span>
                  <ExternalLink size={10} className="text-slate-600" />
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{dep.desc}</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-[#1c2845] text-slate-400 shrink-0">{dep.license}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Star / contribute CTA */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
        className="glass rounded-xl p-5 border border-[#1c2845] flex flex-col sm:flex-row items-center gap-4">
        <Star size={20} className="text-amber-400 shrink-0" />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm font-semibold text-white">Like this project?</p>
          <p className="text-xs text-slate-500 mt-0.5">Star it on GitHub, report issues, or contribute code!</p>
        </div>
        <div className="flex gap-3">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => openUrl("https://github.com/ElectroIoT/FirmFlow-FlashKit")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 transition-colors">
            <Star size={14} /> Star on GitHub
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => openUrl("https://github.com/ElectroIoT/FirmFlow-FlashKit/issues")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium glass border border-[#1c2845] text-slate-400 hover:text-white transition-colors">
            <ExternalLink size={14} /> Issues
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

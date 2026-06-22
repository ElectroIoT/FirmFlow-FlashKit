import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Cpu, Terminal, DownloadCloud, UploadCloud,
  ClipboardList, Settings, HardDrive, Activity,
} from "lucide-react";

const nav = [
  { to: "/", icon: Activity, label: "Dashboard" },
  { to: "/flash", icon: Zap, label: "Flash" },
  { to: "/backup", icon: DownloadCloud, label: "Backup" },
  { to: "/restore", icon: UploadCloud, label: "Restore" },
  { to: "/serial", icon: Terminal, label: "Serial Monitor" },
  { to: "/partitions", icon: HardDrive, label: "Partitions" },
  { to: "/history", icon: ClipboardList, label: "History" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-16 lg:w-56 h-full bg-[#0a0f1a] border-r border-[#1c2845] shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1c2845]">
        <div className="relative flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center glow-green">
            <Cpu size={16} className="text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full pulse-dot" />
        </div>
        <div className="hidden lg:block">
          <p className="text-sm font-bold text-white leading-none">FirmFlow</p>
          <p className="text-[10px] text-green-400 font-mono mt-0.5 text-glow-green">FlashKit v1.0</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.97 }}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
                  isActive
                    ? "bg-green-500/10 border border-green-500/30 text-green-400 glow-green"
                    : "text-slate-400 hover:bg-[#1c2845] hover:text-slate-200",
                ].join(" ")}
              >
                <Icon size={17} className="shrink-0" />
                <span className="hidden lg:block text-sm font-medium">{label}</span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-green-400"
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom chip info */}
      <div className="hidden lg:block px-4 py-4 border-t border-[#1c2845]">
        <div className="glass rounded-lg p-3 space-y-1">
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">esptool.py</p>
          <p className="text-xs text-green-400 font-mono">v4.8.1 ready</p>
        </div>
      </div>
    </aside>
  );
}

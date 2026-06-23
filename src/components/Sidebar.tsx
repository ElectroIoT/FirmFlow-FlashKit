import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap, Cpu, Terminal, DownloadCloud, UploadCloud,
  ClipboardList, Settings, HardDrive, Activity, Usb, Heart,
} from "lucide-react";

const NAV_MAIN = [
  { to: "/",          icon: Activity,     label: "Dashboard"     },
  { to: "/flash",     icon: Zap,          label: "Flash"         },
  { to: "/backup",    icon: DownloadCloud,label: "Backup"        },
  { to: "/restore",   icon: UploadCloud,  label: "Restore"       },
  { to: "/serial",    icon: Terminal,     label: "Serial Monitor"},
  { to: "/partitions",icon: HardDrive,    label: "Partitions"    },
  { to: "/history",   icon: ClipboardList,label: "History"       },
];

const NAV_BOTTOM = [
  { to: "/drivers",  icon: Usb,     label: "USB Drivers"  },
  { to: "/settings", icon: Settings,label: "Settings"     },
  { to: "/about",    icon: Heart,   label: "About"        },
];

const DEVS = [
  { name: "ElectroIoT", github: "ElectroIoT",    role: "Dev",    color: "border-green-500/40" },
  { name: "Manoranjan",  github: "manoranjan2050", role: "Co-Dev", color: "border-cyan-500/40"  },
];

function NavItem({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) {
  return (
    <NavLink to={to} end={to === "/"}>
      {({ isActive }) => (
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.97 }}
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
            <motion.div layoutId="nav-indicator"
              className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
          )}
        </motion.div>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="flex flex-col w-16 lg:w-56 h-full bg-[#0a0f1a] border-r border-[#1c2845] shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#1c2845]">
        <div className="relative shrink-0">
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

      {/* Main nav */}
      <nav className="flex-1 py-3 space-y-0.5 px-2 overflow-y-auto">
        {NAV_MAIN.map(item => <NavItem key={item.to} {...item} />)}

        {/* Divider */}
        <div className="hidden lg:block mx-3 my-3 border-t border-[#1c2845]" />
        <div className="lg:hidden my-2 mx-2 border-t border-[#1c2845]" />

        {NAV_BOTTOM.map(item => <NavItem key={item.to} {...item} />)}
      </nav>

      {/* Developer avatars */}
      <div className="hidden lg:block px-4 py-3 border-t border-[#1c2845]">
        <p className="text-[9px] text-slate-600 uppercase tracking-widest font-mono mb-2">Developers</p>
        <div className="space-y-2">
          {DEVS.map(dev => (
            <a key={dev.github} href={`https://github.com/${dev.github}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 group">
              <img
                src={`https://github.com/${dev.github}.png?size=32`}
                alt={dev.name}
                onError={(e) => { (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${dev.name}&background=1c2845&color=4ade80&size=32`; }}
                className={`w-7 h-7 rounded-full border-2 ${dev.color} object-cover group-hover:scale-110 transition-transform`}
              />
              <div className="min-w-0">
                <p className="text-xs text-slate-300 group-hover:text-white transition-colors leading-none">{dev.name}</p>
                <p className="text-[9px] text-slate-600 mt-0.5">{dev.role}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* esptool badge */}
      <div className="hidden lg:block px-4 py-3 border-t border-[#1c2845]">
        <div className="glass rounded-lg p-2.5 space-y-0.5">
          <p className="text-[9px] text-slate-600 font-mono uppercase tracking-widest">esptool.py</p>
          <p className="text-xs text-green-400 font-mono">v4.8.1 ready</p>
        </div>
      </div>
    </aside>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Save } from "lucide-react";

type Toggle = { label: string; desc: string; key: string };
const TOGGLES: Toggle[] = [
  { label: "Auto-scroll serial", desc: "Keep terminal pinned to latest output", key: "autoScroll" },
  { label: "Show timestamps", desc: "Prefix each log line with time", key: "timestamps" },
  { label: "Verify after flash", desc: "Read-back verify firmware after writing", key: "verify" },
  { label: "Compress output", desc: "Use esptool compression for faster transfer", key: "compress" },
  { label: "Remember last port", desc: "Auto-select previously used port on launch", key: "rememberPort" },
];

export default function Settings() {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    autoScroll: true, timestamps: true, verify: false, compress: true, rememberPort: true,
  });
  const [esptoolPath, setEsptoolPath] = useState("esptool.py");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <SettingsIcon size={22} className="text-slate-400" /> Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">Configure FirmFlow FlashKit behavior</p>
      </motion.div>

      {/* esptool path */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5 border border-[#1c2845]"
      >
        <h2 className="text-sm font-semibold text-white mb-4">esptool Configuration</h2>
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-widest font-mono block mb-2">esptool.py path</label>
          <input
            value={esptoolPath}
            onChange={(e) => setEsptoolPath(e.target.value)}
            className="w-full glass rounded-lg px-4 py-2.5 text-sm font-mono text-slate-200 outline-none border border-[#1c2845] focus:border-green-500/40 transition-colors bg-transparent"
          />
          <p className="text-xs text-slate-600 mt-1.5">Full path or "esptool.py" if it's in your PATH</p>
        </div>
      </motion.div>

      {/* Toggles */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="glass rounded-xl p-5 border border-[#1c2845] space-y-1"
      >
        <h2 className="text-sm font-semibold text-white mb-4">Preferences</h2>
        {TOGGLES.map(({ label, desc, key }) => (
          <div key={key} className="flex items-center justify-between py-3 border-b border-[#1c2845] last:border-0">
            <div>
              <p className="text-sm text-slate-200">{label}</p>
              <p className="text-xs text-slate-600 mt-0.5">{desc}</p>
            </div>
            <button
              onClick={() => setSettings((s) => ({ ...s, [key]: !s[key] }))}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${
                settings[key] ? "bg-green-500" : "bg-[#1c2845]"
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                settings[key] ? "translate-x-5" : "translate-x-0"
              }`} />
            </button>
          </div>
        ))}
      </motion.div>

      {/* About */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-xl p-5 border border-[#1c2845]"
      >
        <h2 className="text-sm font-semibold text-white mb-3">About</h2>
        <div className="space-y-1.5 font-mono text-xs text-slate-500">
          <div className="flex justify-between"><span>App</span><span className="text-slate-300">FirmFlow FlashKit</span></div>
          <div className="flex justify-between"><span>Version</span><span className="text-green-400">1.0.0</span></div>
          <div className="flex justify-between"><span>esptool.py</span><span className="text-slate-300">v4.8.1</span></div>
          <div className="flex justify-between"><span>Framework</span><span className="text-slate-300">Tauri 2 + React</span></div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        onClick={save}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${
          saved
            ? "bg-green-500/20 border border-green-500/40 text-green-400"
            : "bg-[#1c2845] border border-[#243055] text-slate-300 hover:border-green-500/30 hover:text-white"
        }`}
      >
        <Save size={16} />
        {saved ? "Saved!" : "Save Settings"}
      </motion.button>
    </div>
  );
}

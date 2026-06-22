import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DownloadCloud, HardDrive, CheckCircle2 } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

export default function Backup() {
  const { device, addLog } = useFlashStore();
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [filename, setFilename] = useState("backup_firmware.bin");

  const startBackup = () => {
    if (!device) return;
    setRunning(true);
    setProgress(0);
    setDone(false);
    addLog("info", `Starting backup from ${device.port}...`);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 3 + 0.5;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setRunning(false);
        setDone(true);
        addLog("success", `Backup complete: ${filename} (${device.flashSize})`);
      }
      setProgress(Math.min(p, 100));
    }, 80);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <DownloadCloud size={22} className="text-cyan-400" /> Backup Firmware
        </h1>
        <p className="text-sm text-slate-500 mt-1">Read and save the current flash contents to a .bin file</p>
      </motion.div>

      {/* Device summary */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5 border border-cyan-500/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <HardDrive size={16} className="text-cyan-400" />
          <h2 className="text-sm font-semibold text-white">Source Device</h2>
        </div>
        {device ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[["Chip", device.chip], ["Flash Size", device.flashSize], ["MAC", device.mac], ["Port", device.port]].map(([k, v]) => (
              <div key={k} className="glass rounded-lg p-3 border border-[#1c2845]">
                <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">{k}</p>
                <p className="text-sm text-cyan-400 font-mono">{v}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No device connected — connect first</p>
        )}
      </motion.div>

      {/* Filename */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="glass rounded-xl p-5 border border-[#1c2845]"
      >
        <label className="text-xs text-slate-500 uppercase tracking-widest font-mono block mb-2">Output filename</label>
        <div className="flex gap-3">
          <input
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="flex-1 glass rounded-lg px-4 py-2.5 text-sm font-mono text-slate-200 outline-none border border-[#1c2845] focus:border-cyan-500/40 transition-colors bg-transparent"
          />
          <button
            onClick={() => setFilename(`backup_${device?.chip ?? "esp"}_${Date.now()}.bin`)}
            className="px-3 py-2 rounded-lg text-xs glass border border-[#1c2845] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Auto-name
          </button>
        </div>
      </motion.div>

      {/* Progress */}
      <AnimatePresence>
        {(running || progress > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-5 border border-cyan-500/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-mono text-cyan-400">{running ? "Reading flash..." : "Complete"}</span>
              <span className="text-sm font-mono text-white">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="rounded-xl p-4 border bg-cyan-500/10 border-cyan-500/30 flex items-center gap-3"
          >
            <CheckCircle2 size={20} className="text-cyan-400" />
            <span className="text-sm font-mono text-cyan-300">Backup saved: {filename}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        disabled={!device || running}
        onClick={startBackup}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-cyan-600 to-blue-500 text-white
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:from-cyan-500 hover:to-cyan-400 transition-all glow-cyan"
      >
        <DownloadCloud size={16} />
        {running ? "Backing up..." : "Start Backup"}
      </motion.button>
    </div>
  );
}

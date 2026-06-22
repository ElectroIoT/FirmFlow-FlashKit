import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileCode, X, CheckCircle2 } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";
import { formatBytes } from "../lib/utils";

export default function Restore() {
  const { device, addLog } = useFlashStore();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setDone(false);
    addLog("info", `Restore image loaded: ${f.name} (${formatBytes(f.size)})`);
  };

  const startRestore = () => {
    if (!file || !device) return;
    setRunning(true);
    setProgress(0);
    setDone(false);
    addLog("info", `Restoring ${file.name} → ${device.port}`);
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 2.5 + 0.5;
      if (p >= 100) {
        p = 100;
        clearInterval(t);
        setRunning(false);
        setDone(true);
        addLog("success", "Restore complete — device rebooting");
      }
      setProgress(Math.min(p, 100));
    }, 100);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <UploadCloud size={22} className="text-purple-400" /> Restore Firmware
        </h1>
        <p className="text-sm text-slate-500 mt-1">Write a full backup image back to your device</p>
      </motion.div>

      {/* Drop zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        onClick={() => fileRef.current?.click()}
        className="relative rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 border-[#1c2845] hover:border-purple-500/40 hover:bg-purple-500/5"
      >
        <input ref={fileRef} type="file" accept=".bin" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        {file ? (
          <div>
            <FileCode size={36} className="text-purple-400 mx-auto mb-3" />
            <p className="text-purple-300 font-mono">{file.name}</p>
            <p className="text-sm text-slate-500 mt-1">{formatBytes(file.size)}</p>
            <button className="mt-3 text-xs text-red-400 flex items-center gap-1 mx-auto"
              onClick={(e) => { e.stopPropagation(); setFile(null); setDone(false); }}>
              <X size={12} /> Remove
            </button>
          </div>
        ) : (
          <div>
            <UploadCloud size={36} className="text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Select backup .bin file</p>
            <p className="text-slate-600 text-sm mt-1">Click to browse</p>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {(running || progress > 0) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-5 border border-purple-500/20"
          >
            <div className="flex justify-between mb-3">
              <span className="text-sm font-mono text-purple-400">{running ? "Restoring..." : "Complete"}</span>
              <span className="text-sm font-mono text-white">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.2 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="rounded-xl p-4 border bg-purple-500/10 border-purple-500/30 flex items-center gap-3"
          >
            <CheckCircle2 size={20} className="text-purple-400" />
            <span className="text-sm font-mono text-purple-300">Restore complete! Device is rebooting.</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        disabled={!file || !device || running}
        onClick={startRestore}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-purple-600 to-pink-500 text-white
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:from-purple-500 hover:to-pink-400 transition-all"
      >
        <UploadCloud size={16} />
        {running ? "Restoring..." : "Restore Firmware"}
      </motion.button>
    </div>
  );
}

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Upload, FileCode, X, CheckCircle2, AlertTriangle, ChevronDown } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";
import { formatBytes } from "../lib/utils";

const FLASH_MODES = ["dio", "dout", "qio", "qout"];
const FLASH_FREQS = ["40m", "80m", "26m", "20m"];
const FLASH_SIZES = ["detect", "256KB", "512KB", "1MB", "2MB", "4MB", "8MB", "16MB"];

export default function Flash() {
  const {
    device, firmwareFile, flashProgress, flashing, erasing,
    setFirmwareFile, setFlashProgress, setFlashing, setErasing, addLog, addHistoryJob,
  } = useFlashStore();

  const [dragging, setDragging] = useState(false);
  const [flashMode, setFlashMode] = useState("dio");
  const [flashFreq, setFlashFreq] = useState("40m");
  const [flashSize, setFlashSize] = useState("detect");
  const [offset, setOffset] = useState("0x0");
  const [done, setDone] = useState<"success" | "error" | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".bin")) {
      addLog("error", "Only .bin firmware files are supported");
      return;
    }
    setFirmwareFile(file);
    setDone(null);
    addLog("info", `Loaded: ${file.name} (${formatBytes(file.size)})`);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  const startFlash = () => {
    if (!firmwareFile) return;
    setFlashing(true);
    setFlashProgress(0);
    setDone(null);
    addLog("info", `Starting flash: ${firmwareFile.name}`);
    addLog("info", `Mode: ${flashMode} | Freq: ${flashFreq} | Size: ${flashSize} | Offset: ${offset}`);

    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        const success = Math.random() > 0.1;
        setFlashProgress(100);
        setFlashing(false);
        setDone(success ? "success" : "error");
        addLog(success ? "success" : "error", success ? "Flash complete! Device booting..." : "Flash failed: write error at 0x3F000");
        addHistoryJob({
          id: Date.now().toString(),
          file: firmwareFile.name,
          chip: device?.chip ?? "Unknown",
          date: new Date().toLocaleString(),
          status: success ? "success" : "failed",
          size: formatBytes(firmwareFile.size),
        });
      }
      setFlashProgress(Math.min(p, 100));
    }, 120);
  };

  const startErase = () => {
    setErasing(true);
    addLog("warn", "Erasing flash chip...");
    setTimeout(() => {
      setErasing(false);
      addLog("success", "Erase complete");
    }, 3000);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap size={22} className="text-green-400" /> Flash Firmware
        </h1>
        <p className="text-sm text-slate-500 mt-1">Upload .bin firmware to your ESP device</p>
      </motion.div>

      {/* Drop zone */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => fileRef.current?.click()}
        className={[
          "relative rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300",
          dragging
            ? "border-green-400 bg-green-500/10 glow-green scale-[1.01]"
            : firmwareFile
            ? "border-green-500/40 bg-green-500/5"
            : "border-[#1c2845] hover:border-green-500/30 hover:bg-green-500/5",
        ].join(" ")}
      >
        <input ref={fileRef} type="file" accept=".bin" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <AnimatePresence mode="wait">
          {firmwareFile ? (
            <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <FileCode size={36} className="text-green-400 mx-auto mb-3" />
              <p className="text-green-300 font-mono font-medium">{firmwareFile.name}</p>
              <p className="text-sm text-slate-500 mt-1">{formatBytes(firmwareFile.size)}</p>
              <button
                className="mt-3 text-xs text-red-400 hover:text-red-300 flex items-center gap-1 mx-auto"
                onClick={(e) => { e.stopPropagation(); setFirmwareFile(null); setDone(null); }}
              >
                <X size={12} /> Remove
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Upload size={36} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 font-medium">Drop .bin file here</p>
              <p className="text-slate-600 text-sm mt-1">or click to browse</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Options */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-xl p-5 border border-[#1c2845]"
      >
        <h2 className="text-sm font-semibold text-white mb-4">Flash Options</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Flash Mode", value: flashMode, set: setFlashMode, opts: FLASH_MODES },
            { label: "Flash Freq", value: flashFreq, set: setFlashFreq, opts: FLASH_FREQS },
            { label: "Flash Size", value: flashSize, set: setFlashSize, opts: FLASH_SIZES },
          ].map(({ label, value, set, opts }) => (
            <div key={label}>
              <label className="text-xs text-slate-500 uppercase tracking-widest font-mono block mb-1.5">{label}</label>
              <div className="relative">
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none appearance-none cursor-pointer border border-[#1c2845] hover:border-green-500/30 transition-colors"
                >
                  {opts.map((o) => <option key={o} value={o} className="bg-[#0f1729]">{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2.5 top-3 text-slate-500 pointer-events-none" />
              </div>
            </div>
          ))}
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest font-mono block mb-1.5">Flash Offset</label>
            <input
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
              className="w-full glass rounded-lg px-3 py-2 text-sm text-slate-200 outline-none border border-[#1c2845] hover:border-green-500/30 focus:border-green-500/50 transition-colors font-mono bg-transparent"
            />
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <AnimatePresence>
        {(flashing || flashProgress > 0) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-5 border border-green-500/20"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-mono text-green-400">
                {flashing ? "Writing..." : "Complete"}
              </span>
              <span className="text-sm font-mono text-white">{flashProgress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                animate={{ width: `${flashProgress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500 font-mono">
              <span>0x00000</span>
              <span>{flashProgress < 100 ? `~${Math.ceil((100 - flashProgress) * 0.8)}s remaining` : "Done"}</span>
              <span>0x{(0x400000).toString(16).toUpperCase()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Done banner */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className={`rounded-xl p-4 border flex items-center gap-3 ${
              done === "success"
                ? "bg-green-500/10 border-green-500/30 text-green-300"
                : "bg-red-500/10 border-red-500/30 text-red-300"
            }`}
          >
            {done === "success"
              ? <CheckCircle2 size={20} className="text-green-400 shrink-0" />
              : <AlertTriangle size={20} className="text-red-400 shrink-0" />}
            <span className="text-sm font-mono">
              {done === "success" ? "Flash successful! Device is booting." : "Flash failed. Check logs for details."}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex gap-3"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!firmwareFile || flashing || erasing || !device}
          onClick={startFlash}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm
            bg-gradient-to-r from-green-600 to-green-500 text-white
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:from-green-500 hover:to-cyan-500 transition-all glow-green"
        >
          <Zap size={16} />
          {flashing ? "Flashing..." : "Flash Firmware"}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={flashing || erasing || !device}
          onClick={startErase}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm
            bg-red-500/10 border border-red-500/30 text-red-400
            disabled:opacity-40 disabled:cursor-not-allowed
            hover:bg-red-500/20 transition-all"
        >
          {erasing ? "Erasing..." : "Erase Flash"}
        </motion.button>
      </motion.div>

      {!device && (
        <p className="text-xs text-amber-400/70 text-center font-mono">
          ⚠ Connect a device first to enable flashing
        </p>
      )}
    </div>
  );
}

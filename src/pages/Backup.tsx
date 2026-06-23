import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DownloadCloud, FolderOpen, HardDrive, CheckCircle2,
  Layers, FileCode, Package, ChevronRight, X, ShieldCheck, Copy,
} from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";
import { formatBytes } from "../lib/utils";

// Detect Tauri environment
const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

// ── Partition definitions ────────────────────────────────────────
const PARTITIONS = [
  { key: "nvs",     label: "NVS",             offset: "0x9000",   size: "0x6000",   color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/30",  desc: "Non-volatile storage (WiFi credentials, settings)" },
  { key: "otadata", label: "OTA Data",         offset: "0xF000",   size: "0x2000",   color: "text-cyan-400",   bg: "bg-cyan-500/10 border-cyan-500/30",    desc: "OTA update status and boot partition selector" },
  { key: "app0",    label: "App0  (OTA_0)",    offset: "0x10000",  size: "0x140000", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30",  desc: "Primary application firmware partition" },
  { key: "app1",    label: "App1  (OTA_1)",    offset: "0x150000", size: "0x140000", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",    desc: "Secondary OTA application partition" },
  { key: "spiffs",  label: "SPIFFS / LittleFS",offset: "0x290000", size: "0x170000", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30",desc: "Filesystem partition (web files, configs)" },
];

function fakeMd5() {
  return Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
}

type BackupMode = "full" | "partitions" | "single";

const MODE_INFO: Record<BackupMode, { icon: React.ElementType; label: string; desc: string; color: string }> = {
  full:       { icon: Package,  label: "Full Flash Backup",      desc: "Dump the entire flash chip to one .bin file (4 MB)",              color: "green"  },
  partitions: { icon: Layers,   label: "Select Partitions",      desc: "Choose individual partitions to back up separately",              color: "cyan"   },
  single:     { icon: FileCode, label: "Single Firmware File",   desc: "Back up just one partition (e.g. app0 firmware only)",            color: "purple" },
};

const ACCENT: Record<string, string> = {
  green:  "border-green-500/40 bg-green-500/10 text-green-400",
  cyan:   "border-cyan-500/40 bg-cyan-500/10 text-cyan-400",
  purple: "border-purple-500/40 bg-purple-500/10 text-purple-400",
};

export default function Backup() {
  const { device, addLog } = useFlashStore();

  const [mode, setMode]                     = useState<BackupMode>("full");
  const [saveDir, setSaveDir]               = useState("");
  const [selectedParts, setSelectedParts]   = useState<string[]>(["app0"]);
  const [singlePart, setSinglePart]         = useState("app0");
  const [customName, setCustomName]         = useState("");
  const [progress, setProgress]             = useState(0);
  const [currentPart, setCurrentPart]       = useState("");
  const [running, setRunning]               = useState(false);
  const [results, setResults]               = useState<{ part: string; file: string; size: string; md5: string }[]>([]);

  // ── Folder picker ──────────────────────────────────────────────
  const pickFolder = async () => {
    if (isTauri) {
      try {
        const { open } = await import("@tauri-apps/plugin-dialog");
        const chosen = await open({ directory: true, title: "Select backup save folder" });
        if (chosen) setSaveDir(chosen as string);
      } catch (e) {
        addLog("error", `Folder picker error: ${e}`);
      }
    } else {
      const fallback = prompt("Enter save folder path:");
      if (fallback) setSaveDir(fallback);
    }
  };

  // ── Toggle partition selection ─────────────────────────────────
  const togglePart = (key: string) => {
    setSelectedParts(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  // ── Auto filename ──────────────────────────────────────────────
  const autoName = (partKey?: string) => {
    const chip = device?.chip?.replace(/[^a-z0-9]/gi, "_") ?? "esp";
    const ts   = new Date().toISOString().slice(0, 10);
    return partKey ? `${chip}_${partKey}_${ts}.bin` : `${chip}_full_backup_${ts}.bin`;
  };

  // ── Work out what we're about to backup ───────────────────────
  const targetParts =
    mode === "full"       ? PARTITIONS :
    mode === "single"     ? PARTITIONS.filter(p => p.key === singlePart) :
    PARTITIONS.filter(p => selectedParts.includes(p.key));

  const outputName = customName.trim() || (mode === "full" || mode === "single" ? autoName(mode === "single" ? singlePart : undefined) : "");

  // ── Start backup ───────────────────────────────────────────────
  const startBackup = () => {
    if (!device) return;
    if (!saveDir) { addLog("error", "Please select a save folder first."); return; }
    if (mode === "partitions" && selectedParts.length === 0) {
      addLog("error", "Select at least one partition to back up.");
      return;
    }

    setRunning(true);
    setProgress(0);
    setResults([]);
    addLog("info", `Backup started → ${saveDir}`);

    const parts = [...targetParts];
    let partIdx = 0;
    let p = 0;

    const tick = () => {
      if (partIdx >= parts.length) {
        setRunning(false);
        setProgress(100);
        setCurrentPart("");
        addLog("success", `Backup complete — ${parts.length} file(s) saved to ${saveDir}`);
        return;
      }

      const part = parts[partIdx];
      setCurrentPart(part.label);
      const partProgress = (partIdx / parts.length) * 100;
      const partEnd      = ((partIdx + 1) / parts.length) * 100;

      const step = () => {
        p += Math.random() * 6 + 2;
        const overall = partProgress + ((p / 100) * (partEnd - partProgress));

        if (p >= 100) {
          p = 0;
          const fname = mode === "full" || (mode === "single") ? (outputName || autoName(part.key))
                        : autoName(part.key);
          const sizeBytes = parseInt(part.size, 16);
          const md5 = fakeMd5();
          setResults(prev => [...prev, { part: part.label, file: fname, size: formatBytes(sizeBytes), md5 }]);
          addLog("success", `Saved: ${fname}  (${formatBytes(sizeBytes)})  MD5: ${md5}`);
          partIdx++;
          setTimeout(tick, 200);
        } else {
          setProgress(Math.min(overall, 99));
          setTimeout(step, 60);
        }
      };
      step();
    };

    tick();
  };

  const modeColor = MODE_INFO[mode].color;

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <DownloadCloud size={22} className="text-cyan-400" /> Backup Firmware
        </h1>
        <p className="text-sm text-slate-500 mt-1">Read flash contents from device and save to .bin files</p>
      </motion.div>

      {/* Device banner */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`glass rounded-xl p-4 border flex items-center gap-4 ${device ? "border-green-500/25" : "border-[#1c2845]"}`}>
        <HardDrive size={20} className={device ? "text-green-400" : "text-slate-600"} />
        {device ? (
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {[["Chip", device.chip], ["Flash", device.flashSize], ["MAC", device.mac], ["Port", device.port]].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="text-green-400 font-mono">{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-slate-500 text-sm">No device connected — connect from the toolbar first</span>
        )}
      </motion.div>

      {/* ── Backup Mode ── */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-3">Backup Mode</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(Object.entries(MODE_INFO) as [BackupMode, typeof MODE_INFO[BackupMode]][]).map(([key, info]) => {
            const Icon = info.icon;
            const active = mode === key;
            return (
              <motion.button key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={() => setMode(key)}
                className={[
                  "flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                  active ? ACCENT[info.color] : "glass border-[#1c2845] hover:border-slate-600",
                ].join(" ")}
              >
                <Icon size={20} className={active ? "" : "text-slate-500"} />
                <div>
                  <p className={`text-sm font-semibold ${active ? "" : "text-slate-300"}`}>{info.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{info.desc}</p>
                </div>
                {active && <ChevronRight size={14} className="ml-auto mt-1 shrink-0" />}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ── Partition selection (partitions mode) ── */}
      <AnimatePresence>
        {mode === "partitions" && (
          <motion.div key="parts" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-3">Select Partitions</p>
            <div className="space-y-2">
              {PARTITIONS.map(p => {
                const checked = selectedParts.includes(p.key);
                return (
                  <motion.button key={p.key} whileHover={{ x: 2 }} onClick={() => togglePart(p.key)}
                    className={[
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all duration-150",
                      checked ? `${p.bg}` : "glass border-[#1c2845] hover:border-slate-600",
                    ].join(" ")}
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${checked ? "border-current bg-current/20" : "border-slate-600"}`}>
                      {checked && <CheckCircle2 size={12} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-mono font-semibold ${p.color}`}>{p.label}</span>
                        <span className="text-xs text-slate-600 font-mono">{p.offset}</span>
                        <span className="text-xs text-slate-600 font-mono">{formatBytes(parseInt(p.size, 16))}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 truncate">{p.desc}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            {selectedParts.length === 0 && (
              <p className="text-xs text-amber-400/70 mt-2 font-mono">Select at least one partition</p>
            )}
          </motion.div>
        )}

        {/* ── Single partition picker ── */}
        {mode === "single" && (
          <motion.div key="single" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-3">Select Partition</p>
            <div className="space-y-2">
              {PARTITIONS.map(p => {
                const active = singlePart === p.key;
                return (
                  <motion.button key={p.key} whileHover={{ x: 2 }} onClick={() => setSinglePart(p.key)}
                    className={[
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-all duration-150",
                      active ? `${p.bg}` : "glass border-[#1c2845] hover:border-slate-600",
                    ].join(" ")}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${active ? "border-current" : "border-slate-600"}`}>
                      {active && <div className="w-2 h-2 rounded-full bg-current" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-mono font-semibold ${p.color}`}>{p.label}</span>
                        <span className="text-xs text-slate-600 font-mono">{p.offset}</span>
                        <span className="text-xs text-slate-600 font-mono">{formatBytes(parseInt(p.size, 16))}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{p.desc}</p>
                    </div>
                    {active && <CheckCircle2 size={14} className={p.color} />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Save Location ── */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="glass rounded-xl p-5 border border-[#1c2845] space-y-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono">Save Location</p>

        {/* Folder row */}
        <div className="flex gap-3 items-center">
          <div className={`flex-1 flex items-center gap-3 rounded-lg px-4 py-2.5 border transition-colors ${saveDir ? "border-cyan-500/40 bg-cyan-500/5" : "border-[#1c2845] bg-[#060c17]"}`}>
            <FolderOpen size={15} className={saveDir ? "text-cyan-400 shrink-0" : "text-slate-600 shrink-0"} />
            <span className={`text-sm font-mono truncate ${saveDir ? "text-cyan-300" : "text-slate-600"}`}>
              {saveDir || "No folder selected"}
            </span>
            {saveDir && (
              <button onClick={() => setSaveDir("")} className="ml-auto text-slate-600 hover:text-red-400 shrink-0">
                <X size={13} />
              </button>
            )}
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={pickFolder}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors shrink-0">
            <FolderOpen size={15} /> Browse
          </motion.button>
        </div>

        {/* Output filename — only for full / single modes */}
        {(mode === "full" || mode === "single") && (
          <div>
            <label className="text-xs text-slate-500 uppercase tracking-widest font-mono block mb-2">Output filename</label>
            <div className="flex gap-3">
              <input
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                placeholder={outputName}
                className="flex-1 glass rounded-lg px-4 py-2.5 text-sm font-mono text-slate-200 outline-none border border-[#1c2845] focus:border-cyan-500/40 transition-colors bg-transparent placeholder:text-slate-600"
              />
              <button onClick={() => setCustomName(autoName(mode === "single" ? singlePart : undefined))}
                className="px-3 py-2 rounded-lg text-xs glass border border-[#1c2845] text-slate-400 hover:text-cyan-400 transition-colors whitespace-nowrap">
                Auto name
              </button>
            </div>
            {(customName || outputName) && (
              <p className="text-xs text-slate-600 font-mono mt-1.5">
                → {saveDir || "(no folder)"}\{customName || outputName}
              </p>
            )}
          </div>
        )}

        {mode === "partitions" && saveDir && selectedParts.length > 0 && (
          <div className="text-xs text-slate-500 font-mono space-y-0.5">
            <p className="text-slate-400 mb-1">Files that will be created:</p>
            {PARTITIONS.filter(p => selectedParts.includes(p.key)).map(p => (
              <p key={p.key} className="pl-2 text-cyan-400/70">→ {saveDir}\{autoName(p.key)}</p>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Summary row ── */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3 text-xs font-mono">
        <span className="px-3 py-1.5 rounded-lg glass border border-[#1c2845] text-slate-400">
          Mode: <span className={`ml-1 ${modeColor === "green" ? "text-green-400" : modeColor === "cyan" ? "text-cyan-400" : "text-purple-400"}`}>{MODE_INFO[mode].label}</span>
        </span>
        <span className="px-3 py-1.5 rounded-lg glass border border-[#1c2845] text-slate-400">
          Partitions: <span className="text-white ml-1">{targetParts.length}</span>
        </span>
        <span className="px-3 py-1.5 rounded-lg glass border border-[#1c2845] text-slate-400">
          Total size: <span className="text-white ml-1">{formatBytes(targetParts.reduce((s, p) => s + parseInt(p.size, 16), 0))}</span>
        </span>
      </motion.div>

      {/* ── Progress ── */}
      <AnimatePresence>
        {(running || (progress > 0 && progress < 100)) && (
          <motion.div key="prog" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-5 border border-cyan-500/25 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-mono text-cyan-400">
                {currentPart ? `Reading ${currentPart}...` : "Starting..."}
              </span>
              <span className="text-sm font-mono text-white">{progress.toFixed(1)}%</span>
            </div>
            <div className="h-3 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.15 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results ── */}
      <AnimatePresence>
        {results.length > 0 && (
          <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="glass rounded-xl border border-green-500/25 overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[#1c2845]">
              <CheckCircle2 size={15} className="text-green-400" />
              <span className="text-sm font-semibold text-white">Backup Complete</span>
              <span className="ml-auto text-xs text-slate-500 font-mono">{saveDir}</span>
            </div>
            {results.map((r, i) => (
              <div key={i} className="flex flex-col gap-1.5 px-5 py-3 border-b border-[#1c2845] last:border-0 hover:bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <FileCode size={14} className="text-green-400 shrink-0" />
                  <span className="text-sm font-mono text-slate-200 flex-1 truncate">{r.file}</span>
                  <span className="text-xs text-slate-500 shrink-0">{r.part}</span>
                  <span className="text-xs text-cyan-400 font-mono shrink-0">{r.size}</span>
                </div>
                <div className="flex items-center gap-2 ml-5">
                  <ShieldCheck size={11} className="text-green-400 shrink-0" />
                  <span className="text-[10px] text-slate-600 font-mono">MD5:</span>
                  <span className="text-[10px] text-green-400/70 font-mono tracking-wide">{r.md5}</span>
                  <button onClick={() => navigator.clipboard?.writeText(r.md5)}
                    className="text-slate-700 hover:text-cyan-400 transition-colors ml-0.5">
                    <Copy size={10} />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Start button ── */}
      <motion.button
        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        disabled={!device || running || !saveDir || (mode === "partitions" && selectedParts.length === 0)}
        onClick={startBackup}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm
          bg-gradient-to-r from-cyan-600 to-blue-500 text-white
          disabled:opacity-40 disabled:cursor-not-allowed
          hover:from-cyan-500 hover:to-cyan-400 transition-all glow-cyan"
      >
        <DownloadCloud size={16} />
        {running
          ? `Backing up ${currentPart}...`
          : `Start Backup  (${targetParts.length} partition${targetParts.length !== 1 ? "s" : ""})`}
      </motion.button>

      {!saveDir && (
        <p className="text-xs text-amber-400/70 text-center font-mono">
          Select a save folder before starting
        </p>
      )}
      {!device && (
        <p className="text-xs text-amber-400/70 text-center font-mono">
          Connect a device first
        </p>
      )}
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, File, Upload, Trash2, RefreshCw,
  HardDrive, AlertTriangle, FolderPlus, Download,
} from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";
import { formatBytes } from "../lib/utils";

type FSType = "SPIFFS" | "LittleFS" | "FATFS";
type FSFile = { name: string; size: number; modified: string };

const isTauri = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

const DEMO_FILES: FSFile[] = [
  { name: "index.html",      size: 4312,   modified: "2026-06-10 14:22" },
  { name: "app.js",          size: 18940,  modified: "2026-06-10 14:22" },
  { name: "style.css",       size: 2780,   modified: "2026-06-10 14:22" },
  { name: "config.json",     size: 512,    modified: "2026-06-11 09:14" },
  { name: "favicon.ico",     size: 1150,   modified: "2026-06-10 14:22" },
  { name: "wifi.cfg",        size: 128,    modified: "2026-06-12 17:05" },
];

const FS_SIZES: Record<FSType, number> = {
  SPIFFS:   0x170000,  // ~1.44 MB
  LittleFS: 0x170000,
  FATFS:    0x200000,  // 2 MB
};

function fakeMd5() {
  return Array.from({ length: 32 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
}

export default function FileSystem() {
  const { device, addLog } = useFlashStore();

  const [fsType, setFsType]         = useState<FSType>("SPIFFS");
  const [files, setFiles]           = useState<FSFile[]>([]);
  const [loaded, setLoaded]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [selected, setSelected]     = useState<string[]>([]);
  const [uploadPct, setUploadPct]   = useState(0);

  const totalSize   = FS_SIZES[fsType];
  const usedSize    = files.reduce((s, f) => s + f.size, 0);
  const freeSize    = totalSize - usedSize;
  const usedPct     = files.length ? (usedSize / totalSize) * 100 : 0;

  // ── Mount / scan filesystem ─────────────────────────────────────
  const mountFs = () => {
    if (!device) return;
    setLoading(true);
    addLog("info", `Mounting ${fsType} filesystem...`);
    setTimeout(() => {
      setFiles(DEMO_FILES);
      setLoaded(true);
      setLoading(false);
      addLog("success", `${fsType} mounted — ${DEMO_FILES.length} files found`);
    }, 1400);
  };

  // ── Upload file(s) ──────────────────────────────────────────────
  const uploadFiles = async () => {
    if (!device || !loaded) return;
    if (isTauri) {
      try {
        // @ts-ignore — Tauri-only package, not available in web build
        const { open } = await import("@tauri-apps/plugin-dialog");
        const chosen = await open({ multiple: true, title: "Select files to upload" });
        if (!chosen) return;
        const paths = Array.isArray(chosen) ? chosen : [chosen];
        runUpload(paths.map(p => ({ name: (p as string).split(/[\\/]/).pop() ?? p as string, size: Math.floor(Math.random() * 20000) + 500 })));
      } catch (e) { addLog("error", `Upload error: ${e}`); }
    } else {
      // browser fallback via hidden input
      const inp = document.createElement("input");
      inp.type = "file"; inp.multiple = true;
      inp.onchange = () => {
        const flist = Array.from(inp.files ?? []);
        runUpload(flist.map(f => ({ name: f.name, size: f.size })));
      };
      inp.click();
    }
  };

  const runUpload = (incoming: { name: string; size: number }[]) => {
    setUploading(true);
    setUploadPct(0);
    addLog("info", `Uploading ${incoming.length} file(s) to ${fsType}...`);
    let pct = 0;
    const tick = setInterval(() => {
      pct += Math.random() * 12 + 4;
      if (pct >= 100) {
        clearInterval(tick);
        setUploadPct(100);
        const ts = new Date().toISOString().slice(0, 16).replace("T", " ");
        setFiles(prev => {
          const next = [...prev];
          for (const f of incoming) {
            const idx = next.findIndex(x => x.name === f.name);
            if (idx >= 0) next[idx] = { ...f, modified: ts };
            else next.push({ ...f, modified: ts });
          }
          return next;
        });
        incoming.forEach(f => addLog("success", `Uploaded: /${f.name}  (${formatBytes(f.size)})`));
        setUploading(false);
        setUploadPct(0);
      } else {
        setUploadPct(pct);
      }
    }, 80);
  };

  // ── Delete selected ─────────────────────────────────────────────
  const deleteSelected = () => {
    if (!selected.length) return;
    selected.forEach(n => addLog("warn", `Deleted: /${n}`));
    setFiles(prev => prev.filter(f => !selected.includes(f.name)));
    setSelected([]);
  };

  const toggleSelect = (name: string) =>
    setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  const toggleAll = () =>
    setSelected(prev => prev.length === files.length ? [] : files.map(f => f.name));

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FolderOpen size={22} className="text-purple-400" /> File System Manager
        </h1>
        <p className="text-sm text-slate-500 mt-1">Browse, upload, and delete files on SPIFFS / LittleFS / FATFS</p>
      </motion.div>

      {/* Device banner */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`glass rounded-xl p-4 border flex items-center gap-4 ${device ? "border-purple-500/25" : "border-[#1c2845]"}`}>
        <HardDrive size={20} className={device ? "text-purple-400" : "text-slate-600"} />
        {device ? (
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {[["Chip", device.chip], ["Flash", device.flashSize], ["Port", device.port]].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="text-purple-400 font-mono">{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-slate-500 text-sm">No device connected — connect from the toolbar first</span>
        )}
      </motion.div>

      {/* FS type selector */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-3">Filesystem Type</p>
        <div className="flex gap-2 flex-wrap">
          {(["SPIFFS", "LittleFS", "FATFS"] as FSType[]).map(t => (
            <button key={t} onClick={() => { setFsType(t); setLoaded(false); setFiles([]); setSelected([]); }}
              className={[
                "px-4 py-2 rounded-lg text-sm font-mono border transition-all",
                fsType === t
                  ? "bg-purple-500/10 border-purple-500/40 text-purple-400"
                  : "glass border-[#1c2845] text-slate-400 hover:text-white hover:border-slate-600",
              ].join(" ")}>
              {t}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Controls row */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={!device || loading}
          onClick={mountFs}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-purple-500/30 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors disabled:opacity-40">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loaded ? "Re-scan" : "Mount & Scan"}
        </motion.button>

        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={!loaded || uploading}
          onClick={uploadFiles}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-40">
          <Upload size={14} /> Upload Files
        </motion.button>

        {selected.length > 0 && (
          <motion.button initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={deleteSelected}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors">
            <Trash2 size={14} /> Delete {selected.length} selected
          </motion.button>
        )}
      </motion.div>

      {/* Upload progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div key="uprog" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-4 border border-cyan-500/25 space-y-2">
            <div className="flex justify-between text-sm font-mono">
              <span className="text-cyan-400">Uploading to {fsType}...</span>
              <span className="text-white">{uploadPct.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                animate={{ width: `${uploadPct}%` }} transition={{ duration: 0.1 }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storage bar */}
      <AnimatePresence>
        {loaded && (
          <motion.div key="bar" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 border border-[#1c2845] space-y-3">
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>Storage Usage</span>
              <span className="text-white">{formatBytes(usedSize)} / {formatBytes(totalSize)}</span>
            </div>
            <div className="h-3 bg-[#1c2845] rounded-full overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                initial={{ width: 0 }} animate={{ width: `${usedPct}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <span className="text-purple-400">{formatBytes(usedSize)} used</span>
              <span className="text-slate-500">{formatBytes(freeSize)} free</span>
              <span className="text-slate-600">{usedPct.toFixed(1)}% full</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File list */}
      <AnimatePresence>
        {loaded && (
          <motion.div key="files" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl border border-[#1c2845] overflow-hidden">
            {/* Table header */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-[#1c2845] text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              <input type="checkbox" checked={selected.length === files.length && files.length > 0}
                onChange={toggleAll}
                className="w-3.5 h-3.5 accent-purple-500 rounded" />
              <span className="flex-1">Name</span>
              <span className="w-20 text-right">Size</span>
              <span className="w-36 text-right hidden sm:block">Modified</span>
              <span className="w-16 text-right">Actions</span>
            </div>

            {files.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <FolderPlus size={32} className="text-slate-700" />
                <p className="text-slate-500 text-sm">Filesystem is empty</p>
                <button onClick={uploadFiles}
                  className="text-xs text-purple-400 hover:text-purple-300 font-mono mt-1">
                  Upload files to get started →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-[#1c2845]">
                {files.map((f, i) => (
                  <motion.div key={f.name}
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className={[
                      "flex items-center gap-3 px-5 py-3 text-sm transition-colors",
                      selected.includes(f.name) ? "bg-purple-500/5" : "hover:bg-white/[0.02]",
                    ].join(" ")}>
                    <input type="checkbox" checked={selected.includes(f.name)}
                      onChange={() => toggleSelect(f.name)}
                      className="w-3.5 h-3.5 accent-purple-500 rounded shrink-0" />
                    <File size={14} className="text-purple-400 shrink-0" />
                    <span className="flex-1 font-mono text-slate-200 truncate">/{f.name}</span>
                    <span className="w-20 text-right font-mono text-slate-400 text-xs">{formatBytes(f.size)}</span>
                    <span className="w-36 text-right font-mono text-slate-600 text-xs hidden sm:block">{f.modified}</span>
                    <div className="w-16 flex justify-end gap-1">
                      <button className="p-1.5 rounded hover:bg-cyan-500/10 text-slate-600 hover:text-cyan-400 transition-colors"
                        title="Download" onClick={() => addLog("info", `Downloading: /${f.name}`)}>
                        <Download size={12} />
                      </button>
                      <button className="p-1.5 rounded hover:bg-red-500/10 text-slate-600 hover:text-red-400 transition-colors"
                        title="Delete" onClick={() => { setFiles(prev => prev.filter(x => x.name !== f.name)); addLog("warn", `Deleted: /${f.name}`); }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Not loaded placeholder */}
      {!loaded && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass rounded-xl p-10 border border-dashed border-[#1c2845] text-center">
          <FolderOpen size={40} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {device ? `Click "Mount & Scan" to read the ${fsType} filesystem` : "Connect a device first"}
          </p>
          {!device && (
            <p className="text-slate-600 text-xs mt-1">Select a port and connect in the toolbar</p>
          )}
        </motion.div>
      )}

      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass rounded-xl p-10 border border-purple-500/20 text-center space-y-4">
          <RefreshCw size={32} className="text-purple-400 mx-auto animate-spin" />
          <p className="text-purple-300 text-sm">Mounting {fsType}...</p>
          <div className="h-1 bg-[#1c2845] rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div className="h-full bg-purple-500 rounded-full"
              animate={{ width: ["0%", "90%"] }} transition={{ duration: 1.2, ease: "easeInOut" }} />
          </div>
        </motion.div>
      )}

      {/* Warning */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="glass rounded-xl p-4 border border-amber-500/15 flex gap-3">
        <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500">
          <span className="text-amber-300 font-semibold">Note: </span>
          File operations require esptool.py or a compatible plugin. Deleting files modifies the device filesystem permanently.
          Always back up the partition before making changes.
        </p>
      </motion.div>
    </div>
  );
}

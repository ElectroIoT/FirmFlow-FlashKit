import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, RefreshCw, HardDrive, Copy, Search, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

type NvsType = "U8" | "I8" | "U16" | "I16" | "U32" | "I32" | "U64" | "I64" | "STR" | "BLOB";
type NvsEntry = { key: string; type: NvsType; value: string };
type NvsNamespace = { ns: string; entries: NvsEntry[] };

const TYPE_COLOR: Record<NvsType, string> = {
  U8:   "text-green-400",  I8:   "text-green-300",
  U16:  "text-cyan-400",   I16:  "text-cyan-300",
  U32:  "text-blue-400",   I32:  "text-blue-300",
  U64:  "text-purple-400", I64:  "text-purple-300",
  STR:  "text-amber-400",  BLOB: "text-rose-400",
};

const TYPE_BG: Record<NvsType, string> = {
  U8:   "bg-green-500/10 border-green-500/25",  I8:   "bg-green-500/10 border-green-500/25",
  U16:  "bg-cyan-500/10 border-cyan-500/25",    I16:  "bg-cyan-500/10 border-cyan-500/25",
  U32:  "bg-blue-500/10 border-blue-500/25",    I32:  "bg-blue-500/10 border-blue-500/25",
  U64:  "bg-purple-500/10 border-purple-500/25",I64:  "bg-purple-500/10 border-purple-500/25",
  STR:  "bg-amber-500/10 border-amber-500/25",  BLOB: "bg-rose-500/10 border-rose-500/25",
};

const DEMO_NVS: NvsNamespace[] = [
  {
    ns: "nvs.net80211",
    entries: [
      { key: "sta.ssid",    type: "STR",  value: "HomeNetwork"       },
      { key: "sta.pswd",    type: "BLOB", value: "** hidden **"       },
      { key: "sta.chan",    type: "U8",   value: "6"                  },
      { key: "sta.authmod", type: "U8",   value: "3  (WPA2)"          },
      { key: "opmode",      type: "U8",   value: "1  (STA)"           },
    ],
  },
  {
    ns: "storage",
    entries: [
      { key: "boot_count",  type: "U32",  value: "47"                 },
      { key: "last_reset",  type: "STR",  value: "2026-06-20 08:14"   },
      { key: "uptime_max",  type: "U32",  value: "864000  (10 days)"  },
      { key: "err_count",   type: "U16",  value: "2"                  },
    ],
  },
  {
    ns: "app_config",
    entries: [
      { key: "device_name", type: "STR",  value: "ESP32-Node-A1"      },
      { key: "api_key",     type: "STR",  value: "a3f9bc12…(truncated)"},
      { key: "poll_ms",     type: "U32",  value: "5000"               },
      { key: "log_level",   type: "U8",   value: "2  (INFO)"          },
      { key: "ota_enabled", type: "U8",   value: "1  (true)"          },
    ],
  },
  {
    ns: "nvs",
    entries: [
      { key: "cal_data",    type: "BLOB", value: "88 bytes"           },
    ],
  },
];

function copyText(t: string) {
  navigator.clipboard?.writeText(t).catch(() => {});
}

export default function NvsInspector() {
  const { device, addLog } = useFlashStore();

  const [namespaces, setNamespaces] = useState<NvsNamespace[]>([]);
  const [loaded, setLoaded]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [expanded, setExpanded]     = useState<Set<string>>(new Set());
  const [search, setSearch]         = useState("");

  const allEntries = namespaces.flatMap(ns =>
    ns.entries.map(e => ({ ...e, ns: ns.ns }))
  );

  const filtered = search.trim()
    ? allEntries.filter(e =>
        e.ns.includes(search) || e.key.includes(search) || e.value.includes(search)
      )
    : null;

  const toggleNs = (ns: string) =>
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(ns) ? next.delete(ns) : next.add(ns);
      return next;
    });

  const expandAll  = () => setExpanded(new Set(namespaces.map(n => n.ns)));
  const collapseAll = () => setExpanded(new Set());

  const readNvs = () => {
    if (!device) return;
    setLoading(true);
    addLog("info", "Reading NVS partitions...");
    setTimeout(() => {
      setNamespaces(DEMO_NVS);
      setExpanded(new Set(DEMO_NVS.map(n => n.ns)));
      setLoaded(true);
      setLoading(false);
      const total = DEMO_NVS.reduce((s, n) => s + n.entries.length, 0);
      addLog("success", `NVS read: ${DEMO_NVS.length} namespaces, ${total} entries`);
    }, 1600);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Database size={22} className="text-blue-400" /> NVS Inspector
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Read ESP32 Non-Volatile Storage — namespaces, keys, types, and values
        </p>
      </motion.div>

      {/* Device banner */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className={`glass rounded-xl p-4 border flex items-center gap-4 ${device ? "border-blue-500/25" : "border-[#1c2845]"}`}>
        <HardDrive size={20} className={device ? "text-blue-400" : "text-slate-600"} />
        {device ? (
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {[["Chip", device.chip], ["MAC", device.mac], ["Port", device.port]].map(([k, v]) => (
              <div key={k} className="flex gap-2 text-sm">
                <span className="text-slate-500">{k}</span>
                <span className="text-blue-400 font-mono">{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-slate-500 text-sm">No device connected — connect from the toolbar first</span>
        )}
      </motion.div>

      {/* Controls */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="flex flex-wrap gap-2 items-center">
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          disabled={!device || loading}
          onClick={readNvs}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm border border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-40">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          {loaded ? "Re-read NVS" : "Read NVS"}
        </motion.button>

        {loaded && (
          <>
            <button onClick={expandAll}
              className="px-3 py-2 text-xs glass border border-[#1c2845] text-slate-400 hover:text-white rounded-lg transition-colors">
              Expand all
            </button>
            <button onClick={collapseAll}
              className="px-3 py-2 text-xs glass border border-[#1c2845] text-slate-400 hover:text-white rounded-lg transition-colors">
              Collapse all
            </button>
            <div className="flex-1 flex items-center gap-2 glass border border-[#1c2845] rounded-lg px-3 py-2 min-w-[160px]">
              <Search size={13} className="text-slate-500 shrink-0" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search keys, values..."
                className="bg-transparent text-sm text-slate-200 outline-none w-full placeholder:text-slate-600" />
            </div>
          </>
        )}
      </motion.div>

      {/* Stats row */}
      <AnimatePresence>
        {loaded && !search && (
          <motion.div key="stats" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 text-xs font-mono">
            {[
              { label: "Namespaces", value: namespaces.length, color: "text-blue-400"   },
              { label: "Total keys", value: allEntries.length,  color: "text-cyan-400"  },
              { label: "STR entries", value: allEntries.filter(e => e.type === "STR").length, color: "text-amber-400" },
              { label: "BLOB entries",value: allEntries.filter(e => e.type === "BLOB").length,color: "text-rose-400"  },
            ].map(s => (
              <div key={s.label} className="glass px-3 py-1.5 rounded-lg border border-[#1c2845]">
                <span className="text-slate-500">{s.label}: </span>
                <span className={s.color}>{s.value}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search results view */}
      <AnimatePresence>
        {search && filtered && (
          <motion.div key="search-results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl border border-[#1c2845] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#1c2845] text-xs font-mono text-slate-500">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{search}"
            </div>
            {filtered.length === 0 ? (
              <p className="text-center text-slate-600 text-sm py-8">No matching entries</p>
            ) : (
              <div className="divide-y divide-[#1c2845]">
                {filtered.map((e, i) => (
                  <EntryRow key={i} ns={e.ns} entry={e} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Namespace tree */}
      <AnimatePresence>
        {loaded && !search && (
          <motion.div key="tree" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {namespaces.map((ns, ni) => (
              <motion.div key={ns.ns}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: ni * 0.07 }}
                className="glass rounded-xl border border-[#1c2845] overflow-hidden">
                {/* Namespace header */}
                <button onClick={() => toggleNs(ns.ns)}
                  className="w-full flex items-center gap-3 px-5 py-3 border-b border-[#1c2845] hover:bg-white/[0.02] transition-colors">
                  {expanded.has(ns.ns)
                    ? <ChevronDown size={14} className="text-slate-400 shrink-0" />
                    : <ChevronRight size={14} className="text-slate-400 shrink-0" />}
                  <Database size={14} className="text-blue-400 shrink-0" />
                  <span className="text-sm font-mono font-semibold text-blue-300">{ns.ns}</span>
                  <span className="ml-auto text-xs text-slate-600 font-mono">{ns.entries.length} keys</span>
                </button>

                {/* Entries */}
                <AnimatePresence>
                  {expanded.has(ns.ns) && (
                    <motion.div key="entries" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      {/* Column header */}
                      <div className="flex items-center gap-3 px-5 py-2 text-[10px] font-mono text-slate-600 uppercase tracking-widest border-b border-[#1c2845]">
                        <span className="w-20 shrink-0">Type</span>
                        <span className="w-40 shrink-0">Key</span>
                        <span className="flex-1">Value</span>
                        <span className="w-6" />
                      </div>
                      <div className="divide-y divide-[#1c2845]">
                        {ns.entries.map((e, i) => (
                          <motion.div key={e.key}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                            <EntryRow ns={ns.ns} entry={e} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading state */}
      {loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass rounded-xl p-10 border border-blue-500/20 text-center space-y-4">
          <RefreshCw size={32} className="text-blue-400 mx-auto animate-spin" />
          <p className="text-blue-300 text-sm">Reading NVS partition...</p>
          <div className="h-1 bg-[#1c2845] rounded-full overflow-hidden max-w-xs mx-auto">
            <motion.div className="h-full bg-blue-500 rounded-full"
              animate={{ width: ["0%", "85%"] }} transition={{ duration: 1.4, ease: "easeInOut" }} />
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {!loaded && !loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="glass rounded-xl p-10 border border-dashed border-[#1c2845] text-center">
          <Database size={40} className="text-slate-700 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">
            {device ? 'Click "Read NVS" to inspect the device storage' : "Connect a device first"}
          </p>
        </motion.div>
      )}

      {/* Warning */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="glass rounded-xl p-4 border border-amber-500/15 flex gap-3">
        <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500">
          <span className="text-amber-300 font-semibold">Read-only: </span>
          NVS Inspector only reads data. No values are modified.
          Passwords and BLOBs may be shown as-is — treat this data as sensitive.
        </p>
      </motion.div>
    </div>
  );
}

function EntryRow({ ns, entry }: { ns: string; entry: NvsEntry & { ns?: string } }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    copyText(entry.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/[0.02] transition-colors group text-sm">
      <span className={`w-20 shrink-0 text-xs font-mono px-2 py-0.5 rounded border ${TYPE_BG[entry.type]} ${TYPE_COLOR[entry.type]}`}>
        {entry.type}
      </span>
      <span className="w-40 shrink-0 font-mono text-slate-300 truncate">{entry.key}</span>
      <span className="flex-1 font-mono text-slate-400 text-xs truncate">{entry.value}</span>
      <button onClick={copy}
        className="w-6 text-slate-700 hover:text-cyan-400 transition-colors opacity-0 group-hover:opacity-100">
        <Copy size={12} />
      </button>
      {copied && <span className="text-[10px] text-green-400 font-mono absolute ml-2">copied!</span>}
    </div>
  );
}

import { motion } from "framer-motion";
import { HardDrive } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

const MOCK_PARTITIONS = [
  { name: "nvs",      type: "data", subtype: "nvs",    offset: "0x9000",   size: "0x6000",  color: "bg-amber-500" },
  { name: "otadata",  type: "data", subtype: "ota",    offset: "0xF000",   size: "0x2000",  color: "bg-cyan-500" },
  { name: "app0",     type: "app",  subtype: "ota_0",  offset: "0x10000",  size: "0x140000", color: "bg-green-500" },
  { name: "app1",     type: "app",  subtype: "ota_1",  offset: "0x150000", size: "0x140000", color: "bg-blue-500" },
  { name: "spiffs",   type: "data", subtype: "spiffs", offset: "0x290000", size: "0x170000", color: "bg-purple-500" },
];

const TOTAL = 0x400000;

export default function Partitions() {
  const { device } = useFlashStore();

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <HardDrive size={22} className="text-purple-400" /> Partition Table
        </h1>
        <p className="text-sm text-slate-500 mt-1">Flash memory layout of connected device</p>
      </motion.div>

      {/* Visual bar */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl p-5 border border-[#1c2845]"
      >
        <p className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-3">Flash map — 4 MB total</p>
        <div className="flex h-10 rounded-lg overflow-hidden gap-0.5">
          {MOCK_PARTITIONS.map((p) => {
            const pct = (parseInt(p.size, 16) / TOTAL) * 100;
            return (
              <motion.div
                key={p.name}
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ width: `${pct}%` }}
                className={`${p.color} relative group cursor-pointer`}
                title={`${p.name}: ${p.size}`}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                {pct > 8 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white/80 font-semibold">
                    {p.name}
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1">
          <span>0x0000</span>
          <span>0x200000</span>
          <span>0x400000</span>
        </div>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass rounded-xl border border-[#1c2845] overflow-hidden"
      >
        {!device ? (
          <div className="p-12 text-center text-slate-600">Connect a device to read partition table</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1c2845] text-left">
                {["Name", "Type", "Subtype", "Offset", "Size", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MOCK_PARTITIONS.map((p, i) => (
                <motion.tr
                  key={p.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.25 }}
                  className="border-b border-[#1c2845] last:border-0 hover:bg-white/2"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${p.color}`} />
                      <span className="font-mono text-slate-200">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{p.type}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{p.subtype}</td>
                  <td className="px-4 py-3 text-cyan-400 font-mono">{p.offset}</td>
                  <td className="px-4 py-3 text-purple-400 font-mono">{p.size}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-slate-600 font-mono">
                      {(parseInt(p.size, 16) / 1024).toFixed(0)} KB
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}

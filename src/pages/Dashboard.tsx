import { motion } from "framer-motion";
import { Cpu, Zap, HardDrive, Wifi, Clock, CheckCircle2, XCircle, Activity } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.07, duration: 0.4 },
});

function StatCard({ icon: Icon, label, value, sub, color = "green" }: {
  icon: React.ElementType; label: string; value: string; sub?: string; color?: string;
}) {
  const colors: Record<string, string> = {
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  };
  return (
    <div className={`glass rounded-xl p-4 border ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${colors[color]}`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { device, flashHistory } = useFlashStore();
  const success = flashHistory.filter((j) => j.status === "success").length;
  const failed = flashHistory.filter((j) => j.status === "failed").length;

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6">
      {/* Header */}
      <motion.div {...fade(0)}>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">FirmFlow FlashKit — ESP32 / ESP8266 device manager</p>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <motion.div {...fade(1)}>
          <StatCard icon={Cpu} label="Chip" value={device?.chip ?? "—"} sub={device ? "Connected" : "No device"} color="green" />
        </motion.div>
        <motion.div {...fade(2)}>
          <StatCard icon={HardDrive} label="Flash" value={device?.flashSize ?? "—"} sub="Total flash size" color="cyan" />
        </motion.div>
        <motion.div {...fade(3)}>
          <StatCard icon={CheckCircle2} label="Success" value={`${success}`} sub="Total flashes" color="green" />
        </motion.div>
        <motion.div {...fade(4)}>
          <StatCard icon={XCircle} label="Failed" value={`${failed}`} sub="Total errors" color="amber" />
        </motion.div>
      </div>

      {/* Device details + Features */}
      {device ? (
        <motion.div {...fade(5)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5 border border-green-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Cpu size={16} className="text-green-400" />
              <h2 className="text-sm font-semibold text-white">Device Info</h2>
              <span className="ml-auto w-2 h-2 bg-green-400 rounded-full pulse-dot" />
            </div>
            <div className="space-y-3 font-mono text-sm">
              {[
                ["Chip", device.chip],
                ["Flash", device.flashSize],
                ["MAC Address", device.mac],
                ["Port", device.port],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-500">{k}</span>
                  <span className="text-green-400">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass rounded-xl p-5 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-4">
              <Wifi size={16} className="text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">Features</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {device.features.map((f) => (
                <span key={f} className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div {...fade(5)} className="glass rounded-xl p-10 border border-dashed border-[#1c2845] text-center">
          <Cpu size={40} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No device connected</p>
          <p className="text-slate-600 text-xs mt-1">Select a port and click Connect in the toolbar</p>
        </motion.div>
      )}

      {/* Recent history */}
      <motion.div {...fade(6)} className="glass rounded-xl p-5 border border-[#1c2845]">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={16} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="space-y-2">
          {flashHistory.slice(0, 5).map((job) => (
            <div key={job.id} className="flex items-center gap-3 py-2 border-b border-[#1c2845] last:border-0">
              {job.status === "success"
                ? <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                : <XCircle size={14} className="text-red-400 shrink-0" />}
              <span className="text-sm text-slate-300 flex-1 truncate font-mono">{job.file}</span>
              <span className="text-xs text-slate-500">{job.chip}</span>
              <span className="text-xs text-slate-600 font-mono">{job.date}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick tips */}
      <motion.div {...fade(7)} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: Zap, tip: "Flash", desc: "Upload .bin firmware to your chip" },
          { icon: HardDrive, tip: "Backup", desc: "Dump current flash to a file" },
          { icon: Clock, tip: "History", desc: "Browse past flash operations" },
        ].map(({ icon: Icon, tip, desc }) => (
          <div key={tip} className="glass rounded-xl p-4 border border-[#1c2845] hover:border-green-500/20 transition-colors group cursor-pointer">
            <Icon size={20} className="text-slate-500 group-hover:text-green-400 transition-colors mb-2" />
            <p className="text-sm font-medium text-slate-300">{tip}</p>
            <p className="text-xs text-slate-600 mt-0.5">{desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

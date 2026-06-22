import { motion } from "framer-motion";
import { ClipboardList, CheckCircle2, XCircle, Trash2, Download } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

export default function History() {
  const { flashHistory } = useFlashStore();

  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ClipboardList size={22} className="text-slate-400" /> Flash History
          </h1>
          <p className="text-sm text-slate-500 mt-1">{flashHistory.length} total operations</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400 border border-green-500/20">
            {flashHistory.filter((j) => j.status === "success").length} success
          </span>
          <span className="px-3 py-1 rounded-full text-xs bg-red-500/10 text-red-400 border border-red-500/20">
            {flashHistory.filter((j) => j.status === "failed").length} failed
          </span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass rounded-xl border border-[#1c2845] overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1c2845] text-left">
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal">Status</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal">File</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal hidden sm:table-cell">Chip</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal hidden md:table-cell">Size</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal hidden lg:table-cell">Date</th>
              <th className="px-4 py-3 text-xs text-slate-500 uppercase tracking-widest font-mono font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {flashHistory.map((job, i) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-[#1c2845] last:border-0 hover:bg-white/2 transition-colors"
              >
                <td className="px-4 py-3">
                  {job.status === "success"
                    ? <CheckCircle2 size={15} className="text-green-400" />
                    : <XCircle size={15} className="text-red-400" />}
                </td>
                <td className="px-4 py-3 font-mono text-slate-300">{job.file}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className="px-2 py-0.5 rounded text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {job.chip}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 font-mono hidden md:table-cell">{job.size}</td>
                <td className="px-4 py-3 text-slate-500 font-mono text-xs hidden lg:table-cell">{job.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors" title="Download">
                      <Download size={13} />
                    </button>
                    <button className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {flashHistory.length === 0 && (
          <div className="p-12 text-center text-slate-600">No flash history yet</div>
        )}
      </motion.div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Trash2, Pause, Play, Download } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

const LOG_COLORS: Record<string, string> = {
  info: "text-slate-300",
  success: "text-green-400",
  error: "text-red-400",
  warn: "text-amber-400",
  data: "text-cyan-400",
};

export default function SerialMonitor() {
  const { serialLogs, clearLogs, addLog, device } = useFlashStore();
  const [input, setInput] = useState("");
  const [paused, setPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Simulate incoming serial data
  useEffect(() => {
    if (!device) return;
    const msgs = [
      "[INFO] System starting...",
      "[WIFI] Connecting to AP...",
      "[WIFI] Connected! IP: 192.168.1.42",
      "[MQTT] Broker connected",
      "[SENSOR] Temp: 28.4°C Humidity: 65%",
      "[LOOP] Heartbeat #1",
    ];
    let i = 0;
    const t = setInterval(() => {
      if (!paused && i < msgs.length) {
        addLog("data", msgs[i++]);
      }
      if (i >= msgs.length) clearInterval(t);
    }, 600);
    return () => clearInterval(t);
  }, [device, paused]);

  useEffect(() => {
    if (autoScroll && !paused) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [serialLogs, autoScroll, paused]);

  const sendCommand = () => {
    if (!input.trim()) return;
    addLog("info", `> ${input}`);
    setInput("");
  };

  const downloadLogs = () => {
    const text = serialLogs.map((l) => `[${l.ts}] ${l.text}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "serial_log.txt";
    a.click();
  };

  return (
    <div className="h-full flex flex-col p-6 gap-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <Terminal size={22} className="text-cyan-400" />
        <div>
          <h1 className="text-2xl font-bold text-white">Serial Monitor</h1>
          <p className="text-sm text-slate-500">Live serial output from device</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setPaused((p) => !p)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs glass border border-[#1c2845] text-slate-400 hover:text-white transition-colors"
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={downloadLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs glass border border-[#1c2845] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Download size={13} /> Export
          </button>
          <button
            onClick={clearLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs glass border border-[#1c2845] text-slate-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={13} /> Clear
          </button>
        </div>
      </motion.div>

      {/* Terminal output */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex-1 glass rounded-xl border border-[#1c2845] overflow-hidden flex flex-col"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1c2845] bg-[#0a0f1a]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-slate-500 font-mono ml-2">
            {device ? `${device.port} @ 115200` : "No device connected"}
          </span>
          <label className="ml-auto flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
              className="accent-green-500"
            />
            Auto-scroll
          </label>
        </div>

        {/* Log area */}
        <div className="flex-1 overflow-y-auto p-4 terminal">
          {serialLogs.length === 0 ? (
            <p className="text-slate-600 text-center mt-10">
              {device ? "Waiting for data..." : "Connect a device to see serial output"}
            </p>
          ) : (
            serialLogs.map((line) => (
              <div key={line.id} className="flex gap-3 hover:bg-white/2 px-1 rounded">
                <span className="text-slate-600 shrink-0 select-none w-20">{line.ts}</span>
                <span className={LOG_COLORS[line.type] ?? "text-slate-300"}>{line.text}</span>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 border-t border-[#1c2845] bg-[#0a0f1a]">
          <span className="text-green-400 font-mono text-sm shrink-0">›</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendCommand()}
            placeholder={device ? "Send command..." : "No device"}
            disabled={!device}
            className="flex-1 bg-transparent text-sm font-mono text-slate-200 outline-none placeholder:text-slate-600"
          />
          <button
            onClick={sendCommand}
            disabled={!device || !input.trim()}
            className="p-1.5 rounded-lg text-green-400 hover:bg-green-500/10 disabled:opacity-30 transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

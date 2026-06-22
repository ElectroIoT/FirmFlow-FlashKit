import { motion } from "framer-motion";
import { RefreshCw, Usb, ChevronDown, Wifi, WifiOff } from "lucide-react";
import { useFlashStore } from "../store/useFlashStore";

const BAUDS = ["9600", "57600", "115200", "230400", "460800", "921600"];

export default function Topbar() {
  const { ports, selectedPort, baud, device, connecting, setPorts, setSelectedPort, setBaud, setDevice, setConnecting, addLog } =
    useFlashStore();

  // Simulate port refresh
  const refreshPorts = () => {
    const mockPorts = ["COM3", "COM4", "COM7", "/dev/ttyUSB0"];
    setPorts(mockPorts);
    setSelectedPort(mockPorts[0]);
    addLog("info", `Found ${mockPorts.length} serial ports`);
  };

  // Simulate connect
  const handleConnect = () => {
    if (!selectedPort) return;
    if (device) {
      setDevice(null);
      addLog("warn", `Disconnected from ${selectedPort}`);
      return;
    }
    setConnecting(true);
    addLog("info", `Connecting to ${selectedPort} @ ${baud} baud...`);
    setTimeout(() => {
      setConnecting(false);
      setDevice({
        port: selectedPort,
        chip: "ESP32-D0WD-V3",
        flashSize: "4 MB",
        mac: "A4:CF:12:78:3E:B2",
        features: ["WiFi", "BT", "Dual Core", "240 MHz"],
        connected: true,
      });
      addLog("success", "Device detected: ESP32-D0WD-V3 @ 4MB flash");
      addLog("info", "MAC: A4:CF:12:78:3E:B2");
    }, 1800);
  };

  return (
    <header className="flex items-center gap-3 px-5 py-3 border-b border-[#1c2845] bg-[#0a0f1a]/80 backdrop-blur-sm shrink-0">
      {/* Port selector */}
      <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
        <Usb size={14} className="text-green-400" />
        <select
          value={selectedPort}
          onChange={(e) => setSelectedPort(e.target.value)}
          className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer min-w-[90px]"
        >
          {ports.length === 0 && <option value="">No ports</option>}
          {ports.map((p) => (
            <option key={p} value={p} className="bg-[#0f1729]">{p}</option>
          ))}
        </select>
        <ChevronDown size={12} className="text-slate-500" />
      </div>

      {/* Baud selector */}
      <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
        <span className="text-[10px] text-slate-500 font-mono uppercase">Baud</span>
        <select
          value={baud}
          onChange={(e) => setBaud(e.target.value)}
          className="bg-transparent text-sm text-slate-200 outline-none cursor-pointer"
        >
          {BAUDS.map((b) => (
            <option key={b} value={b} className="bg-[#0f1729]">{b}</option>
          ))}
        </select>
      </div>

      {/* Refresh ports */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95, rotate: 180 }}
        onClick={refreshPorts}
        className="glass p-2 rounded-lg text-slate-400 hover:text-green-400 transition-colors"
        title="Refresh ports"
      >
        <RefreshCw size={15} />
      </motion.button>

      {/* Connect button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleConnect}
        disabled={connecting}
        className={[
          "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
          device
            ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
            : "bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 glow-green",
          connecting && "opacity-60 cursor-not-allowed",
        ].join(" ")}
      >
        {device ? <WifiOff size={14} /> : <Wifi size={14} />}
        {connecting ? "Connecting..." : device ? "Disconnect" : "Connect"}
      </motion.button>

      {/* Device badge */}
      {device && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 glass rounded-lg px-3 py-2"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full pulse-dot" />
          <span className="text-xs text-green-400 font-mono">{device.chip}</span>
          <span className="text-xs text-slate-500">{device.flashSize}</span>
        </motion.div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Status */}
      <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-mono">
        <span className={device ? "text-green-400" : "text-slate-600"}>●</span>
        <span>{device ? `${selectedPort} · ${baud}` : "No device"}</span>
      </div>
    </header>
  );
}

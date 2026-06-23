import { motion } from "framer-motion";
import { Download, ExternalLink, Usb, CheckCircle2, AlertTriangle } from "lucide-react";

type OS = { label: string; url: string; note?: string };
type Driver = {
  chip: string;
  maker: string;
  desc: string;
  color: string;
  badge: string;
  popular: boolean;
  devices: string[];
  windows: OS;
  mac: OS;
  linux: OS;
};

const DRIVERS: Driver[] = [
  {
    chip: "CH340 / CH341",
    maker: "WCH (Nanjing Qinheng)",
    desc: "Most common ESP8266 and cheap ESP32 board chip. Found on NodeMCU, Wemos D1 Mini, and most budget boards.",
    color: "green",
    badge: "Most Common",
    popular: true,
    devices: ["NodeMCU v2/v3", "Wemos D1 Mini", "ESP-01 adapters", "Most AliExpress ESP boards"],
    windows: { label: "Windows 7–11", url: "https://www.wch-ic.com/downloads/CH341SER_EXE.html", note: "CH341SER.EXE installer" },
    mac:     { label: "macOS 10.9+",  url: "https://www.wch-ic.com/downloads/CH341SER_MAC_ZIP.html", note: "CH341SER.pkg" },
    linux:   { label: "Linux (built-in)", url: "https://www.wch-ic.com/downloads/CH341SER_LINUX_ZIP.html", note: "Kernel 2.6.x+ includes ch341 module" },
  },
  {
    chip: "CP2102 / CP2104",
    maker: "Silicon Labs",
    desc: "High-quality USB-UART found on official Espressif DevKitC boards and many quality ESP32 boards.",
    color: "cyan",
    badge: "Official Boards",
    popular: true,
    devices: ["ESP32-DevKitC", "ESP32-S2-DevKit", "SparkFun ESP32", "Adafruit Feather ESP32"],
    windows: { label: "Windows 7–11", url: "https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers", note: "CP210x Universal Windows Driver" },
    mac:     { label: "macOS 10.10+", url: "https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers", note: "CP210xVCPMacintoshDriver.zip" },
    linux:   { label: "Linux (built-in)", url: "https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers", note: "cp210x module included in kernel 2.6+" },
  },
  {
    chip: "CH9102",
    maker: "WCH (Nanjing Qinheng)",
    desc: "Newer WCH chip found on ESP32-C3, ESP32-S3 boards and newer NodeMCU variants.",
    color: "purple",
    badge: "Newer Boards",
    popular: false,
    devices: ["ESP32-C3-DevKitM", "ESP32-S3-DevKitC", "Newer NodeMCU boards"],
    windows: { label: "Windows 7–11", url: "https://www.wch-ic.com/downloads/CH9102_ZIP.html", note: "CH9102 driver package" },
    mac:     { label: "macOS",        url: "https://www.wch-ic.com/downloads/CH9102_ZIP.html", note: "CH9102 macOS package" },
    linux:   { label: "Linux (built-in)", url: "https://www.wch-ic.com/downloads/CH9102_ZIP.html", note: "Included in recent kernels" },
  },
  {
    chip: "FTDI FT232R / FT231X",
    maker: "Future Technology Devices",
    desc: "Premium USB-UART chip. Very reliable, used on high-end dev boards and custom hardware.",
    color: "amber",
    badge: "Premium",
    popular: false,
    devices: ["FTDI Friend", "Adafruit FTDI cable", "Custom hardware", "Some Sparkfun boards"],
    windows: { label: "Windows 7–11", url: "https://ftdichip.com/drivers/vcp-drivers/", note: "CDM WHQL Certified Driver" },
    mac:     { label: "macOS",        url: "https://ftdichip.com/drivers/vcp-drivers/", note: "FTDIUSBSerialDriver.dmg" },
    linux:   { label: "Linux (built-in)", url: "https://ftdichip.com/drivers/vcp-drivers/", note: "ftdi_sio module built into kernel" },
  },
  {
    chip: "PL2303",
    maker: "Prolific Technology",
    desc: "Older USB-UART chip found on legacy boards and cheap USB-Serial cables.",
    color: "slate",
    badge: "Legacy",
    popular: false,
    devices: ["Old NodeMCU boards", "Generic USB-Serial cables", "Older Arduino clones"],
    windows: { label: "Windows 7–11", url: "https://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225&pcid=41", note: "PL2303_Prolific_DriverInstaller.exe" },
    mac:     { label: "macOS",        url: "https://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225&pcid=41", note: "PL2303_MacOSX_1.6.1.zip" },
    linux:   { label: "Linux (built-in)", url: "https://www.prolific.com.tw/US/ShowProduct.aspx?p_id=225&pcid=41", note: "pl2303 module built into kernel" },
  },
];

const COLORS: Record<string, { card: string; badge: string; btn: string; icon: string }> = {
  green:  { card: "border-green-500/25",  badge: "bg-green-500/10 text-green-400 border-green-500/30",  btn: "bg-green-500/10 border-green-500/30 text-green-400 hover:bg-green-500/20",  icon: "text-green-400"  },
  cyan:   { card: "border-cyan-500/25",   badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",     btn: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20",    icon: "text-cyan-400"   },
  purple: { card: "border-purple-500/25", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",btn: "bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20",icon: "text-purple-400"},
  amber:  { card: "border-amber-500/25",  badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",   btn: "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20",  icon: "text-amber-400"  },
  slate:  { card: "border-slate-500/25",  badge: "bg-slate-500/10 text-slate-400 border-slate-500/30",   btn: "bg-slate-500/10 border-slate-500/30 text-slate-400 hover:bg-slate-500/20",  icon: "text-slate-400"  },
};

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export default function Drivers() {
  return (
    <div className="h-full overflow-y-auto p-6 space-y-5">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Usb size={22} className="text-amber-400" /> USB Driver Downloads
        </h1>
        <p className="text-sm text-slate-500 mt-1">Install the correct driver for your ESP board's USB-to-UART chip</p>
      </motion.div>

      {/* How to identify tip */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass rounded-xl p-4 border border-amber-500/20 flex gap-3 items-start">
        <AlertTriangle size={16} className="text-amber-400 mt-0.5 shrink-0" />
        <div className="text-sm">
          <span className="text-amber-300 font-semibold">How to identify your chip: </span>
          <span className="text-slate-400">
            Open Device Manager (Win+X → Device Manager) after plugging in your board. Look under
            <span className="text-slate-300 font-mono mx-1">Ports (COM & LPT)</span> — the chip name is shown in brackets.
            If it shows "Unknown device", install drivers below.
          </span>
        </div>
      </motion.div>

      {/* Driver cards */}
      <div className="space-y-4">
        {DRIVERS.map((d, i) => {
          const c = COLORS[d.color];
          return (
            <motion.div key={d.chip}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}
              className={`glass rounded-xl border ${c.card} overflow-hidden`}>

              {/* Card header */}
              <div className="flex items-start gap-4 p-5">
                <div className={`p-3 rounded-xl border ${c.badge}`}>
                  <Usb size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-base font-bold text-white">{d.chip}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${c.badge}`}>{d.badge}</span>
                    {d.popular && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-green-500/10 text-green-400 border border-green-500/20">Popular</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{d.maker}</p>
                  <p className="text-sm text-slate-300">{d.desc}</p>
                </div>
              </div>

              {/* Devices list */}
              <div className="px-5 pb-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-2">Common boards using this chip</p>
                <div className="flex flex-wrap gap-2">
                  {d.devices.map(dev => (
                    <span key={dev} className="px-2.5 py-1 rounded-lg text-xs bg-[#1c2845] text-slate-300 border border-[#243055]">{dev}</span>
                  ))}
                </div>
              </div>

              {/* Download buttons */}
              <div className="border-t border-[#1c2845] px-5 py-4">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">Download Driver</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { os: "🪟 Windows", info: d.windows },
                    { os: "🍎 macOS",   info: d.mac     },
                    { os: "🐧 Linux",   info: d.linux   },
                  ].map(({ os, info }) => (
                    <motion.button key={os} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => openUrl(info.url)}
                      className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${c.btn}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{os}</span>
                        <ExternalLink size={11} className="opacity-60" />
                      </div>
                      <span className="text-[10px] text-slate-500">{info.label}</span>
                      <span className="text-[10px] text-slate-600 mt-0.5 font-mono truncate w-full">{info.note}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick install tips */}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="glass rounded-xl p-5 border border-[#1c2845] space-y-3">
        <div className="flex items-center gap-2 mb-2">
          <CheckCircle2 size={15} className="text-green-400" />
          <h2 className="text-sm font-semibold text-white">After Installing Drivers</h2>
        </div>
        {[
          "Unplug and re-plug your ESP board after installing",
          "The COM port should now appear in Device Manager under Ports (COM & LPT)",
          "Click Refresh Ports in FirmFlow FlashKit toolbar to detect the new port",
          "Windows 10/11 may install CH340/CP210x automatically via Windows Update",
          "If COM port appears but can't connect, try a different USB cable (data cable, not charge-only)",
        ].map((tip, i) => (
          <div key={i} className="flex gap-3 text-sm">
            <span className="text-green-400 font-mono shrink-0 mt-0.5">→</span>
            <span className="text-slate-400">{tip}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

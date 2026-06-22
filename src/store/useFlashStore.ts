import { create } from "zustand";

export type DeviceInfo = {
  port: string;
  chip: string;
  flashSize: string;
  mac: string;
  features: string[];
  connected: boolean;
};

export type LogLine = {
  id: number;
  ts: string;
  type: "info" | "success" | "error" | "warn" | "data";
  text: string;
};

export type FlashJob = {
  id: string;
  file: string;
  chip: string;
  date: string;
  status: "success" | "failed" | "running";
  size: string;
};

type FlashStore = {
  // Connection
  ports: string[];
  selectedPort: string;
  baud: string;
  device: DeviceInfo | null;
  connecting: boolean;

  // Flash
  firmwareFile: File | null;
  flashProgress: number;
  flashing: boolean;
  erasing: boolean;

  // Serial monitor
  serialLogs: LogLine[];
  serialOpen: boolean;

  // History
  flashHistory: FlashJob[];

  // Actions
  setPorts: (p: string[]) => void;
  setSelectedPort: (p: string) => void;
  setBaud: (b: string) => void;
  setDevice: (d: DeviceInfo | null) => void;
  setConnecting: (c: boolean) => void;
  setFirmwareFile: (f: File | null) => void;
  setFlashProgress: (p: number) => void;
  setFlashing: (f: boolean) => void;
  setErasing: (e: boolean) => void;
  addLog: (type: LogLine["type"], text: string) => void;
  clearLogs: () => void;
  setSerialOpen: (o: boolean) => void;
  addHistoryJob: (j: FlashJob) => void;
};

let logId = 0;

export const useFlashStore = create<FlashStore>((set) => ({
  ports: [],
  selectedPort: "",
  baud: "115200",
  device: null,
  connecting: false,

  firmwareFile: null,
  flashProgress: 0,
  flashing: false,
  erasing: false,

  serialLogs: [],
  serialOpen: false,

  flashHistory: [
    { id: "1", file: "esp32_demo_v1.bin", chip: "ESP32", date: "2026-06-20 14:32", status: "success", size: "1.2 MB" },
    { id: "2", file: "nodemcu_fw.bin", chip: "ESP8266", date: "2026-06-21 09:11", status: "success", size: "456 KB" },
    { id: "3", file: "test_build.bin", chip: "ESP32-S3", date: "2026-06-22 08:05", status: "failed", size: "2.1 MB" },
  ],

  setPorts: (ports) => set({ ports }),
  setSelectedPort: (selectedPort) => set({ selectedPort }),
  setBaud: (baud) => set({ baud }),
  setDevice: (device) => set({ device }),
  setConnecting: (connecting) => set({ connecting }),
  setFirmwareFile: (firmwareFile) => set({ firmwareFile }),
  setFlashProgress: (flashProgress) => set({ flashProgress }),
  setFlashing: (flashing) => set({ flashing }),
  setErasing: (erasing) => set({ erasing }),
  addLog: (type, text) =>
    set((s) => ({
      serialLogs: [
        ...s.serialLogs.slice(-499),
        { id: logId++, ts: new Date().toLocaleTimeString(), type, text },
      ],
    })),
  clearLogs: () => set({ serialLogs: [] }),
  setSerialOpen: (serialOpen) => set({ serialOpen }),
  addHistoryJob: (j) => set((s) => ({ flashHistory: [j, ...s.flashHistory] })),
}));

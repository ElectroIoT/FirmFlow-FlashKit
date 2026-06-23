<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=180&section=header&text=FirmFlow%20FlashKit&fontSize=56&fontColor=fff&animation=twinkling&fontAlignY=38&desc=Professional%20ESP32%20%2F%20ESP8266%20Firmware%20Manager&descAlignY=62&descSize=17" width="100%"/>

<br/>

[![Live Demo](https://img.shields.io/badge/⚡%20Live%20Demo-Try%20Now-22c55e?style=for-the-badge&logoColor=white)](https://electroiot.github.io/FirmFlow-FlashKit/)
[![Download](https://img.shields.io/badge/⬇%20Download-Desktop%20App-06b6d4?style=for-the-badge&logoColor=white)](https://github.com/ElectroIoT/FirmFlow-FlashKit/releases)
[![GitHub Stars](https://img.shields.io/github/stars/ElectroIoT/FirmFlow-FlashKit?style=for-the-badge&color=f59e0b&logo=github)](https://github.com/ElectroIoT/FirmFlow-FlashKit/stargazers)
[![License](https://img.shields.io/badge/License-MIT-8b5cf6?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br/>

<p>
  <img src="https://img.shields.io/badge/ESP32-✓-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP8266-✓-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--S3-✓-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--C3-✓-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--S2-✓-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Tauri-2.0-FFC131?style=flat-square&logo=tauri&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white"/>
</p>

<br/>

> **The most beautiful, feature-rich tool for flashing, backing up, and managing ESP32 / ESP8266 devices.**
> Runs as a native desktop app (Tauri 2) **and** in your browser — no install needed.

<br/>

</div>

---

## 🌐 Try It Online

<div align="center">

### ⚡ No install needed — runs right in your browser

[![Open Web App](https://img.shields.io/badge/🚀%20Open%20FirmFlow%20FlashKit-electroiot.github.io-22c55e?style=for-the-badge)](https://electroiot.github.io/FirmFlow-FlashKit/)

> Works in **Chrome** and **Edge** with Web Serial API support.
> For Firefox, download the desktop app below.

</div>

---

## 🖥️ App Preview

<div align="center">

<!-- Animated Dashboard SVG -->
<svg width="780" height="420" viewBox="0 0 780 420" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style>
    .pulse{animation:pulse 2s ease-in-out infinite}
    .pulse2{animation:pulse 2s ease-in-out infinite .5s}
    .pulse3{animation:pulse 2s ease-in-out infinite 1s}
    .blink{animation:blink 1.2s step-end infinite}
    .bar1{animation:grow1 3s ease-out infinite}
    .bar2{animation:grow2 3s ease-out infinite .4s}
    .bar3{animation:grow3 3s ease-out infinite .8s}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes grow1{0%{width:0}60%{width:340px}100%{width:340px}}
    @keyframes grow2{0%{width:0}60%{width:180px}100%{width:180px}}
    @keyframes grow3{0%{width:0}60%{width:260px}100%{width:260px}}
  </style>
  <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
  <linearGradient id="pg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#06b6d4"/>
  </linearGradient>
  <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#8b5cf6"/>
    <stop offset="100%" stop-color="#06b6d4"/>
  </linearGradient>
</defs>

<!-- Window -->
<rect width="780" height="420" rx="12" fill="#060c17" stroke="#1c2845" stroke-width="1.5"/>
<rect width="780" height="420" rx="12" fill="url(#g)" fill-opacity=".5"/>

<!-- Title bar -->
<rect width="780" height="36" rx="12" fill="#0a0f1a"/>
<rect y="24" width="780" height="12" fill="#0a0f1a"/>
<circle cx="18" cy="18" r="5" fill="#ef4444" opacity=".7"/>
<circle cx="34" cy="18" r="5" fill="#f59e0b" opacity=".7"/>
<circle cx="50" cy="18" r="5" fill="#22c55e" opacity=".7"/>
<text x="390" y="23" fill="#475569" font-size="11" font-family="sans-serif" text-anchor="middle">FirmFlow FlashKit — ESP32-DevKitC · COM3</text>

<!-- Sidebar -->
<rect x="0" y="36" width="52" height="384" fill="#0a0f1a"/>
<rect x="52" y="36" width="1" height="384" fill="#1c2845"/>

<!-- Sidebar icons -->
<rect x="10" y="48"  width="32" height="28" rx="6" fill="#22c55e" fill-opacity=".15" stroke="#22c55e" stroke-opacity=".4" stroke-width="1"/>
<text x="26" y="66" text-anchor="middle" font-size="13">📊</text>
<text x="26" y="98"  text-anchor="middle" font-size="13">⚡</text>
<text x="26" y="122" text-anchor="middle" font-size="13">💾</text>
<text x="26" y="146" text-anchor="middle" font-size="13">⬆️</text>
<text x="26" y="170" text-anchor="middle" font-size="13">🖥️</text>
<text x="26" y="194" text-anchor="middle" font-size="13">🗂️</text>
<text x="26" y="218" text-anchor="middle" font-size="13">📁</text>
<text x="26" y="242" text-anchor="middle" font-size="13">🔑</text>
<text x="26" y="380" text-anchor="middle" font-size="13">🔌</text>
<text x="26" y="400" text-anchor="middle" font-size="11">⚙️</text>

<!-- Topbar -->
<rect x="52" y="36" width="728" height="40" fill="#0d1525" stroke="#1c2845" stroke-width="0"/>
<rect x="52" y="76" width="728" height="1" fill="#1c2845"/>
<!-- Port selector -->
<rect x="62" y="44" width="100" height="22" rx="4" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="68" y="59" fill="#64748b" font-size="9" font-family="monospace">COM3  ▾</text>
<rect x="170" y="44" width="70" height="22" rx="4" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="176" y="59" fill="#64748b" font-size="9" font-family="monospace">115200  ▾</text>
<!-- Connected badge -->
<rect x="580" y="44" width="90" height="22" rx="11" fill="#22c55e" fill-opacity=".12" stroke="#22c55e" stroke-opacity=".5" stroke-width="1"/>
<circle cx="592" cy="55" r="4" fill="#22c55e" class="pulse"/>
<text x="600" y="59" fill="#22c55e" font-size="9" font-family="monospace">ESP32-D0WD</text>
<!-- Disconnect btn -->
<rect x="680" y="44" width="90" height="22" rx="4" fill="#ef4444" fill-opacity=".1" stroke="#ef4444" stroke-opacity=".4" stroke-width="1"/>
<text x="725" y="59" fill="#ef4444" font-size="9" font-family="monospace" text-anchor="middle">Disconnect</text>

<!-- Main content area -->
<!-- Stat cards row -->
<rect x="62" y="88" width="155" height="68" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="76" y="107" fill="#64748b" font-size="8" font-family="sans-serif">CHIP</text>
<text x="76" y="125" fill="#4ade80" font-size="13" font-family="monospace" font-weight="bold">ESP32-D0WD</text>
<text x="76" y="142" fill="#475569" font-size="8" font-family="sans-serif">240 MHz · Xtensa LX6</text>

<rect x="226" y="88" width="155" height="68" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="240" y="107" fill="#64748b" font-size="8" font-family="sans-serif">FLASH SIZE</text>
<text x="240" y="125" fill="#22d3ee" font-size="13" font-family="monospace" font-weight="bold">4 MB</text>
<text x="240" y="142" fill="#475569" font-size="8" font-family="sans-serif">QIO · 80MHz</text>

<rect x="390" y="88" width="155" height="68" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="404" y="107" fill="#64748b" font-size="8" font-family="sans-serif">FLASH OPS</text>
<text x="404" y="125" fill="#4ade80" font-size="13" font-family="monospace" font-weight="bold">12 Success</text>
<text x="404" y="142" fill="#475569" font-size="8" font-family="sans-serif">0 failed this session</text>

<rect x="554" y="88" width="218" height="68" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="568" y="107" fill="#64748b" font-size="8" font-family="sans-serif">MAC ADDRESS</text>
<text x="568" y="125" fill="#a78bfa" font-size="11" font-family="monospace" font-weight="bold">A4:CF:12:78:3E:B2</text>
<text x="568" y="142" fill="#475569" font-size="8" font-family="sans-serif">BT · BLE · WiFi 802.11 b/g/n</text>

<!-- Flash progress section -->
<rect x="62" y="168" width="450" height="140" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="78" y="188" fill="#4ade80" font-size="10" font-family="monospace">⚡ Flash Firmware</text>
<!-- Drop zone -->
<rect x="78" y="198" width="418" height="50" rx="6" fill="#060c17" stroke="#1c2845" stroke-width="1" stroke-dasharray="4,3"/>
<text x="287" y="226" fill="#475569" font-size="9" font-family="sans-serif" text-anchor="middle">Drop firmware.bin here or click to browse</text>
<!-- Progress bar -->
<text x="78" y="268" fill="#64748b" font-size="8" font-family="monospace">Flashing:  firmware_v2.1.bin  →  84%</text>
<rect x="78" y="274" width="418" height="8" rx="4" fill="#1c2845"/>
<rect x="78" y="274" width="351" height="8" rx="4" fill="url(#pg)" class="bar1"/>
<text x="78" y="296" fill="#22c55e" font-size="8" font-family="monospace">Writing @ 0x10000 · 2.4 MB/s · 00:12 remaining</text>

<!-- Serial monitor mini -->
<rect x="522" y="168" width="250" height="140" rx="8" fill="#060b14" stroke="#1c2845" stroke-width="1"/>
<text x="538" y="186" fill="#4ade80" font-size="10" font-family="monospace">🖥 Serial Monitor</text>
<text x="536" y="202" fill="#475569" font-size="7" font-family="monospace">14:32:01</text>
<text x="574" y="202" fill="#4ade80"  font-size="7" font-family="monospace">[OK]  esptool v4.8.1</text>
<text x="536" y="214" fill="#475569" font-size="7" font-family="monospace">14:32:02</text>
<text x="574" y="214" fill="#22d3ee" font-size="7" font-family="monospace">[DATA] Chip: ESP32-D0WD</text>
<text x="536" y="226" fill="#475569" font-size="7" font-family="monospace">14:32:03</text>
<text x="574" y="226" fill="#4ade80"  font-size="7" font-family="monospace">[OK]  Flash: 4MB QIO</text>
<text x="536" y="238" fill="#475569" font-size="7" font-family="monospace">14:32:04</text>
<text x="574" y="238" fill="#fbbf24" font-size="7" font-family="monospace">[WARN] Heap: 142KB</text>
<text x="536" y="250" fill="#475569" font-size="7" font-family="monospace">14:32:05</text>
<text x="574" y="250" fill="#4ade80"  font-size="7" font-family="monospace">[OK]  Writing flash...</text>
<text x="536" y="262" fill="#475569" font-size="7" font-family="monospace">14:32:06</text>
<text x="574" y="262" fill="#22d3ee" font-size="7" font-family="monospace">[DATA] 84% @ 2.4 MB/s<tspan class="blink">▌</tspan></text>
<!-- Input bar -->
<rect x="530" y="272" width="234" height="22" rx="4" fill="#060c17" stroke="#1c2845" stroke-width="1"/>
<text x="540" y="286" fill="#4ade80" font-size="10">›</text>
<text x="550" y="286" fill="#334155" font-size="8" font-family="monospace">Send command...</text>

<!-- Partition visual -->
<rect x="62" y="320" width="710" height="72" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="78" y="338" fill="#64748b" font-size="9" font-family="monospace">🗂  Partition Table — 4 MB Flash</text>
<!-- Partition bar segments -->
<rect x="78"  y="346" width="40"  height="14" rx="2" fill="#f59e0b" fill-opacity=".8"/>
<rect x="120" y="346" width="14"  height="14" rx="2" fill="#22d3ee" fill-opacity=".8"/>
<rect x="136" y="346" width="280" height="14" rx="2" fill="#22c55e" fill-opacity=".8"/>
<rect x="418" y="346" width="280" height="14" rx="2" fill="#3b82f6" fill-opacity=".5"/>
<rect x="700" y="346" width="88"  height="14" rx="2" fill="#8b5cf6" fill-opacity=".8"/>
<text x="78"  y="374" fill="#f59e0b" font-size="7" font-family="monospace">NVS 24KB</text>
<text x="120" y="374" fill="#22d3ee" font-size="7" font-family="monospace">OTA</text>
<text x="186" y="374" fill="#4ade80" font-size="7" font-family="monospace">App0 (OTA_0) 1.25MB</text>
<text x="490" y="374" fill="#93c5fd" font-size="7" font-family="monospace">App1 (OTA_1) 1.25MB</text>
<text x="700" y="374" fill="#a78bfa" font-size="7" font-family="monospace">SPIFFS 512KB</text>
</svg>

</div>

---

## ✨ Features

<div align="center">

| | Feature | Description |
|:--:|:--------|:------------|
| ⚡ | **Flash Firmware** | Drag & drop `.bin`, flash mode/freq/offset config, animated progress |
| 💾 | **Backup & Restore** | Full chip dump or per-partition backup with MD5 integrity verify |
| 🖥️ | **Serial Monitor** | Live color-coded terminal, send commands, export `.txt` logs |
| 🗂️ | **Partition Viewer** | Visual flash map + full partition table with sizes and offsets |
| 📁 | **File System Manager** | Browse, upload & delete files on SPIFFS / LittleFS / FATFS |
| 🔑 | **NVS Inspector** | Read ESP32 Non-Volatile Storage namespaces and key-value pairs |
| 📋 | **Flash History** | Full log of every flash operation with status and file info |
| 🔌 | **USB Driver Downloads** | CH340, CP2102, FTDI FT232, PL2303, CH9102 — Windows/Mac/Linux |
| ⚙️ | **Settings** | esptool path, baud rate defaults, theme preferences |
| ❤️ | **About & Credits** | Open-source library credits, MIT license, developer profiles |

</div>

---

## 🚀 Quick Start

### 🌐 Option 1 — Use Online (Zero Install)

**[➜ Open FirmFlow FlashKit in your browser](https://electroiot.github.io/FirmFlow-FlashKit/)**

> Requires Chrome or Edge for Web Serial API device access.

---

### 🖥️ Option 2 — Desktop App (Windows / macOS / Linux)

```bash
# Clone
git clone https://github.com/ElectroIoT/FirmFlow-FlashKit.git
cd FirmFlow-FlashKit

# Install dependencies
npm install

# Dev mode (hot reload)
npm run tauri dev

# Production build
npm run tauri build
# → Output: src-tauri/target/release/bundle/
```

**Or use the one-click launcher (Windows):**
```
Double-click LAUNCH.bat
```
> Auto-downloads Node.js, installs Rust, builds and launches — fully portable.

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|:------|:-----------|
| 🦀 Native shell | Rust + **Tauri 2** |
| ⚛️ UI | **React 19** + TypeScript |
| 🎨 Styling | **Tailwind CSS v4** |
| ✨ Animation | **Framer Motion** |
| 🗃️ State | **Zustand** |
| 🔧 Flash | **esptool.py v4.8** |
| 📦 Build | **Vite 7** |
| 🌐 Web deploy | **GitHub Pages** + Actions |

</div>

---

## 🗺️ Roadmap

- [x] Flash firmware with drag & drop
- [x] Full flash backup & restore with MD5 verify
- [x] Serial monitor with send/receive + export
- [x] Partition table with visual map
- [x] File system manager (SPIFFS / LittleFS / FATFS)
- [x] NVS key-value inspector
- [x] Flash history log
- [x] USB driver download page
- [x] Web app on GitHub Pages
- [x] One-click portable launcher (Windows)
- [ ] Real esptool.py Tauri command integration
- [ ] OTA push over Wi-Fi
- [ ] Multi-device batch flashing
- [ ] eFuse reader
- [ ] Auto-update via GitHub releases

---

## 👥 Contributors

<div align="center">

<table>
<tr>
<td align="center" width="200">
<a href="https://github.com/ElectroIoT">
<img src="https://github.com/ElectroIoT.png" width="90" height="90" style="border-radius:50%" alt="ElectroIoT"/>
<br/><strong>ElectroIoT</strong>
</a><br/>
<sub>Lead Developer</sub><br/>
<a href="mailto:electroiot.in@gmail.com">electroiot.in@gmail.com</a>
</td>
<td align="center" width="200">
<a href="https://github.com/manoranjan2050">
<img src="https://github.com/manoranjan2050.png" width="90" height="90" style="border-radius:50%" alt="Manoranjan"/>
<br/><strong>Manoranjan</strong>
</a><br/>
<sub>Co-Developer</sub><br/>
<a href="mailto:manoranjan2050@live.com">manoranjan2050@live.com</a>
</td>
</tr>
</table>

</div>

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

FirmFlow FlashKit is **free and open-source** under the **MIT License**.

```
Copyright (c) 2026 ElectroIoT & Manoranjan
```

See [LICENSE](LICENSE) for full text.

---

<div align="center">

**Built with ❤️ by [ElectroIoT](https://github.com/ElectroIoT) & [Manoranjan](https://github.com/manoranjan2050)**

[![Try Online](https://img.shields.io/badge/⚡%20Try%20Online-FirmFlow%20FlashKit-22c55e?style=for-the-badge)](https://electroiot.github.io/FirmFlow-FlashKit/)

Powered by [esptool.py](https://github.com/espressif/esptool) · [Tauri](https://tauri.app) · [React](https://react.dev) · [Framer Motion](https://www.framer.com/motion/)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>

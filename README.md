<div align="center">

<!-- Animated Hero Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=FirmFlow%20FlashKit&fontSize=60&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Professional%20ESP32%20%2F%20ESP8266%20Firmware%20Manager&descAlignY=60&descSize=18" width="100%"/>

<!-- Badges Row 1 -->
<p>
  <img src="https://img.shields.io/badge/Version-1.0.0-22c55e?style=for-the-badge&logo=semanticrelease&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tauri-2.0-FFC131?style=for-the-badge&logo=tauri&logoColor=black"/>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
</p>

<!-- Badges Row 2 -->
<p>
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Framer_Motion-Animated-FF0055?style=for-the-badge&logo=framer&logoColor=white"/>
  <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-8B5CF6?style=for-the-badge&logo=windowsterminal&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge&logo=opensourceinitiative&logoColor=white"/>
</p>

<!-- Chip support badges -->
<p>
  <img src="https://img.shields.io/badge/ESP32-Supported-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP8266-Supported-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--S3-Supported-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--C3-Supported-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESP32--S2-Supported-22c55e?style=flat-square&logo=espressif&logoColor=white"/>
</p>

<br/>

> **⚡ The most beautiful, feature-rich desktop app for flashing, backing up, and managing ESP32 / ESP8266 devices.**
> Built with Tauri 2 + React 19 for a native, lightweight experience on Windows, macOS, and Linux.

<br/>

</div>

---

## 🎬 App Preview

<div align="center">

<!-- Animated Dashboard SVG Screenshot -->
<svg width="780" height="480" viewBox="0 0 780 480" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style>
    .pulse{animation:pulse 2s ease-in-out infinite}
    .pulse2{animation:pulse 2s ease-in-out infinite .5s}
    .pulse3{animation:pulse 2s ease-in-out infinite 1s}
    .blink{animation:blink 1.2s step-end infinite}
    .slide{animation:slide 8s ease-in-out infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes slide{0%{width:0}60%{width:520px}80%{width:520px}100%{width:0}}
  </style>
  <pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
  <linearGradient id="pg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#06b6d4"/>
  </linearGradient>
  <filter id="glow">
    <feGaussianBlur stdDeviation="3" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>

<!-- Window chrome -->
<rect width="780" height="480" rx="12" fill="#060c17" stroke="#1c2845" stroke-width="1.5"/>
<rect width="780" height="480" rx="12" fill="url(#g)" fill-opacity=".6"/>

<!-- Title bar -->
<rect width="780" height="36" rx="12" fill="#0a0f1a"/>
<rect y="24" width="780" height="12" fill="#0a0f1a"/>
<rect y="12" width="780" height="24" fill="#0a0f1a"/>
<circle cx="18" cy="18" r="5" fill="#ef4444" opacity=".7"/>
<circle cx="34" cy="18" r="5" fill="#f59e0b" opacity=".7"/>
<circle cx="50" cy="18" r="5" fill="#22c55e" opacity=".7"/>
<text x="390" y="23" fill="#475569" font-size="11" font-family="monospace" text-anchor="middle">FirmFlow FlashKit</text>

<!-- Sidebar bg -->
<rect x="0" y="36" width="185" height="444" fill="#0a0f1a" stroke-right="#1c2845"/>
<line x1="185" y1="36" x2="185" y2="480" stroke="#1c2845" stroke-width="1"/>

<!-- Logo row in sidebar -->
<rect x="12" y="50" width="32" height="32" rx="8" fill="url(#pg)" filter="url(#glow)"/>
<text x="28" y="72" font-size="16" text-anchor="middle">⚡</text>
<circle cx="44" cy="50" r="5" fill="#4ade80" class="pulse"/>
<text x="56" y="65" fill="white" font-size="12" font-weight="bold">FirmFlow</text>
<text x="56" y="79" fill="#4ade80" font-size="9" font-family="monospace">FlashKit v1.0</text>

<!-- Sidebar nav items -->
<rect x="10" y="97" width="165" height="30" rx="7" fill="#22c55e" fill-opacity=".12" stroke="#22c55e" stroke-opacity=".4" stroke-width="1"/>
<text x="22" y="117" font-size="13">📊</text>
<text x="42" y="117" fill="#4ade80" font-size="11">Dashboard</text>
<circle cx="168" cy="112" r="4" fill="#4ade80" class="pulse"/>

<text x="22" y="146" font-size="12">⚡</text><text x="42" y="146" fill="#64748b" font-size="11">Flash</text>
<text x="22" y="170" font-size="12">💾</text><text x="42" y="170" fill="#64748b" font-size="11">Backup</text>
<text x="22" y="194" font-size="12">⬆</text><text x="42" y="194" fill="#64748b" font-size="11">Restore</text>
<text x="22" y="218" font-size="12">🖥</text><text x="42" y="218" fill="#64748b" font-size="11">Serial Monitor</text>
<text x="22" y="242" font-size="12">🗂</text><text x="42" y="242" fill="#64748b" font-size="11">Partitions</text>
<text x="22" y="266" font-size="12">📋</text><text x="42" y="266" fill="#64748b" font-size="11">History</text>
<text x="22" y="290" font-size="12">⚙</text><text x="42" y="290" fill="#64748b" font-size="11">Settings</text>

<!-- esptool badge -->
<rect x="10" y="448" width="165" height="26" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="18" y="460" fill="#475569" font-size="8" font-family="monospace">esptool.py</text>
<text x="18" y="471" fill="#4ade80" font-size="9" font-family="monospace">v4.8.1 ready</text>

<!-- Topbar -->
<rect x="185" y="36" width="595" height="42" fill="#0a0f1a" stroke-bottom="1"/>
<line x1="185" y1="78" x2="780" y2="78" stroke="#1c2845" stroke-width="1"/>

<!-- Port pill -->
<rect x="196" y="48" width="90" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="204" y="63" fill="#94a3b8" font-size="10">🔌 COM4 ▾</text>

<!-- Baud pill -->
<rect x="294" y="48" width="100" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="302" y="63" fill="#94a3b8" font-size="10">Baud 115200 ▾</text>

<!-- Connected btn -->
<rect x="402" y="48" width="100" height="22" rx="6" fill="#22c55e" fill-opacity=".12" stroke="#22c55e" stroke-opacity=".4" stroke-width="1"/>
<circle cx="414" cy="59" r="4" fill="#4ade80" class="pulse"/>
<text x="422" y="64" fill="#4ade80" font-size="10">Connected</text>

<!-- Chip badge -->
<rect x="510" y="48" width="140" height="22" rx="6" fill="#0f1729" stroke="#22c55e" stroke-opacity=".3" stroke-width="1"/>
<circle cx="522" cy="59" r="4" fill="#4ade80" class="pulse2"/>
<text x="530" y="64" fill="#4ade80" font-size="10" font-family="monospace">ESP32-D0WD · 4MB</text>

<!-- Main content area -->
<!-- Page title -->
<text x="202" y="104" fill="white" font-size="16" font-weight="bold">Dashboard</text>
<text x="202" y="118" fill="#64748b" font-size="10">FirmFlow FlashKit — ESP32 / ESP8266 device manager</text>

<!-- Stat Cards row -->
<!-- Card 1 -->
<rect x="202" y="128" width="135" height="70" rx="9" fill="#0f1729" stroke="#22c55e" stroke-opacity=".25" stroke-width="1"/>
<text x="214" y="146" fill="#475569" font-size="8" font-family="monospace">CHIP</text>
<text x="214" y="165" fill="white" font-size="18" font-weight="bold">ESP32</text>
<text x="214" y="180" fill="#64748b" font-size="9">Connected</text>
<text x="322" y="155" font-size="18">🖥</text>

<!-- Card 2 -->
<rect x="344" y="128" width="135" height="70" rx="9" fill="#0f1729" stroke="#06b6d4" stroke-opacity=".25" stroke-width="1"/>
<text x="356" y="146" fill="#475569" font-size="8" font-family="monospace">FLASH</text>
<text x="356" y="165" fill="white" font-size="18" font-weight="bold">4 MB</text>
<text x="356" y="180" fill="#64748b" font-size="9">Total flash size</text>
<text x="462" y="155" font-size="18">💽</text>

<!-- Card 3 -->
<rect x="486" y="128" width="135" height="70" rx="9" fill="#0f1729" stroke="#22c55e" stroke-opacity=".25" stroke-width="1"/>
<text x="498" y="146" fill="#475569" font-size="8" font-family="monospace">SUCCESS</text>
<text x="498" y="165" fill="white" font-size="18" font-weight="bold">12</text>
<text x="498" y="180" fill="#64748b" font-size="9">Total flashes</text>
<text x="604" y="155" font-size="18">✅</text>

<!-- Card 4 -->
<rect x="628" y="128" width="137" height="70" rx="9" fill="#0f1729" stroke="#f59e0b" stroke-opacity=".25" stroke-width="1"/>
<text x="640" y="146" fill="#475569" font-size="8" font-family="monospace">FAILED</text>
<text x="640" y="165" fill="white" font-size="18" font-weight="bold">1</text>
<text x="640" y="180" fill="#64748b" font-size="9">Total errors</text>
<text x="746" y="155" font-size="18">⚠</text>

<!-- Device info card -->
<rect x="202" y="210" width="280" height="130" rx="9" fill="#0f1729" stroke="#22c55e" stroke-opacity=".25" stroke-width="1"/>
<text x="216" y="228" fill="white" font-size="11" font-weight="bold">🖥 Device Info</text>
<circle cx="470" cy="222" r="5" fill="#4ade80" class="pulse3"/>
<line x1="202" y1="235" x2="482" y2="235" stroke="#1c2845" stroke-width=".5"/>
<text x="216" y="252" fill="#64748b" font-size="10">Chip</text><text x="380" y="252" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">ESP32-D0WD-V3</text>
<text x="216" y="268" fill="#64748b" font-size="10">Flash</text><text x="380" y="268" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">4 MB</text>
<text x="216" y="284" fill="#64748b" font-size="10">MAC Address</text><text x="480" y="284" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">A4:CF:12:78:3E:B2</text>
<text x="216" y="300" fill="#64748b" font-size="10">Port</text><text x="380" y="300" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">COM4</text>
<text x="216" y="316" fill="#64748b" font-size="10">Silicon Rev</text><text x="380" y="316" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">v3.1</text>
<text x="216" y="332" fill="#64748b" font-size="10">Crystal</text><text x="380" y="332" fill="#4ade80" font-size="10" font-family="monospace" text-anchor="end">40 MHz</text>

<!-- Features card -->
<rect x="490" y="210" width="275" height="130" rx="9" fill="#0f1729" stroke="#06b6d4" stroke-opacity=".25" stroke-width="1"/>
<text x="504" y="228" fill="white" font-size="11" font-weight="bold">📶 Features</text>
<line x1="490" y1="235" x2="765" y2="235" stroke="#1c2845" stroke-width=".5"/>
<rect x="504" y="244" width="38" height="18" rx="9" fill="#06b6d4" fill-opacity=".12" stroke="#06b6d4" stroke-opacity=".3" stroke-width=".8"/>
<text x="523" y="257" fill="#22d3ee" font-size="9" text-anchor="middle">WiFi</text>
<rect x="548" y="244" width="24" height="18" rx="9" fill="#06b6d4" fill-opacity=".12" stroke="#06b6d4" stroke-opacity=".3" stroke-width=".8"/>
<text x="560" y="257" fill="#22d3ee" font-size="9" text-anchor="middle">BT</text>
<rect x="578" y="244" width="62" height="18" rx="9" fill="#06b6d4" fill-opacity=".12" stroke="#06b6d4" stroke-opacity=".3" stroke-width=".8"/>
<text x="609" y="257" fill="#22d3ee" font-size="9" text-anchor="middle">Dual Core</text>
<rect x="646" y="244" width="56" height="18" rx="9" fill="#06b6d4" fill-opacity=".12" stroke="#06b6d4" stroke-opacity=".3" stroke-width=".8"/>
<text x="674" y="257" fill="#22d3ee" font-size="9" text-anchor="middle">240 MHz</text>
<rect x="504" y="268" width="30" height="18" rx="9" fill="#06b6d4" fill-opacity=".12" stroke="#06b6d4" stroke-opacity=".3" stroke-width=".8"/>
<text x="519" y="281" fill="#22d3ee" font-size="9" text-anchor="middle">BLE</text>
<rect x="504" y="296" width="246" height="38" rx="7" fill="#06b6d4" fill-opacity=".05" stroke="#06b6d4" stroke-opacity=".15" stroke-width=".8"/>
<text x="514" y="311" fill="#475569" font-size="9" font-family="monospace">MAC: A4:CF:12:78:3E:B2</text>
<text x="514" y="326" fill="#22d3ee" font-size="9" font-family="monospace">Silicon Rev: 3 · Crystal: 40MHz</text>

<!-- Recent activity -->
<rect x="202" y="352" width="563" height="116" rx="9" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="216" y="370" fill="white" font-size="11" font-weight="bold">📋 Recent Activity</text>
<line x1="202" y1="377" x2="765" y2="377" stroke="#1c2845" stroke-width=".5"/>

<text x="218" y="394" font-size="10">✅</text><text x="234" y="394" fill="#cbd5e1" font-size="10" font-family="monospace">esp32_demo_v1.bin</text><text x="500" y="394" fill="#64748b" font-size="9">ESP32</text><text x="700" y="394" fill="#475569" font-size="9" font-family="monospace">2026-06-20 14:32</text>
<line x1="210" y1="400" x2="758" y2="400" stroke="#1c2845" stroke-width=".3"/>

<text x="218" y="416" font-size="10">✅</text><text x="234" y="416" fill="#cbd5e1" font-size="10" font-family="monospace">nodemcu_fw.bin</text><text x="500" y="416" fill="#64748b" font-size="9">ESP8266</text><text x="700" y="416" fill="#475569" font-size="9" font-family="monospace">2026-06-21 09:11</text>
<line x1="210" y1="422" x2="758" y2="422" stroke="#1c2845" stroke-width=".3"/>

<text x="218" y="438" font-size="10">❌</text><text x="234" y="438" fill="#cbd5e1" font-size="10" font-family="monospace">test_build.bin</text><text x="500" y="438" fill="#64748b" font-size="9">ESP32-S3</text><text x="700" y="438" fill="#475569" font-size="9" font-family="monospace">2026-06-22 08:05</text>
<line x1="210" y1="444" x2="758" y2="444" stroke="#1c2845" stroke-width=".3"/>

<text x="218" y="460" font-size="10">✅</text><text x="234" y="460" fill="#cbd5e1" font-size="10" font-family="monospace">production_v2.bin</text><text x="500" y="460" fill="#64748b" font-size="9">ESP32</text><text x="700" y="460" fill="#475569" font-size="9" font-family="monospace">2026-06-22 11:30</text>
</svg>

**Dashboard — Live device overview with stats, chip info, features, and recent activity**

</div>

---

<div align="center">

<!-- Flash Page SVG -->
<svg width="780" height="420" viewBox="0 0 780 420" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style>.p{animation:p 2s ease-in-out infinite}.p2{animation:p 2s ease-in-out infinite .5s}@keyframes p{0%,100%{opacity:1}50%{opacity:.3}}</style>
  <pattern id="g2" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
  <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#06b6d4"/>
  </linearGradient>
</defs>
<rect width="780" height="420" rx="12" fill="#060c17" stroke="#1c2845" stroke-width="1.5"/>
<rect width="780" height="420" rx="12" fill="url(#g2)" fill-opacity=".5"/>

<!-- Sidebar minimal -->
<rect x="0" y="0" width="185" height="420" fill="#0a0f1a"/>
<line x1="185" y1="0" x2="185" y2="420" stroke="#1c2845" stroke-width="1"/>
<rect x="12" y="14" width="32" height="32" rx="8" fill="url(#pg2)"/>
<text x="28" y="36" font-size="16" text-anchor="middle">⚡</text>
<text x="56" y="29" fill="white" font-size="12" font-weight="bold">FirmFlow</text>
<text x="56" y="43" fill="#4ade80" font-size="9" font-family="monospace">FlashKit v1.0</text>

<text x="22" y="78" font-size="12">📊</text><text x="42" y="78" fill="#64748b" font-size="11">Dashboard</text>
<rect x="10" y="86" width="165" height="28" rx="7" fill="#22c55e" fill-opacity=".12" stroke="#22c55e" stroke-opacity=".4" stroke-width="1"/>
<text x="22" y="105" font-size="12">⚡</text><text x="42" y="105" fill="#4ade80" font-size="11">Flash</text>
<circle cx="168" cy="100" r="4" fill="#4ade80" class="p"/>
<text x="22" y="130" font-size="12">💾</text><text x="42" y="130" fill="#64748b" font-size="11">Backup</text>
<text x="22" y="154" font-size="12">⬆</text><text x="42" y="154" fill="#64748b" font-size="11">Restore</text>
<text x="22" y="178" font-size="12">🖥</text><text x="42" y="178" fill="#64748b" font-size="11">Serial Monitor</text>

<!-- Topbar -->
<rect x="185" y="0" width="595" height="56" fill="#0a0f1a"/>
<line x1="185" y1="56" x2="780" y2="56" stroke="#1c2845" stroke-width="1"/>
<rect x="196" y="16" width="90" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="204" y="31" fill="#94a3b8" font-size="10">🔌 COM4 ▾</text>
<rect x="294" y="16" width="100" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="302" y="31" fill="#94a3b8" font-size="10">Baud 115200 ▾</text>
<rect x="402" y="16" width="100" height="22" rx="6" fill="#22c55e" fill-opacity=".12" stroke="#22c55e" stroke-opacity=".4" stroke-width="1"/>
<circle cx="414" cy="27" r="4" fill="#4ade80" class="p"/>
<text x="422" y="32" fill="#4ade80" font-size="10">Connected</text>

<!-- Page title -->
<text x="202" y="84" fill="white" font-size="16" font-weight="bold">⚡ Flash Firmware</text>
<text x="202" y="98" fill="#64748b" font-size="10">Upload .bin firmware to your ESP device</text>

<!-- Drop zone - active with file -->
<rect x="202" y="110" width="563" height="100" rx="10" fill="#22c55e" fill-opacity=".05" stroke="#22c55e" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="6,3"/>
<text x="484" y="147" font-size="28" text-anchor="middle">📂</text>
<text x="484" y="170" fill="#4ade80" font-size="12" font-family="monospace" text-anchor="middle">esp32_firmware_v2.1.bin</text>
<text x="484" y="186" fill="#64748b" font-size="10" text-anchor="middle">1.24 MB · Ready to flash</text>
<text x="484" y="202" fill="#ef4444" font-size="9" text-anchor="middle">✕ Remove</text>

<!-- Options row -->
<rect x="202" y="220" width="563" height="75" rx="9" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="216" y="238" fill="white" font-size="11" font-weight="bold">Flash Options</text>

<rect x="216" y="246" width="120" height="38" rx="7" fill="#060c17" stroke="#1c2845" stroke-width="1"/>
<text x="224" y="258" fill="#475569" font-size="8" font-family="monospace">FLASH MODE</text>
<text x="224" y="276" fill="#e2e8f0" font-size="11">dio ▾</text>

<rect x="344" y="246" width="120" height="38" rx="7" fill="#060c17" stroke="#1c2845" stroke-width="1"/>
<text x="352" y="258" fill="#475569" font-size="8" font-family="monospace">FLASH FREQ</text>
<text x="352" y="276" fill="#e2e8f0" font-size="11">40m ▾</text>

<rect x="472" y="246" width="120" height="38" rx="7" fill="#060c17" stroke="#1c2845" stroke-width="1"/>
<text x="480" y="258" fill="#475569" font-size="8" font-family="monospace">FLASH SIZE</text>
<text x="480" y="276" fill="#e2e8f0" font-size="11">detect ▾</text>

<rect x="600" y="246" width="154" height="38" rx="7" fill="#060c17" stroke="#1c2845" stroke-width="1"/>
<text x="608" y="258" fill="#475569" font-size="8" font-family="monospace">FLASH OFFSET</text>
<text x="608" y="276" fill="#e2e8f0" font-size="11" font-family="monospace">0x0</text>

<!-- Progress bar -->
<rect x="202" y="306" width="563" height="50" rx="9" fill="#0f1729" stroke="#22c55e" stroke-opacity=".25" stroke-width="1"/>
<text x="216" y="323" fill="#4ade80" font-size="10" font-family="monospace">Writing...</text>
<text x="758" y="323" fill="white" font-size="10" font-family="monospace" text-anchor="end">73.4%</text>
<rect x="216" y="329" width="533" height="10" rx="5" fill="#1c2845"/>
<rect x="216" y="329" width="390" height="10" rx="5" fill="url(#pg2)">
  <animate attributeName="width" values="0;390;390;0" dur="5s" repeatCount="indefinite"/>
</rect>
<text x="216" y="350" fill="#475569" font-size="8" font-family="monospace">0x00000</text>
<text x="484" y="350" fill="#475569" font-size="8" font-family="monospace" text-anchor="middle">~8s remaining</text>
<text x="752" y="350" fill="#475569" font-size="8" font-family="monospace" text-anchor="end">0x400000</text>

<!-- Action buttons -->
<rect x="202" y="367" width="430" height="42" rx="9" fill="url(#pg2)"/>
<text x="417" y="393" fill="white" font-size="13" font-weight="bold" text-anchor="middle">⚡ Flash Firmware</text>

<rect x="641" y="367" width="124" height="42" rx="9" fill="#ef4444" fill-opacity=".1" stroke="#ef4444" stroke-opacity=".35" stroke-width="1"/>
<text x="703" y="393" fill="#f87171" font-size="12" text-anchor="middle">Erase Flash</text>
</svg>

**Flash Page — Drag & drop .bin upload with live animated progress bar**

</div>

---

<div align="center">

<!-- Serial Monitor SVG -->
<svg width="780" height="400" viewBox="0 0 780 400" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style>.cur{animation:cur 1s step-end infinite}@keyframes cur{50%{opacity:0}}</style>
  <pattern id="g3" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
</defs>
<rect width="780" height="400" rx="12" fill="#060c17" stroke="#1c2845" stroke-width="1.5"/>
<rect width="780" height="400" rx="12" fill="url(#g3)" fill-opacity=".4"/>

<!-- Sidebar minimal -->
<rect x="0" y="0" width="185" height="400" fill="#0a0f1a"/>
<line x1="185" y1="0" x2="185" y2="400" stroke="#1c2845" stroke-width="1"/>
<text x="56" y="25" fill="white" font-size="12" font-weight="bold">FirmFlow</text>
<text x="56" y="39" fill="#4ade80" font-size="9" font-family="monospace">FlashKit v1.0</text>
<text x="22" y="65" font-size="12">📊</text><text x="42" y="65" fill="#64748b" font-size="11">Dashboard</text>
<text x="22" y="89" font-size="12">⚡</text><text x="42" y="89" fill="#64748b" font-size="11">Flash</text>
<rect x="10" y="97" width="165" height="28" rx="7" fill="#06b6d4" fill-opacity=".1" stroke="#06b6d4" stroke-opacity=".35" stroke-width="1"/>
<text x="22" y="116" font-size="12">🖥</text><text x="42" y="116" fill="#22d3ee" font-size="11">Serial Monitor</text>

<!-- Topbar -->
<rect x="185" y="0" width="595" height="50" fill="#0a0f1a"/>
<line x1="185" y1="50" x2="780" y2="50" stroke="#1c2845" stroke-width="1"/>

<!-- Page header -->
<text x="202" y="74" fill="white" font-size="16" font-weight="bold">🖥 Serial Monitor</text>
<text x="202" y="88" fill="#64748b" font-size="10">Live serial output from device</text>

<!-- Toolbar buttons -->
<rect x="618" y="60" width="60" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="648" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">⏸ Pause</text>
<rect x="684" y="60" width="52" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="710" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">⬇ Log</text>
<rect x="742" y="60" width="28" height="22" rx="6" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>
<text x="756" y="75" fill="#94a3b8" font-size="9" text-anchor="middle">🗑</text>

<!-- Terminal window -->
<rect x="202" y="96" width="563" height="262" rx="10" fill="#060b14" stroke="#1c2845" stroke-width="1"/>

<!-- Terminal titlebar -->
<rect x="202" y="96" width="563" height="28" rx="10" fill="#0a0f1a"/>
<rect x="202" y="110" width="563" height="14" fill="#0a0f1a"/>
<circle cx="218" cy="110" r="5" fill="#ef4444" fill-opacity=".7"/>
<circle cx="234" cy="110" r="5" fill="#f59e0b" fill-opacity=".7"/>
<circle cx="250" cy="110" r="5" fill="#22c55e" fill-opacity=".7"/>
<text x="280" y="115" fill="#475569" font-size="9" font-family="monospace">COM4 @ 115200 baud</text>
<text x="720" y="115" fill="#475569" font-size="9" font-family="monospace" text-anchor="end">✓ Auto-scroll</text>

<!-- Log lines -->
<text x="214" y="142" fill="#475569" font-size="9" font-family="monospace">14:32:00</text>
<text x="278" y="142" fill="#94a3b8" font-size="9" font-family="monospace">[INFO] System starting up...</text>

<text x="214" y="158" fill="#475569" font-size="9" font-family="monospace">14:32:01</text>
<text x="278" y="158" fill="#4ade80" font-size="9" font-family="monospace">[OK]   esptool v4.8.1 · Chip: ESP32-D0WD-V3</text>

<text x="214" y="174" fill="#475569" font-size="9" font-family="monospace">14:32:01</text>
<text x="278" y="174" fill="#22d3ee" font-size="9" font-family="monospace">[DATA] MAC: A4:CF:12:78:3E:B2 · Flash: 4MB</text>

<text x="214" y="190" fill="#475569" font-size="9" font-family="monospace">14:32:02</text>
<text x="278" y="190" fill="#4ade80" font-size="9" font-family="monospace">[WIFI] Connecting to AP "HomeNetwork"...</text>

<text x="214" y="206" fill="#475569" font-size="9" font-family="monospace">14:32:04</text>
<text x="278" y="206" fill="#4ade80" font-size="9" font-family="monospace">[WIFI] Connected! IP: 192.168.1.42  RSSI: -54dBm</text>

<text x="214" y="222" fill="#475569" font-size="9" font-family="monospace">14:32:04</text>
<text x="278" y="222" fill="#22d3ee" font-size="9" font-family="monospace">[MQTT] Broker connected at 192.168.1.10:1883</text>

<text x="214" y="238" fill="#475569" font-size="9" font-family="monospace">14:32:06</text>
<text x="278" y="238" fill="#22d3ee" font-size="9" font-family="monospace">[SENSOR] Temp: 28.4°C  Humidity: 65%  Pressure: 1013hPa</text>

<text x="214" y="254" fill="#475569" font-size="9" font-family="monospace">14:32:08</text>
<text x="278" y="254" fill="#fbbf24" font-size="9" font-family="monospace">[WARN] Heap free: 142KB (low memory warning)</text>

<text x="214" y="270" fill="#475569" font-size="9" font-family="monospace">14:32:09</text>
<text x="278" y="270" fill="#4ade80" font-size="9" font-family="monospace">[LOOP] Heartbeat #47 · Uptime: 9s</text>

<text x="214" y="286" fill="#475569" font-size="9" font-family="monospace">14:32:10</text>
<text x="278" y="286" fill="#22d3ee" font-size="9" font-family="monospace">[OTA]  Checking for update... No update available.</text>

<text x="214" y="302" fill="#475569" font-size="9" font-family="monospace">14:32:11</text>
<text x="278" y="302" fill="#4ade80" font-size="9" font-family="monospace">[LOOP] Heartbeat #48 · Uptime: 11s</text>

<text x="214" y="318" fill="#475569" font-size="9" font-family="monospace">14:32:12</text>
<text x="278" y="318" fill="#22d3ee" font-size="9" font-family="monospace">[DATA] Publishing to topic: home/sensor/data</text>

<!-- Scrollbar -->
<rect x="757" y="125" width="4" height="225" rx="2" fill="#1c2845"/>
<rect x="757" y="190" width="4" height="60" rx="2" fill="#22c55e" fill-opacity=".5"/>

<!-- Input bar -->
<rect x="202" y="358" width="563" height="40" rx="10" fill="#060b14" stroke="#1c2845" stroke-width="1"/>
<text x="220" y="383" fill="#4ade80" font-size="12">›</text>
<text x="236" y="382" fill="#64748b" font-size="10" font-family="monospace">Send command to device...</text>
<text x="749" y="383" font-size="12" text-anchor="end">➤</text>
</svg>

**Serial Monitor — Color-coded live output with timestamps, send/receive, and log export**

</div>

---

<div align="center">

<!-- Partitions SVG -->
<svg width="780" height="380" viewBox="0 0 780 380" xmlns="http://www.w3.org/2000/svg">
<defs>
  <pattern id="g4" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
</defs>
<rect width="780" height="380" rx="12" fill="#060c17" stroke="#1c2845" stroke-width="1.5"/>
<rect width="780" height="380" rx="12" fill="url(#g4)" fill-opacity=".4"/>

<!-- Sidebar -->
<rect x="0" y="0" width="185" height="380" fill="#0a0f1a"/>
<line x1="185" y1="0" x2="185" y2="380" stroke="#1c2845" stroke-width="1"/>
<text x="56" y="25" fill="white" font-size="12" font-weight="bold">FirmFlow</text>
<text x="56" y="39" fill="#4ade80" font-size="9" font-family="monospace">FlashKit v1.0</text>
<text x="22" y="65" font-size="12">📊</text><text x="42" y="65" fill="#64748b" font-size="11">Dashboard</text>
<text x="22" y="89" font-size="12">⚡</text><text x="42" y="89" fill="#64748b" font-size="11">Flash</text>
<rect x="10" y="97" width="165" height="28" rx="7" fill="#8b5cf6" fill-opacity=".1" stroke="#8b5cf6" stroke-opacity=".35" stroke-width="1"/>
<text x="22" y="116" font-size="12">🗂</text><text x="42" y="116" fill="#a78bfa" font-size="11">Partitions</text>

<!-- Topbar -->
<rect x="185" y="0" width="595" height="50" fill="#0a0f1a"/>
<line x1="185" y1="50" x2="780" y2="50" stroke="#1c2845" stroke-width="1"/>
<text x="202" y="75" fill="white" font-size="16" font-weight="bold">🗂 Partition Table</text>
<text x="202" y="90" fill="#64748b" font-size="10">Flash memory layout — ESP32-D0WD-V3 · 4MB</text>

<!-- Flash map label -->
<text x="202" y="114" fill="#475569" font-size="8" font-family="monospace" letter-spacing="3">FLASH MAP — 4 MB TOTAL</text>

<!-- Visual flash bar -->
<rect x="202" y="120" width="563" height="36" rx="8" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>

<!-- Segments -->
<rect x="203" y="121" width="24" height="34" rx="4" fill="#f59e0b">
  <animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite"/>
</rect>
<text x="215" y="143" fill="white" font-size="7" text-anchor="middle" font-weight="bold">nvs</text>

<rect x="228" y="121" width="10" height="34" fill="#06b6d4">
  <animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite" begin=".3s"/>
</rect>

<rect x="239" y="121" width="188" height="34" fill="#22c55e">
  <animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite" begin=".6s"/>
</rect>
<text x="333" y="143" fill="white" font-size="8" text-anchor="middle" font-weight="bold">app0 (OTA_0)</text>

<rect x="428" y="121" width="188" height="34" fill="#3b82f6">
  <animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite" begin=".9s"/>
</rect>
<text x="522" y="143" fill="white" font-size="8" text-anchor="middle" font-weight="bold">app1 (OTA_1)</text>

<rect x="617" y="121" width="148" height="34" rx="0" fill="#8b5cf6">
  <animate attributeName="opacity" values=".7;1;.7" dur="3s" repeatCount="indefinite" begin="1.2s"/>
</rect>
<rect x="763" y="121" width="2" height="34" rx="2" fill="#8b5cf6"/>
<text x="691" y="143" fill="white" font-size="8" text-anchor="middle" font-weight="bold">spiffs</text>

<!-- Address labels -->
<text x="202" y="172" fill="#475569" font-size="8" font-family="monospace">0x0000</text>
<text x="382" y="172" fill="#475569" font-size="8" font-family="monospace" text-anchor="middle">0x200000</text>
<text x="764" y="172" fill="#475569" font-size="8" font-family="monospace" text-anchor="end">0x400000</text>

<!-- Partition table -->
<rect x="202" y="182" width="563" height="186" rx="9" fill="#0f1729" stroke="#1c2845" stroke-width="1"/>

<!-- Table header -->
<rect x="202" y="182" width="563" height="26" rx="9" fill="#0a0f1a"/>
<rect x="202" y="196" width="563" height="12" fill="#0a0f1a"/>
<text x="216" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1">NAME</text>
<text x="300" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1">TYPE</text>
<text x="360" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1">SUBTYPE</text>
<text x="460" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1">OFFSET</text>
<text x="550" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1">SIZE</text>
<text x="700" y="198" fill="#475569" font-size="8" font-family="monospace" letter-spacing="1" text-anchor="end">KB</text>

<line x1="202" y1="208" x2="765" y2="208" stroke="#1c2845" stroke-width=".5"/>

<!-- Rows -->
<circle cx="222" cy="224" r="5" fill="#f59e0b"/>
<text x="232" y="228" fill="#cbd5e1" font-size="10" font-family="monospace">nvs</text>
<text x="300" y="228" fill="#64748b" font-size="10" font-family="monospace">data</text>
<text x="360" y="228" fill="#64748b" font-size="10" font-family="monospace">nvs</text>
<text x="460" y="228" fill="#22d3ee" font-size="10" font-family="monospace">0x9000</text>
<text x="550" y="228" fill="#a78bfa" font-size="10" font-family="monospace">0x6000</text>
<text x="700" y="228" fill="#64748b" font-size="10" font-family="monospace" text-anchor="end">24 KB</text>

<line x1="210" y1="234" x2="758" y2="234" stroke="#1c2845" stroke-width=".3"/>

<circle cx="222" cy="250" r="5" fill="#06b6d4"/>
<text x="232" y="254" fill="#cbd5e1" font-size="10" font-family="monospace">otadata</text>
<text x="300" y="254" fill="#64748b" font-size="10" font-family="monospace">data</text>
<text x="360" y="254" fill="#64748b" font-size="10" font-family="monospace">ota</text>
<text x="460" y="254" fill="#22d3ee" font-size="10" font-family="monospace">0xF000</text>
<text x="550" y="254" fill="#a78bfa" font-size="10" font-family="monospace">0x2000</text>
<text x="700" y="254" fill="#64748b" font-size="10" font-family="monospace" text-anchor="end">8 KB</text>

<line x1="210" y1="260" x2="758" y2="260" stroke="#1c2845" stroke-width=".3"/>

<circle cx="222" cy="276" r="5" fill="#22c55e"/>
<text x="232" y="280" fill="#cbd5e1" font-size="10" font-family="monospace">app0</text>
<text x="300" y="280" fill="#64748b" font-size="10" font-family="monospace">app</text>
<text x="360" y="280" fill="#64748b" font-size="10" font-family="monospace">ota_0</text>
<text x="460" y="280" fill="#22d3ee" font-size="10" font-family="monospace">0x10000</text>
<text x="550" y="280" fill="#a78bfa" font-size="10" font-family="monospace">0x140000</text>
<text x="700" y="280" fill="#64748b" font-size="10" font-family="monospace" text-anchor="end">1280 KB</text>

<line x1="210" y1="286" x2="758" y2="286" stroke="#1c2845" stroke-width=".3"/>

<circle cx="222" cy="302" r="5" fill="#3b82f6"/>
<text x="232" y="306" fill="#cbd5e1" font-size="10" font-family="monospace">app1</text>
<text x="300" y="306" fill="#64748b" font-size="10" font-family="monospace">app</text>
<text x="360" y="306" fill="#64748b" font-size="10" font-family="monospace">ota_1</text>
<text x="460" y="306" fill="#22d3ee" font-size="10" font-family="monospace">0x150000</text>
<text x="550" y="306" fill="#a78bfa" font-size="10" font-family="monospace">0x140000</text>
<text x="700" y="306" fill="#64748b" font-size="10" font-family="monospace" text-anchor="end">1280 KB</text>

<line x1="210" y1="312" x2="758" y2="312" stroke="#1c2845" stroke-width=".3"/>

<circle cx="222" cy="328" r="5" fill="#8b5cf6"/>
<text x="232" y="332" fill="#cbd5e1" font-size="10" font-family="monospace">spiffs</text>
<text x="300" y="332" fill="#64748b" font-size="10" font-family="monospace">data</text>
<text x="360" y="332" fill="#64748b" font-size="10" font-family="monospace">spiffs</text>
<text x="460" y="332" fill="#22d3ee" font-size="10" font-family="monospace">0x290000</text>
<text x="550" y="332" fill="#a78bfa" font-size="10" font-family="monospace">0x170000</text>
<text x="700" y="332" fill="#64748b" font-size="10" font-family="monospace" text-anchor="end">1472 KB</text>

<line x1="210" y1="338" x2="758" y2="338" stroke="#1c2845" stroke-width=".3"/>

<!-- Legend dots -->
<circle cx="218" cy="360" r="5" fill="#f59e0b"/>
<text x="228" y="364" fill="#64748b" font-size="9">NVS</text>
<circle cx="268" cy="360" r="5" fill="#06b6d4"/>
<text x="278" y="364" fill="#64748b" font-size="9">OTA Data</text>
<circle cx="338" cy="360" r="5" fill="#22c55e"/>
<text x="348" y="364" fill="#64748b" font-size="9">App0</text>
<circle cx="388" cy="360" r="5" fill="#3b82f6"/>
<text x="398" y="364" fill="#64748b" font-size="9">App1</text>
<circle cx="438" cy="360" r="5" fill="#8b5cf6"/>
<text x="448" y="364" fill="#64748b" font-size="9">SPIFFS</text>
</svg>

**Partition Table — Visual flash map with animated segments and full partition details**

</div>

---

## 🔄 How It Works

<div align="center">

<svg width="780" height="360" viewBox="0 0 780 360" xmlns="http://www.w3.org/2000/svg">
<defs>
  <style>
    .s1{animation:s 3s ease-in-out infinite}
    .s2{animation:s 3s ease-in-out infinite .5s}
    .s3{animation:s 3s ease-in-out infinite 1s}
    .s4{animation:s 3s ease-in-out infinite 1.5s}
    .s5{animation:s 3s ease-in-out infinite 2s}
    .fl{animation:fl 2s linear infinite}
    @keyframes s{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes fl{0%{stroke-dashoffset:20}100%{stroke-dashoffset:0}}
  </style>
  <pattern id="bg" width="24" height="24" patternUnits="userSpaceOnUse">
    <path d="M24 0L0 0 0 24" fill="none" stroke="#1c2845" stroke-width=".5"/>
  </pattern>
  <linearGradient id="gr" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#22c55e"/>
    <stop offset="100%" stop-color="#06b6d4"/>
  </linearGradient>
  <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#22c55e"/>
  </marker>
  <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
    <path d="M0,0 L0,6 L8,3 z" fill="#06b6d4"/>
  </marker>
</defs>
<rect width="780" height="360" rx="12" fill="#0a0f1a"/>
<rect width="780" height="360" rx="12" fill="url(#bg)" fill-opacity=".5"/>

<text x="390" y="28" fill="#64748b" font-size="10" font-family="monospace" text-anchor="middle" letter-spacing="4">HOW IT WORKS</text>

<!-- Step boxes -->
<!-- 1 -->
<rect x="20" y="50" width="130" height="100" rx="10" fill="#0f1729" stroke="#22c55e" stroke-width="1.5" class="s1"/>
<text x="85" y="85" font-size="28" text-anchor="middle">🔌</text>
<text x="85" y="108" fill="white" font-size="11" font-weight="bold" text-anchor="middle">1. CONNECT</text>
<text x="85" y="124" fill="#64748b" font-size="9" text-anchor="middle">Plug ESP device</text>
<text x="85" y="137" fill="#4ade80" font-size="9" font-family="monospace" text-anchor="middle">via USB cable</text>

<!-- Arrow 1→2 -->
<line x1="150" y1="100" x2="180" y2="100" stroke="#22c55e" stroke-width="1.5" marker-end="url(#a1)" stroke-dasharray="4,2" class="fl"/>

<!-- 2 -->
<rect x="180" y="50" width="130" height="100" rx="10" fill="#0f1729" stroke="#22c55e" stroke-width="1.5" class="s2"/>
<text x="245" y="85" font-size="28" text-anchor="middle">🔍</text>
<text x="245" y="108" fill="white" font-size="11" font-weight="bold" text-anchor="middle">2. DETECT</text>
<text x="245" y="124" fill="#64748b" font-size="9" text-anchor="middle">Auto chip detection</text>
<text x="245" y="137" fill="#4ade80" font-size="9" font-family="monospace" text-anchor="middle">ESP32 / S3 / C3...</text>

<!-- Arrow 2→3 -->
<line x1="310" y1="100" x2="340" y2="100" stroke="#22c55e" stroke-width="1.5" marker-end="url(#a1)" stroke-dasharray="4,2" class="fl"/>

<!-- 3 -->
<rect x="340" y="50" width="130" height="100" rx="10" fill="#0f1729" stroke="#22c55e" stroke-width="1.5" class="s3"/>
<text x="405" y="85" font-size="28" text-anchor="middle">📂</text>
<text x="405" y="108" fill="white" font-size="11" font-weight="bold" text-anchor="middle">3. LOAD FILE</text>
<text x="405" y="124" fill="#64748b" font-size="9" text-anchor="middle">Drag &amp; drop your</text>
<text x="405" y="137" fill="#4ade80" font-size="9" font-family="monospace" text-anchor="middle">firmware.bin file</text>

<!-- Arrow 3→4 -->
<line x1="470" y1="100" x2="500" y2="100" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#a2)" stroke-dasharray="4,2" class="fl"/>

<!-- 4 -->
<rect x="500" y="50" width="130" height="100" rx="10" fill="#0f1729" stroke="#06b6d4" stroke-width="1.5" class="s4"/>
<text x="565" y="85" font-size="28" text-anchor="middle">⚙️</text>
<text x="565" y="108" fill="white" font-size="11" font-weight="bold" text-anchor="middle">4. CONFIGURE</text>
<text x="565" y="124" fill="#64748b" font-size="9" text-anchor="middle">Set flash mode,</text>
<text x="565" y="137" fill="#22d3ee" font-size="9" font-family="monospace" text-anchor="middle">freq, size, offset</text>

<!-- Arrow 4→5 -->
<line x1="630" y1="100" x2="660" y2="100" stroke="#06b6d4" stroke-width="1.5" marker-end="url(#a2)" stroke-dasharray="4,2" class="fl"/>

<!-- 5 -->
<rect x="660" y="50" width="100" height="100" rx="10" fill="#0f1729" stroke="url(#gr)" stroke-width="2" class="s5"/>
<text x="710" y="85" font-size="28" text-anchor="middle">⚡</text>
<text x="710" y="108" fill="white" font-size="11" font-weight="bold" text-anchor="middle">5. FLASH!</text>
<text x="710" y="124" fill="#64748b" font-size="9" text-anchor="middle">Write + verify</text>
<text x="710" y="137" fill="#4ade80" font-size="9" font-family="monospace" text-anchor="middle">✓ Done!</text>

<!-- Architecture diagram -->
<text x="390" y="185" fill="#64748b" font-size="10" font-family="monospace" text-anchor="middle" letter-spacing="4">ARCHITECTURE</text>

<!-- UI Layer -->
<rect x="20" y="196" width="740" height="50" rx="8" fill="#0f1729" stroke="#22c55e" stroke-opacity=".3" stroke-width="1"/>
<text x="36" y="216" fill="#4ade80" font-size="9" font-family="monospace">REACT FRONTEND</text>
<text x="36" y="232" fill="#64748b" font-size="8" font-family="monospace">Dashboard · Flash · Backup · Restore · Serial Monitor · Partitions · History · Settings</text>

<!-- IPC Arrow -->
<line x1="390" y1="246" x2="390" y2="266" stroke="#1c2845" stroke-width="1.5" marker-end="url(#a1)" stroke-dasharray="3,2"/>
<text x="400" y="258" fill="#475569" font-size="8" font-family="monospace">Tauri IPC</text>

<!-- Rust layer -->
<rect x="20" y="266" width="360" height="50" rx="8" fill="#0f1729" stroke="#f59e0b" stroke-opacity=".3" stroke-width="1"/>
<text x="36" y="286" fill="#fbbf24" font-size="9" font-family="monospace">RUST BACKEND (Tauri 2)</text>
<text x="36" y="300" fill="#64748b" font-size="8" font-family="monospace">list_ports · flash_firmware · read_flash · serial_open</text>

<!-- esptool layer -->
<rect x="400" y="266" width="360" height="50" rx="8" fill="#0f1729" stroke="#8b5cf6" stroke-opacity=".3" stroke-width="1"/>
<text x="416" y="286" fill="#a78bfa" font-size="9" font-family="monospace">esptool.py v4.8</text>
<text x="416" y="300" fill="#64748b" font-size="8" font-family="monospace">ESP chip protocol · write_flash · read_flash · erase</text>

<!-- Device layer -->
<line x1="200" y1="316" x2="200" y2="336" stroke="#1c2845" stroke-width="1.5" marker-end="url(#a1)" stroke-dasharray="3,2"/>
<line x1="580" y1="316" x2="580" y2="336" stroke="#1c2845" stroke-width="1.5" marker-end="url(#a2)" stroke-dasharray="3,2"/>

<rect x="20" y="336" width="740" height="16" rx="8" fill="#0f1729" stroke="#06b6d4" stroke-opacity=".3" stroke-width="1"/>
<text x="390" y="348" fill="#22d3ee" font-size="9" font-family="monospace" text-anchor="middle">USB SERIAL → ESP32 / ESP8266 / ESP32-S3 / ESP32-C3 / ESP32-S2</text>
</svg>

</div>

---

## 🧩 App Pages

<div align="center">

| Page | Icon | Description |
|:-----|:----:|:------------|
| **Dashboard** | 📊 | Live device stats, chip info, MAC, features, recent activity |
| **Flash Firmware** | ⚡ | Drag & drop .bin upload, flash options, animated progress |
| **Backup** | 💾 | Read full flash → save to .bin with animated progress |
| **Restore** | ⬆️ | Write backup image back to device |
| **Serial Monitor** | 🖥️ | Real-time terminal, send commands, export logs |
| **Partition Table** | 🗂️ | Visual flash map + full partition details |
| **Flash History** | 📋 | Complete log of all flash operations |
| **Settings** | ⚙️ | esptool path, preferences, app info |

</div>

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| 🦀 **Backend** | Rust + Tauri 2 | Native OS access, serial ports, file system |
| ⚛️ **Frontend** | React 19 + TypeScript | UI components and routing |
| 🎨 **Styling** | Tailwind CSS v4 | Utility-first dark design system |
| ✨ **Animation** | Framer Motion | Page transitions, progress bars, stagger effects |
| 🗃️ **State** | Zustand | Global app state (device, logs, flash jobs) |
| 🔀 **Routing** | React Router v6 | Hash-based SPA routing |
| 🔣 **Icons** | Lucide React | Consistent icon system |
| 🔧 **Flash Tool** | esptool.py v4.8 | ESP chip protocol and communication |
| 📦 **Build** | Vite 7 | Lightning fast HMR and bundling |

</div>

---

## 🚀 Getting Started

### Prerequisites

```bash
# 1. Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 2. Install Node.js v20+  →  https://nodejs.org

# 3. Install Python + esptool.py
pip install esptool

# 4. Install Tauri CLI
cargo install tauri-cli
```

### Installation & Run

```bash
# Clone
git clone https://github.com/ElectroIoT/FirmFlow-FlashKit.git
cd FirmFlow-FlashKit

# Install JS dependencies
npm install

# Development mode (hot reload)
npm run tauri dev

# Production build
npm run tauri build
```

> 🟢 Installers output to `src-tauri/target/release/bundle/`

---

## 📦 Build Outputs

| Platform | Output |
|:---------|:-------|
| 🪟 **Windows** | `.msi` installer + `.exe` portable |
| 🍎 **macOS** | `.dmg` disk image + `.app` bundle |
| 🐧 **Linux** | `.deb` package + `.AppImage` |

---

## 🎨 Design System

```
Theme:
  Background:  #0a0f1a  (Deep navy)
  Surface:     #0f1729  (Card bg)
  Border:      #1c2845  (Subtle grid lines)
  Green:       #22c55e  (Primary — flash, connect, success)
  Cyan:        #06b6d4  (Backup, info, data)
  Purple:      #8b5cf6  (Restore, partitions)
  Amber:       #f59e0b  (Warnings, NVS)

Effects:
  • Animated grid background
  • Scan-line overlay animation
  • Glass-morphism cards (backdrop-blur)
  • Framer Motion stagger entry animations
  • Gradient progress bars (green → cyan)
  • Pulsing connected indicator dot
  • Hover glow on active elements

Typography:
  UI font:       Inter (400/500/700)
  Terminal font: JetBrains Mono
```

---

## 🗺️ Roadmap

- [x] Flash firmware with drag & drop
- [x] Full flash backup & restore
- [x] Serial monitor with send/receive
- [x] Partition table with visual map
- [x] Flash history log
- [x] Settings & esptool config
- [ ] Real esptool.py Tauri command integration
- [ ] Web Serial API browser version
- [ ] OTA push over Wi-Fi (enter device IP)
- [ ] NVS key-value editor
- [ ] SPIFFS / LittleFS filesystem upload
- [ ] Multi-device batch flashing
- [ ] eFuse reader
- [ ] Auto-update via GitHub releases

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add my feature'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ by [ElectroIoT](https://github.com/ElectroIoT)**

Powered by [esptool.py](https://github.com/espressif/esptool) · [Tauri](https://tauri.app) · [React](https://react.dev) · [Framer Motion](https://www.framer.com/motion/)

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%"/>

</div>

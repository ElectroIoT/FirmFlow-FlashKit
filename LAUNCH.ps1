# ================================================================
#  FirmFlow FlashKit — Unified Smart Launcher
#  Double-click LAUNCH.bat to run this.
#
#  What it does:
#    1. If the built .exe already exists  → launch it instantly
#    2. If not built yet:
#         • Download portable Node.js (no system install)
#         • Auto-install Rust/Cargo silently if missing
#         • npm install
#         • Build the release .exe  (once, ~5-10 min)
#         • Launch it
#    3. Every subsequent run → instant .exe launch, no deps needed
# ================================================================

$ErrorActionPreference = "Stop"
$ROOT       = $PSScriptRoot
$RUNTIME    = "$ROOT\runtime"
$NODE_VER   = "20.18.1"
$NODE_DIR   = "$RUNTIME\node"
$NODE_EXE   = "$NODE_DIR\node.exe"
$NPM_CMD    = "$NODE_DIR\npm.cmd"
$NODE_URL   = "https://nodejs.org/dist/v$NODE_VER/node-v$NODE_VER-win-x64.zip"
$NODE_ZIP   = "$RUNTIME\node.zip"
$RUSTUP_URL = "https://win.rustup.rs/x86_64"
$RUSTUP_EXE = "$RUNTIME\rustup-init.exe"
$EXE_PATH   = "$ROOT\src-tauri\target\release\FirmFlow FlashKit.exe"

# ── Console helpers ───────────────────────────────────────────────
function Banner {
    Clear-Host
    Write-Host ""
    Write-Host "  ╔══════════════════════════════════════════════════════════╗" -ForegroundColor DarkCyan
    Write-Host "  ║  ⚡  FirmFlow FlashKit v1.0  — Smart Launcher           ║" -ForegroundColor Cyan
    Write-Host "  ╚══════════════════════════════════════════════════════════╝" -ForegroundColor DarkCyan
    Write-Host ""
}
function OK($m)   { Write-Host "  ✔  $m" -ForegroundColor Green }
function INFO($m) { Write-Host "  ●  $m" -ForegroundColor Cyan }
function STEP($m) { Write-Host ""; Write-Host "  ━━  $m" -ForegroundColor Yellow; Write-Host "" }
function ERR($m)  { Write-Host "  ✘  $m" -ForegroundColor Red }
function PROG($m) { Write-Host "  ↓  $m" -ForegroundColor DarkCyan }

# ── Download helper with progress bar ────────────────────────────
function Download($url, $dest, $label) {
    PROG "Downloading $label..."
    try {
        $bits = Start-BitsTransfer -Source $url -Destination $dest -Asynchronous
        while ($bits.JobState -in "Connecting","Transferring") {
            $pct = if ($bits.BytesTotal -gt 0) { [int](($bits.BytesTransferred/$bits.BytesTotal)*100) } else { 0 }
            Write-Progress -Activity "Downloading $label" -Status "$pct%" -PercentComplete $pct
            Start-Sleep -Milliseconds 400
        }
        Complete-BitsTransfer $bits
        Write-Progress -Activity "Downloading $label" -Completed
    } catch {
        # fallback
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $dest)
    }
}

# =================================================================
Banner

# ── FAST PATH: release .exe already exists ───────────────────────
if (Test-Path $EXE_PATH) {
    OK "Release build found — launching instantly."
    Write-Host ""
    INFO "App: $EXE_PATH"
    Write-Host ""
    Start-Process $EXE_PATH
    exit 0
}

# =================================================================
# FIRST-RUN PATH — need to build the exe
# =================================================================
Write-Host "  First run detected — setting up and building FirmFlow FlashKit." -ForegroundColor Yellow
Write-Host "  This takes 5-15 minutes once. Every run after this is instant." -ForegroundColor DarkYellow
Write-Host ""

if (-not (Test-Path $RUNTIME)) { New-Item -ItemType Directory -Path $RUNTIME | Out-Null }

# ── Step 1: Portable Node.js ──────────────────────────────────────
STEP "Step 1/4 — Portable Node.js"

if (Test-Path $NODE_EXE) {
    $v = & $NODE_EXE --version 2>$null
    OK "Node.js already present ($v)"
} else {
    Download $NODE_URL $NODE_ZIP "Node.js v$NODE_VER (~30 MB)"

    INFO "Extracting Node.js..."
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $tmpDir = "$RUNTIME\node_tmp"
    [System.IO.Compression.ZipFile]::ExtractToDirectory($NODE_ZIP, $tmpDir)
    $inner = (Get-ChildItem $tmpDir | Select-Object -First 1).FullName
    Move-Item $inner $NODE_DIR
    Remove-Item $tmpDir  -Recurse -Force
    Remove-Item $NODE_ZIP -Force

    $v = & $NODE_EXE --version 2>$null
    OK "Node.js $v ready  →  .\runtime\node\"
}

$env:PATH = "$NODE_DIR;$env:PATH"

# ── Step 2: Rust / Cargo ─────────────────────────────────────────
STEP "Step 2/4 — Rust Toolchain"

$cargoExe = "$env:USERPROFILE\.cargo\bin\cargo.exe"
$hasCargo = (Test-Path $cargoExe) -or (Get-Command cargo -ErrorAction SilentlyContinue)

if ($hasCargo) {
    $cv = cargo --version 2>$null
    OK "Rust already installed  ($cv)"
} else {
    INFO "Rust not found — downloading rustup installer (~8 MB)..."
    Download $RUSTUP_URL $RUSTUP_EXE "Rust installer"

    INFO "Installing Rust silently (no UAC, no system changes)..."
    INFO "This downloads the Rust toolchain (~500 MB) — please wait..."
    Write-Host ""

    # -y = no prompts, --no-modify-path = don't touch system PATH
    $proc = Start-Process -FilePath $RUSTUP_EXE `
        -ArgumentList "--quiet -y --no-modify-path --default-toolchain stable" `
        -Wait -PassThru -NoNewWindow
    Remove-Item $RUSTUP_EXE -Force

    if ($proc.ExitCode -ne 0) {
        ERR "Rust installation failed (exit $($proc.ExitCode))."
        ERR "Try installing manually: https://rustup.rs"
        Read-Host "Press Enter to exit"
        exit 1
    }

    # Add cargo to current session PATH
    $env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"

    $cv = cargo --version 2>$null
    OK "Rust installed  ($cv)"
}

# Ensure cargo is in PATH for this session
$env:PATH = "$env:USERPROFILE\.cargo\bin;$env:PATH"

# ── Step 3: npm install ───────────────────────────────────────────
STEP "Step 3/4 — Installing JS dependencies"
Set-Location $ROOT

if (Test-Path "$ROOT\node_modules") {
    OK "node_modules already present — skipping"
} else {
    & $NPM_CMD install
    if ($LASTEXITCODE -ne 0) { ERR "npm install failed."; Read-Host; exit 1 }
    OK "JS dependencies installed"
}

# ── Step 4: Build release exe ────────────────────────────────────
STEP "Step 4/4 — Building release .exe (Rust compiles — ~5-10 min)"
INFO "Building in release mode..."
Write-Host ""

& $NPM_CMD run tauri build

if ($LASTEXITCODE -ne 0 -or -not (Test-Path $EXE_PATH)) {
    ERR "Build failed. Check errors above."
    Read-Host "Press Enter to exit"
    exit 1
}

OK "Build complete!"
Write-Host ""

# =================================================================
# LAUNCH
# =================================================================
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════════════╗" -ForegroundColor DarkGreen
Write-Host "  ║  ✔  Build successful! Launching FirmFlow FlashKit...    ║" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════════════════╝" -ForegroundColor DarkGreen
Write-Host ""
INFO "The app is now a standalone .exe — future launches are instant."
Write-Host ""

Start-Sleep -Seconds 1
Start-Process $EXE_PATH

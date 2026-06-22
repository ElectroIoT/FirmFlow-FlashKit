# ================================================================
#  FirmFlow FlashKit — Unified Smart Launcher
#  ▸ If built .exe exists  → launch it instantly (no deps)
#  ▸ If not built yet      → setup everything + build once
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

# Real exe name = Cargo.toml [package] name + .exe
$EXE_PATH   = "$ROOT\src-tauri\target\release\firmflow-flashkit.exe"

# ── helpers ──────────────────────────────────────────────────────
function Banner {
    Write-Host ""
    Write-Host "  ╔══════════════════════════════════════════════════╗" -ForegroundColor DarkCyan
    Write-Host "  ║  ⚡  FirmFlow FlashKit  —  Smart Launcher        ║" -ForegroundColor Cyan
    Write-Host "  ╚══════════════════════════════════════════════════╝" -ForegroundColor DarkCyan
    Write-Host ""
}
function OK($m)   { Write-Host "  [OK]   $m" -ForegroundColor Green }
function INFO($m) { Write-Host "  [...]  $m" -ForegroundColor Cyan }
function STEP($n,$m) { Write-Host ""; Write-Host "  ── Step $n — $m ──" -ForegroundColor Yellow; Write-Host "" }
function ERR($m)  { Write-Host "  [ERR]  $m" -ForegroundColor Red }
function Pause-Exit($code) { Write-Host ""; Read-Host "  Press Enter to close"; exit $code }

# ── download with progress ────────────────────────────────────────
function Download($url, $dest, $label) {
    INFO "Downloading $label ..."
    try {
        Import-Module BitsTransfer -ErrorAction Stop
        $job = Start-BitsTransfer -Source $url -Destination $dest -Asynchronous
        while ($job.JobState -in "Connecting","Transferring") {
            $pct = if ($job.BytesTotal -gt 0) { [int](($job.BytesTransferred / $job.BytesTotal) * 100) } else { 0 }
            Write-Progress -Activity "Downloading $label" -Status "$pct%" -PercentComplete $pct
            Start-Sleep -Milliseconds 400
        }
        Complete-BitsTransfer $job
        Write-Progress -Activity "Downloading $label" -Completed
    } catch {
        # Fallback: .NET WebClient
        INFO "Using fallback downloader..."
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $dest)
    }
    OK "$label downloaded"
}

# ================================================================
Banner

# ── FAST PATH: exe already built ─────────────────────────────────
if (Test-Path $EXE_PATH) {
    OK "Release build found — launching instantly."
    Write-Host ""
    INFO "Starting: $EXE_PATH"
    Write-Host ""
    Start-Process -FilePath $EXE_PATH
    exit 0
}

# ================================================================
# FIRST-RUN SETUP
# ================================================================
Write-Host "  First run detected." -ForegroundColor Yellow
Write-Host "  Setting up environment and building the app (~5-15 min)." -ForegroundColor DarkYellow
Write-Host "  Every launch after this will be instant." -ForegroundColor DarkGray
Write-Host ""

if (-not (Test-Path $RUNTIME)) {
    New-Item -ItemType Directory -Path $RUNTIME | Out-Null
}

# ── Step 1: Portable Node.js ──────────────────────────────────────
STEP 1 "Portable Node.js"

if (Test-Path $NODE_EXE) {
    $v = & $NODE_EXE --version 2>$null
    OK "Node.js already present ($v)"
} else {
    try {
        Download $NODE_URL $NODE_ZIP "Node.js v$NODE_VER  (~30 MB)"

        INFO "Extracting..."
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $tmp = "$RUNTIME\node_tmp"
        if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
        [System.IO.Compression.ZipFile]::ExtractToDirectory($NODE_ZIP, $tmp)
        $inner = (Get-ChildItem $tmp | Select-Object -First 1).FullName
        if (Test-Path $NODE_DIR) { Remove-Item $NODE_DIR -Recurse -Force }
        Move-Item $inner $NODE_DIR
        Remove-Item $tmp  -Recurse -Force
        Remove-Item $NODE_ZIP -Force -ErrorAction SilentlyContinue
    } catch {
        ERR "Failed to download/extract Node.js: $_"
        ERR "Check your internet connection and try again."
        Pause-Exit 1
    }

    if (-not (Test-Path $NODE_EXE)) {
        ERR "Node.js extraction failed — $NODE_EXE not found."
        Pause-Exit 1
    }

    $v = & $NODE_EXE --version 2>$null
    OK "Node.js $v  →  .\runtime\node\"
}

$env:PATH = "$NODE_DIR;" + $env:PATH

# Verify npm works
try {
    $npmV = & $NPM_CMD --version 2>$null
    OK "npm $npmV ready"
} catch {
    ERR "npm not working. Path: $NPM_CMD"
    Pause-Exit 1
}

# ── Step 2: Rust / Cargo ──────────────────────────────────────────
STEP 2 "Rust Toolchain"

$cargoHome = if ($env:CARGO_HOME) { $env:CARGO_HOME } else { "$env:USERPROFILE\.cargo" }
$cargoExe  = "$cargoHome\bin\cargo.exe"
$env:PATH  = "$cargoHome\bin;" + $env:PATH

$hasCargo = (Test-Path $cargoExe) -or ($null -ne (Get-Command cargo -ErrorAction SilentlyContinue))

if ($hasCargo) {
    $cv = cargo --version 2>$null
    OK "Rust already installed  ($cv)"
} else {
    INFO "Rust not found. Downloading installer (~8 MB)..."
    try {
        Download $RUSTUP_URL $RUSTUP_EXE "Rust installer"
    } catch {
        ERR "Failed to download Rust installer: $_"
        ERR "Install manually from https://rustup.rs and re-run LAUNCH.bat"
        Pause-Exit 1
    }

    INFO "Installing Rust (downloads ~500 MB toolchain) — please wait..."
    Write-Host "  This is a one-time step." -ForegroundColor DarkGray
    Write-Host ""

    try {
        $proc = Start-Process -FilePath $RUSTUP_EXE `
            -ArgumentList "--quiet -y --no-modify-path --default-toolchain stable" `
            -Wait -PassThru -NoNewWindow
        Remove-Item $RUSTUP_EXE -Force -ErrorAction SilentlyContinue
    } catch {
        ERR "Rust installer error: $_"
        Pause-Exit 1
    }

    if ($proc.ExitCode -ne 0) {
        ERR "Rust installation failed (exit code $($proc.ExitCode))."
        ERR "Try: winget install Rustlang.Rustup   or visit https://rustup.rs"
        Pause-Exit 1
    }

    # Reload PATH from registry so cargo is available now
    $machinePath = [System.Environment]::GetEnvironmentVariable("PATH","Machine")
    $userPath    = [System.Environment]::GetEnvironmentVariable("PATH","User")
    $env:PATH    = "$cargoHome\bin;$userPath;$machinePath"

    if (-not (Get-Command cargo -ErrorAction SilentlyContinue)) {
        ERR "Cargo not found after install. Close and re-run LAUNCH.bat."
        Pause-Exit 1
    }

    $cv = cargo --version 2>$null
    OK "Rust installed  ($cv)"
}

# ── Step 3: npm install ───────────────────────────────────────────
STEP 3 "JS Dependencies"
Set-Location $ROOT

if (Test-Path "$ROOT\node_modules\zustand") {
    OK "node_modules already present — skipping"
} else {
    INFO "Running npm install..."
    & $NPM_CMD install
    if ($LASTEXITCODE -ne 0) {
        ERR "npm install failed (exit $LASTEXITCODE)"
        Pause-Exit 1
    }
    OK "Dependencies installed"
}

# ── Step 4: Build release exe ────────────────────────────────────
STEP 4 "Building Release .exe  (first time: ~5-15 min)"
INFO "Compiling Rust + bundling React..."
Write-Host "  The window will open automatically when done." -ForegroundColor DarkGray
Write-Host ""

Set-Location $ROOT
& $NPM_CMD run tauri build

if ($LASTEXITCODE -ne 0) {
    ERR "Build failed (exit $LASTEXITCODE). See errors above."
    Pause-Exit 1
}

if (-not (Test-Path $EXE_PATH)) {
    ERR "Build finished but exe not found at:"
    ERR "  $EXE_PATH"
    ERR ""
    ERR "Check src-tauri\target\release\ for the actual filename."
    Write-Host ""
    Write-Host "  Files in release folder:" -ForegroundColor Yellow
    Get-ChildItem "$ROOT\src-tauri\target\release\*.exe" | ForEach-Object { Write-Host "    $_" -ForegroundColor Cyan }
    Pause-Exit 1
}

# ── Success + Launch ──────────────────────────────────────────────
Write-Host ""
Write-Host "  ╔══════════════════════════════════════════════════╗" -ForegroundColor DarkGreen
Write-Host "  ║  ✔  Build complete! Launching FirmFlow...        ║" -ForegroundColor Green
Write-Host "  ╚══════════════════════════════════════════════════╝" -ForegroundColor DarkGreen
Write-Host ""
OK "Future launches will be instant — the .exe is ready."
Write-Host ""

Start-Sleep -Seconds 1
Start-Process -FilePath $EXE_PATH

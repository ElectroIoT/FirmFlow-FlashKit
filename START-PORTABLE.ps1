# FirmFlow FlashKit — Portable Launcher (No install required)
# Automatically downloads portable Node.js if not present.
# Run: Right-click → Run with PowerShell

$Host.UI.RawUI.WindowTitle = "FirmFlow FlashKit — Portable Launcher"
$ErrorActionPreference = "Stop"

$NODE_VERSION = "20.18.1"
$NODE_DIR     = "$PSScriptRoot\runtime\node"
$NODE_EXE     = "$NODE_DIR\node.exe"
$NPM_CMD      = "$NODE_DIR\npm.cmd"
$NODE_ZIP     = "$PSScriptRoot\runtime\node.zip"
$NODE_URL     = "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-win-x64.zip"

function Write-Header {
    Write-Host ""
    Write-Host "  ============================================================" -ForegroundColor DarkGreen
    Write-Host "   ^^ FirmFlow FlashKit v1.0  — Portable Launcher" -ForegroundColor Green
    Write-Host "  ============================================================" -ForegroundColor DarkGreen
    Write-Host ""
}

function Write-Ok($msg)   { Write-Host "  [OK]   $msg" -ForegroundColor Green }
function Write-Info($msg) { Write-Host "  [INFO] $msg" -ForegroundColor Cyan }
function Write-Err($msg)  { Write-Host "  [ERR]  $msg" -ForegroundColor Red }
function Write-Warn($msg) { Write-Host "  [WARN] $msg" -ForegroundColor Yellow }

Write-Header

# ------------------------------------------------------------------
# 1. Ensure runtime folder exists
# ------------------------------------------------------------------
if (-not (Test-Path "$PSScriptRoot\runtime")) {
    New-Item -ItemType Directory -Path "$PSScriptRoot\runtime" | Out-Null
}

# ------------------------------------------------------------------
# 2. Download portable Node.js if missing
# ------------------------------------------------------------------
if (-not (Test-Path $NODE_EXE)) {
    Write-Info "Portable Node.js not found. Downloading v$NODE_VERSION (~30 MB)..."
    Write-Info "This is a one-time download."
    Write-Host ""

    try {
        # Use BITS for a progress bar download
        $bitsJob = Start-BitsTransfer -Source $NODE_URL -Destination $NODE_ZIP -Asynchronous
        while ($bitsJob.JobState -eq "Transferring" -or $bitsJob.JobState -eq "Connecting") {
            $pct = if ($bitsJob.BytesTotal -gt 0) { [int](($bitsJob.BytesTransferred / $bitsJob.BytesTotal) * 100) } else { 0 }
            Write-Progress -Activity "Downloading Node.js v$NODE_VERSION" -Status "$pct% complete" -PercentComplete $pct
            Start-Sleep -Milliseconds 500
        }
        Complete-BitsTransfer $bitsJob
        Write-Progress -Activity "Downloading Node.js" -Completed
    } catch {
        # Fallback to WebClient if BITS fails
        Write-Warn "BITS unavailable, using fallback downloader..."
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($NODE_URL, $NODE_ZIP)
    }

    Write-Info "Extracting Node.js..."
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    [System.IO.Compression.ZipFile]::ExtractToDirectory($NODE_ZIP, "$PSScriptRoot\runtime\node_tmp")

    # Move the inner versioned folder to $NODE_DIR
    $inner = Get-ChildItem "$PSScriptRoot\runtime\node_tmp" | Select-Object -First 1
    Move-Item $inner.FullName $NODE_DIR
    Remove-Item "$PSScriptRoot\runtime\node_tmp" -Recurse -Force
    Remove-Item $NODE_ZIP -Force

    Write-Ok "Node.js v$NODE_VERSION extracted to .\runtime\node\"
} else {
    $nodeVer = & $NODE_EXE --version 2>$null
    Write-Ok "Portable Node.js found  ($nodeVer)"
}

# ------------------------------------------------------------------
# 3. Add portable node to PATH for this session only
# ------------------------------------------------------------------
$env:PATH = "$NODE_DIR;$NODE_DIR\node_modules\npm\bin;$env:PATH"
Write-Ok "Portable Node.js added to session PATH"
Write-Host ""

# ------------------------------------------------------------------
# 4. Check Rust (required for Tauri — cannot be made fully portable)
# ------------------------------------------------------------------
$cargoPath = Get-Command cargo -ErrorAction SilentlyContinue
if (-not $cargoPath) {
    Write-Host ""
    Write-Warn "Rust / Cargo not found on this machine."
    Write-Host ""
    Write-Host "  Rust is required to run the Tauri desktop app." -ForegroundColor Yellow
    Write-Host "  Install it with one command (takes ~5 min, no admin needed):" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "      winget install Rustlang.Rustup" -ForegroundColor Cyan
    Write-Host "      -- or --" -ForegroundColor DarkGray
    Write-Host "      Download: https://rustup.rs" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  After installing Rust, run this launcher again." -ForegroundColor Yellow
    Write-Host ""

    $ans = Read-Host "  Open rustup.rs in browser now? (Y/N)"
    if ($ans -match "^[Yy]") {
        Start-Process "https://rustup.rs"
    }
    Write-Host ""
    Read-Host "  Press Enter to exit"
    exit 1
}

Write-Ok "Rust / Cargo found"
Write-Host ""

# ------------------------------------------------------------------
# 5. Install node_modules if missing
# ------------------------------------------------------------------
if (-not (Test-Path "$PSScriptRoot\node_modules")) {
    Write-Info "First run — installing JS dependencies..."
    Write-Host ""
    Set-Location $PSScriptRoot
    & $NPM_CMD install
    if ($LASTEXITCODE -ne 0) {
        Write-Err "npm install failed."
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host ""
    Write-Ok "Dependencies installed"
}

# ------------------------------------------------------------------
# 6. Launch the app
# ------------------------------------------------------------------
Write-Host ""
Write-Info "Starting FirmFlow FlashKit..."
Write-Info "The app window will open in ~10 seconds."
Write-Host ""
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

Set-Location $PSScriptRoot
& $NPM_CMD run tauri dev

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Err "App exited with an error. See output above."
    Read-Host "Press Enter to exit"
}

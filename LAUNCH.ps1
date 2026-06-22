# FirmFlow FlashKit - Smart Launcher
# Fast path: if built .exe exists, launch it instantly (no deps needed)
# First run: download Node.js portable, install Rust, build .exe, launch

$ErrorActionPreference = "Stop"

$ROOT        = $PSScriptRoot
$RUNTIME     = "$ROOT\runtime"
$NODE_VER    = "20.18.1"
$NODE_DIR    = "$RUNTIME\node"
$NODE_EXE    = "$NODE_DIR\node.exe"
$NPM_CMD     = "$NODE_DIR\npm.cmd"
$NODE_URL    = "https://nodejs.org/dist/v$NODE_VER/node-v$NODE_VER-win-x64.zip"
$NODE_ZIP    = "$RUNTIME\node.zip"
$RUSTUP_URL  = "https://win.rustup.rs/x86_64"
$RUSTUP_EXE  = "$RUNTIME\rustup-init.exe"
$EXE_PATH    = "$ROOT\src-tauri\target\release\firmflow-flashkit.exe"

function Print-Header {
    Write-Host ""
    Write-Host "  +--------------------------------------------------+" -ForegroundColor DarkCyan
    Write-Host "  |   FirmFlow FlashKit  -  Smart Launcher           |" -ForegroundColor Cyan
    Write-Host "  +--------------------------------------------------+" -ForegroundColor DarkCyan
    Write-Host ""
}

function OK($m)   { Write-Host "  [OK]  $m" -ForegroundColor Green }
function INFO($m) { Write-Host "  [..]  $m" -ForegroundColor Cyan }
function WARN($m) { Write-Host "  [!!]  $m" -ForegroundColor Yellow }
function ERR($m)  { Write-Host "  [XX]  $m" -ForegroundColor Red }
function STEP($n, $m) {
    Write-Host ""
    Write-Host "  --- Step $n : $m ---" -ForegroundColor Yellow
    Write-Host ""
}

function Stop-WithError($m) {
    Write-Host ""
    ERR $m
    Write-Host ""
    Read-Host "  Press Enter to close"
    exit 1
}

function Download-File($url, $dest, $label) {
    INFO "Downloading $label ..."
    try {
        $job = Start-BitsTransfer -Source $url -Destination $dest -Asynchronous
        while ($job.JobState -eq "Connecting" -or $job.JobState -eq "Transferring") {
            if ($job.BytesTotal -gt 0) {
                $pct = [int](($job.BytesTransferred / $job.BytesTotal) * 100)
            } else {
                $pct = 0
            }
            Write-Progress -Activity "Downloading $label" -Status "$pct%" -PercentComplete $pct
            Start-Sleep -Milliseconds 400
        }
        Complete-BitsTransfer $job
        Write-Progress -Activity "Downloading $label" -Completed
    } catch {
        INFO "BITS unavailable, using fallback..."
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($url, $dest)
    }
    OK "$label downloaded"
}

# ---------------------------------------------------------------
Print-Header

# FAST PATH - exe already built, just launch it
if (Test-Path $EXE_PATH) {
    OK "Release build found - launching instantly!"
    Write-Host ""
    INFO "Path: $EXE_PATH"
    Write-Host ""
    Start-Process -FilePath $EXE_PATH
    exit 0
}

# ---------------------------------------------------------------
# FIRST RUN - need to build
Write-Host "  First run detected." -ForegroundColor Yellow
Write-Host "  Will set up tools and build the app (5-15 min, one time)." -ForegroundColor DarkYellow
Write-Host "  Every launch after this will be instant." -ForegroundColor DarkGray
Write-Host ""

if (-not (Test-Path $RUNTIME)) {
    New-Item -ItemType Directory -Path $RUNTIME | Out-Null
}

# ---------------------------------------------------------------
STEP 1 "Portable Node.js"

if (Test-Path $NODE_EXE) {
    $v = & $NODE_EXE --version 2>$null
    OK "Node.js already present ($v)"
} else {
    try {
        Download-File $NODE_URL $NODE_ZIP "Node.js v$NODE_VER (~30 MB)"
    } catch {
        Stop-WithError "Download failed: $_  Check your internet connection."
    }

    INFO "Extracting Node.js..."
    try {
        Add-Type -AssemblyName System.IO.Compression.FileSystem
        $tmp = "$RUNTIME\node_tmp"
        if (Test-Path $tmp) { Remove-Item $tmp -Recurse -Force }
        [System.IO.Compression.ZipFile]::ExtractToDirectory($NODE_ZIP, $tmp)
        $inner = (Get-ChildItem $tmp | Select-Object -First 1).FullName
        if (Test-Path $NODE_DIR) { Remove-Item $NODE_DIR -Recurse -Force }
        Move-Item $inner $NODE_DIR
        Remove-Item $tmp -Recurse -Force
        if (Test-Path $NODE_ZIP) { Remove-Item $NODE_ZIP -Force }
    } catch {
        Stop-WithError "Extraction failed: $_"
    }

    if (-not (Test-Path $NODE_EXE)) {
        Stop-WithError "Node.js extraction failed - $NODE_EXE not found."
    }

    $v = & $NODE_EXE --version 2>$null
    OK "Node.js $v ready at .\runtime\node\"
}

$env:PATH = "$NODE_DIR;" + $env:PATH

try {
    $npmV = & $NPM_CMD --version 2>$null
    OK "npm $npmV ready"
} catch {
    Stop-WithError "npm not working at $NPM_CMD"
}

# ---------------------------------------------------------------
STEP 2 "Rust Toolchain"

if ($env:CARGO_HOME) {
    $cargoHome = $env:CARGO_HOME
} else {
    $cargoHome = "$env:USERPROFILE\.cargo"
}
$cargoExe = "$cargoHome\bin\cargo.exe"
$env:PATH = "$cargoHome\bin;" + $env:PATH

$hasCargo = (Test-Path $cargoExe)
if (-not $hasCargo) {
    $found = Get-Command cargo -ErrorAction SilentlyContinue
    if ($found) { $hasCargo = $true }
}

if ($hasCargo) {
    $cv = cargo --version 2>$null
    OK "Rust already installed ($cv)"
} else {
    INFO "Rust not found - downloading installer (~8 MB)..."
    try {
        Download-File $RUSTUP_URL $RUSTUP_EXE "Rust installer"
    } catch {
        Stop-WithError "Could not download Rust installer: $_"
    }

    INFO "Installing Rust toolchain (~500 MB) - please wait..."
    WARN "This is a one-time step, takes 3-8 minutes."
    Write-Host ""

    try {
        $proc = Start-Process -FilePath $RUSTUP_EXE `
            -ArgumentList "--quiet -y --no-modify-path --default-toolchain stable" `
            -Wait -PassThru -NoNewWindow
    } catch {
        Stop-WithError "Rust installer crashed: $_"
    }

    if (Test-Path $RUSTUP_EXE) { Remove-Item $RUSTUP_EXE -Force -ErrorAction SilentlyContinue }

    if ($proc.ExitCode -ne 0) {
        Stop-WithError "Rust install failed (exit $($proc.ExitCode)). Try: winget install Rustlang.Rustup"
    }

    # Reload PATH from registry so cargo is usable right now
    $machinePath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
    $userPath    = [System.Environment]::GetEnvironmentVariable("PATH", "User")
    $env:PATH    = "$cargoHome\bin;$userPath;$machinePath"

    $found = Get-Command cargo -ErrorAction SilentlyContinue
    if (-not $found) {
        Stop-WithError "Cargo still not found after install. Close this window and re-run LAUNCH.bat."
    }

    $cv = cargo --version 2>$null
    OK "Rust installed ($cv)"
}

# ---------------------------------------------------------------
STEP 3 "JS Dependencies (npm install)"

Set-Location $ROOT

if (Test-Path "$ROOT\node_modules\zustand") {
    OK "node_modules already present - skipping"
} else {
    INFO "Running npm install..."
    & $NPM_CMD install
    if ($LASTEXITCODE -ne 0) {
        Stop-WithError "npm install failed (exit $LASTEXITCODE)"
    }
    OK "JS dependencies installed"
}

# ---------------------------------------------------------------
STEP 4 "Building Release .exe  (first build: 5-15 min)"

INFO "Compiling Rust + bundling React frontend..."
WARN "Do not close this window. The app will launch automatically when done."
Write-Host ""

Set-Location $ROOT
& $NPM_CMD run tauri build

if ($LASTEXITCODE -ne 0) {
    Stop-WithError "Build failed (exit $LASTEXITCODE) - see errors above."
}

if (-not (Test-Path $EXE_PATH)) {
    Write-Host ""
    ERR "Build finished but exe not found at expected path:"
    ERR "  $EXE_PATH"
    Write-Host ""
    INFO "Files found in release folder:"
    $found = Get-ChildItem "$ROOT\src-tauri\target\release\*.exe" -ErrorAction SilentlyContinue
    if ($found) {
        $found | ForEach-Object { Write-Host "    $($_.FullName)" -ForegroundColor Cyan }
    } else {
        WARN "No .exe files found in src-tauri\target\release\"
    }
    Write-Host ""
    Read-Host "  Press Enter to close"
    exit 1
}

# ---------------------------------------------------------------
Write-Host ""
Write-Host "  +--------------------------------------------------+" -ForegroundColor DarkGreen
Write-Host "  |  Build complete!  Launching FirmFlow FlashKit... |" -ForegroundColor Green
Write-Host "  +--------------------------------------------------+" -ForegroundColor DarkGreen
Write-Host ""
OK "Future launches will be instant - the .exe is ready."
Write-Host ""

Start-Sleep -Seconds 1
Start-Process -FilePath $EXE_PATH

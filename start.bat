@echo off
title FirmFlow FlashKit — Launcher
color 0A

echo.
echo  ============================================================
echo   ^^  FirmFlow FlashKit v1.0  — ESP32 / ESP8266 Manager
echo  ============================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js not found. Install from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Check npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] npm not found. Reinstall Node.js from https://nodejs.org
    echo.
    pause
    exit /b 1
)

:: Check Rust / Cargo
where cargo >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Rust not found. Install from https://rustup.rs
    echo.
    pause
    exit /b 1
)

echo  [OK] Node.js found
echo  [OK] npm found
echo  [OK] Rust / Cargo found
echo.

:: Install node_modules if missing
if not exist "node_modules\" (
    echo  [INFO] Installing dependencies — first run only...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        color 0C
        echo  [ERROR] npm install failed.
        pause
        exit /b 1
    )
    echo.
    echo  [OK] Dependencies installed
    echo.
)

echo  [INFO] Starting FirmFlow FlashKit...
echo  [INFO] Window will open in a few seconds.
echo.
echo  Press Ctrl+C in this window to stop the app.
echo.

call npm run tauri dev

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  [ERROR] App exited with an error. See output above.
    pause
)

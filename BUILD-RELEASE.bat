@echo off
title FirmFlow FlashKit — Release Builder
color 0A

echo.
echo  ============================================================
echo   ^^  FirmFlow FlashKit — Building Standalone .EXE
echo  ============================================================
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Node.js not found. Install from https://nodejs.org
    pause & exit /b 1
)

:: Check Cargo
where cargo >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo  [ERROR] Rust not found. Install from https://rustup.rs
    pause & exit /b 1
)

echo  [OK] Node.js  -  %node version%
echo  [OK] Rust / Cargo found
echo.

:: Install deps if needed
if not exist "node_modules\" (
    echo  [INFO] Installing JS dependencies...
    call npm install
    if %errorlevel% neq 0 ( color 0C & echo  [ERROR] npm install failed & pause & exit /b 1 )
    echo  [OK] Dependencies installed
    echo.
)

echo  [INFO] Building release executable...
echo  [INFO] This takes 3-10 minutes on first build (Rust compiles).
echo  [INFO] Subsequent builds are much faster.
echo.

call npm run tauri build

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  [ERROR] Build failed. See errors above.
    pause
    exit /b 1
)

echo.
echo  ============================================================
echo   BUILD SUCCESSFUL!
echo  ============================================================
echo.
echo  Standalone EXE location:
echo.
echo    src-tauri\target\release\FirmFlow FlashKit.exe
echo.
echo  Installer location:
echo.
echo    src-tauri\target\release\bundle\msi\
echo    src-tauri\target\release\bundle\nsis\
echo.

:: Open the output folder automatically
echo  [INFO] Opening output folder...
explorer "src-tauri\target\release"

echo.
pause

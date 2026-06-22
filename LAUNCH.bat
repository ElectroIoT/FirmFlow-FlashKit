@echo off
title FirmFlow FlashKit — Launcher
color 0A

echo.
echo  Checking PowerShell...

:: Run the PS launcher — keep window open on any error
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0LAUNCH.ps1"

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo  ============================================================
    echo   ERROR: Launcher failed  (exit code %errorlevel%)
    echo  ============================================================
    echo.
    echo  Common fixes:
    echo    1. Right-click LAUNCH.bat and choose "Run as administrator"
    echo    2. Make sure you are connected to the internet (first run)
    echo    3. Check antivirus is not blocking rustup or node downloads
    echo.
    pause
)

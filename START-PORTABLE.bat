@echo off
title FirmFlow FlashKit — Portable Launcher
:: Launches the PowerShell portable starter.
:: Bypasses execution policy so no manual setup is needed.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0START-PORTABLE.ps1"

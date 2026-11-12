@echo off
cd /d "%~dp0"
node preview-launcher.mjs
if errorlevel 1 pause

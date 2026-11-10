@echo off
cd /d "%~dp0"
set "DUEL_FALLBACK=1"
echo Deja esta ventana abierta mientras jugas.
node server.mjs
pause

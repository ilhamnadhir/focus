# Quick Start Script
# This script helps you run the Focus app with the correct Node version

Write-Host "🎯 Focus App - Quick Start" -ForegroundColor Cyan
Write-Host ""

# Check current Node version
$currentVersion = node --version
Write-Host "Current Node version: $currentVersion" -ForegroundColor Yellow

if ($currentVersion -like "v25.*") {
    Write-Host ""
    Write-Host "⚠️  Warning: Node.js v25 has compatibility issues with this app" -ForegroundColor Red
    Write-Host ""
    Write-Host "Solutions:" -ForegroundColor Green
    Write-Host "1. If you have NVM installed, run: nvm use 20.19.6" -ForegroundColor White
    Write-Host "2. Or uninstall Node v25 and use v20.19.6" -ForegroundColor White
    Write-Host ""
    Write-Host "After switching, run this script again or run: npm run dev" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Node version is compatible!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host ""

# Start the dev server
npm run dev

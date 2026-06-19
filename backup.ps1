# UI Runway Git Auto-Backup Script
# This script stages all changes, commits them with a timestamp, and pushes them to your GitHub remote.

# 1. Change directory to the project folder and set authentication
Set-Location -Path $PSScriptRoot

# Load environment variables from .env
$envPath = Join-Path $PSScriptRoot ".env"
if (Test-Path $envPath) {
    Get-Content $envPath | Foreach-Object {
        if ($_ -match "^(?<name>[^=]+)=(?<value>.*)$") {
            $name = $Matches['name'].Trim()
            $value = $Matches['value'].Trim()
            [System.Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

# 2. Check if git remote is configured
$remote = git remote get-url origin 2>$null
if (-not $remote) {
    Write-Warning "No git remote 'origin' is configured. Run 'git remote add origin <URL>' first."
    Exit 1
}

# 3. Stage all changes
Write-Host "Staging files..." -ForegroundColor Cyan
git add .

# 4. Commit changes with a timestamped message
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMsg = "Auto-backup: $timestamp"
Write-Host "Committing changes: '$commitMsg'..." -ForegroundColor Cyan
git commit -m $commitMsg 2>$null

# 5. Push to GitHub main branch
Write-Host "Pushing to remote repository..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Auto-backup pushed successfully at $timestamp!" -ForegroundColor Green
} else {
    Write-Error "Failed to push to GitHub. Verify your network connection and repository credentials."
}

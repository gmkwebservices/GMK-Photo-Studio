# GMK Photo Studio — Windows desktop app (Electron)

A ready-to-build Electron project that wraps the Photo Studio tool into a
real, installable Windows app (`GMK Photo Studio Setup 1.0.0.exe`), with a
Start Menu entry, desktop shortcut and its own window — no browser needed.

**Why this folder isn't already a finished .exe:** building it downloads
~150MB of Electron's prebuilt Chromium/Node binaries from
`github.com/electron/electron`, plus packages from the npm registry. The
sandbox this project was built in has those specific hosts blocked by
policy (its network access is restricted to a small allow-list — it
deliberately does **not** include npm or Electron's download servers), so
the build itself has to run somewhere with normal internet access. Two
ways to do that, in order of how little setup they need:

## Option A — let GitHub build it for you (no local install needed)

This folder already includes `.github/workflows/build-windows.yml`, which
builds the installer automatically using GitHub's own (fully
internet-connected) servers.

1. Create a new GitHub repository and push this folder to it.
2. Go to the repo's **Actions** tab → **Build Windows installer** →
   **Run workflow** (or just push to `main` — it runs automatically).
3. Wait for the run to finish (a few minutes), open it, and download the
   **GMK-Photo-Studio-Windows-Installer** artifact — that's the `.exe`.

No Node.js, npm or anything else needs to be installed on your own
computer for this option.

## Option B — build it yourself on a PC with internet access

1. Install [Node.js LTS](https://nodejs.org) (v20 or newer) if you don't
   already have it.
2. Open a terminal in this folder and run:
   ```
   npm install
   npm run dist
   ```
3. The installer appears in `dist\GMK Photo Studio Setup 1.0.0.exe`.

## What's in this folder

- `main.js` / `preload.js` — the Electron shell: opens the app in its own
  window and grants it camera access (used by the photo-capture feature).
- `app/index.html` — the Photo Studio tool itself, unmodified.
- `package.json` — the `electron-builder` configuration that produces a
  Windows NSIS installer (`npm run dist`).
- `icon.png` — the app icon (generated from the site logo).
- `.github/workflows/build-windows.yml` — the CI workflow for Option A.

## About offline use

Once installed, the app runs as a normal desktop program — it does not
need the WordPress site or any server to open. The editor's camera, crop,
and print-sheet features all work fully offline.

Three features call out to the internet and only work when the PC is
online: AI-assisted background removal and face detection (which load
their models from a CDN), and PDF export's underlying library. If you
need those to work with zero internet access ever (including the very
first run), say so and the next revision can vendor those library files
directly into `app/` instead of loading them from a CDN — this sandbox
could not download them to bundle them in this round because the same
network policy that blocks Electron's own download servers also blocks
the CDN hosts.

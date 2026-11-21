// Nothing privileged is exposed to the page — the app runs exactly as it
// does in a browser tab. This file exists so webPreferences can safely set
// contextIsolation: true (Electron's recommended, more secure default)
// while still having a preload entry point available if a future version
// needs to expose a native capability (e.g. "Save PDF to a chosen folder").

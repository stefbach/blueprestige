#!/usr/bin/env bash
#
# Installs the local dependencies for the four 3D MCP servers wired up in .mcp.json.
#
#   blender     — uvx blender-mcp            (PyPI, no local install needed)
#   unity       — uvx mcpforunityserver      (PyPI, no local install needed)
#   build123d   — uv tool run build123d-mcp  (PyPI, no local install needed)
#   hello3d     — node vendor/hello3dmcp-server/server.js  (git checkout + npm install)
#
# The first three are fetched on demand by uv; this script warms their caches so the
# first MCP client start isn't a multi-minute download. The fourth is not published
# to npm, so it must be cloned.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VENDOR_DIR="$REPO_ROOT/vendor"
HELLO3D_DIR="$VENDOR_DIR/hello3dmcp-server"
HELLO3D_REPO="https://github.com/aidenlab/hello3dmcp-server.git"

log() { printf '\n==> %s\n' "$1"; }

# --- prerequisites ---------------------------------------------------------

if ! command -v uv >/dev/null 2>&1; then
  echo "error: 'uv' is not installed." >&2
  echo "  macOS:   brew install uv" >&2
  echo "  Linux:   curl -LsSf https://astral.sh/uv/install.sh | sh" >&2
  echo "  Windows: powershell -c \"irm https://astral.sh/uv/install.ps1 | iex\"" >&2
  echo "Do not use 'pip install uv' — it may not create the 'uvx' command." >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1; then
  echo "error: Node.js 18+ is required for the hello3d server (https://nodejs.org)." >&2
  exit 1
fi

# --- python servers --------------------------------------------------------

log "Warming blender-mcp (Python 3.11)"
uvx --python 3.11 blender-mcp --help >/dev/null 2>&1 || true

log "Warming mcp-for-unity"
uvx --from mcpforunityserver mcp-for-unity --help >/dev/null 2>&1 || true

log "Warming build123d-mcp (Python 3.12)"
uv tool run --python 3.12 build123d-mcp@latest --version

# --- hello3d ---------------------------------------------------------------

if [ -d "$HELLO3D_DIR/.git" ]; then
  log "Updating hello3dmcp-server"
  git -C "$HELLO3D_DIR" pull --ff-only
else
  log "Cloning hello3dmcp-server"
  mkdir -p "$VENDOR_DIR"
  git clone --depth 1 "$HELLO3D_REPO" "$HELLO3D_DIR"
fi

log "Installing hello3dmcp-server dependencies"
(cd "$HELLO3D_DIR" && npm install --no-audit --no-fund)

# --- done ------------------------------------------------------------------

cat <<'EOF'

==> Done.

Still to do by hand (these live outside this repo):

  Blender  — install vendor/blender-mcp/addon.py via
             Edit > Preferences > Add-ons > Install..., enable "Interface: Blender MCP",
             then in the 3D View sidebar (N) open the BlenderMCP tab and click
             "Connect to Claude".

  Unity    — Package Manager > Add from git URL:
             https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main
             then Window > MCP for Unity > Configure All Detected Clients.

  Hello3D  — run the frontend (https://github.com/aidenlab/hello3dmcp-frontend) and open
             the URL returned by the get_browser_connection_url tool.

Then restart your MCP client so it picks up .mcp.json.
See docs/mcp-3d-setup.md for details and troubleshooting.
EOF

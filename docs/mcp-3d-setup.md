# 3D MCP servers — setup

Four MCP servers are wired into this project via `.mcp.json`, each with a matching skill under `.claude/skills/`.

| Server | Repo | What it drives | Runs from |
|---|---|---|---|
| `blender` | [ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp) (MIT) | Blender, over a socket to an in-Blender addon | PyPI `blender-mcp` via `uvx` |
| `unity` | [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) (MIT) | Unity Editor, via a Unity package | PyPI `mcpforunityserver` via `uvx` |
| `build123d` | [pzfreo/build123d-mcp](https://github.com/pzfreo/build123d-mcp) (Apache-2.0) | Parametric CAD, self-contained | PyPI `build123d-mcp` via `uv tool run` |
| `hello3d` | [aidenlab/hello3dmcp-server](https://github.com/aidenlab/hello3dmcp-server) (MIT) | A 3D model in a browser, over WebSocket | git checkout in `vendor/` |

## One-time install

```bash
./scripts/install-mcp-3d.sh
```

That warms the three PyPI-backed servers and clones + `npm install`s the fourth. Then restart your MCP client so it reads `.mcp.json`.

Prerequisites: [`uv`](https://docs.astral.sh/uv/getting-started/installation/) and Node.js 18+.

> Install `uv` with its **official installer**, not `pip install uv` — pip may not create the `uvx` command, or may hide it inside an environment your MCP client can't see.

## Per-server: the part the script can't do

Three of these four servers are only half the system. The other half runs inside an application on your machine, and you have to install it yourself.

### Blender

The addon is vendored at [`vendor/blender-mcp/addon.py`](../vendor/blender-mcp/addon.py) so you don't have to hunt for it.

1. Blender → **Edit → Preferences → Add-ons → Install…**
2. Select `vendor/blender-mcp/addon.py`
3. Tick **Interface: Blender MCP**
4. In the 3D View, press <kbd>N</kbd> for the sidebar → **BlenderMCP** tab → **Connect to Claude**

Requires Blender 3.0+.

Optional integrations, configured in the same panel or in **Edit → Preferences → Add-ons → Blender MCP**:

- **Poly Haven** — free HDRIs, textures and models. Just a checkbox in the sidebar.
- **Sketchfab** — needs an API key.
- **Hyper3D Rodin** — text/image → 3D. Trial key available, or your own from hyper3d.ai / fal.ai.
- **Hunyuan3D** — needs SecretId / SecretKey / API URL.

Keys stored in Add-on Preferences survive Blender restarts.

**Only one BlenderMCP server may talk to the addon at a time.** If Claude Desktop and Claude Code are both configured for it, run one, not both.

### Unity

Install the Unity-side package:

1. Unity → **Window → Package Manager → Add package from git URL**
2. `https://github.com/CoplayDev/unity-mcp.git?path=/MCPForUnity#main` (or pin a tag, e.g. `#v10.0.0`)
   — or `openupm add com.coplaydev.unity-mcp`
3. **Window → MCP for Unity → Configure All Detected Clients**

Requires Unity 2021.3 LTS → 6.x.

Note that step 3 writes MCP config into your *client's* global settings. The `unity` entry in this repo's `.mcp.json` covers the project scope; if you end up with both, you may see the server twice — drop whichever you don't want.

### build123d

Nothing else to install. The server carries its own CAD stack (OCC, build123d) and runs headless.

The first launch downloads ~90 packages including VTK and cadquery-ocp, which is slow. `install-mcp-3d.sh` gets that out of the way.

### Hello3D

The server is a bridge; the model lives in a browser.

1. Run the frontend: [aidenlab/hello3dmcp-frontend](https://github.com/aidenlab/hello3dmcp-frontend), by default on `http://localhost:5173`
2. Ask Claude for the connection URL (the `get_browser_connection_url` tool) — it embeds your session ID
3. Open that URL

If you deploy the frontend somewhere else, change `BROWSER_URL` in `.mcp.json`. `WS_PORT` (default `3001`) is the WebSocket port the browser connects back on.

The checkout lives at `vendor/hello3dmcp-server/` and is gitignored — it's a clone, not vendored source. Re-run the install script to update it.

## Verifying

Each server should answer on stdio. Quick smoke tests:

```bash
uvx --python 3.11 blender-mcp --help
uvx --from mcpforunityserver mcp-for-unity --help
uv tool run --python 3.12 build123d-mcp@latest --version
node vendor/hello3dmcp-server/server.js --help
```

`blender-mcp` will log `Failed to connect to Blender: Connection refused` and exit cleanly when Blender isn't running — that's expected, and confirms the server itself starts.

In your client, check the servers are listed (`/mcp` in Claude Code) and that tools appear.

## Troubleshooting

### `spawn uvx ENOENT`

Clients launched from a GUI (Claude Desktop, Cursor, VS Code from the Dock/Start menu) don't inherit your shell's `PATH`. Find the absolute path and use it as `command` in `.mcp.json`:

```bash
which uvx     # macOS/Linux, e.g. /opt/homebrew/bin/uvx or ~/.local/bin/uvx
where uvx     # Windows,     e.g. C:\Users\<you>\.local\bin\uvx.exe
```

On Windows you can instead wrap it: `"command": "cmd", "args": ["/c", "uvx", "blender-mcp"]`.

After any PATH or config change, **fully quit** the client and relaunch (Windows: quit from the system tray; macOS: <kbd>Cmd</kbd>+<kbd>Q</kbd>).

### Wrong Python / dependency resolution failures

The `blender` entry pins `--python 3.11` with `UV_PYTHON_PREFERENCE=only-managed`, and `build123d` pins `--python 3.12`. That's deliberate: on machines with conda (auto-activated base), pyenv or asdf, uv can otherwise pick an interpreter that has no wheels for these dependencies.

If a failed attempt keeps replaying after you've fixed it, the cache is stale:

```bash
uv cache clean blender-mcp && uvx --refresh blender-mcp
```

### `uv` is unavailable on a locked-down machine

Use [`pipx`](https://pipx.pypa.io) and point `command` at the installed executable:

```bash
pipx install blender-mcp
pipx ensurepath        # then restart your shell and client
which blender-mcp      # use this absolute path as "command", drop "args"
```

### Blender tools return "Could not connect to Blender"

The MCP server is fine; the addon side isn't listening. Check the addon is enabled and that you clicked **Connect to Claude** in the BlenderMCP sidebar panel. Restarting the MCP server will not help.

If Blender is on a different host or inside Docker, set `BLENDER_HOST` / `BLENDER_PORT` in `.mcp.json` (e.g. `host.docker.internal`).

### Hello3D tools hang or report no client

The browser isn't connected. Call `get_browser_connection_url` and open the URL it returns — the session ID in it is what pairs the two halves.

## Licences

Upstream code included in this repo:

- `vendor/blender-mcp/addon.py` and `vendor/blender-mcp/LICENSE` — MIT, © ahujasid
- `.claude/skills/unity-mcp-orchestrator/` — the skill shipped in CoplayDev/unity-mcp, MIT
- `.claude/skills/build123d-mcp/references/tools-reference.md` — upstream `llms.md`, Apache-2.0

The `blender-mcp` and `hello3d-mcp` skills are written for this project.

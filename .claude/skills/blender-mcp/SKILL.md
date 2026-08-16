---
name: blender-mcp
description: Drive Blender from Claude through the BlenderMCP server - inspect the scene, create and modify objects, apply materials, run Python inside Blender, grab viewport screenshots, and pull assets from Poly Haven, Sketchfab, Hyper3D Rodin or Hunyuan3D. Use whenever the task involves Blender, .blend scenes, 3D modelling, lighting, materials, rendering setup, or downloading 3D assets/HDRIs/textures into a scene.
---

# BlenderMCP Operator Guide

BlenderMCP has two halves that must **both** be running:

1. The **MCP server** (`uvx blender-mcp`) — started by the client, configured in `.mcp.json` as `blender`.
2. The **Blender addon** (`vendor/blender-mcp/addon.py`) — installed inside Blender, listening on a socket (default `localhost:9876`).

If the tools return "Could not connect to Blender", the addon side is not running. See `docs/mcp-3d-setup.md` for the install steps; do not try to fix it by restarting the MCP server.

## Session start: always orient first

```
1. get_scene_info()                 → objects, materials, collections in the current .blend
2. get_object_info(name)            → transform, mesh stats, materials of one object
3. get_viewport_screenshot()        → see what the scene actually looks like
```

Never assume object names. Blender scenes start with `Cube`, `Camera`, `Light` — but the user's file may not. Read the scene before touching it.

## Tool map

**Inspection**
- `get_scene_info` — scene graph summary
- `get_object_info(object_name)` — details for one object
- `get_viewport_screenshot(max_size=800)` — render of the current viewport; use it to verify results visually

**Execution**
- `execute_blender_code(code)` — arbitrary Python inside Blender via `bpy`. This is the workhorse for anything the dedicated tools don't cover.

**Poly Haven** (free HDRIs / textures / models — requires the Poly Haven checkbox enabled in the addon panel)
- `get_polyhaven_status` — check it's enabled before anything else
- `get_polyhaven_categories(asset_type)`, `search_polyhaven_assets(asset_type, categories)`
- `download_polyhaven_asset(asset_id, asset_type, resolution, file_format)`
- `set_texture(object_name, texture_id)` — apply a downloaded texture

**Sketchfab** (needs a Sketchfab API key in addon preferences)
- `get_sketchfab_status`, `search_sketchfab_models`, `get_sketchfab_model_preview`, `download_sketchfab_model`

**Hyper3D Rodin** (text/image → 3D, needs an API key or the trial key)
- `get_hyper3d_status`, `generate_hyper3d_model_via_text`, `generate_hyper3d_model_via_images`
- `poll_rodin_job_status` → then `import_generated_asset`

**Hunyuan3D**
- `get_hunyuan3d_status`, `generate_hunyuan3d_model`, `poll_hunyuan_job_status`, `import_generated_asset_hunyuan`

**Strategy prompt**
- `asset_creation_strategy` — the server's own guidance on which asset source to pick. Read it before starting a scene-building task from scratch.

## Working rules

### 1. Check integration status before using an integration
`get_polyhaven_status`, `get_sketchfab_status`, `get_hyper3d_status`, `get_hunyuan3d_status` all exist because each of these is off by default. Calling a download tool for a disabled integration wastes a round trip and returns a confusing error. Check first, and if it's off, tell the user which checkbox or API key to set rather than falling back silently.

### 2. Prefer real assets over hand-modelled geometry
For anything that exists in the world — rocks, plants, furniture, HDRI skies, surface textures — Poly Haven or Sketchfab gives a far better result than primitives assembled in `execute_blender_code`. Reach for `execute_blender_code` when the shape is specific to the task (a custom part, a layout, a procedural arrangement).

### 3. Build incrementally and look at the result
```
create/modify a few objects
  → get_viewport_screenshot()
  → correct
  → continue
```
A single large `execute_blender_code` block that builds an entire scene is hard to debug when one line fails. Split it, and screenshot after each meaningful step.

### 4. `execute_blender_code` runs unsandboxed Python
It has full `bpy` access and can modify or delete anything in the open file, including unsaved work. Before destructive operations (`bpy.ops.object.delete`, clearing collections, `bpy.ops.wm.read_homefile`), confirm with the user. Prefer additive operations and named collections so your work is easy to undo.

### 5. Write defensive bpy code
```python
import bpy

obj = bpy.data.objects.get("Cube")
if obj is None:
    raise ValueError("Object 'Cube' not found")
```
`bpy.data.objects["Cube"]` raises a bare `KeyError` that surfaces as an opaque failure. Also remember: many `bpy.ops` calls depend on the active object and the current mode — set `bpy.context.view_layer.objects.active` and check `obj.mode` rather than assuming Object Mode.

### 6. Long generations are polled, not awaited
Hyper3D and Hunyuan3D return a job handle. Call the matching `poll_*_job_status` until it reports completion, then `import_generated_asset*`. Don't import before the job is done.

## Common failures

| Symptom | Cause | Fix |
|---|---|---|
| `Could not connect to Blender` | Addon not installed, or "Connect to Claude" not clicked | Blender → N-panel → BlenderMCP tab → Connect to Claude |
| Tools missing from the client | MCP server not started / `uvx` not on PATH | See `docs/mcp-3d-setup.md`, "uvx not found" |
| Poly Haven tools error out | Integration checkbox off | Enable Poly Haven in the BlenderMCP sidebar panel |
| Sketchfab/Hyper3D auth errors | No API key stored | Edit → Preferences → Add-ons → Blender MCP → set the key |
| Changes don't appear | Edited a datablock without updating the view layer | `bpy.context.view_layer.update()`, then re-screenshot |

## Don't run two servers at once

Only one BlenderMCP server instance may talk to the addon. If Claude Desktop and Claude Code are both configured, the second one to connect will fail or steal the socket. Run one.

## Upstream

- Repo: https://github.com/ahujasid/blender-mcp (MIT)
- Addon vendored at `vendor/blender-mcp/addon.py`
- Requires Blender 3.0+

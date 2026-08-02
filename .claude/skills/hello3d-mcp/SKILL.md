---
name: hello3d-mcp
description: Art-direct a live 3D model in the browser through the Hello3DMCP server - set model color, scale and rotation, move and colour the key and fill lights, dolly the camera and change its FOV, and set the scene background. Use for interactive 3D product/model presentation, lighting setup, turntable framing, and any "make the model look like X" request against the Hello3D web viewer.
---

# Hello3DMCP Operator Guide

This server does **not** create geometry. It art-directs a model already loaded in the Hello3D web frontend: colour, scale, rotation, two lights, camera, background.

## Architecture — three pieces must all be up

```
Claude ──stdio──> hello3d MCP server ──WebSocket (ws://localhost:3001)──> browser frontend
```

1. The MCP server (`node vendor/hello3dmcp-server/server.js`) — started by the client via `.mcp.json`.
2. The **browser** with the Hello3D frontend open, connected to the WebSocket.
3. A session linking them.

**If tools time out or report no connected client, the browser is not connected.** Call `get_browser_connection_url()` and give the user the URL to open — that URL carries the session ID. Nothing else works until the browser is on the other end.

## Start every session by reading state

The server exposes a getter for nearly every setter. Use them — the scene has a state the user has been adjusting, and relative moves compound.

```
get_model_color / get_model_scale / get_model_rotation
get_background_color
get_key_light_intensity / _color / _size / _position_spherical
get_fill_light_intensity / _color / _size / _position_spherical
get_camera_distance / get_camera_fov
```

## Tool map

**Model**
- `change_model_color(color)` — hex (`#ff0000`) or an Apple crayon name (`maraschino`, `turquoise`, `lemon`, `blueberry`, …)
- `change_model_size(size)` — uniform
- `scale_model(x, y, z)` — non-uniform
- `set_model_rotation(x, y, z)` — absolute Euler degrees, XYZ order
- Relative nudges: `rotate_model_clockwise`, `rotate_model_counterclockwise`, `nudge_model_pitch_up`, `nudge_model_pitch_down`, `nudge_model_roll`

**Scene**
- `change_background_color(color)`, `get_background_color()`

**Key light** (main source) and **fill light** (shadow softener) — symmetric APIs:
- Absolute: `set_*_light_intensity`, `set_*_light_color`, `set_*_light_position_spherical(azimuth, elevation)`, `set_*_light_distance`
- Arc moves: `swing_*_light_up / _down / _left / _right`
- Distance: `walk_*_light_in / _out`
- Relative: `rotate_*_light_clockwise / _counterclockwise`, `nudge_*_light_elevation_up / _down`, `move_*_light_toward_direction`

**Camera**
- `dolly_camera(distance)` absolute, `dolly_camera_in` / `dolly_camera_out` relative
- `set_camera_fov(fov)`, `increase_camera_fov`, `decrease_camera_fov`

**Session**
- `get_browser_connection_url()` — the URL the user must open

## Working rules

### 1. Absolute for targets, relative for adjustments
"Put the key light at 45° azimuth" → `set_key_light_position_spherical`. "A bit more from the left" → `swing_key_light_left`. Mixing them up is how you end up chasing the light around the scene.

### 2. Read before you nudge
Relative tools stack on current state. If you don't know where the light is, a "nudge up" can push it past the pole. Get the spherical position first, then decide between a nudge and a set.

### 3. Lighting vocabulary → concrete moves
Users ask for looks, not coordinates. Reasonable starting points:

| Ask | Moves |
|---|---|
| Studio / product | Key at ~45° azimuth, ~30° elevation, strong; fill opposite side, ~1/3 key intensity |
| Dramatic / moody | Key low and to one side, fill intensity near zero |
| Flat / catalogue | Key and fill near-equal intensity, both close to camera axis |
| Warm | Key toward `#ffd9a0`, fill cool `#a0c8ff` for contrast |
| Rim / silhouette | Key swung behind the model (high azimuth), fill low |

Set it, then ask the user to look — you cannot see the viewport from here.

### 4. You have no screenshot tool
There is no render-back. Every visual judgement belongs to the user. After a lighting or camera change, say what you changed and ask them to confirm rather than asserting how it looks.

### 5. Dolly vs FOV are different looks
`dolly_camera` changes distance (and therefore how much of the frame the model fills). `set_camera_fov` changes perspective distortion — wide FOV exaggerates depth, narrow FOV flattens it. "Zoom in" is ambiguous; for product shots, dolly out + narrow FOV is usually the flattering answer.

### 6. Batch related changes, then check once
A lighting setup is 4–6 calls. Make them all, then ask the user for one look, instead of round-tripping after every intensity tweak.

## Setup notes

- Requires Node.js 18+ and `npm install` inside `vendor/hello3dmcp-server/` (the repo is not published to npm).
- STDIO transport is auto-detected when stdin is not a TTY, which is how MCP clients launch it — no flag needed.
- `BROWSER_URL` (default `http://localhost:5173`) and `WS_PORT` (default `3001`) are set in `.mcp.json`. Point `BROWSER_URL` at the deployed frontend if you're not running it locally.
- Frontend: https://github.com/aidenlab/hello3dmcp-frontend

## Upstream

- Repo: https://github.com/aidenlab/hello3dmcp-server (MIT)

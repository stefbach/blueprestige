# blueprestige

## 3D MCP servers

Four Model Context Protocol servers are configured in [`.mcp.json`](.mcp.json), each with a
skill under [`.claude/skills/`](.claude/skills) so Claude knows how to drive it:

| Server | Skill | Use it for |
|---|---|---|
| `blender` | `blender-mcp` | Blender scenes: modelling, materials, lighting, viewport screenshots, Poly Haven / Sketchfab / Hyper3D assets |
| `unity` | `unity-mcp-orchestrator` | Unity Editor: GameObjects, C# scripts, scenes, prefabs, tests |
| `build123d` | `build123d-mcp` | Parametric CAD: mechanical parts, measurement, validation, STEP/STL export |
| `hello3d` | `hello3d-mcp` | Art-directing a model in the Hello3D browser viewer: colour, lights, camera |

### Install

```bash
./scripts/install-mcp-3d.sh
```

Needs [`uv`](https://docs.astral.sh/uv/getting-started/installation/) and Node.js 18+.

Blender, Unity and Hello3D each need a second piece installed inside the host application
(a Blender addon, a Unity package, a browser frontend) — the script prints what's left and
[`docs/mcp-3d-setup.md`](docs/mcp-3d-setup.md) has the full steps plus troubleshooting.

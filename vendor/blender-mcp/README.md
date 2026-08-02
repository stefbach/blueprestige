# vendor/blender-mcp

`addon.py` is a verbatim copy of the Blender addon from
[ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp), MIT licensed
(see `LICENSE`). It is vendored here so the addon file is available without
cloning the upstream repo.

Install it in Blender via **Edit → Preferences → Add-ons → Install…**, then
enable **Interface: Blender MCP**. Full steps in
[`docs/mcp-3d-setup.md`](../../docs/mcp-3d-setup.md).

The matching MCP server is *not* vendored — it comes from PyPI (`uvx blender-mcp`).
When you upgrade the server, replace this file with the `addon.py` from the same
upstream release; the two halves speak a shared protocol and are expected to move
together.

Copied from upstream `main` at version 1.6.0.

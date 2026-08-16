---
name: build123d-mcp
description: Parametric CAD from code via the build123d MCP server - execute build123d Python in a persistent CAD session, render PNG/SVG/DXF previews, measure volume/area/bounding boxes, detect holes and bosses, check printability and clearances, validate solids, and export STEP/STL/DXF/SVG. Use for mechanical parts, enclosures, brackets, 3D-printable geometry, engineering drawings, and any "design a part with these dimensions" task.
---

# build123d-mcp Operator Guide

build123d-mcp gives an assistant *eyes and calipers* for CAD. The point is not to write one long script and hope — it is to build a part in small steps and **verify each one** before continuing.

Full tool and parameter reference: `references/tools-reference.md` (vendored copy of upstream `llms.md`). Read it when you need exact argument shapes; the guidance below is the workflow.

## The loop

```
execute()      → add one feature
render_view()  → look at it
measure()      → check the numbers against the spec
validate()     → confirm it's a valid manifold solid
export()       → only after validate() passes
```

Never export unvalidated geometry. A solid that renders fine can still be non-manifold and fail in a slicer or downstream CAD.

## Persistent session

`execute()` runs against a **session that persists between calls**. Variables you define stay defined; the model accumulates. Consequences:

- Build incrementally — each `execute()` can reference names from the previous one.
- Session state drifts. Call `session_state()` when you are unsure what exists rather than guessing.
- `reset()` wipes it. Use it when starting a genuinely new part, not to recover from an error (you lose everything).
- `save_snapshot()` before a risky operation; `restore_snapshot()` to roll back. `diff_snapshot()` shows what changed.

## Tool map

**Core**
- `execute(code)` — run build123d Python in the session
- `session_state()` — what objects/variables currently exist
- `version()`, `health_check()` — environment sanity

**See it**
- `render_view()` — PNG/SVG/DXF preview from a chosen viewpoint
- `cross_sections()` — section cuts; essential for internal features you can't see from outside

**Measure it**
- `measure()` — volume, area, bounding box, centre of mass, topology counts
- `clearance()` — gaps between bodies
- `interference()` — do two bodies collide
- `shape_compare()` — compare against a reference shape
- `design_audit()` — printability, thin walls, overhangs

**Spec discipline**
- `suggest_spec()` — derive a checkable spec from the request
- `verify_spec()` — check the current model against it

**Validate & export**
- `validate()` — manifold / watertight / export-ready check
- `export()` — STEP, STL, DXF, SVG (or several at once)

**Recover**
- `last_error()` — full traceback of the last failed `execute()`
- `repair_hints()` — suggested fixes for a failing solid
- `workflow_hints()` — what to do next

**Reuse**
- `search_library()`, `load_part()` — existing parts
- `import_cad_file()` — bring in STEP/STL to compare against

## Working rules

### 1. Turn the request into numbers before modelling
"A mounting plate with two holes" is not buildable. Pin down: outer dimensions, hole diameter, hole spacing, edge distance, thickness, units. If the user left something open, pick a sensible engineering default, **state it explicitly**, and carry on — don't stall on a question you can answer with a standard value.

`suggest_spec()` helps produce that list; `verify_spec()` closes the loop at the end.

### 2. One feature per `execute()`
Base shape → holes → fillets → chamfers. When step 3 fails you know exactly what broke. A 60-line script that errors somewhere in the middle leaves the session in an unclear state.

### 3. Fillets and chamfers go last, and fail loudest
Filleting is the most common failure point: a radius larger than the adjacent wall, or an edge selection that catches more edges than intended, produces an invalid solid. Apply them after the geometry is right, keep radii well under half the local wall thickness, and `validate()` immediately after.

### 4. When `execute()` fails, read the actual error
Call `last_error()` — don't rewrite the script from scratch on a guess. Then `repair_hints()` if the failure is geometric rather than a Python mistake. Fix the smallest thing and re-run that one step.

### 5. Measure against the spec, not against the render
A render that looks right proves nothing about dimensions. `measure()` returns the bounding box and volume; compare those numbers to the spec before declaring the part done.

### 6. Units are millimetres
build123d works in mm by default. If the user gives inches, convert explicitly in the code and say so — don't silently reinterpret.

### 7. `execute()` runs real Python
It is a sandboxed but genuine interpreter (see the sandbox notes at the top of `references/tools-reference.md` for what is and isn't allowed). Treat file paths it writes to as real. Export to a path inside the project unless the user asked otherwise.

## Sketch of a first part

```python
from build123d import *

with BuildPart() as plate:
    with BuildSketch() as sk:
        Rectangle(60, 40)
        with Locations((-20, 0), (20, 0)):
            Circle(2.5, mode=Mode.SUBTRACT)
    extrude(amount=6)
```

Then: `render_view()` → `measure()` → `validate()` → `export(formats=["step", "stl"])`.

## Upstream

- Repo: https://github.com/pzfreo/build123d-mcp (Apache-2.0)
- PyPI: `build123d-mcp`, launched here via `uv tool run --python 3.12 build123d-mcp@latest`
- build123d docs: https://build123d.readthedocs.io

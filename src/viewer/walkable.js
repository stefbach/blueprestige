/**
 * Masque de circulation : grille booléenne qui dit où la caméra a le droit d'aller.
 *
 * Les pièces du relevé sont séparées par la cloison de 0.20 m ; on rouvre le passage
 * uniquement au droit des ouvertures franchissables (portes, baies, arches).
 * C'est ce qui empêche de traverser les murs en mode visite.
 */
import { LEVELS, OPENINGS, ROOMS, STAIR_FOOTPRINT } from '../villa/plan.js'

const RES = 0.1 // pas de la grille, en mètres
const MARGIN = 0.28 // recul mini par rapport aux parois (demi-largeur d'épaules)

// Emprise couverte, terrain sud compris pour pouvoir sortir sur la terrasse.
const BOUNDS = { x0: -4, y0: -8, x1: 18, y1: 13 }

const NX = Math.ceil((BOUNDS.x1 - BOUNDS.x0) / RES)
const NY = Math.ceil((BOUNDS.y1 - BOUNDS.y0) / RES)

const ix = (x) => Math.round((x - BOUNDS.x0) / RES)
const iy = (y) => Math.round((y - BOUNDS.y0) / RES)

/** Ouvertures que l'on peut franchir à pied. */
const PASSABLE = new Set(['door', 'sliding', 'arch', 'opening', 'entrance', 'frenchDoor'])

function clear(mask, x0, y0, x1, y1) {
  const a = Math.max(0, ix(x0))
  const b = Math.min(NX - 1, ix(x1))
  const c = Math.max(0, iy(y0))
  const d = Math.min(NY - 1, iy(y1))
  for (let i = a; i <= b; i++) for (let j = c; j <= d; j++) mask[j * NX + i] = 0
}

function fill(mask, x0, y0, x1, y1) {
  const a = Math.max(0, ix(x0))
  const b = Math.min(NX - 1, ix(x1))
  const c = Math.max(0, iy(y0))
  const d = Math.min(NY - 1, iy(y1))
  for (let i = a; i <= b; i++) for (let j = c; j <= d; j++) mask[j * NX + i] = 1
}

function buildLevel(level) {
  const mask = new Uint8Array(NX * NY)

  for (const r of ROOMS) {
    if (r.level !== level) continue
    fill(mask, r.x0 + MARGIN, r.y0 + MARGIN, r.x1 - MARGIN, r.y1 - MARGIN)
  }

  for (const o of OPENINGS) {
    if (o.level !== level || !PASSABLE.has(o.type)) continue
    if (o.sill > 0.3) continue // allège : une fenêtre à allège ne se franchit pas
    const pad = 0.45 // profondeur du passage de part et d'autre de la cloison
    if (o.axis === 'x') {
      fill(mask, o.from + 0.12, o.at - pad, o.to - 0.12, o.at + pad)
    } else {
      fill(mask, o.at - pad, o.from + 0.12, o.at + pad, o.to - 0.12)
    }
  }

  // Terrasse et jardin au sud, accessibles depuis le rez.
  if (level === 0) {
    fill(mask, -1.5, -6.5, 15.5, -0.25)
  }

  // L'emprise de l'escalier est infranchissable : sans ça on traverse la volée.
  const s = STAIR_FOOTPRINT
  clear(mask, s.x0 - MARGIN, s.y0 - MARGIN, s.x1 + MARGIN, s.y1 + MARGIN)

  return mask
}

const MASKS = LEVELS.map((l) => buildLevel(l.id))

/** Le point (x, y) du plan est-il praticable au niveau `level` ? */
export function walkable(level, x, y) {
  const i = ix(x)
  const j = iy(y)
  if (i < 0 || j < 0 || i >= NX || j >= NY) return false
  return MASKS[level][j * NX + i] === 1
}

/**
 * Déplacement avec glissement le long des murs : on tente le pas complet, puis
 * chaque axe séparément. Sans ça on se coince dès qu'on frôle une cloison.
 */
export function slide(level, from, dx, dy) {
  const [x, y] = from
  if (walkable(level, x + dx, y + dy)) return [x + dx, y + dy]
  if (walkable(level, x + dx, y)) return [x + dx, y]
  if (walkable(level, x, y + dy)) return [x, y + dy]
  return [x, y]
}

/** Point praticable le plus proche — utilisé pour rattraper un téléport hors zone. */
export function nearestWalkable(level, x, y, maxRadius = 3) {
  if (walkable(level, x, y)) return [x, y]
  for (let r = RES; r <= maxRadius; r += RES) {
    for (let a = 0; a < 16; a++) {
      const t = (a / 16) * Math.PI * 2
      const px = x + Math.cos(t) * r
      const py = y + Math.sin(t) * r
      if (walkable(level, px, py)) return [px, py]
    }
  }
  return [x, y]
}

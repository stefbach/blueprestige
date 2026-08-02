/**
 * Construction procédurale du volume bâti à partir du relevé (plan.js).
 *
 * Repère three.js : X = plan X, Z = plan Y, Y = altitude.
 * Chaque pièce porte ses propres parois d'épaisseur WALL ; deux pièces voisines
 * remplissent donc exactement la cloison de 0.20 m laissée entre leurs rectangles.
 */
import * as THREE from 'three'
import { FOOTPRINT, LEVELS, OPENINGS, ROOMS, STAIR, WALL } from './plan.js'
import { materials } from './materials.js'

const EPS = 1e-4

function box(mat, w, h, d, x, y, z) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
  m.position.set(x, y, z)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function plane(mat, w, d, x, y, z, faceUp = true) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mat)
  m.rotation.x = faceUp ? -Math.PI / 2 : Math.PI / 2
  m.position.set(x, y, z)
  m.receiveShadow = true
  return m
}

/**
 * Découpe un pan de mur en morceaux pleins autour de ses ouvertures.
 * @returns {{from:number,to:number,z0:number,z1:number}[]}
 */
export function wallPieces(spanStart, spanEnd, h0, h1, openings) {
  const sorted = [...openings].sort((a, b) => a.from - b.from)
  const pieces = []
  let cursor = spanStart

  for (const op of sorted) {
    const a = Math.max(spanStart, op.from)
    const b = Math.min(spanEnd, op.to)
    if (b - a <= EPS) continue

    if (a - cursor > EPS) pieces.push({ from: cursor, to: a, z0: h0, z1: h1 })
    if (op.sill - h0 > EPS) pieces.push({ from: a, to: b, z0: h0, z1: Math.min(op.sill, h1) })
    if (h1 - op.head > EPS) pieces.push({ from: a, to: b, z0: Math.max(op.head, h0), z1: h1 })
    cursor = Math.max(cursor, b)
  }
  if (spanEnd - cursor > EPS) pieces.push({ from: cursor, to: spanEnd, z0: h0, z1: h1 })
  return pieces
}

/** Ouvertures concernant un pan de mur donné. */
function openingsOn(axis, at, spanStart, spanEnd, level) {
  return OPENINGS.filter(
    (o) =>
      o.level === level &&
      o.axis === axis &&
      Math.abs(o.at - at) <= WALL + EPS &&
      o.to > spanStart + EPS &&
      o.from < spanEnd - EPS
  )
}

const wallMatFor = (room) => (room.level === 0 ? 'murBeige' : 'murBlanc')

/** Menuiserie posée dans une ouverture : dormant, vantaux, vitrage. */
function joinery(op, M, levelBase) {
  const g = new THREE.Group()
  const w = op.to - op.from
  const h = op.head - op.sill
  const horiz = op.axis === 'x'

  const frameMat =
    op.type === 'sliding' || op.type === 'window' ? M.metalNoir : M.boisFonce
  const glassMat = op.type === 'frenchDoor' ? M.vitrageDepoli : M.vitrage

  // Un montant/traverse est un pavé fin ; `place` gère l'orientation du pan.
  const place = (sw, sh, sx, sy, mat, thick = 0.06) => {
    const m = horiz
      ? box(mat, sw, sh, thick, op.from + sx, levelBase + op.sill + sy, op.at)
      : box(mat, thick, sh, sw, op.at, levelBase + op.sill + sy, op.from + sx)
    g.add(m)
  }

  const F = 0.07 // section du dormant
  place(w, F, w / 2, F / 2, frameMat)          // seuil
  place(w, F, w / 2, h - F / 2, frameMat)      // linteau
  place(F, h, F / 2, h / 2, frameMat)          // montant gauche
  place(F, h, w - F / 2, h / 2, frameMat)      // montant droit

  if (op.type === 'arch' || op.type === 'opening') return g // baie libre

  if (op.type === 'door') {
    place(w - 2 * F, h - 2 * F, w / 2, h / 2, M.boisFonce, 0.04)
    return g
  }

  // Vitrages : remplissage + petits bois
  const panes = Math.max(2, Math.round(w / 0.85))
  place(w - 2 * F, h - 2 * F, w / 2, h / 2, glassMat, 0.015)
  for (let i = 1; i < panes; i++) {
    place(0.045, h - 2 * F, (w * i) / panes, h / 2, frameMat, 0.05)
  }
  if (op.type === 'entrance' || op.type === 'frenchDoor') {
    const rows = op.type === 'entrance' ? 1 : 4
    for (let r = 1; r <= rows; r++) {
      place(w - 2 * F, 0.045, w / 2, (h * r) / (rows + 1), frameMat, 0.05)
    }
  }
  return g
}

/**
 * Escalier droit du hall vers le palier, adossé au mur est.
 * Volée unique : 17 contremarches de 0.176 m pour 3.00 m de niveau à niveau,
 * giron 0.27 m — soit un reculement de 4.32 m qui tient dans les 5.00 m du hall.
 */
function stairs(M) {
  const g = new THREE.Group()
  const { x0, y0, steps, riser, tread, width } = STAIR
  const cx = x0 + width / 2

  const strMat = new THREE.MeshStandardMaterial({ color: '#f4f2ee', roughness: 0.9 })

  for (let i = 0; i < steps; i++) {
    const z = y0 + i * tread + tread / 2
    const y = (i + 1) * riser
    g.add(box(M.boisNoyer, width, 0.05, tread + 0.03, cx, y - 0.025, z))       // marche
    g.add(box(M.boisNoyer, width, riser, 0.035, cx, y - riser / 2, z - tread / 2)) // contremarche
  }

  // limon plein côté ouest (celui qu'on voit depuis le hall)
  const runZ = steps * tread
  const stringer = new THREE.Mesh(
    new THREE.BoxGeometry(0.11, 0.5, Math.hypot(runZ, steps * riser)),
    strMat
  )
  stringer.position.set(x0 - 0.055, (steps * riser) / 2 - 0.1, y0 + runZ / 2)
  stringer.rotation.x = -Math.atan2(steps * riser, runZ)
  stringer.castShadow = true
  g.add(stringer)

  // barreaudage + main courante bois
  const railH = 0.92
  for (let i = 0; i <= steps; i += 1) {
    const z = y0 + i * tread
    const y = i * riser
    g.add(box(M.boisNoyer, 0.035, railH, 0.035, x0 + 0.05, y + railH / 2, z))
  }
  const rail = new THREE.Mesh(
    new THREE.BoxGeometry(0.075, 0.055, Math.hypot(runZ, steps * riser) + 0.2),
    M.boisNoyer
  )
  rail.position.set(x0 + 0.05, (steps * riser) / 2 + railH, y0 + runZ / 2)
  rail.rotation.x = -Math.atan2(steps * riser, runZ)
  rail.castShadow = true
  g.add(rail)

  // garde-corps de trémie à l'arrivée, côté palier
  for (let i = 0; i < 8; i++) {
    g.add(box(M.boisNoyer, 0.035, railH, 0.035, x0 + 0.05 + i * 0.16, steps * riser + railH / 2, y0 + runZ))
  }

  return g
}

/** Toiture à deux pans + débord, posée au-dessus de l'étage. */
function roof(M) {
  const g = new THREE.Group()
  g.name = 'roof'
  const lvl = LEVELS[1]
  const eave = lvl.base + lvl.height
  const ridge = lvl.base + lvl.ridge
  const over = 0.6
  const w = FOOTPRINT.w + over * 2
  const d = FOOTPRINT.d + over * 2

  const shape = new THREE.BufferGeometry()
  const half = d / 2
  const verts = new Float32Array([
    // pan sud
    -over, eave, -over, w - over, eave, -over, w - over, ridge, half - over,
    -over, eave, -over, w - over, ridge, half - over, -over, ridge, half - over,
    // pan nord
    -over, ridge, half - over, w - over, ridge, half - over, w - over, eave, d - over,
    -over, ridge, half - over, w - over, eave, d - over, -over, eave, d - over,
  ])
  shape.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  shape.computeVertexNormals()
  const mesh = new THREE.Mesh(shape, new THREE.MeshStandardMaterial({
    color: '#8b9198', roughness: 0.55, metalness: 0.35, side: THREE.DoubleSide,
  }))
  mesh.castShadow = true
  g.add(mesh)

  // pignons
  const gableMat = M.murExt
  for (const x of [-over + 0.05, w - over - 0.05]) {
    const s = new THREE.Shape()
    s.moveTo(-over, eave); s.lineTo(d - over, eave); s.lineTo(half - over, ridge); s.closePath()
    const gm = new THREE.Mesh(new THREE.ShapeGeometry(s), gableMat)
    gm.rotation.y = Math.PI / 2
    gm.position.set(x, 0, 0)
    g.add(gm)
  }
  return g
}

/** Terrain, terrasse, muret, portail. */
function site(M) {
  const g = new THREE.Group()
  const W = 34
  const D = 30

  g.add(plane(M.pelouse, W, D, FOOTPRINT.w / 2, -0.02, FOOTPRINT.d / 2 - 5))

  // terrasse dallée sud
  g.add(plane(M.dallage, FOOTPRINT.w + 2, 4.2, FOOTPRINT.w / 2, 0.01, -2.2))

  // muret + clôture bois horizontale
  const wallMat = new THREE.MeshStandardMaterial({ color: '#efe9dc', roughness: 0.95 })
  const slatMat = new THREE.MeshStandardMaterial({ color: '#c49a5f', roughness: 0.8 })
  const bounds = [
    { x: FOOTPRINT.w / 2, z: -11, w: W, d: 0.25 },
    { x: FOOTPRINT.w / 2, z: FOOTPRINT.d + 8, w: W, d: 0.25 },
    { x: -10, z: FOOTPRINT.d / 2 - 1.5, w: 0.25, d: D },
    { x: FOOTPRINT.w + 10, z: FOOTPRINT.d / 2 - 1.5, w: 0.25, d: D },
  ]
  for (const b of bounds) {
    g.add(box(wallMat, b.w, 1.1, b.d, b.x, 0.55, b.z))
    for (let i = 0; i < 5; i++) {
      g.add(box(slatMat, b.w, 0.12, b.d * 0.6, b.x, 1.28 + i * 0.22, b.z))
    }
  }

  // arbres : tronc + houppier
  const trunk = new THREE.MeshStandardMaterial({ color: '#6b5340', roughness: 0.95 })
  const leaf = new THREE.MeshStandardMaterial({ color: '#3f6b34', roughness: 1 })
  const spots = [[-5, -6], [-6.5, 4], [19, -5], [20, 6], [3, 16], [12, 16]]
  for (const [x, z] of spots) {
    g.add(box(trunk, 0.3, 2.4, 0.3, x, 1.2, z))
    const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1), leaf)
    crown.position.set(x, 3.6, z)
    crown.castShadow = true
    g.add(crown)
  }
  return g
}

/**
 * Construit tout le bâti.
 * @returns {{group: THREE.Group, levels: THREE.Group[], rooms: Record<string, THREE.Group>}}
 */
export function buildShell() {
  const M = materials()
  const group = new THREE.Group()
  const levels = [new THREE.Group(), new THREE.Group()]
  const rooms = {}

  for (const room of ROOMS) {
    const lvl = LEVELS[room.level]
    const g = new THREE.Group()
    g.name = room.id
    rooms[room.id] = g

    const w = room.x1 - room.x0
    const d = room.y1 - room.y0
    const cx = (room.x0 + room.x1) / 2
    const cz = (room.y0 + room.y1) / 2
    const base = lvl.base

    // sol
    g.add(plane(M[room.floor], w, d, cx, base + 0.005, cz))

    // plafond
    if (room.ceiling === 'flat') {
      g.add(plane(M.plafond, w, d, cx, base + lvl.height, cz, false))
    }

    // parois
    const wallMat = M[wallMatFor(room)]
    const top = room.ceiling === 'cathedral' ? base + lvl.ridge : base + lvl.height
    const sides = [
      { axis: 'x', at: room.y0 - WALL / 2, s: room.x0, e: room.x1, out: -1 },
      { axis: 'x', at: room.y1 + WALL / 2, s: room.x0, e: room.x1, out: 1 },
      { axis: 'y', at: room.x0 - WALL / 2, s: room.y0, e: room.y1, out: -1 },
      { axis: 'y', at: room.x1 + WALL / 2, s: room.y0, e: room.y1, out: 1 },
    ]

    if (!room.outdoor) {
      for (const side of sides) {
        const ops = openingsOn(side.axis, side.at, side.s, side.e, room.level)
        for (const p of wallPieces(side.s, side.e, 0, top - base, ops)) {
          const len = p.to - p.from
          const h = p.z1 - p.z0
          if (len <= EPS || h <= EPS) continue
          const mid = (p.from + p.to) / 2
          const y = base + (p.z0 + p.z1) / 2
          g.add(
            side.axis === 'x'
              ? box(wallMat, len, h, WALL, mid, y, side.at)
              : box(wallMat, WALL, h, len, side.at, y, mid)
          )
        }
        // plinthe
        const skirt = room.level === 0 ? M.boisFonce : M.boisClair
        for (const p of wallPieces(side.s, side.e, 0, 0.09, ops.filter((o) => o.sill < 0.09))) {
          const len = p.to - p.from
          if (len <= EPS) continue
          const mid = (p.from + p.to) / 2
          g.add(
            side.axis === 'x'
              ? box(skirt, len, 0.09, 0.025, mid, base + 0.045, side.at + side.out * -0.055)
              : box(skirt, 0.025, 0.09, len, side.at + side.out * -0.055, base + 0.045, mid)
          )
        }
      }
    } else {
      // terrasse : garde-corps métal au lieu de murs
      for (const side of sides) {
        if (side.axis === 'x' && side.out === 1) continue // côté bâti
        const len = side.e - side.s
        const mid = (side.s + side.e) / 2
        const post = (y, hh) =>
          side.axis === 'x'
            ? box(M.metalNoir, len, hh, 0.04, mid, base + y, side.at)
            : box(M.metalNoir, 0.04, hh, len, side.at, base + y, mid)
        for (const y of [0.35, 0.65, 0.95]) g.add(post(y, 0.03))
        g.add(post(1.05, 0.06))
      }
    }

    levels[room.level].add(g)
  }

  // menuiseries
  for (const op of OPENINGS) {
    levels[op.level].add(joinery(op, M, LEVELS[op.level].base))
  }

  // enveloppe extérieure, dalle d'étage, escalier, toiture, terrain
  const env = new THREE.Group()
  env.add(box(M.murExt, FOOTPRINT.w + 0.3, 0.3, FOOTPRINT.d + 0.3, FOOTPRINT.w / 2, -0.15, FOOTPRINT.d / 2))
  env.add(
    box(M.murExt, FOOTPRINT.w + 0.3, 0.2, FOOTPRINT.d + 0.3, FOOTPRINT.w / 2, LEVELS[1].base - 0.1, FOOTPRINT.d / 2)
  )
  group.add(env)

  levels[0].add(stairs(M))
  group.add(roof(M))
  group.add(site(M))
  group.add(levels[0], levels[1])

  return { group, levels, rooms }
}

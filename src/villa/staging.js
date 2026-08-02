/**
 * Home staging : bibliothèque de mobilier paramétrique + implantations par pièce.
 *
 * Quatre partis pris sont proposés (voir PALETTES dans materials.js) :
 *   actuel        — reproduit le mobilier des photos, sert de référence
 *   epure         — lin, chêne clair, volumes bas, on dégage les circulations
 *   tropical      — bois foncés, rotin, verts profonds, assume le climat
 *   contemporain  — graphite et laiton, contraste fort sur les parquets sombres
 *
 * Chaque implantation renvoie un Group positionné dans le repère du plan.
 */
import * as THREE from 'three'
import { LEVELS } from './plan.js'
import { materials, PALETTES } from './materials.js'

const mat = (color, roughness = 0.8) =>
  new THREE.MeshStandardMaterial({ color, roughness })

function box(m, w, h, d, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  return mesh
}

function cyl(m, r, h, x, y, z, seg = 16) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, seg), m)
  mesh.position.set(x, y, z)
  mesh.castShadow = true
  return mesh
}

/** Fabrique liée à une palette. */
function kit(p) {
  const M = materials()
  const tissu = mat(p.tissu, 0.95)
  const accent = mat(p.accent, 0.9)
  const bois = mat(p.bois, 0.5)
  const tapis = mat(p.tapis, 1)
  const coussin = mat(p.coussin, 0.95)
  const pied = mat('#3b3b3b', 0.4)

  return {
    /** Canapé droit ou d'angle (chaise longue à gauche si `chaise`). */
    sofa(w = 2.4, chaise = 0) {
      const g = new THREE.Group()
      const d = 0.92
      g.add(box(tissu, w, 0.34, d, 0, 0.34, 0))          // assise
      g.add(box(tissu, w, 0.46, 0.22, 0, 0.62, -d / 2 + 0.11)) // dossier
      g.add(box(tissu, 0.22, 0.46, d, -w / 2 + 0.11, 0.55, 0)) // accoudoirs
      g.add(box(tissu, 0.22, 0.46, d, w / 2 - 0.11, 0.55, 0))
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        g.add(cyl(pied, 0.025, 0.16, (sx * (w / 2 - 0.14)), 0.08, sz * (d / 2 - 0.14)))
      }
      g.add(box(coussin, 0.42, 0.42, 0.14, -w / 2 + 0.45, 0.66, -d / 2 + 0.24))
      g.add(box(accent, 0.42, 0.42, 0.14, w / 2 - 0.45, 0.66, -d / 2 + 0.24))
      if (chaise) {
        const cl = box(tissu, 0.95, 0.34, 1.55, chaise * (w / 2 + 0.47), 0.34, 0.32)
        g.add(cl)
      }
      return g
    },

    armchair() {
      const g = new THREE.Group()
      g.add(box(accent, 0.86, 0.32, 0.84, 0, 0.36, 0))
      g.add(box(accent, 0.86, 0.44, 0.2, 0, 0.62, -0.32))
      g.add(box(accent, 0.18, 0.4, 0.84, -0.34, 0.56, 0))
      g.add(box(accent, 0.18, 0.4, 0.84, 0.34, 0.56, 0))
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        g.add(cyl(pied, 0.02, 0.2, sx * 0.34, 0.1, sz * 0.34))
      }
      return g
    },

    coffeeTable(r = 0.5) {
      const g = new THREE.Group()
      g.add(cyl(bois, r, 0.05, 0, 0.4, 0, 28))
      g.add(cyl(bois, 0.06, 0.38, 0, 0.19, 0))
      g.add(cyl(bois, r * 0.6, 0.03, 0, 0.02, 0, 24))
      return g
    },

    /** Table ovale + chaises réparties autour. */
    diningTable(len = 2.8, wid = 1.2, seats = 10) {
      const g = new THREE.Group()
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 40), M.boisNoyer)
      top.scale.set(len, 1, wid)
      top.position.y = 0.74
      top.castShadow = true
      g.add(top)
      for (const sx of [-1, 1]) {
        g.add(box(mat('#2a2a2a', 0.5), 0.09, 0.72, 0.09, sx * (len / 2 - 0.4), 0.36, -0.38))
        g.add(box(mat('#2a2a2a', 0.5), 0.09, 0.72, 0.09, sx * (len / 2 - 0.4), 0.36, 0.38))
      }
      const perSide = Math.floor((seats - 2) / 2)
      const chair = (x, z, ry) => {
        const c = new THREE.Group()
        c.add(box(tissu, 0.48, 0.08, 0.48, 0, 0.45, 0))
        c.add(box(tissu, 0.48, 0.5, 0.09, 0, 0.72, -0.2))
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
          c.add(box(mat('#2a2a2a', 0.5), 0.04, 0.42, 0.04, sx * 0.2, 0.21, sz * 0.2))
        }
        c.position.set(x, 0, z)
        c.rotation.y = ry
        return c
      }
      for (let i = 0; i < perSide; i++) {
        const x = -len / 2 + (len * (i + 0.5)) / perSide
        g.add(chair(x, wid / 2 + 0.34, Math.PI))
        g.add(chair(x, -wid / 2 - 0.34, 0))
      }
      g.add(chair(-len / 2 - 0.36, 0, Math.PI / 2))
      g.add(chair(len / 2 + 0.36, 0, -Math.PI / 2))
      return g
    },

    tvUnit(w = 1.6) {
      const g = new THREE.Group()
      g.add(box(bois, w, 0.42, 0.4, 0, 0.24, 0))
      g.add(box(mat('#101010', 0.3), w * 0.05, 0.32, 0.36, 0, 0.24, 0.02))
      g.add(box(mat('#0c0f12', 0.15), 1.5, 0.86, 0.05, 0, 0.93, -0.06))
      return g
    },

    rug(w = 3, d = 2) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.012, d), tapis)
      m.position.y = 0.012
      m.receiveShadow = true
      return m
    },

    bed(w = 1.6) {
      const g = new THREE.Group()
      g.add(box(bois, w, 0.28, 2.0, 0, 0.2, 0))
      g.add(box(mat('#f6f3ec', 0.98), w - 0.06, 0.2, 1.94, 0, 0.44, 0))
      g.add(box(mat(p.tapis, 0.98), w - 0.06, 0.03, 1.3, 0, 0.55, 0.3))
      g.add(box(bois, w, 0.62, 0.07, 0, 0.55, -1.03))
      for (const sx of [-1, 1]) {
        g.add(box(mat('#fdfcfa', 0.98), 0.5, 0.12, 0.34, sx * 0.32, 0.6, -0.78))
      }
      return g
    },

    bedside() {
      const g = new THREE.Group()
      g.add(box(bois, 0.45, 0.04, 0.4, 0, 0.5, 0))
      g.add(box(bois, 0.04, 0.5, 0.4, -0.2, 0.25, 0))
      g.add(box(bois, 0.04, 0.5, 0.4, 0.2, 0.25, 0))
      g.add(box(bois, 0.45, 0.04, 0.4, 0, 0.24, 0))
      return g
    },

    wardrobe(w = 1.2, h = 2.0) {
      const g = new THREE.Group()
      g.add(box(bois, w, h, 0.6, 0, h / 2, 0))
      g.add(box(mat('#2a2a2a', 0.4), 0.02, h - 0.1, 0.02, 0, h / 2, 0.31))
      return g
    },

    dresser(w = 0.9) {
      const g = new THREE.Group()
      g.add(box(bois, w, 0.82, 0.45, 0, 0.41, 0))
      for (let i = 0; i < 3; i++) {
        g.add(box(mat(p.bois, 0.45), w - 0.06, 0.02, 0.02, 0, 0.18 + i * 0.24, 0.23))
      }
      return g
    },

    mirror() {
      const g = new THREE.Group()
      g.add(box(bois, 0.62, 1.5, 0.05, 0, 0.9, 0))
      g.add(box(M.chrome, 0.54, 1.36, 0.02, 0, 0.9, 0.03))
      return g
    },

    /** Linéaire de cuisine : caissons bas, plan, meubles hauts. */
    kitchenRun(len, upper = true) {
      const g = new THREE.Group()
      const carcass = mat('#f4f1ea', 0.55)
      g.add(box(carcass, len, 0.86, 0.6, 0, 0.43, 0))
      g.add(box(mat('#e8e6e1', 0.3), len, 0.05, 0.64, 0, 0.885, 0.01))
      const doors = Math.max(1, Math.round(len / 0.6))
      for (let i = 0; i < doors; i++) {
        const x = -len / 2 + (len * (i + 0.5)) / doors
        g.add(box(mat('#fbfaf6', 0.5), len / doors - 0.03, 0.78, 0.02, x, 0.43, 0.31))
        g.add(box(M.chrome, len / doors - 0.2, 0.02, 0.03, x, 0.75, 0.33))
      }
      if (upper) {
        g.add(box(carcass, len, 0.72, 0.35, 0, 1.86, -0.12))
        g.add(box(mat('#dfe2e0', 0.35), len, 0.55, 0.02, 0, 1.22, 0.29)) // crédence
      }
      return g
    },

    island(len = 2.2) {
      const g = new THREE.Group()
      g.add(box(mat('#fbfaf6', 0.5), len, 0.88, 0.85, 0, 0.44, 0))
      g.add(box(M.boisNoyer, len + 0.12, 0.06, 0.98, 0, 0.91, 0))
      for (let i = 0; i < 3; i++) {
        const s = new THREE.Group()
        s.add(cyl(M.boisNoyer, 0.16, 0.05, 0, 0.68, 0, 20))
        for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
          s.add(cyl(mat('#f2efe8', 0.6), 0.018, 0.66, dx * 0.11, 0.33, dz * 0.11, 8))
        }
        s.position.set(-0.6 + i * 0.6, 0, 0.8)
        g.add(s)
      }
      return g
    },

    appliance(w = 0.6, h = 1.4) {
      const g = new THREE.Group()
      g.add(box(mat('#f4f1ea', 0.55), w + 0.04, h + 0.6, 0.62, 0, (h + 0.6) / 2, 0))
      g.add(box(mat('#2b2f33', 0.25), w, 0.58, 0.03, 0, 0.95, 0.32))
      g.add(box(mat('#2b2f33', 0.25), w, 0.58, 0.03, 0, 1.58, 0.32))
      return g
    },

    washer() {
      const g = new THREE.Group()
      g.add(box(mat('#f7f7f5', 0.4), 0.6, 0.85, 0.6, 0, 0.42, 0))
      g.add(cyl(mat('#9aa3a8', 0.2), 0.2, 0.04, 0, 0.45, 0.3, 24).rotateX(Math.PI / 2))
      return g
    },

    bathtub() {
      const g = new THREE.Group()
      g.add(box(mat('#fbfbfa', 0.2), 1.7, 0.55, 0.75, 0, 0.28, 0))
      g.add(box(mat('#ffffff', 0.1), 1.56, 0.1, 0.62, 0, 0.56, 0))
      return g
    },

    shower(w = 0.9, d = 1.2) {
      const g = new THREE.Group()
      g.add(box(mat('#e9e6e0', 0.3), w, 0.06, d, 0, 0.03, 0))
      const glass = new THREE.MeshPhysicalMaterial({
        color: '#dfeaee', transmission: 0.9, roughness: 0.05, transparent: true, opacity: 0.28,
        side: THREE.DoubleSide,
      })
      g.add(box(glass, 0.015, 2.0, d, w / 2, 1.0, 0))
      g.add(box(glass, w, 2.0, 0.015, 0, 1.0, d / 2))
      g.add(cyl(M.chrome, 0.09, 0.02, 0, 2.05, -0.1, 16))
      return g
    },

    wc() {
      const g = new THREE.Group()
      g.add(box(mat('#fcfcfb', 0.2), 0.38, 0.9, 0.2, 0, 0.45, -0.1))
      g.add(box(mat('#fcfcfb', 0.2), 0.37, 0.2, 0.55, 0, 0.42, 0.2))
      return g
    },

    basin() {
      const g = new THREE.Group()
      g.add(box(mat('#f2efe9', 0.5), 0.8, 0.55, 0.45, 0, 0.55, 0))
      g.add(cyl(mat('#fcfcfb', 0.15), 0.22, 0.14, 0, 0.89, 0, 20))
      g.add(cyl(M.chrome, 0.02, 0.22, 0, 1.0, -0.16, 10))
      return g
    },

    /** Suspension / lustre selon le parti pris. */
    pendant(style = 'rattan', h = 2.35) {
      const g = new THREE.Group()
      g.add(cyl(mat('#2a2a2a', 0.4), 0.008, 0.5, 0, h + 0.25, 0, 6))
      if (style === 'rattan') {
        const m = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 10, 0, Math.PI * 2, 0, 1.9), mat('#c9a06a', 0.9))
        m.position.y = h
        g.add(m)
      } else if (style === 'crystal') {
        g.add(cyl(mat('#efece4', 0.3), 0.06, 0.16, 0, h, 0, 10))
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2
          g.add(cyl(mat('#f7f4ec', 0.15), 0.045, 0.13, Math.cos(a) * 0.34, h + 0.06, Math.sin(a) * 0.34, 10))
        }
      } else {
        // fer forgé
        g.add(cyl(mat('#26282b', 0.5), 0.34, 0.05, 0, h, 0, 20))
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2
          g.add(cyl(mat('#26282b', 0.5), 0.03, 0.18, Math.cos(a) * 0.32, h + 0.11, Math.sin(a) * 0.32, 8))
        }
      }
      const bulb = new THREE.PointLight(0xffdcb0, 6, 7, 2)
      bulb.position.y = h
      g.add(bulb)
      return g
    },

    plant(scale = 1) {
      const g = new THREE.Group()
      g.add(cyl(mat('#c9b79c', 0.85), 0.2 * scale, 0.34 * scale, 0, 0.17 * scale, 0, 16))
      const foliage = mat(p.accent, 1)
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2
        const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22 * scale, 8, 6), foliage)
        leaf.position.set(Math.cos(a) * 0.2 * scale, (0.55 + (i % 3) * 0.22) * scale, Math.sin(a) * 0.2 * scale)
        leaf.scale.set(1, 1.7, 0.5)
        leaf.rotation.y = a
        g.add(leaf)
      }
      return g
    },

    desk() {
      const g = new THREE.Group()
      g.add(box(M.boisNoyer, 1.3, 0.05, 0.65, 0, 0.75, 0))
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        g.add(box(mat('#f2efe8', 0.6), 0.06, 0.73, 0.06, sx * 0.58, 0.37, sz * 0.26))
      }
      g.add(box(mat('#1c1f22', 0.25), 0.56, 0.34, 0.03, 0.2, 0.95, -0.22))
      return g
    },

    outdoorSet() {
      const g = new THREE.Group()
      const teak = mat('#a97f4e', 0.85)
      g.add(box(teak, 1.5, 0.05, 0.9, 0, 0.73, 0))
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        g.add(box(teak, 0.06, 0.71, 0.06, sx * 0.68, 0.36, sz * 0.38))
      }
      for (const [x, z, ry] of [[-0.5, 0.85, 0], [0.5, 0.85, 0], [-0.5, -0.85, Math.PI], [0.5, -0.85, Math.PI]]) {
        const c = new THREE.Group()
        c.add(box(teak, 0.46, 0.05, 0.46, 0, 0.44, 0))
        c.add(box(teak, 0.46, 0.5, 0.05, 0, 0.7, -0.2))
        for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
          c.add(box(teak, 0.04, 0.42, 0.04, sx * 0.2, 0.21, sz * 0.2))
        }
        c.position.set(x, 0, z)
        c.rotation.y = ry
        g.add(c)
      }
      return g
    },
  }
}

/** Place un objet dans le repère monde. `ry` en degrés. */
function at(obj, x, z, ry = 0, level = 0) {
  obj.position.set(x, LEVELS[level].base, z)
  obj.rotation.y = (ry * Math.PI) / 180
  return obj
}

/**
 * Implantations. Les variantes ne changent pas seulement les couleurs :
 * `epure` allège (moins de pièces, circulations plus larges),
 * `tropical` densifie en végétal, `contemporain` recentre les assises.
 */
export function buildStaging(variant = 'actuel') {
  const p = PALETTES[variant] ?? PALETTES.actuel
  const K = kit(p)
  const g = new THREE.Group()
  g.name = `staging:${variant}`
  const light = variant === 'epure'
  const trop = variant === 'tropical'

  // ── Salon (rez) ────────────────────────────────────────────────
  g.add(at(K.rug(3.4, 2.4), 3.2, 2.6, 0))
  g.add(at(K.sofa(2.6, light ? 0 : 1), 3.2, 4.3, 180))
  g.add(at(K.tvUnit(1.7), 3.2, 0.5, 0))
  g.add(at(K.coffeeTable(0.45), 3.2, 2.6))
  if (!light) g.add(at(K.armchair(), 1.0, 2.4, 70))
  g.add(at(K.pendant(trop ? 'rattan' : 'crystal', 2.45), 3.2, 2.6))
  if (trop) g.add(at(K.plant(1.2), 5.7, 1.0))

  // ── Salle à manger ─────────────────────────────────────────────
  g.add(at(K.diningTable(2.8, 1.2, light ? 8 : 10), 8.7, 2.6, 90))
  g.add(at(K.pendant(variant === 'contemporain' ? 'iron' : 'crystal', 2.45), 8.7, 2.6))
  if (trop) g.add(at(K.plant(1), 10.4, 4.6))

  // ── Entrée ─────────────────────────────────────────────────────
  g.add(at(K.plant(0.9), 11.6, 4.6))

  // ── Cuisine ────────────────────────────────────────────────────
  g.add(at(K.kitchenRun(3.4), 12.0, 5.65, 0))
  g.add(at(K.kitchenRun(2.6, false), 13.55, 7.3, 90))
  g.add(at(K.island(2.0), 11.4, 7.6, 0))
  g.add(at(K.appliance(), 10.6, 5.7, 0))
  g.add(at(K.pendant('iron', 2.45), 10.9, 7.6))
  g.add(at(K.pendant('iron', 2.45), 11.9, 7.6))

  // ── Chambre rez ────────────────────────────────────────────────
  g.add(at(K.bed(1.6), 2.0, 8.4, 180))
  g.add(at(K.bedside(), 1.0, 9.3, 0))
  g.add(at(K.bedside(), 3.0, 9.3, 0))
  g.add(at(K.desk(), 3.2, 6.2, 180))
  if (!light) g.add(at(K.wardrobe(1.2), 0.8, 6.2, 90))
  g.add(at(K.pendant(trop ? 'rattan' : 'iron', 2.4), 2.0, 8.0))

  // ── Salle d'eau rez ────────────────────────────────────────────
  g.add(at(K.shower(0.9, 1.2), 5.6, 6.2, 0))
  g.add(at(K.wc(), 4.7, 8.4, 0))
  g.add(at(K.basin(), 5.5, 8.4, 0))

  // ── Buanderie ──────────────────────────────────────────────────
  g.add(at(K.washer(), 12.9, 9.9, 180))
  g.add(at(K.kitchenRun(2.4, false), 10.6, 9.6, 0))

  // ── Terrasse rez (extérieur, niveau 0) ─────────────────────────
  g.add(at(K.outdoorSet(), 8.6, -2.0, 0))

  // ── Salon d'étage ──────────────────────────────────────────────
  g.add(at(K.rug(3.0, 2.0), 2.6, 5.0, 0, 1))
  g.add(at(K.sofa(2.4, light ? 0 : -1), 1.4, 5.6, 90, 1))
  g.add(at(K.tvUnit(1.6), 4.9, 5.0, -90, 1))
  g.add(at(K.coffeeTable(0.42), 2.8, 5.0, 0, 1))
  g.add(at(K.pendant('iron', 3.4), 2.8, 5.0, 0, 1))
  if (trop) g.add(at(K.plant(1.3), 0.7, 3.2, 0, 1))

  // ── Terrasse étage ─────────────────────────────────────────────
  g.add(at(K.outdoorSet(), 4.0, 1.2, 0, 1))
  if (!light) g.add(at(K.plant(1.1), 11.5, 1.0, 0, 1))

  // ── Chambre 2 ──────────────────────────────────────────────────
  g.add(at(K.bed(1.6), 10.6, 4.6, -90, 1))
  g.add(at(K.bedside(), 10.6, 3.5, 0, 1))
  g.add(at(K.wardrobe(1.4, 2.0), 13.1, 4.4, -90, 1))
  g.add(at(K.dresser(0.9), 9.0, 3.2, 0, 1))
  g.add(at(K.pendant(trop ? 'rattan' : 'iron', 2.6), 11.0, 4.4, 0, 1))

  // ── Chambre 3 ──────────────────────────────────────────────────
  g.add(at(K.bed(1.6), 10.6, 8.4, -90, 1))
  g.add(at(K.bedside(), 10.6, 7.3, 0, 1))
  g.add(at(K.wardrobe(1.4, 2.0), 13.1, 8.2, -90, 1))
  g.add(at(K.mirror(), 9.0, 9.8, 20, 1))
  g.add(at(K.pendant(trop ? 'rattan' : 'iron', 2.6), 11.0, 8.4, 0, 1))

  // ── Chambre 4 ──────────────────────────────────────────────────
  g.add(at(K.bed(1.6), 2.1, 9.4, 180, 1))
  g.add(at(K.bedside(), 1.1, 10.2, 0, 1))
  g.add(at(K.bedside(), 3.1, 10.2, 0, 1))
  g.add(at(K.pendant(trop ? 'rattan' : 'iron', 2.5), 2.1, 9.2, 0, 1))

  // ── Salle de bains étage ───────────────────────────────────────
  g.add(at(K.bathtub(), 5.3, 8.4, 90, 1))
  g.add(at(K.shower(0.9, 1.2), 4.9, 10.0, 0, 1))
  g.add(at(K.wc(), 6.0, 10.0, 180, 1))

  // ── Salle d'eau étage ──────────────────────────────────────────
  g.add(at(K.shower(0.9, 1.2), 7.7, 8.3, 0, 1))
  g.add(at(K.wc(), 6.9, 10.0, 180, 1))
  g.add(at(K.basin(), 7.7, 10.0, 180, 1))

  return g
}

export const STAGING_VARIANTS = Object.entries(PALETTES).map(([id, v]) => ({ id, label: v.label }))

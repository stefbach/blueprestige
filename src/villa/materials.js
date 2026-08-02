/**
 * Matériaux procéduraux calés sur les finitions relevées en photo.
 * Tout est généré sur canvas : aucun fichier texture, aucun appel réseau.
 *
 * Pour passer en PBR photoréaliste, remplacer chaque `makeX()` par un chargement
 * de textures Poly Haven (via le MCP Blender) — voir docs/visite-virtuelle.md.
 */
import * as THREE from 'three'

const SIZE = 512

function canvas(draw) {
  const c = document.createElement('canvas')
  c.width = c.height = SIZE
  const ctx = c.getContext('2d')
  draw(ctx, SIZE)
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.anisotropy = 8
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function noise(ctx, size, amount, alpha) {
  const img = ctx.getImageData(0, 0, size, size)
  const d = img.data
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * amount
    d[i] += n
    d[i + 1] += n
    d[i + 2] += n
    if (alpha !== undefined) d[i + 3] = alpha
  }
  ctx.putImageData(img, 0, 0)
}

/** Lames droites, largeur `plankW` px, veinage longitudinal. */
function makePlanks(base, dark, plankW = 64) {
  return canvas((ctx, s) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, s, s)
    for (let y = 0; y < s; y += plankW) {
      // teinte propre à chaque lame
      const v = (Math.random() - 0.5) * 22
      ctx.fillStyle = shade(base, v)
      ctx.fillRect(0, y, s, plankW - 1)
      // veinage
      ctx.strokeStyle = shade(dark, (Math.random() - 0.5) * 20)
      ctx.globalAlpha = 0.18
      for (let k = 0; k < 14; k++) {
        ctx.beginPath()
        const yy = y + Math.random() * plankW
        ctx.moveTo(0, yy)
        ctx.bezierCurveTo(s * 0.33, yy + (Math.random() - 0.5) * 7, s * 0.66, yy + (Math.random() - 0.5) * 7, s, yy)
        ctx.lineWidth = 0.6 + Math.random()
        ctx.stroke()
      }
      ctx.globalAlpha = 1
      // joint
      ctx.fillStyle = shade(dark, -18)
      ctx.fillRect(0, y + plankW - 1, s, 1)
      // about de lame décalé
      const cut = Math.random() * s
      ctx.fillRect(cut, y, 1, plankW)
    }
    noise(ctx, s, 10)
  })
}

/** Parquet à bâtons rompus (chevrons) — l'entrée et le hall. */
function makeHerringbone(base, dark) {
  return canvas((ctx, s) => {
    ctx.fillStyle = shade(base, -6)
    ctx.fillRect(0, 0, s, s)
    const L = 96
    const W = 32
    for (let i = -2; i < s / W + 2; i++) {
      for (let j = -2; j < s / W + 2; j++) {
        ctx.save()
        ctx.translate(j * L * 0.5, i * L * 0.5)
        ctx.rotate((((i + j) % 2 === 0 ? 45 : -45) * Math.PI) / 180)
        ctx.fillStyle = shade(base, (Math.random() - 0.5) * 26)
        ctx.fillRect(0, 0, L, W - 2)
        ctx.strokeStyle = shade(dark, -14)
        ctx.lineWidth = 1
        ctx.strokeRect(0, 0, L, W - 2)
        ctx.restore()
      }
    }
    noise(ctx, s, 9)
  })
}

/** Carreaux de ciment à motif — cuisine et buanderie. */
function makeCementTiles(base, motif) {
  return canvas((ctx, s) => {
    const n = 4
    const t = s / n
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = i * t
        const y = j * t
        ctx.fillStyle = shade(base, (Math.random() - 0.5) * 6)
        ctx.fillRect(x, y, t, t)
        // motif floral stylisé, une case sur deux
        if ((i + j) % 2 === 0) {
          ctx.save()
          ctx.translate(x + t / 2, y + t / 2)
          ctx.strokeStyle = motif
          ctx.lineWidth = 2
          for (let k = 0; k < 8; k++) {
            ctx.rotate(Math.PI / 4)
            ctx.beginPath()
            ctx.ellipse(t * 0.22, 0, t * 0.16, t * 0.07, 0, 0, Math.PI * 2)
            ctx.stroke()
          }
          ctx.beginPath()
          ctx.arc(0, 0, t * 0.09, 0, Math.PI * 2)
          ctx.stroke()
          ctx.restore()
        }
        ctx.strokeStyle = shade(base, -16)
        ctx.lineWidth = 2
        ctx.strokeRect(x, y, t, t)
      }
    }
    noise(ctx, s, 6)
  })
}

/** Grès grand format effet pierre / marbre. */
function makeStone(base, vein, veins = 10, tiles = 2) {
  return canvas((ctx, s) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, s, s)
    ctx.strokeStyle = vein
    for (let i = 0; i < veins; i++) {
      ctx.globalAlpha = 0.1 + Math.random() * 0.22
      ctx.lineWidth = 1 + Math.random() * 5
      ctx.beginPath()
      let x = Math.random() * s
      let y = -10
      ctx.moveTo(x, y)
      while (y < s) {
        x += (Math.random() - 0.5) * 90
        y += 24 + Math.random() * 40
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    const t = s / tiles
    ctx.strokeStyle = shade(base, -12)
    ctx.lineWidth = 2
    for (let i = 0; i <= tiles; i++) {
      ctx.beginPath(); ctx.moveTo(i * t, 0); ctx.lineTo(i * t, s); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(0, i * t); ctx.lineTo(s, i * t); ctx.stroke()
    }
    noise(ctx, s, 7)
  })
}

/** Enduit mural fin. */
function makePlaster(base) {
  return canvas((ctx, s) => {
    ctx.fillStyle = base
    ctx.fillRect(0, 0, s, s)
    noise(ctx, s, 7)
  })
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16)
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) =>
    Math.max(0, Math.min(255, Math.round(v + amt)))
  )
  return `rgb(${c[0]},${c[1]},${c[2]})`
}

function rep(tex, x, y) {
  const t = tex.clone()
  t.needsUpdate = true
  t.repeat.set(x, y)
  return t
}

let cache = null

export function materials() {
  if (cache) return cache

  const parquetFonce = makePlanks('#8a4a26', '#5a2d13', 52)
  const parquetChene = makePlanks('#c08e56', '#8a5c30', 60)
  const chevrons = makeHerringbone('#8f5029', '#5c2f14')
  const ciment = makeCementTiles('#e2ddd4', '#a9b4b8')
  const pierre = makeStone('#c9bdae', '#a3948233', 8, 2)
  const marbre = makeStone('#f3f1ee', '#9aa0a6', 14, 2)
  const carrelageExt = makeStone('#ded3bf', '#c3b79f22', 5, 3)

  const floorMat = (tex, r, rough = 0.35) =>
    new THREE.MeshStandardMaterial({ map: rep(tex, r, r), roughness: rough, metalness: 0.02 })

  cache = {
    // sols
    parquetFonce: floorMat(parquetFonce, 3, 0.28),
    parquetChene: floorMat(parquetChene, 3, 0.42),
    parquetChevrons: floorMat(chevrons, 2.5, 0.3),
    carreauxCiment: floorMat(ciment, 2.5, 0.5),
    gresPierre: floorMat(pierre, 2, 0.45),
    gresBlanc: floorMat(marbre, 1.5, 0.25),
    carrelageExt: floorMat(carrelageExt, 4, 0.6),

    // parois
    murBeige: new THREE.MeshStandardMaterial({ map: rep(makePlaster('#e8e0d2'), 2, 2), roughness: 0.94 }),
    murBlanc: new THREE.MeshStandardMaterial({ map: rep(makePlaster('#f2efe9'), 2, 2), roughness: 0.94 }),
    murExt: new THREE.MeshStandardMaterial({ color: '#f6f4ef', roughness: 0.95 }),
    plafond: new THREE.MeshStandardMaterial({ color: '#fbfaf7', roughness: 0.98 }),
    faience: new THREE.MeshStandardMaterial({ map: rep(marbre, 2, 1), roughness: 0.16 }),

    // menuiseries
    boisFonce: new THREE.MeshStandardMaterial({ color: '#7a4423', roughness: 0.42 }),
    boisClair: new THREE.MeshStandardMaterial({ color: '#c49a68', roughness: 0.5 }),
    boisNoyer: new THREE.MeshStandardMaterial({ color: '#6b3d22', roughness: 0.35 }),
    metalNoir: new THREE.MeshStandardMaterial({ color: '#23262a', roughness: 0.45, metalness: 0.65 }),
    chrome: new THREE.MeshStandardMaterial({ color: '#cfd4d8', roughness: 0.16, metalness: 0.9 }),

    vitrage: new THREE.MeshPhysicalMaterial({
      color: '#cfe3ea',
      roughness: 0.03,
      metalness: 0,
      transmission: 0.92,
      thickness: 0.01,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
    }),
    vitrageDepoli: new THREE.MeshPhysicalMaterial({
      color: '#eef3f4',
      roughness: 0.65,
      transmission: 0.7,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    }),

    // extérieur
    pelouse: new THREE.MeshStandardMaterial({ color: '#5f8f3e', roughness: 1 }),
    dallage: floorMat(carrelageExt, 8, 0.7),
    toiture: new THREE.MeshStandardMaterial({ color: '#8b9198', roughness: 0.6, metalness: 0.3 }),
  }
  return cache
}

/** Palettes de home staging — voir staging.js. */
export const PALETTES = {
  actuel: {
    label: 'État actuel',
    tissu: '#b9b6ae',
    accent: '#5b6f4a',
    bois: '#8a5a32',
    tapis: '#b2ac9d',
    coussin: '#c1622f',
  },
  epure: {
    label: 'Épuré — lin & chêne',
    tissu: '#ddd8cd',
    accent: '#8f9c8b',
    bois: '#c8a06a',
    tapis: '#e6e1d6',
    coussin: '#9aa7ab',
  },
  tropical: {
    label: 'Tropical — bois & végétal',
    tissu: '#c8bda6',
    accent: '#40613f',
    bois: '#7a4a24',
    tapis: '#a8946f',
    coussin: '#c9873d',
  },
  contemporain: {
    label: 'Contemporain — graphite',
    tissu: '#8d9198',
    accent: '#2f3438',
    bois: '#4d3a2c',
    tapis: '#6f757c',
    coussin: '#cfa14e',
  },
}

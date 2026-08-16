/**
 * Plan interactif en SVG, généré depuis le même relevé que la 3D.
 * Un seul jeu de données pour les deux vues : le plan ne peut pas diverger du modèle.
 *
 * En SVG l'axe Y descend, alors que dans le relevé +Y = nord. On applique donc
 * la bascule `Y()` sur toutes les ordonnées pour que le nord soit en haut du plan,
 * plutôt qu'une transformation de groupe qui retournerait aussi les textes.
 */
import { FOOTPRINT, LEVELS, OPENINGS, ROOMS, area, levelArea } from '../villa/plan.js'
import { L, t } from '../i18n.js'

const PAD = 1.4
const SVG_NS = 'http://www.w3.org/2000/svg'

/** relevé → SVG : bascule verticale pour mettre le nord en haut. */
const Y = (y) => FOOTPRINT.d - y

const el = (name, attrs = {}) => {
  const n = document.createElementNS(SVG_NS, name)
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v)
  return n
}

const FILL = {
  wet: '#dbe7ec',
  service: '#e8e3d7',
  outdoor: '#dfeade',
  circulation: '#eae5db',
  default: '#f4efe5',
}

function fillFor(room) {
  if (room.outdoor) return FILL.outdoor
  if (['sde0', 'sde1', 'sdb1'].includes(room.id)) return FILL.wet
  if (['cuisine', 'buanderie'].includes(room.id)) return FILL.service
  if (['entree', 'degagement', 'palier'].includes(room.id)) return FILL.circulation
  return FILL.default
}

export class Plan2D {
  /**
   * @param {HTMLElement} host
   * @param {(roomId: string) => void} onPick appelé au clic sur une pièce
   */
  constructor(host, onPick) {
    this.host = host
    this.onPick = onPick
    this.level = 0
    this.svg = el('svg', {
      viewBox: `${-PAD} ${-PAD} ${FOOTPRINT.w + PAD * 2} ${FOOTPRINT.d + PAD * 2.4}`,
      preserveAspectRatio: 'xMidYMid meet',
      class: 'plan-svg',
    })
    host.appendChild(this.svg)
    this.render()
  }

  setLevel(level) {
    if (level === this.level) return
    this.level = level
    this.render()
  }

  /**
   * Position et cap de la caméra, pour la pastille « vous êtes ici ».
   * `visible` est faux quand on visite un niveau et qu'on regarde le plan de l'autre.
   */
  setPose(x, y, yaw, visible = true) {
    if (!this.marker) return
    this.marker.style.display = visible ? '' : 'none'
    if (!visible) return
    // la flèche est dessinée vers le haut (nord) ; +180° compense l'orientation caméra
    const deg = (yaw * 180) / Math.PI + 180
    this.marker.setAttribute('transform', `translate(${x} ${Y(y)}) rotate(${deg})`)
  }

  highlight(roomId) {
    for (const g of this.svg.querySelectorAll('.plan-room')) {
      g.classList.toggle('is-active', g.dataset.room === roomId)
    }
  }

  render() {
    this.svg.replaceChildren()
    const rooms = ROOMS.filter((r) => r.level === this.level)

    this.svg.appendChild(
      el('rect', {
        x: 0, y: 0, width: FOOTPRINT.w, height: FOOTPRINT.d,
        fill: '#ffffff', stroke: 'currentColor', 'stroke-width': 0.1,
      })
    )

    for (const room of rooms) {
      const g = el('g', { class: 'plan-room' })
      g.dataset.room = room.id

      g.appendChild(
        el('rect', {
          x: room.x0, y: Y(room.y1),
          width: room.x1 - room.x0, height: room.y1 - room.y0,
          fill: fillFor(room), stroke: 'currentColor', 'stroke-width': 0.05, rx: 0.04,
        })
      )

      const cx = (room.x0 + room.x1) / 2
      const cy = Y((room.y0 + room.y1) / 2)
      const w = room.x1 - room.x0
      const d = room.y1 - room.y0
      const short = Math.min(w, d)
      const small = short < 2.1
      // Une pièce étroite et profonde ne peut pas porter son libellé à l'horizontale
      // sans déborder sur la voisine : on écrit dans le sens de la longueur.
      const upright = w < 2.4 && d > w * 1.25
      const rot = upright ? `rotate(-90 ${cx} ${cy})` : null
      const fs = small ? 0.24 : 0.33

      const label = el('text', {
        x: cx, y: cy - (small ? 0.02 : 0.1),
        'text-anchor': 'middle', class: 'plan-label', 'font-size': fs,
        ...(rot ? { transform: rot } : {}),
      })
      label.textContent = L(room.name)
      g.appendChild(label)

      const dims = el('text', {
        x: cx, y: cy + (small ? 0.3 : 0.42),
        'text-anchor': 'middle', class: 'plan-dims', 'font-size': small ? 0.2 : 0.26,
        ...(rot ? { transform: rot } : {}),
      })
      dims.textContent = `${area(room).toFixed(1)} m²  ·  ${w.toFixed(2)} × ${d.toFixed(2)}`
      g.appendChild(dims)

      g.addEventListener('click', () => this.onPick?.(room.id))
      this.svg.appendChild(g)
    }

    // ouvertures : on « perce » la cloison en blanc, les fenêtres en bleu
    for (const o of OPENINGS) {
      if (o.level !== this.level) continue
      const isWindow = o.type === 'window'
      const t = 0.28
      const attrs = o.axis === 'x'
        ? { x: o.from, y: Y(o.at) - t / 2, width: o.to - o.from, height: t }
        : { x: o.at - t / 2, y: Y(o.to), width: t, height: o.to - o.from }
      this.svg.appendChild(el('rect', { ...attrs, fill: isWindow ? '#cfe0ea' : '#ffffff' }))
      if (isWindow) {
        const line = o.axis === 'x'
          ? { x1: o.from, y1: Y(o.at), x2: o.to, y2: Y(o.at) }
          : { x1: o.at, y1: Y(o.from), x2: o.at, y2: Y(o.to) }
        this.svg.appendChild(el('line', { ...line, stroke: '#4a7f9c', 'stroke-width': 0.06 }))
      }
    }

    // cartouche
    const lvl = LEVELS[this.level]
    const cap = el('text', { x: 0, y: FOOTPRINT.d + 0.75, class: 'plan-caption', 'font-size': 0.34 })
    cap.textContent = `${L(lvl.name)} — ${levelArea(this.level).toFixed(1)} ${t('plan.usable')} · ${t('plan.height')} ${lvl.height.toFixed(2)} m`
    this.svg.appendChild(cap)

    // échelle graphique
    const yS = FOOTPRINT.d + 1.35
    const g = el('g', { class: 'plan-caption' })
    g.appendChild(el('line', { x1: FOOTPRINT.w - 5, y1: yS, x2: FOOTPRINT.w, y2: yS, stroke: 'currentColor', 'stroke-width': 0.06 }))
    for (const x of [FOOTPRINT.w - 5, FOOTPRINT.w - 2.5, FOOTPRINT.w]) {
      g.appendChild(el('line', { x1: x, y1: yS - 0.15, x2: x, y2: yS + 0.15, stroke: 'currentColor', 'stroke-width': 0.06 }))
    }
    const st = el('text', { x: FOOTPRINT.w - 2.5, y: yS + 0.62, 'text-anchor': 'middle', 'font-size': 0.3, class: 'plan-caption' })
    st.textContent = '5 m'
    g.appendChild(st)
    this.svg.appendChild(g)

    // nord (vers le haut, cohérent avec la bascule Y)
    const n = el('g', { transform: `translate(${FOOTPRINT.w + 0.75} 0.9)`, class: 'plan-caption' })
    n.appendChild(el('path', { d: 'M0,0.55 L0,-0.55 M0,-0.55 L-0.22,-0.14 M0,-0.55 L0.22,-0.14', stroke: 'currentColor', 'stroke-width': 0.07, fill: 'none' }))
    const nt = el('text', { x: 0, y: 1.05, 'text-anchor': 'middle', 'font-size': 0.34 })
    nt.textContent = 'N'
    n.appendChild(nt)
    this.svg.appendChild(n)

    // pastille de position + cône de vue
    this.marker = el('g', { class: 'plan-marker' })
    this.marker.appendChild(el('path', { d: 'M0,0 L-0.8,-1.7 L0.8,-1.7 Z', fill: '#c2703a', opacity: 0.3 }))
    this.marker.appendChild(el('circle', { r: 0.25, fill: '#c2703a', stroke: '#fff', 'stroke-width': 0.08 }))
    this.svg.appendChild(this.marker)
  }
}

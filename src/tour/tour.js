/**
 * Visite photo de la villa.
 *
 * La visite se fait sur les photos réelles du bien. Le plan sert de navigation :
 * cliquer une pièce amène à ses photos. Aucun modèle 3D — un rendu reconstitué
 * ne ressemble pas au bien et dessert la présentation.
 */
import './tour.css'
import { PHOTO_BASE, SEQUENCE, STAGED_BASE, TOUR, firstIndexForRoom, firstIndexForStep } from './photos.js'
import { LEVELS, roomById } from '../villa/plan.js'
import { Plan2D } from '../viewer/plan2d.js'

const stage = document.getElementById('stage')
const captionEl = document.getElementById('caption')
const counterEl = document.getElementById('counter')
const stepsEl = document.getElementById('steps')
const thumbsEl = document.getElementById('thumbs')

let index = 0
let planLevel = 0
const frames = new Map()

const current = () => SEQUENCE[index]
const src = (photo) => PHOTO_BASE + photo.file
const stagedSrc = (photo) => (photo.staged ? STAGED_BASE + photo.staged : null)

/** Pièces du plan qui ont au moins une photo — les seules cliquables. */
const roomsWithPhotos = new Set(SEQUENCE.map((p) => p.room).filter(Boolean))

// ─── Scène ────────────────────────────────────────────────────────
/**
 * Chaque photo a son propre calque, créé à la demande et conservé : le
 * fondu enchaîné exige que l'ancienne et la nouvelle image coexistent, et
 * garder les calques évite de recharger une image déjà vue.
 */
function frameFor(i) {
  if (frames.has(i)) return frames.get(i)
  const photo = SEQUENCE[i]
  const el = document.createElement('div')
  el.className = 'frame'

  const img = document.createElement('img')
  img.src = src(photo)
  img.alt = photo.caption
  img.decoding = 'async'
  img.addEventListener('error', () => {
    el.replaceChildren(missingSlot(photo))
  })
  el.appendChild(img)

  const staged = stagedSrc(photo)
  if (staged) el.appendChild(comparator(photo, staged))

  stage.insertBefore(el, stage.firstChild)
  frames.set(i, el)
  return el
}

/**
 * Comparateur avant / après : la version remise en scène est superposée à la
 * photo réelle et révélée par un volet que l'on fait glisser. Le volet écrit
 * directement dans le style — passer par un re-rendu saccaderait au pointermove.
 */
function comparator(photo, stagedUrl) {
  const wrap = document.createElement('div')
  wrap.className = 'compare'
  wrap.innerHTML = `
    <div class="compare-after" style="clip-path:inset(0 0 0 50%)">
      <img src="${stagedUrl}" alt="${photo.caption} — remise en scène" decoding="async" />
    </div>
    <div class="compare-handle" style="left:50%"><span>↔</span></div>
    <span class="compare-tag left">Avant</span>
    <span class="compare-tag right">Après — home staging</span>`

  const after = wrap.querySelector('.compare-after')
  const handle = wrap.querySelector('.compare-handle')

  const move = (clientX) => {
    const r = wrap.getBoundingClientRect()
    const pct = Math.max(2, Math.min(98, ((clientX - r.left) / r.width) * 100))
    after.style.clipPath = `inset(0 0 0 ${pct}%)`
    handle.style.left = `${pct}%`
  }

  let dragging = false
  wrap.addEventListener('pointerdown', (e) => {
    dragging = true
    wrap.setPointerCapture(e.pointerId)
    move(e.clientX)
    e.stopPropagation() // sinon le balayage change de photo
  })
  wrap.addEventListener('pointermove', (e) => {
    if (dragging) move(e.clientX)
  })
  const end = (e) => {
    dragging = false
    wrap.releasePointerCapture?.(e.pointerId)
  }
  wrap.addEventListener('pointerup', end)
  wrap.addEventListener('pointercancel', end)

  // une image de staging manquante fait disparaître le comparateur
  wrap.querySelector('img').addEventListener('error', () => wrap.remove())

  return wrap
}

/** Emplacement explicite quand le fichier n'est pas encore déposé. */
function missingSlot(photo) {
  const box = document.createElement('div')
  box.className = 'missing'
  box.innerHTML = `
    <span class="missing-tag">Photo attendue</span>
    <span class="missing-file">/photos/${photo.file}</span>
    <p class="missing-caption">${photo.caption}</p>`
  return box
}

function show(next, { preload = true } = {}) {
  index = (next + SEQUENCE.length) % SEQUENCE.length
  const photo = current()

  for (const [i, el] of frames) el.classList.toggle('is-current', i === index)
  frameFor(index).classList.add('is-current')
  // relance le léger travelling à chaque changement
  const img = frames.get(index)?.querySelector('img')
  if (img) {
    img.style.animation = 'none'
    void img.offsetWidth
    img.style.animation = ''
  }

  captionEl.querySelector('.room').textContent =
    `${LEVELS[photo.level]?.name ?? 'Extérieur'} · ${photo.indexInStep + 1} / ${photo.countInStep}`
  captionEl.querySelector('.title').textContent = photo.titre
  captionEl.querySelector('.text').textContent = photo.caption
  counterEl.textContent = `${index + 1} / ${SEQUENCE.length}`

  if (photo.level !== planLevel && photo.room) setPlanLevel(photo.level)
  plan.highlight(photo.room ?? '')

  renderSteps()
  renderThumbs()

  if (preload) {
    frameFor((index + 1) % SEQUENCE.length)
    frameFor((index - 1 + SEQUENCE.length) % SEQUENCE.length)
  }
}

// ─── Panneau ──────────────────────────────────────────────────────
function renderSteps() {
  stepsEl.replaceChildren()
  for (const step of TOUR) {
    const b = document.createElement('button')
    b.className = 'step-chip'
    b.textContent = step.titre
    b.classList.toggle('is-active', step.id === current().stepId)
    b.addEventListener('click', () => show(firstIndexForStep(step.id)))
    stepsEl.appendChild(b)
  }
}

function renderThumbs() {
  thumbsEl.replaceChildren()
  SEQUENCE.forEach((photo, i) => {
    const b = document.createElement('button')
    b.className = 'thumb'
    b.classList.toggle('is-active', i === index)
    b.title = photo.caption

    const img = document.createElement('img')
    img.src = src(photo)
    img.alt = ''
    img.loading = 'lazy'
    img.decoding = 'async'
    img.addEventListener('error', () => {
      const ph = document.createElement('span')
      ph.className = 'ph'
      ph.textContent = String(i + 1)
      b.replaceChildren(ph)
    })
    b.appendChild(img)

    b.addEventListener('click', () => show(i))
    thumbsEl.appendChild(b)
  })
}

// ─── Plan ─────────────────────────────────────────────────────────
const plan = new Plan2D(document.getElementById('plan'), (roomId) => {
  const i = firstIndexForRoom(roomId)
  if (i >= 0) show(i)
})

function setPlanLevel(level) {
  planLevel = level
  plan.setLevel(level)
  markRoomsWithPhotos()
  document.querySelectorAll('[data-level]').forEach((b) => {
    b.classList.toggle('is-active', Number(b.dataset.level) === level)
  })
  plan.highlight(current().room ?? '')
}

/** Distingue visuellement les pièces qui ont des photos de celles qui n'en ont pas. */
function markRoomsWithPhotos() {
  for (const g of document.querySelectorAll('.plan-room')) {
    const has = roomsWithPhotos.has(g.dataset.room)
    g.classList.toggle('has-photos', has)
    if (!has) g.style.opacity = '0.45'
    else g.style.opacity = ''
  }
}

document.querySelectorAll('[data-level]').forEach((b) =>
  b.addEventListener('click', () => setPlanLevel(Number(b.dataset.level)))
)

// ─── Navigation ───────────────────────────────────────────────────
document.querySelector('.nav.prev').addEventListener('click', () => show(index - 1))
document.querySelector('.nav.next').addEventListener('click', () => show(index + 1))

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(index - 1)
  if (e.key === 'ArrowRight') show(index + 1)
})

// balayage tactile
let swipeX = null
stage.addEventListener('pointerdown', (e) => {
  swipeX = e.clientX
})
stage.addEventListener('pointerup', (e) => {
  if (swipeX === null) return
  const dx = e.clientX - swipeX
  swipeX = null
  if (Math.abs(dx) > 60) show(dx > 0 ? index - 1 : index + 1)
})

document.getElementById('panel-toggle').addEventListener('click', () => {
  document.body.classList.toggle('panel-open')
})

// ─── Démarrage ────────────────────────────────────────────────────
setPlanLevel(0)
show(0)

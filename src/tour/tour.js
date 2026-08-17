/**
 * Visite photo — multi-biens.
 *
 * La visite se fait sur les photos réelles. Le bien vient de `?bien=` dans
 * l'URL ; changer de bien recharge la page plutôt que de réinitialiser l'état
 * à la main — c'est plus court, et ça rend chaque bien partageable par lien.
 *
 * Les biens qui ont un plan relevé (la villa) l'utilisent comme navigation ;
 * les autres masquent simplement ce panneau.
 */
import './tour.css'
import { PROPERTIES, currentProperty } from './properties.js'
import { Plan2D } from '../viewer/plan2d.js'
import { L, LANGS, applyLang, getLang, setLang, t } from '../i18n.js'

const stage = document.getElementById('stage')
const captionEl = document.getElementById('caption')
const counterEl = document.getElementById('counter')
const stepsEl = document.getElementById('steps')
const thumbsEl = document.getElementById('thumbs')
const planBlock = document.getElementById('plan-block')
const levelsEl = document.querySelector('.panel-head')

const bien = currentProperty()
const SEQ = bien.sequence

let index = 0
let planLevel = 0
let plan = null
const frames = new Map()

const current = () => SEQ[index]
const roomsWithPhotos = new Set(SEQ.map((p) => p.room).filter(Boolean))

// ─── Libellés statiques et sélecteurs ─────────────────────────────
/**
 * (Re)pose tout ce qui ne dépend pas de la photo courante : chrome du panneau,
 * sélecteur de bien, sélecteur de langue, niveaux du plan. Appelé au démarrage
 * puis à chaque changement de langue — d'où la reconstruction plutôt que
 * l'ajout, qui empilerait les puces à chaque bascule.
 */
function applyStaticLabels() {
  document.title = t('meta.tourTitle')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.tourDescription'))

  for (const node of document.querySelectorAll('[data-i18n]')) {
    node.textContent = t(node.dataset.i18n)
  }
  for (const node of document.querySelectorAll('[data-i18n-aria]')) {
    node.setAttribute('aria-label', t(node.dataset.i18nAria))
  }

  const switcher = document.getElementById('bien-switch')
  switcher.replaceChildren()
  for (const p of PROPERTIES) {
    const a = document.createElement('a')
    a.className = 'bien-chip'
    // La langue voyage dans le lien : passer d'un bien à l'autre recharge la
    // page, et le choix ne doit pas dépendre du seul stockage local.
    a.href = `?bien=${p.id}&lang=${getLang()}`
    a.textContent = L(p.nom)
    a.classList.toggle('is-active', p.id === bien.id)
    switcher.appendChild(a)
  }

  const langs = document.getElementById('lang-switch')
  langs.replaceChildren()
  for (const code of LANGS) {
    const b = document.createElement('button')
    b.className = 'lang-chip'
    b.type = 'button'
    b.textContent = t(`lang.${code}`)
    b.classList.toggle('is-active', code === getLang())
    b.addEventListener('click', () => switchLang(code))
    langs.appendChild(b)
  }

  // Les niveaux viennent du relevé : un seul jeu de noms pour le plan et l'onglet.
  document.querySelectorAll('[data-level]').forEach((b) => {
    const lvl = bien.levels[Number(b.dataset.level)]
    if (lvl) b.textContent = L(lvl.name)
  })

  document.getElementById('bien-sub').textContent = L(bien.sousTitre)
  document.querySelector('.panel-foot .note').textContent = L(bien.note)
}

/**
 * Bascule de langue sans rechargement : les calques photo sont jetés car ils
 * portent les étiquettes du comparateur, puis la vue courante est redessinée.
 * La position dans la visite est ainsi conservée.
 */
function switchLang(code) {
  if (!setLang(code)) return
  for (const el of frames.values()) el.remove()
  frames.clear()
  applyStaticLabels()
  plan?.render()
  show(index)
}

// ─── Scène ────────────────────────────────────────────────────────
/**
 * Un calque par photo, créé à la demande et conservé : le fondu enchaîné exige
 * que l'ancienne et la nouvelle coexistent, et garder les calques évite de
 * recharger une image déjà vue.
 */
function frameFor(i) {
  if (frames.has(i)) return frames.get(i)
  const photo = SEQ[i]
  const el = document.createElement('div')
  el.className = 'frame'

  const img = document.createElement('img')
  img.src = photo.src
  img.alt = L(photo.caption)
  img.decoding = 'async'
  img.addEventListener('error', () => el.replaceChildren(missingSlot(photo)))
  el.appendChild(img)

  if (photo.stagedSrc) el.appendChild(comparator(photo))

  stage.insertBefore(el, stage.firstChild)
  frames.set(i, el)
  return el
}

/**
 * Comparateur avant / après : la remise en scène est superposée à la photo
 * réelle et révélée par un volet. Le volet écrit directement dans le style —
 * repasser par un rendu saccaderait au pointermove.
 */
function comparator(photo) {
  const wrap = document.createElement('div')
  wrap.className = 'compare'
  wrap.innerHTML = `
    <div class="compare-after" style="clip-path:inset(0 0 0 50%)">
      <img src="${photo.stagedSrc}" alt="${L(photo.caption)} — ${t('tour.stagedAlt')}" decoding="async" />
    </div>
    <div class="compare-handle" style="left:50%"><span>↔</span></div>
    <span class="compare-tag left">${t('tour.before')}</span>
    <span class="compare-tag right">${t('tour.after')}</span>`

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
    e.stopPropagation() // sinon le balayage change aussi de photo
  })
  wrap.addEventListener('pointermove', (e) => dragging && move(e.clientX))
  const end = (e) => {
    dragging = false
    wrap.releasePointerCapture?.(e.pointerId)
  }
  wrap.addEventListener('pointerup', end)
  wrap.addEventListener('pointercancel', end)
  wrap.querySelector('img').addEventListener('error', () => wrap.remove())
  return wrap
}

function missingSlot(photo) {
  const box = document.createElement('div')
  box.className = 'missing'
  box.innerHTML = `
    <span class="missing-tag">${t('tour.missing')}</span>
    <span class="missing-file">${photo.src}</span>
    <p class="missing-caption">${L(photo.caption)}</p>`
  return box
}

function show(next) {
  index = (next + SEQ.length) % SEQ.length
  const photo = current()

  for (const [i, el] of frames) el.classList.toggle('is-current', i === index)
  frameFor(index).classList.add('is-current')
  const img = frames.get(index)?.querySelector('img')
  if (img) {
    img.style.animation = 'none'
    void img.offsetWidth
    img.style.animation = ''
  }

  const niveau = L(bien.levels[photo.level]?.name)
  captionEl.querySelector('.room').textContent = [niveau, `${photo.indexInStep + 1} / ${photo.countInStep}`]
    .filter(Boolean)
    .join(' · ')
  captionEl.querySelector('.title').textContent = L(photo.titre)
  captionEl.querySelector('.text').textContent = L(photo.caption)
  counterEl.textContent = `${index + 1} / ${SEQ.length}`

  if (plan) {
    if (photo.level !== null && photo.level !== planLevel && photo.room) setPlanLevel(photo.level)
    plan.highlight(photo.room ?? '')
  }

  renderSteps()
  renderThumbs()
  frameFor((index + 1) % SEQ.length)
  frameFor((index - 1 + SEQ.length) % SEQ.length)
}

// ─── Panneau ──────────────────────────────────────────────────────
function renderSteps() {
  stepsEl.replaceChildren()
  for (const step of bien.steps) {
    const b = document.createElement('button')
    b.className = 'step-chip'
    b.textContent = L(step.titre)
    b.classList.toggle('is-active', step.id === current().stepId)
    b.addEventListener('click', () => show(SEQ.findIndex((p) => p.stepId === step.id)))
    stepsEl.appendChild(b)
  }
}

function renderThumbs() {
  thumbsEl.replaceChildren()
  SEQ.forEach((photo, i) => {
    const b = document.createElement('button')
    b.className = 'thumb'
    b.classList.toggle('is-active', i === index)
    b.title = L(photo.caption)
    const img = document.createElement('img')
    img.src = photo.src
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

// ─── Plan (biens relevés uniquement) ──────────────────────────────
if (bien.hasPlan) {
  plan = new Plan2D(document.getElementById('plan'), (roomId) => {
    const i = SEQ.findIndex((p) => p.room === roomId)
    if (i >= 0) show(i)
  })
  levelsEl.hidden = false
  document.querySelectorAll('[data-level]').forEach((b) =>
    b.addEventListener('click', () => setPlanLevel(Number(b.dataset.level)))
  )
} else {
  planBlock.hidden = true
  levelsEl.hidden = true
}

function setPlanLevel(level) {
  planLevel = level
  plan.setLevel(level)
  // Les pièces sans photo restent lisibles mais ne réagissent pas au clic.
  for (const g of document.querySelectorAll('.plan-room')) {
    const has = roomsWithPhotos.has(g.dataset.room)
    g.classList.toggle('has-photos', has)
    g.style.opacity = has ? '' : '0.45'
  }
  document.querySelectorAll('[data-level]').forEach((b) => {
    b.classList.toggle('is-active', Number(b.dataset.level) === level)
  })
  plan.highlight(current().room ?? '')
}

// ─── Navigation ───────────────────────────────────────────────────
document.querySelector('.nav.prev').addEventListener('click', () => show(index - 1))
document.querySelector('.nav.next').addEventListener('click', () => show(index + 1))
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') show(index - 1)
  if (e.key === 'ArrowRight') show(index + 1)
})

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

// Sur mobile le panneau couvre la scène, bouton d'ouverture compris : il lui
// faut sa propre sortie, à la croix comme au clavier.
document.getElementById('panel-close').addEventListener('click', () => {
  document.body.classList.remove('panel-open')
})

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.body.classList.remove('panel-open')
})

// ─── Démarrage ────────────────────────────────────────────────────
applyLang()
applyStaticLabels()
if (bien.hasPlan) setPlanLevel(0)
show(0)

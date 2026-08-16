/**
 * Shell applicatif du site Blue Prestige Mauritius.
 *
 * Reprend la machine à états de `DCLogic` du bundle de design : mêmes clés d'état,
 * mêmes valeurs par défaut, mêmes transitions. Les sections sont des fonctions
 * pures (données → chaîne HTML) ; les interactions passent par un gestionnaire
 * délégué unique, ce qui permet de tout re-rendre à chaque changement d'état
 * sans avoir à réattacher d'écouteurs.
 */
import './base.css'
import { BIENS, CONTACT_EMAIL, FILTRES, PROPS, TOILES } from './data.js'
import { renderHeader, renderHero } from './sections/header.js'
import { renderBiens, renderConcept } from './sections/biens.js'
import { renderArt, renderLightbox, renderVisite } from './sections/visite.js'
import { renderContact, renderFooter, renderJuliana, renderStaging } from './sections/apropos.js'

const root = document.getElementById('site')

const state = {
  coast: 'all',
  bien: 'lagon',
  piece: 0,
  lightbox: null,
  pct: PROPS.stagingStart,
  dragging: false,
  sent: false,
}

/** Construit le view-model attendu par les sections (équivalent de `renderVals`). */
function viewModel() {
  const actif = BIENS.find((b) => b.id === state.bien) ?? BIENS[0]
  const idx = Math.min(state.piece, actif.pieces.length - 1)
  const piece = actif.pieces[idx]

  const filtres = FILTRES.map((f) => ({
    key: f.key,
    label: f.label,
    bg: state.coast === f.key ? '#101A4D' : '#fff',
    fg: state.coast === f.key ? '#fff' : '#3C4470',
  }))

  const biensVus = BIENS.filter((b) => state.coast === 'all' || b.coast === state.coast)

  const ongletsBiens = BIENS.map((b) => ({
    id: b.id,
    label: b.nom,
    bg: b.id === actif.id ? '#fff' : 'transparent',
    fg: b.id === actif.id ? '#101A4D' : '#B9C1EC',
  }))

  const pieces = actif.pieces.map((r, i) => ({
    label: r.label,
    surface: r.surface,
    ga: r.ga,
    bg: i === idx ? '#2A3BC4' : 'rgba(255,255,255,.04)',
    fg: i === idx ? '#fff' : '#B9C1EC',
    border: i === idx ? '#2A3BC4' : 'rgba(255,255,255,.16)',
  }))

  return {
    filtres,
    biensVus,
    ongletsBiens,
    pieces,
    bienActif: actif,
    pieceActive: { ...piece, slotId: `${actif.id}-${idx}` },
    toiles: TOILES.map((t) => ({ slot: t.titre, ...t })),
    artPairing: PROPS.artPairing,
    showPrices: PROPS.showPrices,
    lightbox: state.lightbox,
    pct: state.pct,
    sent: state.sent,
  }
}

function render() {
  const ctx = viewModel()
  root.innerHTML = [
    renderHeader(),
    renderHero(),
    renderConcept(),
    renderBiens(ctx),
    renderVisite(ctx),
    renderArt(ctx),
    renderLightbox(ctx),
    renderStaging(ctx),
    renderJuliana(),
    renderContact(ctx),
    renderFooter(),
  ].join('')
}

function setState(patch) {
  Object.assign(state, patch)
  render()
}

/** Défile jusqu'à la section visite, avec le même décalage d'en-tête que la maquette. */
function scrollToVisite() {
  const el = document.getElementById('visite')
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' })
}

// ─── Événements délégués ──────────────────────────────────────────
root.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]')
  if (!el) return
  const { action } = el.dataset

  switch (action) {
    case 'filtre':
      setState({ coast: el.dataset.key })
      break
    case 'explore':
      setState({ bien: el.dataset.id, piece: 0 })
      scrollToVisite()
      break
    case 'onglet':
      setState({ bien: el.dataset.id, piece: 0 })
      break
    case 'piece':
      setState({ piece: Number(el.dataset.index) })
      break
    case 'toile':
      setState({ lightbox: TOILES.find((t) => t.id === el.dataset.id) ?? null })
      break
    case 'close-lightbox':
      setState({ lightbox: null })
      break
    default:
      break
  }
})

/**
 * Compose la demande de visite sous forme de lien `mailto:`.
 *
 * Le site est entièrement statique : il n'y a pas de back-end pour recevoir un
 * POST. Ouvrir le client mail du visiteur avec un message déjà rédigé est donc
 * le seul acheminement qui parte réellement — et il a l'avantage de laisser une
 * copie dans les envoyés du visiteur.
 */
function mailtoDemande(form) {
  const data = new FormData(form)
  const champ = (nom) => String(data.get(nom) ?? '').trim()

  const sujet = `Demande de visite privée — ${champ('projet')} — ${champ('nom')}`
  const corps = [
    `Nom : ${champ('nom')}`,
    `E-mail : ${champ('email')}`,
    `Téléphone : ${champ('telephone') || '—'}`,
    `Projet : ${champ('projet')}`,
    '',
    champ('message') || '(aucun message)',
  ].join('\r\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`
}

root.addEventListener('submit', (e) => {
  const form = e.target.closest('[data-action="submit-contact"]')
  if (!form) return
  e.preventDefault()
  // Le mailto avant le re-render : `setState` remplace le formulaire par l'écran
  // de confirmation, et l'élément submit ne doit pas disparaître avant lecture.
  window.location.href = mailtoDemande(form)
  setState({ sent: true })
})

// ─── Comparateur avant / après ────────────────────────────────────
// Le curseur bouge en direct sans re-render : repeindre tout le document à
// chaque `pointermove` saccaderait. On met l'état à jour à la fin du geste.
function stagingMove(e, container) {
  const r = container.getBoundingClientRect()
  const pct = Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100))
  state.pct = pct
  const after = container.querySelector('[data-staging-after]')
  const handle = container.querySelector('[data-staging-handle]')
  if (after) after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`
  if (handle) handle.style.left = `${pct}%`
}

root.addEventListener('pointerdown', (e) => {
  const container = e.target.closest('[data-staging]')
  if (!container) return
  state.dragging = true
  container.setPointerCapture?.(e.pointerId)
  stagingMove(e, container)
})

root.addEventListener('pointermove', (e) => {
  if (!state.dragging) return
  const container = e.target.closest('[data-staging]')
  if (container) stagingMove(e, container)
})

const endDrag = () => {
  state.dragging = false
}
root.addEventListener('pointerup', endDrag)
root.addEventListener('pointercancel', endDrag)

// Fermeture du lightbox au clavier.
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && state.lightbox) setState({ lightbox: null })
})

render()

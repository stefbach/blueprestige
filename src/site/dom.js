/**
 * Helpers de rendu partagés par toutes les sections.
 *
 * Le bundle de design (Claude Design) porte tous ses styles en attribut `style`
 * inline, plus un attribut maison `style-hover`. On garde les styles inline tels
 * quels — c'est ce qui garantit la fidélité au pixel — et `hv()` transforme les
 * survols en vraies règles CSS injectées dans une feuille dédiée.
 */

let sheet = null
const hoverCache = new Map()
let hoverSeq = 0

function styleSheet() {
  if (!sheet) {
    const style = document.createElement('style')
    style.dataset.generated = 'hover'
    document.head.appendChild(style)
    sheet = style.sheet
  }
  return sheet
}

/**
 * Enregistre une déclaration de survol et renvoie la classe à poser sur l'élément.
 * @param {string} css ex. "background:#F4F6FE"
 * @returns {string} nom de classe
 */
export function hv(css) {
  if (!css) return ''
  if (hoverCache.has(css)) return hoverCache.get(css)
  const cls = `hv${++hoverSeq}`
  hoverCache.set(css, cls)
  const decls = css
    .split(';')
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => `${d} !important`)
    .join(';')
  styleSheet().insertRule(`.${cls}:hover{${decls}}`, styleSheet().cssRules.length)
  return cls
}

/** Échappe le texte destiné au HTML. */
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Échappe une valeur destinée à un attribut (URL d'image comprise). */
export function attr(value) {
  return esc(value)
}

/**
 * Équivalent de `<image-slot>` du bundle : une image en `object-fit` avec un
 * fond de remplacement lisible quand la source manque ou échoue.
 * @param {{src?:string, placeholder?:string, fit?:'cover'|'contain', style?:string, alt?:string}} o
 */
export function imageSlot({ src, placeholder = '', fit = 'cover', style = '', alt } = {}) {
  const base = `position:absolute;inset:0;width:100%;height:100%;${style}`
  if (!src) {
    return `<span style="${base};display:grid;place-items:center;padding:16px;background:#E8ECFB;color:#6B739E;font-size:11px;letter-spacing:.18em;text-transform:uppercase;text-align:center;line-height:1.6">${esc(placeholder)}</span>`
  }
  // `JSON.stringify` produit une chaîne entre guillemets doubles, or le
  // gestionnaire vit dans un attribut lui-même délimité par des guillemets
  // doubles : sans échappement, l'attribut se referme au milieu du script et le
  // repli ne s'affiche jamais (« SyntaxError: Unexpected end of input » dès
  // qu'une image manque). `esc` les transforme en `&quot;`, que le parseur HTML
  // rend au moteur JS sous forme de vrais guillemets.
  const repli = esc(JSON.stringify(placeholder))
  return `<img src="${attr(src)}" alt="${attr(alt ?? placeholder)}" loading="lazy" decoding="async"
    style="${base};object-fit:${fit};display:block"
    onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'slot-fallback',textContent:${repli}}))" />`
}

/** Concatène des fragments, en ignorant les vides. */
export const join = (parts) => parts.filter(Boolean).join('')

/** Rend une liste (équivalent de `<sc-for>`). */
export const each = (list, fn) => join((list ?? []).map(fn))

/** Rend conditionnellement (équivalent de `<sc-if>`). */
export const when = (cond, fn) => (cond ? fn() : '')

import { hv, esc, imageSlot, each, when } from '../dom.js'
import { L, t } from '../../i18n.js'

/**
 * @param {{ ongletsBiens: {id,label,bg,fg}[], pieces: {label,surface,ga,bg,fg,border}[],
 *           pieceActive: object, bienActif: object, artPairing: boolean }} ctx
 */
export function renderVisite(ctx) {
  const { ongletsBiens, pieces, pieceActive, bienActif, artPairing } = ctx
  return `
  <section id="visite" style="padding:130px 40px;background:#101A4D;color:#fff">
    <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:30px;padding-bottom:50px">
      <div style="display:flex;flex-direction:column;gap:18px">
        <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#9AA6E8">${t('visite.eyebrow')}</span>
        <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08;color:#fff">${t('visite.title')}</h2>
        <p style="margin:0;max-width:52ch;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300;text-wrap:pretty">${t('visite.lede')}</p>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:2px;background:rgba(255,255,255,.16)">
        ${each(ongletsBiens, (o) => `
          <button type="button" data-action="onglet" data-id="${esc(o.id)}" style="padding:14px 22px;border:0;background:${o.bg};color:${o.fg};font-size:11px;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer">${esc(o.label)}</button>
        `)}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:44px;align-items:stretch">
      <div style="display:flex;flex-direction:column;gap:22px">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:20px">
          <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#9AA6E8">${t('visite.rooms')}</span>
          <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#9AA6E8">${esc(L(bienActif.surface))}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(4,1fr);gap:5px;height:440px;padding:14px;border:1px solid rgba(255,255,255,.20)">
          ${each(pieces, (r, i) => `
            <button type="button" data-action="piece" data-index="${i}" style="grid-area:${r.ga};display:flex;flex-direction:column;justify-content:flex-end;gap:5px;padding:14px;border:1px solid ${r.border};background:${r.bg};color:${r.fg};text-align:left;cursor:pointer;transition:background .35s ease,color .35s ease">
              <span style="font-family:'Cormorant Garamond',serif;font-size:19px;line-height:1.05">${esc(r.label)}</span>
              <span style="font-size:9px;letter-spacing:.2em;text-transform:uppercase;opacity:.7">${esc(r.surface)}</span>
            </button>
          `)}
        </div>
        <p style="margin:0;font-size:12px;line-height:1.7;color:#8E99DE;font-weight:300">${t('visite.hint')}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:0;background:rgba(255,255,255,.05)">
        <div style="position:relative;height:420px;background:#0B1236">
          ${imageSlot({ src: pieceActive.img, placeholder: L(pieceActive.slot) })}
          <span style="position:absolute;top:0;right:0;padding:11px 18px;background:#2A3BC4;color:#fff;font-size:10px;letter-spacing:.22em;text-transform:uppercase;pointer-events:none">${esc(L(pieceActive.label))}</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:34px;padding:36px 34px">
          <div style="display:flex;flex-direction:column;gap:14px">
            <h3 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:30px;line-height:1.1;color:#fff">${esc(L(pieceActive.label))}</h3>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300;text-wrap:pretty">${esc(L(pieceActive.texte))}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:20px;padding-left:30px;border-left:1px solid rgba(255,255,255,.18)">
            <span style="display:flex;flex-direction:column;gap:6px">
              <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('visite.light')}</span>
              <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:#fff">${esc(L(pieceActive.lumiere))}</span>
            </span>
            ${when(artPairing, () => `
              <span style="display:flex;flex-direction:column;gap:6px">
                <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('visite.artwork')}</span>
                <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:18px;color:#fff">${esc(L(pieceActive.oeuvre))}</span>
              </span>
            `)}
            <span style="display:flex;flex-wrap:wrap;gap:10px">
              <a href="${esc(bienActif.tour)}" style="padding:13px 20px;background:#2A3BC4;color:#fff;font-size:10px;letter-spacing:.2em;text-transform:uppercase" class="${hv('background:#fff;color:#101A4D')}">${t('visite.full')}</a>
              <a href="#contact" style="padding:13px 20px;border:1px solid rgba(255,255,255,.35);color:#B9C1EC;font-size:10px;letter-spacing:.2em;text-transform:uppercase" class="${hv('border-color:#fff;color:#fff')}">${t('visite.onsite')}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
}

/** @param {{ toiles: object[] }} ctx */
export function renderArt(ctx) {
  const { toiles } = ctx
  return `
  <section id="art" style="padding:130px 40px">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:70px;padding-bottom:56px">
      <div style="display:flex;flex-direction:column;gap:20px">
        <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">${t('art.eyebrow')}</span>
        <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08">${t('art.title')}</h2>
      </div>
      <p style="margin:0;align-self:end;max-width:56ch;font-size:16px;line-height:1.8;color:#3C4470;font-weight:300;text-wrap:pretty">${t('art.text1')}<a href="https://www.artsper.com" target="_blank" rel="noopener">Artsper</a>${t('art.text2')}</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:28px">
      ${each(toiles, (t2) => `
        <figure style="display:flex;flex-direction:column;gap:16px;margin:0;cursor:pointer" data-action="toile" data-id="${esc(t2.id)}">
          <div style="position:relative;aspect-ratio:1;background:#F4F6FE">
            ${imageSlot({ src: t2.img, placeholder: L(t2.slot), fit: 'cover' })}
            <span style="position:absolute;top:0;right:0;padding:9px 14px;background:#fff;font-size:9px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;color:#2A3BC4;pointer-events:none">${esc(L(t2.badge))}</span>
          </div>
          <figcaption style="display:flex;flex-direction:column;gap:6px">
            <span style="font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.15">${esc(L(t2.titre))}</span>
            <span style="font-size:11px;letter-spacing:.12em;color:#6B739E">${esc(L(t2.meta))}</span>
          </figcaption>
        </figure>
      `)}
    </div>
  </section>
  `
}

/** @param {{ lightbox: object|null }} ctx — renvoie '' si pas de lightbox */
export function renderLightbox(ctx) {
  const { lightbox } = ctx
  if (!lightbox) return ''
  return `
  <div data-action="close-lightbox" style="position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:60px;background:rgba(11,18,54,.94);animation:bpFade .3s ease both;cursor:zoom-out">
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:44px;align-items:center;max-width:1100px;width:100%">
      <div style="position:relative;aspect-ratio:1;background:#0B1236">
        ${imageSlot({ src: lightbox.img, placeholder: L(lightbox.titre), fit: 'contain' })}
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;color:#fff">
        <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#9AA6E8">${esc(L(lightbox.badge))}</span>
        <h3 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:42px;line-height:1.05">${esc(L(lightbox.titre))}</h3>
        <p style="margin:0;font-size:14px;letter-spacing:.1em;color:#B9C1EC">${esc(L(lightbox.meta))}</p>
        <p style="margin:0;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300;text-wrap:pretty">${esc(L(lightbox.note))}</p>
      </div>
    </div>
  </div>
  `
}

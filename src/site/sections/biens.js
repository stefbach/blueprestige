import { hv, esc, imageSlot, each, when } from '../dom.js'
import { PILIERS } from '../data.js'

export function renderConcept() {
  return `
  <section id="concept" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:80px;padding:130px 40px;border-top:1px solid rgba(16,26,77,.10)">
    <div style="display:flex;flex-direction:column;gap:22px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">Le concept</span>
      <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08;letter-spacing:-.01em">Un bien se compose<br />comme une toile</h2>
      <p style="margin:0;max-width:36ch;font-size:16px;line-height:1.8;color:#3C4470;font-weight:300;text-wrap:pretty">Peintre au couteau avant d'être agent, Juliana travaille l'immobilier avec les outils de l'atelier : la matière, la lumière, la composition. Chaque bien de la collection est préparé, mis en scène, puis présenté avec une œuvre qui en révèle le tempérament.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:2px;background:rgba(16,26,77,.10)">
      ${each(PILIERS, (p) => `
        <div style="display:flex;flex-direction:column;gap:16px;padding:44px 34px;background:#fff" class="${hv('background:#F4F6FE')}">
          <span style="font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.2em;color:#2A3BC4">${esc(p.num)}</span>
          <h3 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:26px;line-height:1.2">${esc(p.titre)}</h3>
          <p style="margin:0;font-size:14px;line-height:1.75;color:#3C4470;font-weight:300;text-wrap:pretty">${esc(p.texte)}</p>
        </div>
      `)}
    </div>
  </section>
  `
}

/**
 * @param {{ filtres: {key:string,label:string,bg:string,fg:string}[], biensVus: object[], artPairing: boolean, showPrices: boolean }} ctx
 */
export function renderBiens(ctx) {
  const { filtres, biensVus, artPairing, showPrices } = ctx
  return `
  <section id="biens" style="padding:120px 40px;background:#F4F6FE">
    <div style="display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:30px;padding-bottom:44px">
      <div style="display:flex;flex-direction:column;gap:18px">
        <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">La collection</span>
        <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08">Biens d'exception</h2>
      </div>
      <div style="display:flex;gap:2px;background:rgba(16,26,77,.12)">
        ${each(filtres, (f) => `
          <button type="button" data-action="filtre" data-key="${esc(f.key)}" style="padding:14px 26px;border:0;background:${f.bg};color:${f.fg};font-size:11px;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap;cursor:pointer">${esc(f.label)}</button>
        `)}
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(360px,1fr));gap:34px">
      ${each(biensVus, (b) => `
        <article style="display:flex;flex-direction:column;background:#fff;animation:bpRise .5s ease both">
          <div style="position:relative;height:300px;background:#E8ECFB">
            ${imageSlot({ src: b.cover, placeholder: b.slot, fit: 'cover' })}
            <span style="position:absolute;top:0;left:0;padding:10px 16px;background:#fff;font-size:10px;letter-spacing:.22em;text-transform:uppercase;white-space:nowrap;color:#2A3BC4;pointer-events:none">${esc(b.statut)}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:18px;padding:32px 30px 30px">
            <div style="display:flex;flex-direction:column;gap:8px">
              <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#6B739E">${esc(b.lieu)}</span>
              <h3 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:400;font-size:31px;line-height:1.12">${esc(b.nom)}</h3>
            </div>
            <p style="margin:0;font-size:14px;line-height:1.75;color:#3C4470;font-weight:300;text-wrap:pretty">${esc(b.desc)}</p>
            <div style="display:flex;flex-wrap:wrap;gap:10px">
              ${each(b.specs, (s) => `
                <span style="padding:7px 13px;background:#F4F6FE;font-size:11px;letter-spacing:.08em;color:#3C4470">${esc(s)}</span>
              `)}
            </div>
            ${when(artPairing, () => `
              <div style="display:flex;align-items:center;gap:13px;padding:15px 0;border-top:1px solid rgba(16,26,77,.10);border-bottom:1px solid rgba(16,26,77,.10)">
                <span style="position:relative;display:block;width:38px;height:38px;flex:none;background:#F4F6FE">${imageSlot({ src: b.oeuvreImg, placeholder: 'Œuvre', fit: 'cover' })}</span>
                <span style="display:flex;flex-direction:column;gap:3px">
                  <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#6B739E">L'œuvre du lieu</span>
                  <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;line-height:1">${esc(b.oeuvre)}</span>
                </span>
              </div>
            `)}
            <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:4px">
              ${when(showPrices, () => `
                <span style="font-family:'Cormorant Garamond',serif;font-size:23px;color:#101A4D">${esc(b.prix)}</span>
              `)}
              <button type="button" data-action="explore" data-id="${esc(b.id)}" style="display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border:1px solid rgba(16,26,77,.22);background:transparent;color:#101A4D;font-size:11px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" class="${hv('border-color:#2A3BC4;color:#2A3BC4')}">Visite exploratoire →</button>
            </div>
          </div>
        </article>
      `)}
    </div>
  </section>
  `
}

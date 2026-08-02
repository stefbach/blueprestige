import { hv, esc, imageSlot } from '../dom.js'
import { ASSETS } from '../data.js'

export function renderHeader() {
  return `
  <header style="position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:20px 32px;padding:18px 40px;flex-wrap:wrap;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);border-bottom:1px solid rgba(16,26,77,.10)">
    <a href="#top" style="display:flex;align-items:center;gap:14px;color:#101A4D">
      <span style="display:grid;place-items:center;width:42px;height:42px;border:1px solid #2A3BC4;color:#2A3BC4;font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.06em;line-height:1">JH</span>
      <span style="display:flex;flex-direction:column;gap:3px">
        <span style="font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.30em;line-height:1">BLUE PRESTIGE</span>
        <span style="font-size:9px;letter-spacing:.42em;color:#6B739E;line-height:1">MAURITIUS</span>
      </span>
    </a>
    <nav style="display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;color:#101A4D">
      <a href="#concept" class="${hv('color:#2A3BC4')}" style="color:#101A4D">Concept</a>
      <a href="#biens" class="${hv('color:#2A3BC4')}" style="color:#101A4D">Biens</a>
      <a href="#visite" class="${hv('color:#2A3BC4')}" style="color:#101A4D">Visite</a>
      <a href="#art" class="${hv('color:#2A3BC4')}" style="color:#101A4D">L'Art</a>
      <a href="#staging" class="${hv('color:#2A3BC4')}" style="color:#101A4D">Home staging</a>
      <a href="#juliana" class="${hv('color:#2A3BC4')}" style="color:#101A4D">Juliana</a>
      <a href="#contact" class="${hv('background:#101A4D;color:#fff')}" style="display:inline-flex;align-items:center;padding:12px 22px;background:#2A3BC4;color:#fff;letter-spacing:.16em;white-space:nowrap">Visite privée</a>
    </nav>
  </header>
  `
}

export function renderHero() {
  return `
  <section id="top" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(400px,1fr));min-height:calc(100vh - 79px)">
    <div style="display:flex;flex-direction:column;justify-content:center;gap:34px;padding:96px 72px 96px 40px;animation:bpRise .9s ease both">
      <div style="display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">
        <span style="display:block;width:46px;height:1px;background:#2A3BC4;transform-origin:left;animation:bpLine 1.1s .2s ease both"></span>
        <span>Flic en Flac · Tamarin</span>
      </div>
      <h1 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(48px,5.4vw,86px);line-height:1.02;letter-spacing:-.015em;text-wrap:balance">Quand l'art<br />rencontre <em style="font-style:italic;color:#2A3BC4">le lieu</em></h1>
      <p style="margin:0;max-width:44ch;font-size:17px;line-height:1.75;color:#3C4470;font-weight:300;text-wrap:pretty">Blue Prestige Mauritius présente des biens d'exception comme on présente une œuvre : une lumière, un cadrage, un silence. Ne jamais montrer une maison telle qu'elle est — mais telle qu'elle peut devenir.</p>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px">
        <a href="#biens" class="${hv('background:#2A3BC4;color:#fff')}" style="display:inline-flex;align-items:center;gap:12px;padding:17px 30px;background:#101A4D;color:#fff;font-size:12px;letter-spacing:.18em;text-transform:uppercase">La collection</a>
        <a href="#visite" class="${hv('border-color:#2A3BC4;color:#2A3BC4')}" style="display:inline-flex;align-items:center;gap:12px;padding:17px 30px;border:1px solid rgba(16,26,77,.22);color:#101A4D;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Visite exploratoire</a>
      </div>
      <div style="display:flex;gap:44px;padding-top:14px;border-top:1px solid rgba(16,26,77,.10)">
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">20</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">ans de regard</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">2</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">côtes d'exception</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">1</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">seul métier</span>
        </div>
      </div>
    </div>
    <div style="position:relative;min-height:560px;background:#F4F6FE;animation:bpFade 1.2s ease both">
      ${imageSlot({ src: ASSETS.hero, placeholder: "Villa d'exception — photo pleine hauteur", fit: 'cover' })}
      <div style="position:absolute;left:-70px;bottom:64px;display:flex;align-items:center;gap:16px;padding:22px 30px;background:#fff;box-shadow:0 30px 60px -30px rgba(16,26,77,.45);pointer-events:none">
        <span style="display:block;width:2px;height:44px;background:#2A3BC4"></span>
        <span style="display:flex;flex-direction:column;gap:5px">
          <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#6B739E">Signature</span>
          <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:24px;line-height:1">Juliana Haggoo</span>
        </span>
      </div>
    </div>
  </section>
  `
}

import { hv, esc, imageSlot } from '../dom.js'
import { ASSETS } from '../data.js'
import { LANGS, getLang, t } from '../../i18n.js'

/**
 * Bascule FR / EN. Les deux langues restent visibles côte à côte plutôt que
 * derrière un menu déroulant : sur un site bilingue, le visiteur doit voir du
 * premier coup d'œil que sa langue existe.
 */
function langSwitch() {
  const actif = getLang()
  return `
    <span role="group" aria-label="${esc(t('lang.switch'))}" style="display:inline-flex;align-items:center;gap:1px;background:rgba(16,26,77,.14)">
      ${LANGS.map((code) => {
        const on = code === actif
        return `<button type="button" data-action="lang" data-lang="${code}" aria-current="${on ? 'true' : 'false'}" style="padding:9px 13px;border:0;background:${on ? '#101A4D' : '#fff'};color:${on ? '#fff' : '#6B739E'};font:inherit;font-size:11px;letter-spacing:.16em;cursor:${on ? 'default' : 'pointer'}" class="${on ? '' : hv('color:#2A3BC4')}">${esc(t(`lang.${code}`))}</button>`
      }).join('')}
    </span>`
}

export function renderHeader() {
  return `
  <header style="position:sticky;top:0;z-index:60;display:flex;align-items:center;justify-content:space-between;gap:20px 32px;padding:18px clamp(16px,5vw,40px);flex-wrap:wrap;background:rgba(255,255,255,.86);backdrop-filter:blur(14px);border-bottom:1px solid rgba(16,26,77,.10)">
    <a href="#top" style="display:flex;align-items:center;gap:14px;color:#101A4D">
      <span style="display:grid;place-items:center;width:42px;height:42px;border:1px solid #2A3BC4;color:#2A3BC4;font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.06em;line-height:1">JH</span>
      <span style="display:flex;flex-direction:column;gap:3px">
        <span style="font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.30em;line-height:1">BLUE PRESTIGE</span>
        <span style="font-size:9px;letter-spacing:.42em;color:#6B739E;line-height:1">MAURITIUS</span>
      </span>
    </a>
    <nav style="display:flex;flex-wrap:wrap;align-items:center;gap:14px 22px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;color:#101A4D">
      <a href="#concept" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.concept')}</a>
      <a href="#biens" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.biens')}</a>
      <a href="#visite" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.visite')}</a>
      <a href="#art" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.art')}</a>
      <a href="#staging" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.staging')}</a>
      <a href="#juliana" class="${hv('color:#2A3BC4')}" style="color:#101A4D">${t('nav.juliana')}</a>
      ${langSwitch()}
      <a href="#contact" class="${hv('background:#101A4D;color:#fff')}" style="display:inline-flex;align-items:center;padding:12px 22px;background:#2A3BC4;color:#fff;letter-spacing:.16em;white-space:nowrap">${t('nav.contact')}</a>
    </nav>
  </header>
  `
}

export function renderHero() {
  return `
  <section id="top" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(400px,100%),1fr));min-height:calc(100vh - 79px)">
    <div style="display:flex;flex-direction:column;justify-content:center;gap:34px;padding:clamp(56px,9vw,96px) clamp(20px,6vw,72px) clamp(56px,9vw,96px) clamp(20px,5vw,40px);animation:bpRise .9s ease both">
      <div style="display:flex;align-items:center;gap:14px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">
        <span style="display:block;width:46px;height:1px;background:#2A3BC4;transform-origin:left;animation:bpLine 1.1s .2s ease both"></span>
        <span>Flic en Flac · Tamarin</span>
      </div>
      <h1 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(48px,5.4vw,86px);line-height:1.02;letter-spacing:-.015em;text-wrap:balance">${t('hero.line1')}<br />${t('hero.line2')} <em style="font-style:italic;color:#2A3BC4">${t('hero.lineEm')}</em></h1>
      <p style="margin:0;max-width:44ch;font-size:17px;line-height:1.75;color:#3C4470;font-weight:300;text-wrap:pretty">${t('hero.lede')}</p>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:16px">
        <a href="#biens" class="${hv('background:#2A3BC4;color:#fff')}" style="display:inline-flex;align-items:center;gap:12px;padding:17px 30px;background:#101A4D;color:#fff;font-size:12px;letter-spacing:.18em;text-transform:uppercase">${t('hero.ctaCollection')}</a>
        <a href="#visite" class="${hv('border-color:#2A3BC4;color:#2A3BC4')}" style="display:inline-flex;align-items:center;gap:12px;padding:17px 30px;border:1px solid rgba(16,26,77,.22);color:#101A4D;font-size:12px;letter-spacing:.18em;text-transform:uppercase">${t('hero.ctaVisite')}</a>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:20px clamp(22px,6vw,44px);padding-top:14px;border-top:1px solid rgba(16,26,77,.10)">
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">20</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">${t('hero.stat1')}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">2</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">${t('hero.stat2')}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;line-height:1;color:#2A3BC4">1</span>
          <span style="font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#6B739E">${t('hero.stat3')}</span>
        </div>
      </div>
    </div>
    <div data-hero-media style="position:relative;min-height:clamp(320px,62vw,560px);background:#F4F6FE;animation:bpFade 1.2s ease both">
      ${imageSlot({ src: ASSETS.hero, placeholder: t('hero.imageAlt'), fit: 'cover' })}
      <div data-hero-signature style="position:absolute;left:-70px;bottom:64px;display:flex;align-items:center;gap:16px;padding:22px 30px;background:#fff;box-shadow:0 30px 60px -30px rgba(16,26,77,.45);pointer-events:none">
        <span style="display:block;width:2px;height:44px;background:#2A3BC4"></span>
        <span style="display:flex;flex-direction:column;gap:5px">
          <span style="font-size:10px;letter-spacing:.26em;text-transform:uppercase;color:#6B739E">${t('hero.signature')}</span>
          <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:24px;line-height:1">Juliana Haggoo</span>
        </span>
      </div>
    </div>
  </section>
  `
}

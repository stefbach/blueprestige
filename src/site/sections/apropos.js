import { hv, esc, imageSlot, each, when } from '../dom.js'
import { REPERES, ASSETS, CONTACT_EMAIL } from '../data.js'
import { L, t } from '../../i18n.js'

/** @param {{ pct: number }} ctx — position du curseur avant/après, en % */
export function renderStaging(ctx) {
  const { pct } = ctx
  const clipAfter = `inset(0 ${100 - pct}% 0 0)`
  const handleLeft = `${pct}%`
  return `
  <section id="staging" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:70px;align-items:center;padding:130px 40px;background:#F4F6FE">
    <div style="display:flex;flex-direction:column;gap:24px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">${t('staging.eyebrow')}</span>
      <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08">${t('staging.title1')}<br />${t('staging.title2')}</h2>
      <p style="margin:0;max-width:42ch;font-size:16px;line-height:1.8;color:#3C4470;font-weight:300;text-wrap:pretty">${t('staging.text')}</p>
      <div style="display:flex;gap:36px;padding-top:8px;border-top:1px solid rgba(16,26,77,.12)">
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#2A3BC4">−38 %</span>
          <span style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B739E">${t('staging.stat1')}</span>
        </span>
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#2A3BC4">72 h</span>
          <span style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B739E">${t('staging.stat2')}</span>
        </span>
      </div>
    </div>
    <div data-staging style="position:relative;height:520px;background:#E8ECFB;cursor:ew-resize;touch-action:none;user-select:none">
      <!-- Le clip de la maquette (\`inset(0 X% 0 0)\`) découvre le calque
           supérieur par la GAUCHE, alors que les étiquettes annoncent « Avant »
           à gauche et « Après » à droite. Les deux images sont donc échangées
           par rapport au bundle : la mise en scène est en fond, le cliché
           d'origine par-dessus. Sans cela le comparateur se lit à l'envers. -->
      ${imageSlot({ src: ASSETS.stagingApres, placeholder: t('staging.afterAlt'), shape: 'rect', fit: 'cover' })}
      <div data-staging-after style="position:absolute;inset:0;clip-path:${clipAfter}">
        ${imageSlot({ src: ASSETS.stagingAvant, placeholder: t('staging.beforeAlt'), shape: 'rect', fit: 'cover' })}
      </div>
      <div data-staging-handle style="position:absolute;top:0;bottom:0;left:${handleLeft};width:1px;background:#fff;pointer-events:none">
        <span style="position:absolute;top:50%;left:50%;display:grid;place-items:center;width:52px;height:52px;transform:translate(-50%,-50%);background:#fff;color:#2A3BC4;font-size:13px;letter-spacing:.1em;box-shadow:0 14px 30px -14px rgba(16,26,77,.6)">↔</span>
      </div>
      <span style="position:absolute;left:0;bottom:0;padding:10px 16px;background:#fff;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#6B739E;pointer-events:none">${t('staging.before')}</span>
      <span style="position:absolute;right:0;bottom:0;padding:10px 16px;background:#2A3BC4;color:#fff;font-size:9px;letter-spacing:.24em;text-transform:uppercase;pointer-events:none">${t('staging.after')}</span>
    </div>
  </section>
  `
}

export function renderJuliana() {
  return `
  <section id="juliana" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:80px;padding:130px 40px">
    <div style="display:flex;flex-direction:column;gap:28px">
      <div style="position:relative;height:560px;background:#F4F6FE">
        ${imageSlot({ src: ASSETS.portrait, placeholder: t('juliana.portraitAlt'), shape: 'rect', fit: 'cover' })}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:26px">Juliana Haggoo</span>
        <span style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#6B739E">${t('juliana.role')}</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:26px;padding-top:10px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">${t('juliana.eyebrow')}</span>
      <h2 style="margin:0;max-width:26ch;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(32px,3.2vw,50px);line-height:1.1">${t('juliana.title')}</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:34px;max-width:900px;font-size:15px;line-height:1.85;color:#3C4470;font-weight:300">
        <div style="display:flex;flex-direction:column;gap:20px">
          <p style="margin:0;text-wrap:pretty">${t('juliana.p1')}</p>
          <p style="margin:0;text-wrap:pretty">${t('juliana.p2')}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:20px">
          <p style="margin:0;text-wrap:pretty">${t('juliana.p3')}</p>
          <p style="margin:0;text-wrap:pretty">${t('juliana.p4')}</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:2px;margin-top:16px;background:rgba(16,26,77,.10)">
        ${each(REPERES, (j) => `
          <div style="display:flex;flex-direction:column;gap:10px;padding:30px 26px;background:#fff">
            <span style="font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.16em;color:#2A3BC4">${esc(j.annee)}</span>
            <span style="font-size:14px;line-height:1.6;color:#3C4470;font-weight:300">${esc(L(j.texte))}</span>
          </div>
        `)}
      </div>
    </div>
  </section>
  `
}

/** @param {{ sent: boolean }} ctx */
export function renderContact(ctx) {
  const { sent } = ctx
  return `
  <section id="contact" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:80px;padding:130px 40px;background:#101A4D;color:#fff">
    <div style="display:flex;flex-direction:column;gap:28px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#9AA6E8">${t('contact.eyebrow')}</span>
      <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08;color:#fff">${t('contact.title1')}<br />${t('contact.title2')}</h2>
      <p style="margin:0;max-width:40ch;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300;text-wrap:pretty">${t('contact.lede')}</p>
      <div style="display:flex;align-items:center;gap:20px">
        <span style="position:relative;display:block;width:96px;height:96px;flex:none;background:rgba(255,255,255,.08)">
          ${imageSlot({ src: ASSETS.portraitContact, placeholder: 'Juliana', shape: 'rect', fit: 'cover' })}
        </span>
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#fff">Juliana Haggoo</span>
          <span style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.person')}</span>
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,.18)">
        <a href="tel:+23058278367" style="color:#fff;font-family:'Cormorant Garamond',serif;font-size:26px" class="${hv('color:#9AA6E8')}">+230 5827 8367</a>
        <a href="mailto:${esc(CONTACT_EMAIL)}" style="color:#fff;font-size:15px;letter-spacing:.06em" class="${hv('color:#9AA6E8')}">${esc(CONTACT_EMAIL)}</a>
        <div style="display:flex;flex-wrap:wrap;gap:24px;font-size:11px;letter-spacing:.2em;text-transform:uppercase">
          <a href="https://www.instagram.com/julianahaggooart/" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">Instagram</a>
          <a href="https://www.julianahaggoo.art" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">julianahaggoo.art</a>
          <a href="https://www.artsper.com" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">Artsper</a>
        </div>
        <span style="font-size:13px;line-height:1.7;color:#8E99DE;font-weight:300">${t('contact.location')}</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center">
      ${when(sent, () => `
        <div style="display:flex;flex-direction:column;gap:16px;padding:56px 44px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.20)">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#fff">${t('contact.thanks')}</span>
          <p style="margin:0;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300">${t('contact.sent')}</p>
          <p style="margin:0;font-size:13px;line-height:1.8;color:#8E99DE;font-weight:300">${t('contact.sentFallback1')}<a href="mailto:${esc(CONTACT_EMAIL)}" style="color:#fff" class="${hv('color:#9AA6E8')}">${esc(CONTACT_EMAIL)}</a>${t('contact.sentFallback2')}</p>
        </div>
      `)}
      ${when(!sent, () => `
        <form data-action="submit-contact" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;background:rgba(255,255,255,.18)">
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.name')}</span>
            <input type="text" name="nom" required="required" placeholder="${esc(t('contact.namePlaceholder'))}" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.email')}</span>
            <input type="email" name="email" required="required" placeholder="${esc(t('contact.emailPlaceholder'))}" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.phone')}</span>
            <input type="tel" name="telephone" placeholder="+230 …" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.project')}</span>
            <select name="projet" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none">
              <option style="color:#101A4D">${t('contact.projectBuy')}</option>
              <option style="color:#101A4D">${t('contact.projectRent')}</option>
              <option style="color:#101A4D">${t('contact.projectList')}</option>
              <option style="color:#101A4D">${t('contact.projectStaging')}</option>
              <option style="color:#101A4D">${t('contact.projectArt')}</option>
            </select>
          </label>
          <label style="grid-column:1 / -1;display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">${t('contact.message')}</span>
            <textarea name="message" rows="4" placeholder="${esc(t('contact.messagePlaceholder'))}" style="border:0;background:transparent;color:#fff;font-size:15px;line-height:1.7;resize:vertical;outline:none"></textarea>
          </label>
          <button type="submit" style="grid-column:1 / -1;padding:20px;border:0;background:#2A3BC4;color:#fff;font-size:12px;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" class="${hv('background:#fff;color:#101A4D')}">${t('contact.submit')}</button>
        </form>
      `)}
    </div>
  </section>
  `
}

export function renderFooter() {
  return `
  <footer style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:24px;padding:40px;border-top:1px solid rgba(16,26,77,.10)">
    <span style="display:flex;align-items:center;gap:14px">
      <span style="display:grid;place-items:center;width:36px;height:36px;border:1px solid #2A3BC4;color:#2A3BC4;font-family:'Cormorant Garamond',serif;font-size:16px">JH</span>
      <span style="font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.26em">BLUE PRESTIGE MAURITIUS</span>
    </span>
    <span style="font-size:11px;letter-spacing:.14em;color:#6B739E">${t('footer.tagline')}</span>
  </footer>
  `
}

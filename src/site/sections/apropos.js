import { hv, esc, imageSlot, each, when } from '../dom.js'
import { REPERES, ASSETS } from '../data.js'

/** @param {{ pct: number }} ctx — position du curseur avant/après, en % */
export function renderStaging(ctx) {
  const { pct } = ctx
  const clipAfter = `inset(0 ${100 - pct}% 0 0)`
  const handleLeft = `${pct}%`
  return `
  <section id="staging" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:70px;align-items:center;padding:130px 40px;background:#F4F6FE">
    <div style="display:flex;flex-direction:column;gap:24px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">Home staging</span>
      <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08">Avant, on visite.<br />Après, on se projette.</h2>
      <p style="margin:0;max-width:42ch;font-size:16px;line-height:1.8;color:#3C4470;font-weight:300;text-wrap:pretty">Sentir un volume, une harmonie, une lumière qui manque ou qui déborde : c'est tout l'écart entre une maison qu'on visite et une maison où l'on habite déjà, en pensée. Faites glisser pour voir.</p>
      <div style="display:flex;gap:36px;padding-top:8px;border-top:1px solid rgba(16,26,77,.12)">
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#2A3BC4">−38 %</span>
          <span style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B739E">délai de vente</span>
        </span>
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-size:30px;color:#2A3BC4">72 h</span>
          <span style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#6B739E">mise en scène</span>
        </span>
      </div>
    </div>
    <div data-staging style="position:relative;height:520px;background:#E8ECFB;cursor:ew-resize;touch-action:none;user-select:none">
      ${imageSlot({ placeholder: 'Avant — pièce nue', shape: 'rect', fit: 'cover' })}
      <div data-staging-after style="position:absolute;inset:0;clip-path:${clipAfter}">
        ${imageSlot({ placeholder: 'Après — pièce mise en scène', shape: 'rect', fit: 'cover' })}
      </div>
      <div data-staging-handle style="position:absolute;top:0;bottom:0;left:${handleLeft};width:1px;background:#fff;pointer-events:none">
        <span style="position:absolute;top:50%;left:50%;display:grid;place-items:center;width:52px;height:52px;transform:translate(-50%,-50%);background:#fff;color:#2A3BC4;font-size:13px;letter-spacing:.1em;box-shadow:0 14px 30px -14px rgba(16,26,77,.6)">↔</span>
      </div>
      <span style="position:absolute;left:0;bottom:0;padding:10px 16px;background:#fff;font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#6B739E;pointer-events:none">Avant</span>
      <span style="position:absolute;right:0;bottom:0;padding:10px 16px;background:#2A3BC4;color:#fff;font-size:9px;letter-spacing:.24em;text-transform:uppercase;pointer-events:none">Après</span>
    </div>
  </section>
  `
}

export function renderJuliana() {
  return `
  <section id="juliana" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:80px;padding:130px 40px">
    <div style="display:flex;flex-direction:column;gap:28px">
      <div style="position:relative;height:560px;background:#F4F6FE">
        ${imageSlot({ src: ASSETS.portrait, placeholder: "Portrait de Juliana à l'atelier", shape: 'rect', fit: 'cover' })}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:26px">Juliana Haggoo</span>
        <span style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#6B739E">Artiste peintre · Blue Prestige Mauritius</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:26px;padding-top:10px">
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#2A3BC4">Son histoire</span>
      <h2 style="margin:0;max-width:26ch;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(32px,3.2vw,50px);line-height:1.1">Il y a des histoires qui commencent par une note de musique</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:34px;max-width:900px;font-size:15px;line-height:1.85;color:#3C4470;font-weight:300">
        <div style="display:flex;flex-direction:column;gap:20px">
          <p style="margin:0;text-wrap:pretty">Celle de Juliana débute en 2005, à Paris, sur la scène d'un groupe de jazz, où elle apprend très tôt que la beauté se construit dans le détail — une lumière, un silence, un geste juste. Elle explore ensuite le chant et la danse dans les cabarets parisiens, cherchant cette forme d'expression qui saurait porter, mieux que les mots, ce qu'elle ressent.</p>
          <p style="margin:0;text-wrap:pretty">C'est finalement sur la toile qu'elle la trouve. Au couteau, par touches denses et sensuelles, elle façonne des œuvres où le bleu profond et le rouge intense se répondent — des compositions puissantes, habitées, aujourd'hui chez des collectionneurs à travers le monde.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:20px">
          <p style="margin:0;text-wrap:pretty">Mais Juliana ne peint pas seulement des toiles. Elle peint des lieux de vie. Installée à l'Île Maurice, elle a tourné son regard d'artiste vers un autre territoire de création : l'immobilier. Non pas la simple transaction, mais l'art de révéler un espace — de lui redonner une âme avant qu'il ne devienne, pour quelqu'un d'autre, un chez-soi.</p>
          <p style="margin:0;text-wrap:pretty">Entre les pinceaux et les clés de villa, elle poursuit un seul et même métier : révéler la beauté là où elle se cache encore.</p>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:2px;margin-top:16px;background:rgba(16,26,77,.10)">
        ${each(REPERES, (j) => `
          <div style="display:flex;flex-direction:column;gap:10px;padding:30px 26px;background:#fff">
            <span style="font-family:'Cormorant Garamond',serif;font-size:15px;letter-spacing:.16em;color:#2A3BC4">${esc(j.annee)}</span>
            <span style="font-size:14px;line-height:1.6;color:#3C4470;font-weight:300">${esc(j.texte)}</span>
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
      <span style="font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#9AA6E8">Contact</span>
      <h2 style="margin:0;font-family:'Cormorant Garamond',serif;font-weight:300;font-size:clamp(34px,3.4vw,54px);line-height:1.08;color:#fff">Demander une<br />visite privée</h2>
      <p style="margin:0;max-width:40ch;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300;text-wrap:pretty">Vente, location, home staging ou acquisition d'une œuvre — écrivez en quelques lignes ce que vous cherchez. Juliana répond personnellement.</p>
      <div style="display:flex;align-items:center;gap:20px">
        <span style="position:relative;display:block;width:96px;height:96px;flex:none;background:rgba(255,255,255,.08)">
          ${imageSlot({ src: ASSETS.portraitContact, placeholder: 'Juliana', shape: 'rect', fit: 'cover' })}
        </span>
        <span style="display:flex;flex-direction:column;gap:6px">
          <span style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:22px;color:#fff">Juliana Haggoo</span>
          <span style="font-size:10px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">Votre interlocutrice unique</span>
        </span>
      </div>
      <div style="display:flex;flex-direction:column;gap:18px;padding-top:14px;border-top:1px solid rgba(255,255,255,.18)">
        <a href="tel:+23058278367" style="color:#fff;font-family:'Cormorant Garamond',serif;font-size:26px" class="${hv('color:#9AA6E8')}">+230 5827 8367</a>
        <a href="mailto:jh@julianahaggoo.art" style="color:#fff;font-size:15px;letter-spacing:.06em" class="${hv('color:#9AA6E8')}">jh@julianahaggoo.art</a>
        <div style="display:flex;flex-wrap:wrap;gap:24px;font-size:11px;letter-spacing:.2em;text-transform:uppercase">
          <a href="https://www.instagram.com/julianahaggooart/" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">Instagram</a>
          <a href="https://www.julianahaggoo.art" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">julianahaggoo.art</a>
          <a href="https://www.artsper.com" target="_blank" rel="noopener" style="color:#9AA6E8" class="${hv('color:#fff')}">Artsper</a>
        </div>
        <span style="font-size:13px;line-height:1.7;color:#8E99DE;font-weight:300">Flic en Flac · Tamarin — Île Maurice</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:center">
      ${when(sent, () => `
        <div style="display:flex;flex-direction:column;gap:16px;padding:56px 44px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.20)">
          <span style="font-family:'Cormorant Garamond',serif;font-size:34px;color:#fff">Merci.</span>
          <p style="margin:0;font-size:15px;line-height:1.8;color:#B9C1EC;font-weight:300">Votre demande est arrivée. Juliana vous écrit sous 24 heures pour convenir d'une visite.</p>
        </div>
      `)}
      ${when(!sent, () => `
        <form data-action="submit-contact" style="display:grid;grid-template-columns:1fr 1fr;gap:2px;background:rgba(255,255,255,.18)">
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">Nom</span>
            <input type="text" name="nom" required="required" placeholder="Votre nom" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">E-mail</span>
            <input type="email" name="email" required="required" placeholder="vous@exemple.com" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">Téléphone</span>
            <input type="tel" name="telephone" placeholder="+230 …" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none" />
          </label>
          <label style="display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">Votre projet</span>
            <select name="projet" style="border:0;background:transparent;color:#fff;font-size:15px;outline:none">
              <option style="color:#101A4D">Acheter</option>
              <option style="color:#101A4D">Louer</option>
              <option style="color:#101A4D">Confier mon bien</option>
              <option style="color:#101A4D">Home staging</option>
              <option style="color:#101A4D">Acquérir une œuvre</option>
            </select>
          </label>
          <label style="grid-column:1 / -1;display:flex;flex-direction:column;gap:9px;padding:22px 24px;background:#101A4D">
            <span style="font-size:9px;letter-spacing:.24em;text-transform:uppercase;color:#8E99DE">Message</span>
            <textarea name="message" rows="4" placeholder="Ce que vous cherchez, en quelques lignes." style="border:0;background:transparent;color:#fff;font-size:15px;line-height:1.7;resize:vertical;outline:none"></textarea>
          </label>
          <button type="submit" style="grid-column:1 / -1;padding:20px;border:0;background:#2A3BC4;color:#fff;font-size:12px;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" class="${hv('background:#fff;color:#101A4D')}">Envoyer la demande</button>
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
    <span style="font-size:11px;letter-spacing:.14em;color:#6B739E">Quand l'art rencontre le lieu — © 2026 Juliana Haggoo</span>
  </footer>
  `
}

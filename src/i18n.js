/**
 * Bascule bilingue FR / EN, partagée par le site et par la visite photo.
 *
 * Deux mécanismes cohabitent, selon la nature du texte :
 *
 *  - `t()` pour les libellés d'interface (navigation, boutons, intitulés de
 *    formulaire), regroupés dans le dictionnaire `UI` ci-dessous ;
 *  - `L()` pour le contenu éditorial, écrit sous forme de paires `{ fr, en }`
 *    directement à côté des données qu'il décrit — un bien, une photo, une
 *    pièce du plan.
 *
 * Le contenu reste ainsi lisible dans son fichier d'origine, les deux langues
 * côte à côte, plutôt que dispersé dans un catalogue de clés qu'il faudrait
 * tenir synchronisé de tête. `L()` accepte aussi une chaîne simple : les noms
 * propres et les mesures n'ont pas à être dédoublés.
 *
 * La langue vient de `?lang=` (donc un lien partagé garde sa langue), sinon du
 * choix mémorisé, sinon de la langue du navigateur, sinon du français.
 */

export const LANGS = ['fr', 'en']
export const DEFAULT_LANG = 'fr'

const STORAGE_KEY = 'bp-lang'

/** Lecture tolérante : `EN`, `en-GB` et `en` désignent la même langue. */
function normalise(value) {
  const code = String(value ?? '').trim().toLowerCase().slice(0, 2)
  return LANGS.includes(code) ? code : null
}

function readStored() {
  try {
    return normalise(localStorage.getItem(STORAGE_KEY))
  } catch {
    // Navigation privée ou stockage refusé : on se rabat sur le reste.
    return null
  }
}

function detect() {
  const fromUrl = normalise(new URLSearchParams(location.search).get('lang'))
  if (fromUrl) return fromUrl
  const stored = readStored()
  if (stored) return stored
  const nav = navigator.languages?.map(normalise).find(Boolean)
  return nav ?? DEFAULT_LANG
}

let lang = detect()

export function getLang() {
  return lang
}

/**
 * Change la langue et la rend persistante. Ne redessine rien : chaque page
 * décide comment se rafraîchir (le site se re-rend, la visite recompose ses
 * libellés), ce qui évite un rechargement et la perte de la position courante.
 */
export function setLang(next) {
  const code = normalise(next)
  if (!code || code === lang) return false
  lang = code
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Sans stockage, la langue vaut pour la page en cours : l'URL prend le relais.
  }
  applyLang()
  return true
}

/** Reflète la langue courante sur le document et dans l'URL partageable. */
export function applyLang() {
  document.documentElement.lang = lang
  const url = new URL(location.href)
  url.searchParams.set('lang', lang)
  history.replaceState(null, '', url)
}

/** Résout une valeur éditoriale : paire `{ fr, en }`, chaîne, ou liste. */
export function L(value) {
  if (value == null) return ''
  if (typeof value === 'string' || Array.isArray(value)) return value
  if (typeof value === 'object') return value[lang] ?? value[DEFAULT_LANG] ?? ''
  return value
}

/** Résout un libellé d'interface par sa clé. */
export function t(key) {
  const entry = UI[key]
  if (entry === undefined) {
    // Une clé absente doit sauter aux yeux en développement plutôt que de
    // rendre un blanc silencieux dans la page.
    console.warn(`[i18n] clé inconnue : ${key}`)
    return key
  }
  return L(entry)
}

export const UI = {
  // ─── Sélecteur de langue ────────────────────────────────────────
  'lang.fr': { fr: 'FR', en: 'FR' },
  'lang.en': { fr: 'EN', en: 'EN' },
  'lang.switch': { fr: 'Choisir la langue', en: 'Choose language' },

  // ─── Métadonnées de page ────────────────────────────────────────
  'meta.title': {
    fr: 'Blue Prestige Mauritius — Quand l’art rencontre le lieu',
    en: 'Blue Prestige Mauritius — Where art meets the place',
  },
  'meta.description': {
    fr: "Blue Prestige Mauritius présente des biens d'exception comme on présente une œuvre. Flic en Flac · Tamarin — Juliana Haggoo, artiste peintre et agent immobilier.",
    en: 'Blue Prestige Mauritius presents exceptional properties the way one presents a work of art. Flic en Flac · Tamarin — Juliana Haggoo, painter and estate agent.',
  },
  'meta.tourTitle': {
    fr: 'Visite — Blue Prestige Mauritius',
    en: 'Tour — Blue Prestige Mauritius',
  },
  'meta.tourDescription': {
    fr: 'Visite guidée du bien, pièce par pièce, en photos.',
    en: 'A guided tour of the property, room by room, in photographs.',
  },

  // ─── Navigation ─────────────────────────────────────────────────
  'nav.concept': { fr: 'Concept', en: 'Concept' },
  'nav.biens': { fr: 'Biens', en: 'Properties' },
  'nav.visite': { fr: 'Visite', en: 'Tour' },
  'nav.art': { fr: "L'Art", en: 'Art' },
  'nav.staging': { fr: 'Home staging', en: 'Home staging' },
  'nav.juliana': { fr: 'Juliana', en: 'Juliana' },
  'nav.contact': { fr: 'Visite privée', en: 'Private viewing' },

  // ─── Accroche ───────────────────────────────────────────────────
  'hero.line1': { fr: "Quand l'art", en: 'Where art' },
  'hero.line2': { fr: 'rencontre', en: 'meets' },
  'hero.lineEm': { fr: 'le lieu', en: 'the place' },
  'hero.lede': {
    fr: "Blue Prestige Mauritius présente des biens d'exception comme on présente une œuvre : une lumière, un cadrage, un silence. Ne jamais montrer une maison telle qu'elle est — mais telle qu'elle peut devenir.",
    en: 'Blue Prestige Mauritius presents exceptional properties the way one presents a work of art: a light, a framing, a silence. Never show a house as it is — but as it could become.',
  },
  'hero.ctaCollection': { fr: 'La collection', en: 'The collection' },
  'hero.ctaVisite': { fr: 'Visite exploratoire', en: 'Guided tour' },
  'hero.stat1': { fr: 'ans de regard', en: 'years of looking' },
  'hero.stat2': { fr: "côtes d'exception", en: 'exceptional coasts' },
  'hero.stat3': { fr: 'seul métier', en: 'single craft' },
  'hero.signature': { fr: 'Signature', en: 'Signature' },
  'hero.imageAlt': {
    fr: "Villa d'exception — photo pleine hauteur",
    en: 'Exceptional villa — full-height photograph',
  },

  // ─── Concept ────────────────────────────────────────────────────
  'concept.eyebrow': { fr: 'Le concept', en: 'The concept' },
  'concept.title1': { fr: 'Un bien se compose', en: 'A property is composed' },
  'concept.title2': { fr: 'comme une toile', en: 'like a canvas' },
  'concept.text': {
    fr: "Peintre au couteau avant d'être agent, Juliana travaille l'immobilier avec les outils de l'atelier : la matière, la lumière, la composition. Chaque bien de la collection est préparé, mis en scène, puis présenté avec une œuvre qui en révèle le tempérament.",
    en: 'A knife painter before she was an agent, Juliana approaches property with the tools of the studio: texture, light, composition. Every property in the collection is prepared, staged, then presented alongside a work that reveals its temperament.',
  },

  // ─── Collection ─────────────────────────────────────────────────
  'biens.eyebrow': { fr: 'La collection', en: 'The collection' },
  'biens.title': { fr: "Biens d'exception", en: 'Exceptional properties' },
  'biens.cta': { fr: 'Visite exploratoire →', en: 'Guided tour →' },

  // ─── Visite exploratoire ────────────────────────────────────────
  'visite.eyebrow': { fr: 'Visite exploratoire', en: 'Guided tour' },
  'visite.title': { fr: 'Entrez pièce par pièce', en: 'Step inside, room by room' },
  'visite.lede': {
    fr: "Un plan vivant plutôt qu'une liste de photos. Choisissez une pièce : la vue, la lumière, l'intention de mise en scène et l'œuvre qui l'habite s'affichent ensemble.",
    en: 'A living plan rather than a list of photographs. Pick a room: the view, the light, the staging intent and the work that inhabits it appear together.',
  },
  'visite.rooms': { fr: 'Les pièces', en: 'The rooms' },
  'visite.hint': {
    fr: 'Cliquez une pièce du plan pour la parcourir.',
    en: 'Click a room on the plan to explore it.',
  },
  'visite.light': { fr: 'Lumière', en: 'Light' },
  'visite.artwork': { fr: 'Œuvre en place', en: 'Artwork in place' },
  'visite.full': { fr: 'Visite complète →', en: 'Full tour →' },
  'visite.onsite': { fr: 'Visiter sur place', en: 'Visit in person' },

  // ─── Atelier ────────────────────────────────────────────────────
  'art.eyebrow': { fr: "L'atelier", en: 'The studio' },
  'art.title': { fr: 'Les œuvres de Juliana', en: "Juliana's works" },
  'art.text1': {
    fr: 'Peinture au couteau, touches denses, bleus profonds et rouges intenses. Ses toiles sont chez des collectionneurs dans le monde entier, notamment via ',
    en: 'Knife painting, dense strokes, deep blues and intense reds. Her canvases hang in collections around the world, notably through ',
  },
  'art.text2': {
    fr: " — et parfois sur les murs des biens qu'elle présente.",
    en: ' — and sometimes on the walls of the properties she presents.',
  },

  // ─── Home staging ───────────────────────────────────────────────
  'staging.eyebrow': { fr: 'Home staging', en: 'Home staging' },
  'staging.title1': { fr: 'Avant, on visite.', en: 'Before, you view.' },
  'staging.title2': { fr: 'Après, on se projette.', en: 'After, you picture yourself there.' },
  'staging.text': {
    fr: "Sentir un volume, une harmonie, une lumière qui manque ou qui déborde : c'est tout l'écart entre une maison qu'on visite et une maison où l'on habite déjà, en pensée. Faites glisser pour voir.",
    en: 'Sensing a volume, a harmony, a light that is missing or spilling over: that is the whole distance between a house you are shown and a house you already live in, in your mind. Drag to see.',
  },
  'staging.stat1': { fr: 'délai de vente', en: 'time to sell' },
  'staging.stat2': { fr: 'mise en scène', en: 'staging turnaround' },
  'staging.before': { fr: 'Avant', en: 'Before' },
  'staging.after': { fr: 'Après', en: 'After' },
  'staging.beforeAlt': { fr: 'Avant — pièce nue', en: 'Before — bare room' },
  'staging.afterAlt': { fr: 'Après — pièce mise en scène', en: 'After — staged room' },

  // ─── Juliana ────────────────────────────────────────────────────
  'juliana.eyebrow': { fr: 'Son histoire', en: 'Her story' },
  'juliana.title': {
    fr: 'Il y a des histoires qui commencent par une note de musique',
    en: 'Some stories begin with a single note of music',
  },
  'juliana.p1': {
    fr: "Celle de Juliana débute en 2005, à Paris, sur la scène d'un groupe de jazz, où elle apprend très tôt que la beauté se construit dans le détail — une lumière, un silence, un geste juste. Elle explore ensuite le chant et la danse dans les cabarets parisiens, cherchant cette forme d'expression qui saurait porter, mieux que les mots, ce qu'elle ressent.",
    en: "Juliana's begins in 2005, in Paris, on stage with a jazz band, where she learns early that beauty is built in the detail — a light, a silence, a gesture that lands. She goes on to explore singing and dance in the cabarets of Paris, searching for the form of expression that would carry, better than words, what she feels.",
  },
  'juliana.p2': {
    fr: "C'est finalement sur la toile qu'elle la trouve. Au couteau, par touches denses et sensuelles, elle façonne des œuvres où le bleu profond et le rouge intense se répondent — des compositions puissantes, habitées, aujourd'hui chez des collectionneurs à travers le monde.",
    en: 'She finds it, in the end, on canvas. With the knife, in dense and sensual strokes, she shapes works in which deep blue and intense red answer one another — powerful, inhabited compositions, today in collections across the world.',
  },
  'juliana.p3': {
    fr: "Mais Juliana ne peint pas seulement des toiles. Elle peint des lieux de vie. Installée à l'Île Maurice, elle a tourné son regard d'artiste vers un autre territoire de création : l'immobilier. Non pas la simple transaction, mais l'art de révéler un espace — de lui redonner une âme avant qu'il ne devienne, pour quelqu'un d'autre, un chez-soi.",
    en: 'But Juliana does not only paint canvases. She paints places to live in. Settled in Mauritius, she has turned her artist’s eye towards another territory of creation: property. Not the transaction itself, but the art of revealing a space — of giving it back a soul before it becomes, for someone else, a home.',
  },
  'juliana.p4': {
    fr: "Entre les pinceaux et les clés de villa, elle poursuit un seul et même métier : révéler la beauté là où elle se cache encore.",
    en: 'Between the brushes and the villa keys, she pursues one and the same craft: revealing beauty where it is still hiding.',
  },
  'juliana.role': {
    fr: 'Artiste peintre · Blue Prestige Mauritius',
    en: 'Painter · Blue Prestige Mauritius',
  },
  'juliana.portraitAlt': {
    fr: "Portrait de Juliana à l'atelier",
    en: 'Portrait of Juliana in the studio',
  },

  // ─── Contact ────────────────────────────────────────────────────
  'contact.eyebrow': { fr: 'Contact', en: 'Contact' },
  'contact.title1': { fr: 'Demander une', en: 'Request a' },
  'contact.title2': { fr: 'visite privée', en: 'private viewing' },
  'contact.lede': {
    fr: "Vente, location, home staging ou acquisition d'une œuvre — écrivez en quelques lignes ce que vous cherchez. Juliana répond personnellement.",
    en: 'Sale, rental, home staging or acquiring a work — write a few lines about what you are looking for. Juliana replies personally.',
  },
  'contact.person': { fr: 'Votre interlocutrice unique', en: 'Your single point of contact' },
  'contact.location': {
    fr: 'Flic en Flac · Tamarin — Île Maurice',
    en: 'Flic en Flac · Tamarin — Mauritius',
  },
  'contact.name': { fr: 'Nom', en: 'Name' },
  'contact.namePlaceholder': { fr: 'Votre nom', en: 'Your name' },
  'contact.email': { fr: 'E-mail', en: 'Email' },
  'contact.emailPlaceholder': { fr: 'vous@exemple.com', en: 'you@example.com' },
  'contact.phone': { fr: 'Téléphone', en: 'Phone' },
  'contact.project': { fr: 'Votre projet', en: 'Your project' },
  'contact.projectBuy': { fr: 'Acheter', en: 'Buy' },
  'contact.projectRent': { fr: 'Louer', en: 'Rent' },
  'contact.projectList': { fr: 'Confier mon bien', en: 'List my property' },
  'contact.projectStaging': { fr: 'Home staging', en: 'Home staging' },
  'contact.projectArt': { fr: 'Acquérir une œuvre', en: 'Acquire a work' },
  'contact.message': { fr: 'Message', en: 'Message' },
  'contact.messagePlaceholder': {
    fr: 'Ce que vous cherchez, en quelques lignes.',
    en: 'What you are looking for, in a few lines.',
  },
  'contact.submit': { fr: 'Envoyer la demande', en: 'Send the request' },
  'contact.thanks': { fr: 'Merci.', en: 'Thank you.' },
  'contact.sent': {
    fr: "Votre logiciel de messagerie vient de s'ouvrir avec votre demande déjà rédigée : il ne reste qu'à l'envoyer. Juliana vous répond sous 24 heures pour convenir d'une visite.",
    en: 'Your email programme has just opened with your request already written: all that is left is to send it. Juliana replies within 24 hours to arrange a viewing.',
  },
  'contact.sentFallback1': { fr: "Rien ne s'est ouvert ? Écrivez directement à ", en: 'Nothing opened? Write directly to ' },
  'contact.sentFallback2': { fr: '.', en: '.' },

  // Composition du message : intitulés repris dans le corps du mail.
  'mail.subject': { fr: 'Demande de visite privée', en: 'Private viewing request' },
  'mail.name': { fr: 'Nom', en: 'Name' },
  'mail.email': { fr: 'E-mail', en: 'Email' },
  'mail.phone': { fr: 'Téléphone', en: 'Phone' },
  'mail.project': { fr: 'Projet', en: 'Project' },
  'mail.noMessage': { fr: '(aucun message)', en: '(no message)' },

  // ─── Pied de page ───────────────────────────────────────────────
  'footer.tagline': {
    fr: "Quand l'art rencontre le lieu — © 2026 Juliana Haggoo",
    en: 'Where art meets the place — © 2026 Juliana Haggoo',
  },

  // ─── Visite photo ───────────────────────────────────────────────
  'tour.plan': { fr: 'Plan', en: 'Plan' },
  'tour.planPick': { fr: 'Plan — cliquez une pièce', en: 'Plan — click a room' },
  'tour.itinerary': { fr: 'Parcours', en: 'Itinerary' },
  'tour.allViews': { fr: 'Toutes les vues', en: 'All views' },
  'tour.request': { fr: 'Demander une visite privée', en: 'Request a private viewing' },
  'tour.prev': { fr: 'Photo précédente', en: 'Previous photo' },
  'tour.next': { fr: 'Photo suivante', en: 'Next photo' },
  'tour.before': { fr: 'Avant', en: 'Before' },
  'tour.after': { fr: 'Après — home staging', en: 'After — home staging' },
  'tour.stagedAlt': { fr: 'remise en scène', en: 'staged' },
  'tour.missing': { fr: 'Photo attendue', en: 'Photo expected' },

  // ─── Plan 2D ────────────────────────────────────────────────────
  'plan.usable': { fr: 'm² utiles', en: 'm² usable' },
  'plan.height': { fr: 'h.s.p.', en: 'ceiling height' },
}

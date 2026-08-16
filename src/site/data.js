/**
 * Contenu du site.
 *
 * Les textes français sont ceux validés par la cliente ; l'anglais les
 * accompagne sous forme de paires `{ fr, en }`, résolues à l'affichage par
 * `L()` (voir `src/i18n.js`). Les deux langues se lisent côte à côte : ajouter
 * un bien, c'est renseigner les deux, sans aller chercher un fichier de
 * traductions séparé qui finirait par diverger.
 *
 * Ce qui n'a pas à être traduit — noms propres, titres d'œuvres, surfaces,
 * chemins d'images — reste une chaîne simple, que `L()` renvoie telle quelle.
 */

const A = 'https://media.artsper.com/artwork/'

/**
 * Adresse qui reçoit les demandes de visite. Partagée entre l'affichage du
 * bloc contact et la composition du message du formulaire, pour qu'un
 * changement d'adresse n'ait jamais à être répercuté à deux endroits.
 */
export const CONTACT_EMAIL = 'juliana.haggoo@blueprestigemauritius.com'

export const PILIERS = [
  {
    num: '01',
    titre: { fr: 'Regarder', en: 'Look' },
    texte: {
      fr: "Un premier passage sans photographe : volumes, orientation, ce qui manque, ce qui gêne. Un diagnostic de peintre avant un diagnostic d'agent.",
      en: "A first visit without a photographer: volumes, orientation, what is missing, what gets in the way. A painter's assessment before an agent's.",
    },
  },
  {
    num: '02',
    titre: { fr: 'Composer', en: 'Compose' },
    texte: {
      fr: 'Home staging complet — mobilier, textiles, lumière, accrochage. Le bien est mis en scène avant d’être mis en ligne.',
      en: 'Full home staging — furniture, textiles, lighting, hanging. The property is staged before it is listed.',
    },
  },
  {
    num: '03',
    titre: { fr: 'Révéler', en: 'Reveal' },
    texte: {
      fr: 'Visite exploratoire pièce par pièce, plan vivant, œuvre associée. On ne fait pas défiler des photos, on fait entrer.',
      en: 'A guided tour room by room, a living plan, a matching work. We do not scroll through photographs — we invite you in.',
    },
  },
  {
    num: '04',
    titre: { fr: 'Accompagner', en: 'Accompany' },
    texte: {
      fr: "Clientèle mauricienne et internationale, de la première visite à l'acte — et jusqu'au premier dîner dans la maison.",
      en: 'Mauritian and international clients, from the first viewing to the deed — and through to the first dinner in the house.',
    },
  },
]

export const REPERES = [
  {
    annee: '2005',
    texte: { fr: 'Scène jazz, Paris — apprendre le détail.', en: 'Jazz stage, Paris — learning the detail.' },
  },
  {
    annee: '2010',
    texte: { fr: 'Le couteau, la toile, les premiers bleus.', en: 'The knife, the canvas, the first blues.' },
  },
  {
    annee: '2018',
    texte: { fr: "Installation à l'Île Maurice.", en: 'Settling in Mauritius.' },
  },
  {
    annee: '2024',
    texte: {
      fr: 'Blue Prestige Mauritius — Flic en Flac & Tamarin.',
      en: 'Blue Prestige Mauritius — Flic en Flac & Tamarin.',
    },
  },
]

// Avec un quatrième bien à Tamarin, la coupe par côte du bundle d'origine
// redevient la bonne : Flic en Flac / Tamarin. Le domaine (Jardin d'Anna,
// Greencreek) reste indiqué dans le lieu de chaque fiche.
export const FILTRES = [
  { key: 'all', label: { fr: 'Tous', en: 'All' } },
  { key: 'flic', label: 'Flic en Flac' },
  { key: 'tamarin', label: 'Tamarin' },
]

/** Formules revenant sur chaque fiche tant que les données commerciales manquent. */
const SUR_DEMANDE = { fr: 'Visite sur demande', en: 'Viewing on request' }
const PRIX_SUR_DEMANDE = { fr: 'Prix sur demande', en: 'Price on request' }

/**
 * Les quatre biens réellement présentés. Ils remplacent les biens de
 * démonstration du bundle de design.
 *
 * ⚠️ DONNÉES COMMERCIALES À COMPLÉTER. Les prix et les statuts (vente/location)
 * ne sont pas connus : ils sont volontairement laissés en « sur demande »
 * plutôt qu'inventés — un prix erroné sur une annonce engage plus qu'il ne rend
 * service. Chercher `À COMPLÉTER` pour les retrouver.
 *
 * Les localités sont confirmées. Les surfaces ne le sont pas : celle de la villa
 * vient du relevé (`src/villa/plan.js`), estimée à ±10 % depuis les photos et
 * non mesurée sur site ; les trois autres ne sont pas connues.
 *
 * `tour` pointe la visite photo correspondante.
 */
export const BIENS = [
  {
    id: 'villa',
    nom: { fr: 'La Villa', en: 'The Villa' },
    lieu: 'Jardin d’Anna · Flic en Flac',
    coast: 'flic',
    statut: SUR_DEMANDE, // À COMPLÉTER : à vendre / à louer
    prix: PRIX_SUR_DEMANDE, // À COMPLÉTER
    surface: { fr: '≈ 237 m² utiles · deux niveaux', en: '≈ 237 m² usable · two levels' },
    tour: '/visite/?bien=villa',
    cover: '/photos/ext-facade-01.jpg',
    desc: {
      fr: "Deux niveaux sur jardin clos, parquet à bâtons rompus et menuiseries bois massif. L'étage, sous plafond cathédrale, dispose de sa terrasse et d'un accès indépendant.",
      en: 'Two levels over an enclosed garden, herringbone parquet and solid timber joinery. The upper floor, under a cathedral ceiling, has its own terrace and independent access.',
    },
    specs: {
      fr: ['5 chambres', '3 salles d’eau', '≈ 237 m²', 'Jardin clos'],
      en: ['5 bedrooms', '3 shower rooms', '≈ 237 m²', 'Enclosed garden'],
    },
    oeuvre: 'Blue Shadows',
    oeuvreImg: A + '2299265_1_l.jpg',
    slot: { fr: 'La Villa — façade sur jardin', en: 'The Villa — garden frontage' },
    pieces: [
      {
        label: { fr: 'Chambre 1', en: 'Bedroom 1' },
        ga: '1 / 1 / 3 / 3',
        surface: '20.8 m²',
        lumiere: { fr: 'Nord', en: 'North' },
        oeuvre: 'Breath of Light',
        img: '/photos/rez-chambre-01.jpg',
        slot: { fr: 'Chambre du rez', en: 'Ground-floor bedroom' },
        texte: {
          fr: "Chambre du rez remise en scène : le bureau, l'écran et les câbles ont disparu au profit d'une tête de lit cannée, d'un tapis berbère et d'un fauteuil rotin près de la fenêtre.",
          en: 'The ground-floor bedroom restaged: the desk, screen and cables have given way to a cane headboard, a Berber rug and a rattan armchair by the window.',
        },
      },
      {
        label: { fr: 'Salle d’eau', en: 'Shower room' },
        ga: '1 / 3 / 2 / 4',
        surface: '6.7 m²',
        lumiere: { fr: 'Nord', en: 'North' },
        oeuvre: 'The Blue',
        img: '/photos/etage-sde-01.jpg',
        slot: { fr: 'Salle d’eau', en: 'Shower room' },
        texte: {
          fr: 'Douche à paroi verre, WC suspendu, armoire de toilette miroir.',
          en: 'Glass-screened shower, wall-hung WC, mirrored cabinet.',
        },
      },
      {
        label: { fr: 'Dégagement', en: 'Landing' },
        ga: '2 / 3 / 3 / 5',
        surface: '13.3 m²',
        lumiere: { fr: 'Indirecte', en: 'Indirect' },
        oeuvre: 'The Curve',
        img: '/photos/rez-entree-05.jpg',
        slot: { fr: 'Dégagement', en: 'Landing' },
        texte: {
          fr: "L'arche de la cuisine vue depuis l'escalier — la circulation fait partie de la visite.",
          en: 'The kitchen arch seen from the stairs — the circulation is part of the tour.',
        },
      },
      {
        label: { fr: 'Cuisine', en: 'Kitchen' },
        ga: '1 / 4 / 2 / 7',
        surface: '14.1 m²',
        lumiere: { fr: 'Est', en: 'East' },
        oeuvre: 'Summer',
        img: '/photos/rez-cuisine-01.jpg',
        slot: { fr: 'Cuisine', en: 'Kitchen' },
        texte: {
          fr: "Îlot plan de travail bois, façades shaker crème, sol en carreaux de ciment à motifs, double four encastré. Les plans ont été dégagés pour la mise en scène.",
          en: 'Island with timber worktop, cream shaker fronts, patterned cement-tile floor, double built-in oven. The surfaces were cleared for the staging.',
        },
      },
      {
        label: { fr: 'Arrière-cuisine', en: 'Utility kitchen' },
        ga: '2 / 5 / 3 / 7',
        surface: '12.5 m²',
        lumiere: { fr: 'Technique', en: 'Service' },
        oeuvre: 'The Wall',
        img: '/photos/rez-buanderie-01.jpg',
        slot: { fr: 'Arrière-cuisine', en: 'Utility kitchen' },
        texte: {
          fr: 'Buanderie en couloir, plan de travail bois, rangements ouverts et sortie de service — invisible depuis les pièces de vie.',
          en: 'Galley laundry, timber worktop, open storage and service door — invisible from the living rooms.',
        },
      },
      {
        label: { fr: 'Séjour', en: 'Living room' },
        ga: '3 / 1 / 5 / 4',
        surface: '31.0 m²',
        lumiere: { fr: 'Sud, généreuse', en: 'South, generous' },
        oeuvre: 'The Blue',
        img: '/photos/rez-salon-02.jpg',
        slot: { fr: 'Séjour', en: 'Living room' },
        texte: {
          fr: "Baies plein sud, double porte vitrée bois vers la salle à manger. Canapé lin, tapis jute, tables gigognes noyer et deux toiles bleues pour tenir le grand mur.",
          en: 'Full-south glazing, double glazed timber doors through to the dining room. Linen sofa, jute rug, walnut nesting tables and two blue canvases to hold the long wall.',
        },
      },
      {
        label: { fr: 'Salle à manger', en: 'Dining room' },
        ga: '3 / 4 / 5 / 6',
        surface: '22.0 m²',
        lumiere: { fr: 'Sud', en: 'South' },
        oeuvre: 'Harmony',
        img: '/photos/rez-sam-01.jpg',
        slot: { fr: 'Salle à manger', en: 'Dining room' },
        texte: {
          fr: "Table ovale dix couverts, baie coulissante sur la terrasse. Chaises cannage, chemin de table lin et frangipaniers : la pièce est calibrée pour les dîners qui s'étirent.",
          en: 'Oval table for ten, sliding doors onto the terrace. Cane chairs, linen runner and frangipani: the room is calibrated for dinners that run long.',
        },
      },
      {
        label: { fr: 'Entrée', en: 'Entrance hall' },
        ga: '3 / 6 / 5 / 7',
        surface: '14.0 m²',
        lumiere: { fr: 'Sud', en: 'South' },
        oeuvre: 'The Circle',
        img: '/photos/rez-entree-01.jpg',
        slot: { fr: 'Entrée', en: 'Entrance hall' },
        texte: {
          fr: "Porte bois massif à imposte vitrée, parquet à bâtons rompus, escalier tournant à départ en volute. L'arrivée donne le ton.",
          en: 'Solid timber door with glazed transom, herringbone parquet, winding staircase with a scrolled first step. The arrival sets the tone.',
        },
      },
    ],
  },
  {
    id: 'rooftop',
    nom: { fr: 'Le Rooftop', en: 'The Rooftop' },
    lieu: 'Greencreek · Flic en Flac',
    coast: 'flic',
    statut: SUR_DEMANDE, // À COMPLÉTER : à vendre / à louer
    prix: PRIX_SUR_DEMANDE, // À COMPLÉTER
    surface: { fr: 'Terrasse privative · vue mer', en: 'Private terrace · sea view' }, // À COMPLÉTER : surface
    tour: '/visite/?bien=rooftop',
    cover: '/photos/rooftop/terrasse-01.jpg',
    desc: {
      fr: 'Dernier étage du domaine Greencreek, résidence à piscine à débordement. Terrasse privative en deck bois, vue frontale sur la montagne et sur l’océan.',
      en: 'Top floor of the Greencreek estate, a residence with an infinity pool. Private timber-decked terrace, facing the mountain and the ocean head-on.',
    },
    specs: {
      fr: ['3 chambres', 'Terrasse privative', 'Vue mer', 'Piscine de résidence'],
      en: ['3 bedrooms', 'Private terrace', 'Sea view', 'Residence pool'],
    },
    oeuvre: 'Serenity of Motion',
    oeuvreImg: A + '2299225_1_l.jpg',
    slot: { fr: 'Le Rooftop — terrasse privative', en: 'The Rooftop — private terrace' },
    pieces: [
      {
        label: { fr: 'Terrasse', en: 'Terrace' },
        ga: '1 / 1 / 3 / 4',
        surface: { fr: 'Privative', en: 'Private' },
        lumiere: { fr: 'Plein ciel', en: 'Open sky' },
        oeuvre: 'Sunset Silhouettes',
        img: '/photos/rooftop/terrasse-01.jpg',
        slot: { fr: 'Terrasse rooftop', en: 'Rooftop terrace' },
        texte: {
          fr: 'Deck bois, salon bas et table dix couverts. À l’ouest, la montagne ; au-delà, l’océan. C’est ici que le bien se vend.',
          en: 'Timber deck, low seating and a table for ten. To the west, the mountain; beyond it, the ocean. This is where the property sells itself.',
        },
      },
      {
        label: { fr: 'Séjour', en: 'Living room' },
        ga: '1 / 4 / 3 / 7',
        surface: { fr: 'Traversant', en: 'Dual aspect' },
        lumiere: { fr: 'Ouest', en: 'West' },
        oeuvre: 'The Blue',
        img: '/photos/rooftop/salon-01.jpg',
        slot: { fr: 'Séjour du penthouse', en: 'Penthouse living room' },
        texte: {
          fr: 'Claustra-bibliothèque en séparation, canapé d’angle, suspensions design et triptyque au mur. Le bleu nuit du mur d’accent répond au ciel.',
          en: 'A slatted bookcase as a divider, corner sofa, designer pendants and a triptych on the wall. The midnight blue of the accent wall answers the sky.',
        },
      },
      {
        label: { fr: 'Cuisine', en: 'Kitchen' },
        ga: '3 / 1 / 4 / 3',
        surface: { fr: 'Ouverte', en: 'Open plan' },
        lumiere: { fr: 'Nord', en: 'North' },
        oeuvre: 'Blue Bubble',
        img: '/photos/rooftop/cuisine-02.jpg',
        slot: { fr: 'Cuisine ouverte', en: 'Open-plan kitchen' },
        texte: {
          fr: 'Linéaire laqué, plan quartz, plaque induction et colonne Bosch. Sortie directe sur le balcon.',
          en: 'Lacquered run, quartz worktop, induction hob and a Bosch tower. Direct access to the balcony.',
        },
      },
      {
        label: { fr: 'Chambre principale', en: 'Principal bedroom' },
        ga: '3 / 3 / 5 / 5',
        surface: { fr: 'Vue mer', en: 'Sea view' },
        lumiere: { fr: 'Est', en: 'East' },
        oeuvre: 'Whispers of Pink',
        img: '/photos/rooftop/chambre1-01.jpg',
        slot: { fr: 'Suite principale', en: 'Principal suite' },
        texte: {
          fr: 'Papier peint graphique, tête de lit capitonnée, baie toute hauteur sur la végétation et la mer.',
          en: 'Graphic wallpaper, upholstered headboard, full-height glazing onto the greenery and the sea.',
        },
      },
      {
        label: { fr: 'Chambre 2', en: 'Bedroom 2' },
        ga: '3 / 5 / 4 / 7',
        surface: { fr: 'Accès balcon', en: 'Balcony access' },
        lumiere: { fr: 'Est', en: 'East' },
        oeuvre: 'Waves',
        img: '/photos/rooftop/chambre2-01.jpg',
        slot: { fr: 'Deuxième chambre', en: 'Second bedroom' },
        texte: {
          fr: 'Chambre double avec accès balcon, camaïeu de gris et de blancs.',
          en: 'Double bedroom with balcony access, in shades of grey and white.',
        },
      },
      {
        label: { fr: 'Chambre 3', en: 'Bedroom 3' },
        ga: '4 / 5 / 5 / 7',
        surface: '—',
        lumiere: { fr: 'Sud', en: 'South' },
        oeuvre: 'Whispers of Pink',
        img: '/photos/rooftop/chambre3-01.jpg',
        slot: { fr: 'Troisième chambre', en: 'Third bedroom' },
        texte: {
          fr: 'Camaïeu rose poudré, rosaces murales en fibre tressée.',
          en: 'Powder-pink tones, woven fibre rosettes on the wall.',
        },
      },
      {
        label: { fr: 'La résidence', en: 'The residence' },
        ga: '4 / 1 / 5 / 3',
        surface: { fr: 'Commune', en: 'Communal' },
        lumiere: { fr: 'Plein soleil', en: 'Full sun' },
        oeuvre: 'Deep Blue',
        img: '/photos/rooftop/residence-02.jpg',
        slot: { fr: 'Piscine de la résidence', en: 'Residence pool' },
        texte: {
          fr: 'Piscine à débordement bordée de jardins paysagés, façades bois et pierre, bassin miroir en entrée.',
          en: 'Infinity pool edged with landscaped gardens, timber and stone façades, a mirror pool at the entrance.',
        },
      },
    ],
  },
  {
    id: 'townhouse',
    nom: { fr: 'Le Town House', en: 'The Town House' },
    lieu: 'Jardin d’Anna · Flic en Flac',
    coast: 'flic',
    statut: SUR_DEMANDE, // À COMPLÉTER : à vendre / à louer
    prix: PRIX_SUR_DEMANDE, // À COMPLÉTER
    surface: { fr: 'Duplex · terrasse de plain-pied', en: 'Duplex · level-access terrace' }, // À COMPLÉTER : surface
    tour: '/visite/?bien=townhouse',
    cover: '/photos/townhouse/terrasse-01.jpg',
    desc: {
      fr: 'Duplex du domaine Jardin d’Anna, séjour traversant sur cuisine ouverte et terrasse de plain-pied sous pergola, ouverte sur le jardin paysagé.',
      en: 'A duplex on the Jardin d’Anna estate: a dual-aspect living room opening onto the open kitchen and a level-access terrace under a pergola, giving onto the landscaped garden.',
    },
    specs: {
      fr: ['Duplex', 'Terrasse sous pergola', 'Jardin paysagé', 'Escalier pierre'],
      en: ['Duplex', 'Pergola terrace', 'Landscaped garden', 'Stone staircase'],
    },
    oeuvre: 'Earth Vision',
    oeuvreImg: A + '2299255_1_l.jpg',
    slot: { fr: 'Le Town House — terrasse sous pergola', en: 'The Town House — pergola terrace' },
    pieces: [
      {
        label: { fr: 'Séjour', en: 'Living room' },
        ga: '1 / 1 / 3 / 4',
        surface: { fr: 'Traversant', en: 'Dual aspect' },
        lumiere: { fr: 'Ouest', en: 'West' },
        oeuvre: 'Feeling Flow',
        img: '/photos/townhouse/salon-02.jpg',
        slot: { fr: 'Séjour du duplex', en: 'Duplex living room' },
        texte: {
          fr: 'Volume traversant, sol travertin, murs vert-de-gris. Le regard va du canapé jusqu’à l’escalier sans rencontrer de cloison.',
          en: 'A dual-aspect volume, travertine floor, verdigris walls. The eye travels from the sofa to the staircase without meeting a partition.',
        },
      },
      {
        label: { fr: 'Cuisine', en: 'Kitchen' },
        ga: '1 / 4 / 3 / 7',
        surface: { fr: 'Ouverte', en: 'Open plan' },
        lumiere: { fr: 'Nord', en: 'North' },
        oeuvre: 'Summer',
        img: '/photos/townhouse/cuisine-01.jpg',
        slot: { fr: 'Cuisine ouverte', en: 'Open-plan kitchen' },
        texte: {
          fr: 'Plan granit noir, plaque gaz, hotte inox et four encastré. Elle prolonge le séjour plutôt que de s’en séparer.',
          en: 'Black granite worktop, gas hob, stainless extractor and built-in oven. It extends the living room rather than separating from it.',
        },
      },
      {
        label: { fr: 'Escalier', en: 'Staircase' },
        ga: '3 / 1 / 5 / 2',
        surface: '—',
        lumiere: { fr: 'Zénithale', en: 'Overhead' },
        oeuvre: 'The Curve',
        img: '/photos/townhouse/escalier-01.jpg',
        slot: { fr: 'Escalier intérieur', en: 'Internal staircase' },
        texte: {
          fr: 'Marches en pierre claire, garde-corps verre, main courante bois. Un seul mur libre, une seule accroche.',
          en: 'Pale stone treads, glass balustrade, timber handrail. One free wall, one place to hang.',
        },
      },
      {
        label: { fr: 'Chambre', en: 'Bedroom' },
        ga: '3 / 2 / 5 / 4',
        surface: '—',
        lumiere: { fr: 'Est', en: 'East' },
        oeuvre: 'Passion Palette',
        img: '/photos/townhouse/chambre-01.jpg',
        slot: { fr: 'Chambre du duplex', en: 'Duplex bedroom' },
        texte: {
          fr: 'Frise géométrique en tête de lit, tête de lit tissu, palette claire.',
          en: 'A geometric frieze behind the bed, fabric headboard, pale palette.',
        },
      },
      {
        label: { fr: 'Salle d’eau', en: 'Shower room' },
        ga: '3 / 4 / 5 / 5',
        surface: '—',
        lumiere: { fr: 'Jalousie', en: 'Louvred' },
        oeuvre: 'The Blue',
        img: '/photos/townhouse/sde-01.jpg',
        slot: { fr: 'Salle d’eau', en: 'Shower room' },
        texte: {
          fr: 'Vasque posée sur plan pierre, WC suspendu, jalousie ventilée.',
          en: 'Countertop basin on a stone surround, wall-hung WC, ventilated louvre.',
        },
      },
      {
        label: { fr: 'Terrasse jardin', en: 'Garden terrace' },
        ga: '3 / 5 / 5 / 7',
        surface: { fr: 'Plain-pied', en: 'Level access' },
        lumiere: { fr: 'Plein sud', en: 'Due south' },
        oeuvre: 'Rise Like a Sun',
        img: '/photos/townhouse/terrasse-01.jpg',
        slot: { fr: 'Terrasse sous pergola', en: 'Pergola terrace' },
        texte: {
          fr: 'Pergola bois, table teck, haie taillée et palmiers. De plain-pied avec le séjour — la terrasse est une pièce de plus.',
          en: 'Timber pergola, teak table, clipped hedge and palms. Level with the living room — the terrace is one more room.',
        },
      },
    ],
  },
  {
    id: 'tamarin',
    nom: { fr: 'L’Appartement', en: 'The Apartment' },
    lieu: 'Tamarin',
    coast: 'tamarin',
    statut: SUR_DEMANDE, // À COMPLÉTER : à vendre / à louer
    prix: PRIX_SUR_DEMANDE, // À COMPLÉTER
    surface: { fr: 'Duplex · piscine privative', en: 'Duplex · private pool' }, // À COMPLÉTER : surface
    tour: '/visite/?bien=tamarin',
    cover: '/photos/tamarin/piscine-01.jpg',
    desc: {
      fr: 'Duplex de plain-pied à Tamarin, séjour ouvert sur une terrasse couverte et sa piscine privative. Trois chambres, dont une suite sous grande hauteur.',
      en: 'A level-access duplex in Tamarin, living room opening onto a covered terrace and its private pool. Three bedrooms, including a suite under a double-height ceiling.',
    },
    specs: {
      fr: ['3 chambres', 'Piscine privative', 'Terrasse couverte', 'Résidence paysagée'],
      en: ['3 bedrooms', 'Private pool', 'Covered terrace', 'Landscaped residence'],
    },
    oeuvre: 'Deep Blue Lagoon',
    oeuvreImg: A + '2299265_1_l.jpg',
    slot: { fr: 'L’Appartement — piscine privative', en: 'The Apartment — private pool' },
    pieces: [
      {
        label: { fr: 'Piscine', en: 'Pool' },
        ga: '1 / 1 / 3 / 4',
        surface: { fr: 'Privative', en: 'Private' },
        lumiere: { fr: 'Plein soleil', en: 'Full sun' },
        oeuvre: 'Deep Blue',
        img: '/photos/tamarin/piscine-01.jpg',
        slot: { fr: 'Piscine privative', en: 'Private pool' },
        texte: {
          fr: 'Bassin à margelle basalte, deck carrelé, haie taillée jusqu’au regard : la piscine est à l’appartement, pas à la résidence.',
          en: 'Basalt-coped pool, tiled deck, hedge clipped to eye level: the pool belongs to the apartment, not to the residence.',
        },
      },
      {
        label: { fr: 'Terrasse', en: 'Terrace' },
        ga: '1 / 4 / 3 / 7',
        surface: { fr: 'Couverte', en: 'Covered' },
        lumiere: { fr: 'Abritée', en: 'Sheltered' },
        oeuvre: 'Rise Like a Sun',
        img: '/photos/tamarin/terrasse-01.jpg',
        slot: { fr: 'Terrasse couverte', en: 'Covered terrace' },
        texte: {
          fr: 'Table huit couverts et barbecue sous dalle, claustra bois en fond. On y mange toute l’année.',
          en: 'Table for eight and a barbecue under the slab, timber screen behind. You eat out here all year round.',
        },
      },
      {
        label: { fr: 'Séjour', en: 'Living room' },
        ga: '3 / 1 / 4 / 3',
        surface: { fr: 'Traversant', en: 'Dual aspect' },
        lumiere: { fr: 'Ouest', en: 'West' },
        oeuvre: 'The Blue',
        img: '/photos/tamarin/salon-01.jpg',
        slot: { fr: 'Séjour', en: 'Living room' },
        texte: {
          fr: 'Baie coulissante sur toute la largeur : le séjour, la terrasse et le bassin ne font qu’un seul volume.',
          en: 'Sliding glazing across the full width: living room, terrace and pool read as a single volume.',
        },
      },
      {
        label: { fr: 'Cuisine', en: 'Kitchen' },
        ga: '3 / 3 / 5 / 5',
        surface: { fr: 'En L', en: 'L-shaped' },
        lumiere: { fr: 'Nord', en: 'North' },
        oeuvre: 'Summer',
        img: '/photos/tamarin/cuisine-01.jpg',
        slot: { fr: 'Cuisine', en: 'Kitchen' },
        texte: {
          fr: 'Façades bois et laque, four et micro-ondes encastrés, plan traversant. La table de six est dans la cuisine, pas à côté.',
          en: 'Timber and lacquer fronts, built-in oven and microwave, a worktop that runs through. The table for six is in the kitchen, not beside it.',
        },
      },
      {
        label: { fr: 'Entrée', en: 'Entrance hall' },
        ga: '3 / 5 / 4 / 7',
        surface: '—',
        lumiere: { fr: 'Zénithale', en: 'Overhead' },
        oeuvre: 'The Curve',
        img: '/photos/tamarin/entree-01.jpg',
        slot: { fr: 'Entrée et escalier', en: 'Entrance and staircase' },
        texte: {
          fr: 'Claustra bois toute hauteur devant l’escalier : l’entrée sépare sans fermer, et laisse passer la lumière.',
          en: 'A full-height timber screen in front of the staircase: the entrance divides without closing, and lets the light through.',
        },
      },
      {
        label: { fr: 'Chambre principale', en: 'Principal bedroom' },
        ga: '4 / 5 / 5 / 7',
        surface: { fr: 'Suite', en: 'Suite' },
        lumiere: { fr: 'Est', en: 'East' },
        oeuvre: 'Breath of Light',
        img: '/photos/tamarin/chambre1-01.jpg',
        slot: { fr: 'Suite principale', en: 'Principal suite' },
        texte: {
          fr: 'Sous grande hauteur, tête de lit velours, ventilateur de plafond et accès direct à la terrasse.',
          en: 'Under a double-height ceiling: velvet headboard, ceiling fan and direct access to the terrace.',
        },
      },
      {
        label: { fr: 'Chambres 2 & 3', en: 'Bedrooms 2 & 3' },
        ga: '4 / 1 / 5 / 3',
        surface: { fr: '2 chambres', en: '2 bedrooms' },
        lumiere: { fr: 'Sud', en: 'South' },
        oeuvre: 'The 7 Hearts',
        img: '/photos/tamarin/chambre3-01.jpg',
        slot: { fr: 'Chambres', en: 'Bedrooms' },
        texte: {
          fr: 'Une chambre double en teck massif et une chambre à lits jumeaux — la configuration qui fait vendre en location familiale.',
          en: 'A double bedroom in solid teak and a twin room — the configuration that lets a family rental sell itself.',
        },
      },
    ],
  },
]

/** Techniques et statuts revenant sur plusieurs toiles. */
const HUILE = { fr: 'Huile', en: 'Oil' }
const VENDU = { fr: 'Vendu', en: 'Sold' }

/** `meta` compose la technique traduite avec l'année et les dimensions. */
const meta = (annee, dims) => ({
  fr: `${HUILE.fr} · ${annee} · ${dims}`,
  en: `${HUILE.en} · ${annee} · ${dims}`,
})

export const TOILES = [
  {
    id: 'summer',
    titre: 'Summer',
    meta: meta('2025', '120 × 120 × 3 cm'),
    badge: '€2 900',
    img: 'https://www.julianahaggoo.art/images/summer.png',
    note: {
      fr: "Un été mauricien réduit à ses masses : chaleur, sable, un bleu qui coupe. Format carré, très présent au-dessus d'un canapé bas.",
      en: 'A Mauritian summer reduced to its masses: heat, sand, a blue that cuts. A square format, very present above a low sofa.',
    },
  },
  {
    id: 'theblue',
    titre: 'The Blue',
    meta: meta('2025', '120 × 120 cm'),
    badge: VENDU,
    img: 'https://www.julianahaggoo.art/images/the_blue.png',
    note: {
      fr: "Le bleu-signature de Juliana, posé au couteau en couches denses. Cette toile a longtemps tenu le mur d'un living à Flic en Flac.",
      en: "Juliana's signature blue, laid on with the knife in dense layers. This canvas held the wall of a living room in Flic en Flac for years.",
    },
  },
  {
    id: 'thered',
    titre: 'The Red',
    meta: meta('2025', '130 × 130 cm'),
    badge: VENDU,
    img: 'uploads/the-red.jpg',
    note: {
      fr: 'Le pendant rouge de The Blue : disques de rouge posés au couteau, dense au bord et respirant à gauche — même matière, température opposée.',
      en: 'The red counterpart to The Blue: discs of red laid on with the knife, dense at the edge and breathing on the left — same material, opposite temperature.',
    },
  },
  {
    id: 'serenity',
    titre: 'Serenity of Motion',
    meta: meta('2025', '130 × 130 cm'),
    badge: '€3 800',
    img: A + '2299225_1_l.jpg',
    note: {
      fr: "Le mouvement retenu juste avant qu'il ne devienne geste. Une pièce qui apaise un grand volume sans l'écraser.",
      en: 'Movement held back just before it becomes gesture. A piece that calms a large volume without overwhelming it.',
    },
  },
  {
    id: 'shadows',
    titre: 'Blue Shadows',
    meta: meta('2024', '100 × 100 cm'),
    badge: '€2 400',
    img: A + '2299265_1_l.jpg',
    note: {
      fr: "Bleu profond sur fond noir, formes superposées et textures riches : le contraste attire l'œil et tient un mur à lui seul.",
      en: 'Deep blue on a black ground, layered forms and rich textures: the contrast draws the eye and holds a wall on its own.',
    },
  },
  {
    id: 'pink',
    titre: 'Whispers of Pink',
    meta: meta('2024', '100 × 100 cm'),
    badge: '€2 200',
    img: A + '2299234_1_l.jpg',
    note: {
      fr: 'Rose poudré et blancs cassés — la toile qui réchauffe une pièce entièrement claire.',
      en: 'Powder pink and broken whites — the canvas that warms an entirely pale room.',
    },
  },
  {
    id: 'sunset',
    titre: 'Sunset Silhouettes',
    meta: meta('2023', '100 × 100 cm'),
    badge: '€2 300',
    img: A + '2179467_1_l.jpg',
    note: {
      fr: 'Les silhouettes du couchant sur le lagon, ramenées à quelques masses sombres et un fond incandescent.',
      en: 'Silhouettes at sunset over the lagoon, brought down to a few dark masses and an incandescent ground.',
    },
  },
  {
    id: 'passion',
    titre: 'Passion Palette',
    meta: meta('2023', '150 × 200 cm'),
    badge: '€6 700',
    img: A + '2180780_1_l.jpg',
    note: {
      fr: "Le plus grand format de l'atelier. Rouges profonds, matière épaisse — une œuvre qui décide de la pièce entière.",
      en: 'The largest format in the studio. Deep reds, thick material — a work that decides the whole room.',
    },
  },
  {
    id: 'earth',
    titre: 'Earth Vision',
    meta: meta('2025', '100 × 65 cm'),
    badge: '€2 600',
    img: A + '2299255_1_l.jpg',
    note: {
      fr: 'Une sphère, deux visages. Entre illusion et réalité, la Terre et l’humain se reflètent.',
      en: 'One sphere, two faces. Between illusion and reality, the Earth and the human mirror one another.',
    },
  },
  {
    id: 'circle',
    titre: 'The Circle',
    meta: meta('2012', '100 × 100 cm'),
    badge: '€2 100',
    img: A + '2288538_1_l.jpg',
    note: {
      fr: 'Une des premières toiles au couteau : le cercle comme centre de gravité de la composition.',
      en: 'One of the first knife paintings: the circle as the centre of gravity of the composition.',
    },
  },
]

/** Options exposées par le bundle de design (`data-props`). */
export const PROPS = {
  showPrices: true,
  artPairing: true,
  stagingStart: 55,
}

export const ASSETS = {
  hero: 'uploads/Serene Minimalist Villa in Tropical Setting.png',
  portrait: 'uploads/WhatsApp Image 2026-08-02 at 18.20.38 (1).jpeg',
  portraitContact: 'uploads/WhatsApp Image 2026-08-02 at 18.20.38.jpeg',
  atelier: 'uploads/WhatsApp Image 2026-08-02 at 18.20.39.jpeg',
  // Comparateur de la section Home staging : la chambre du rez de la villa,
  // avant (bureau, écran, câbles) et après remise en scène. Deux cadrages
  // strictement identiques — c'est la condition pour qu'un volet ait du sens.
  stagingAvant: '/photos/rez-chambre-01.jpg',
  stagingApres: '/photos/staged/rez-chambre-01.jpg',
}

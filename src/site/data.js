/**
 * Contenu du site, repris tel quel du bundle de design
 * (`Blue Prestige Mauritius.dc.html`, méthodes biens() / toilesData() / renderVals()).
 * Aucune reformulation : les textes sont ceux validés par la cliente.
 */

const A = 'https://media.artsper.com/artwork/'

export const PILIERS = [
  {
    num: '01',
    titre: 'Regarder',
    texte:
      "Un premier passage sans photographe : volumes, orientation, ce qui manque, ce qui gêne. Un diagnostic de peintre avant un diagnostic d'agent.",
  },
  {
    num: '02',
    titre: 'Composer',
    texte:
      'Home staging complet — mobilier, textiles, lumière, accrochage. Le bien est mis en scène avant d’être mis en ligne.',
  },
  {
    num: '03',
    titre: 'Révéler',
    texte:
      'Visite exploratoire pièce par pièce, plan vivant, œuvre associée. On ne fait pas défiler des photos, on fait entrer.',
  },
  {
    num: '04',
    titre: 'Accompagner',
    texte:
      "Clientèle mauricienne et internationale, de la première visite à l'acte — et jusqu'au premier dîner dans la maison.",
  },
]

export const REPERES = [
  { annee: '2005', texte: 'Scène jazz, Paris — apprendre le détail.' },
  { annee: '2010', texte: 'Le couteau, la toile, les premiers bleus.' },
  { annee: '2018', texte: "Installation à l'Île Maurice." },
  { annee: '2024', texte: 'Blue Prestige Mauritius — Flic en Flac & Tamarin.' },
]

// Avec un quatrième bien à Tamarin, la coupe par côte du bundle d'origine
// redevient la bonne : Flic en Flac / Tamarin. Le domaine (Jardin d'Anna,
// Greencreek) reste indiqué dans le lieu de chaque fiche.
export const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'flic', label: 'Flic en Flac' },
  { key: 'tamarin', label: 'Tamarin' },
]

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
    nom: 'La Villa',
    lieu: 'Jardin d’Anna · Flic en Flac',
    coast: 'flic',
    statut: 'Visite sur demande', // À COMPLÉTER : à vendre / à louer
    prix: 'Prix sur demande', // À COMPLÉTER
    surface: '≈ 237 m² utiles · deux niveaux',
    tour: '/visite/?bien=villa',
    cover: '/photos/ext-facade-01.jpg',
    desc: "Deux niveaux sur jardin clos, parquet à bâtons rompus et menuiseries bois massif. L'étage, sous plafond cathédrale, dispose de sa terrasse et d'un accès indépendant.",
    specs: ['5 chambres', '3 salles d’eau', '≈ 237 m²', 'Jardin clos'],
    oeuvre: 'Blue Shadows',
    oeuvreImg: A + '2299265_1_l.jpg',
    slot: 'La Villa — façade sur jardin',
    pieces: [
      { label: 'Chambre 1', ga: '1 / 1 / 3 / 3', surface: '20.8 m²', lumiere: 'Nord', oeuvre: 'Breath of Light', img: '/photos/rez-chambre-01.jpg', slot: 'Chambre du rez', texte: "Chambre du rez remise en scène : le bureau, l'écran et les câbles ont disparu au profit d'une tête de lit cannée, d'un tapis berbère et d'un fauteuil rotin près de la fenêtre." },
      { label: 'Salle d’eau', ga: '1 / 3 / 2 / 4', surface: '6.7 m²', lumiere: 'Nord', oeuvre: 'The Blue', img: '/photos/etage-sde-01.jpg', slot: 'Salle d’eau', texte: 'Douche à paroi verre, WC suspendu, armoire de toilette miroir.' },
      { label: 'Dégagement', ga: '2 / 3 / 3 / 5', surface: '13.3 m²', lumiere: 'Indirecte', oeuvre: 'The Curve', img: '/photos/rez-entree-05.jpg', slot: 'Dégagement', texte: "L'arche de la cuisine vue depuis l'escalier — la circulation fait partie de la visite." },
      { label: 'Cuisine', ga: '1 / 4 / 2 / 7', surface: '14.1 m²', lumiere: 'Est', oeuvre: 'Summer', img: '/photos/rez-cuisine-01.jpg', slot: 'Cuisine', texte: "Îlot plan de travail bois, façades shaker crème, sol en carreaux de ciment à motifs, double four encastré. Les plans ont été dégagés pour la mise en scène." },
      { label: 'Arrière-cuisine', ga: '2 / 5 / 3 / 7', surface: '12.5 m²', lumiere: 'Technique', oeuvre: 'The Wall', img: '/photos/rez-buanderie-01.jpg', slot: 'Arrière-cuisine', texte: 'Buanderie en couloir, plan de travail bois, rangements ouverts et sortie de service — invisible depuis les pièces de vie.' },
      { label: 'Séjour', ga: '3 / 1 / 5 / 4', surface: '31.0 m²', lumiere: 'Sud, généreuse', oeuvre: 'The Blue', img: '/photos/rez-salon-02.jpg', slot: 'Séjour', texte: "Baies plein sud, double porte vitrée bois vers la salle à manger. Canapé lin, tapis jute, tables gigognes noyer et deux toiles bleues pour tenir le grand mur." },
      { label: 'Salle à manger', ga: '3 / 4 / 5 / 6', surface: '22.0 m²', lumiere: 'Sud', oeuvre: 'Harmony', img: '/photos/rez-sam-01.jpg', slot: 'Salle à manger', texte: "Table ovale dix couverts, baie coulissante sur la terrasse. Chaises cannage, chemin de table lin et frangipaniers : la pièce est calibrée pour les dîners qui s'étirent." },
      { label: 'Entrée', ga: '3 / 6 / 5 / 7', surface: '14.0 m²', lumiere: 'Sud', oeuvre: 'The Circle', img: '/photos/rez-entree-01.jpg', slot: 'Entrée', texte: "Porte bois massif à imposte vitrée, parquet à bâtons rompus, escalier tournant à départ en volute. L'arrivée donne le ton." },
    ],
  },
  {
    id: 'rooftop',
    nom: 'Le Rooftop',
    lieu: 'Greencreek · Flic en Flac',
    coast: 'flic',
    statut: 'Visite sur demande', // À COMPLÉTER : à vendre / à louer
    prix: 'Prix sur demande', // À COMPLÉTER
    surface: 'Terrasse privative · vue mer', // À COMPLÉTER : surface
    tour: '/visite/?bien=rooftop',
    cover: '/photos/rooftop/terrasse-01.jpg',
    desc: 'Dernier étage du domaine Greencreek, résidence à piscine à débordement. Terrasse privative en deck bois, vue frontale sur la montagne et sur l’océan.',
    specs: ['3 chambres', 'Terrasse privative', 'Vue mer', 'Piscine de résidence'],
    oeuvre: 'Serenity of Motion',
    oeuvreImg: A + '2299225_1_l.jpg',
    slot: 'Le Rooftop — terrasse privative',
    pieces: [
      { label: 'Terrasse', ga: '1 / 1 / 3 / 4', surface: 'Privative', lumiere: 'Plein ciel', oeuvre: 'Sunset Silhouettes', img: '/photos/rooftop/terrasse-01.jpg', slot: 'Terrasse rooftop', texte: 'Deck bois, salon bas et table dix couverts. À l’ouest, la montagne ; au-delà, l’océan. C’est ici que le bien se vend.' },
      { label: 'Séjour', ga: '1 / 4 / 3 / 7', surface: 'Traversant', lumiere: 'Ouest', oeuvre: 'The Blue', img: '/photos/rooftop/salon-01.jpg', slot: 'Séjour du penthouse', texte: 'Claustra-bibliothèque en séparation, canapé d’angle, suspensions design et triptyque au mur. Le bleu nuit du mur d’accent répond au ciel.' },
      { label: 'Cuisine', ga: '3 / 1 / 4 / 3', surface: 'Ouverte', lumiere: 'Nord', oeuvre: 'Blue Bubble', img: '/photos/rooftop/cuisine-02.jpg', slot: 'Cuisine ouverte', texte: 'Linéaire laqué, plan quartz, plaque induction et colonne Bosch. Sortie directe sur le balcon.' },
      { label: 'Chambre principale', ga: '3 / 3 / 5 / 5', surface: 'Vue mer', lumiere: 'Est', oeuvre: 'Whispers of Pink', img: '/photos/rooftop/chambre1-01.jpg', slot: 'Suite principale', texte: 'Papier peint graphique, tête de lit capitonnée, baie toute hauteur sur la végétation et la mer.' },
      { label: 'Chambre 2', ga: '3 / 5 / 4 / 7', surface: 'Accès balcon', lumiere: 'Est', oeuvre: 'Waves', img: '/photos/rooftop/chambre2-01.jpg', slot: 'Deuxième chambre', texte: 'Chambre double avec accès balcon, camaïeu de gris et de blancs.' },
      { label: 'Chambre 3', ga: '4 / 5 / 5 / 7', surface: '—', lumiere: 'Sud', oeuvre: 'Whispers of Pink', img: '/photos/rooftop/chambre3-01.jpg', slot: 'Troisième chambre', texte: 'Camaïeu rose poudré, rosaces murales en fibre tressée.' },
      { label: 'La résidence', ga: '4 / 1 / 5 / 3', surface: 'Commune', lumiere: 'Plein soleil', oeuvre: 'Deep Blue', img: '/photos/rooftop/residence-02.jpg', slot: 'Piscine de la résidence', texte: 'Piscine à débordement bordée de jardins paysagés, façades bois et pierre, bassin miroir en entrée.' },
    ],
  },
  {
    id: 'townhouse',
    nom: 'Le Town House',
    lieu: 'Jardin d’Anna · Flic en Flac',
    coast: 'flic',
    statut: 'Visite sur demande', // À COMPLÉTER : à vendre / à louer
    prix: 'Prix sur demande', // À COMPLÉTER
    surface: 'Duplex · terrasse de plain-pied', // À COMPLÉTER : surface
    tour: '/visite/?bien=townhouse',
    cover: '/photos/townhouse/terrasse-01.jpg',
    desc: 'Duplex du domaine Jardin d’Anna, séjour traversant sur cuisine ouverte et terrasse de plain-pied sous pergola, ouverte sur le jardin paysagé.',
    specs: ['Duplex', 'Terrasse sous pergola', 'Jardin paysagé', 'Escalier pierre'],
    oeuvre: 'Earth Vision',
    oeuvreImg: A + '2299255_1_l.jpg',
    slot: 'Le Town House — terrasse sous pergola',
    pieces: [
      { label: 'Séjour', ga: '1 / 1 / 3 / 4', surface: 'Traversant', lumiere: 'Ouest', oeuvre: 'Feeling Flow', img: '/photos/townhouse/salon-02.jpg', slot: 'Séjour du duplex', texte: 'Volume traversant, sol travertin, murs vert-de-gris. Le regard va du canapé jusqu’à l’escalier sans rencontrer de cloison.' },
      { label: 'Cuisine', ga: '1 / 4 / 3 / 7', surface: 'Ouverte', lumiere: 'Nord', oeuvre: 'Summer', img: '/photos/townhouse/cuisine-01.jpg', slot: 'Cuisine ouverte', texte: 'Plan granit noir, plaque gaz, hotte inox et four encastré. Elle prolonge le séjour plutôt que de s’en séparer.' },
      { label: 'Escalier', ga: '3 / 1 / 5 / 2', surface: '—', lumiere: 'Zénithale', oeuvre: 'The Curve', img: '/photos/townhouse/escalier-01.jpg', slot: 'Escalier intérieur', texte: 'Marches en pierre claire, garde-corps verre, main courante bois. Un seul mur libre, une seule accroche.' },
      { label: 'Chambre', ga: '3 / 2 / 5 / 4', surface: '—', lumiere: 'Est', oeuvre: 'Passion Palette', img: '/photos/townhouse/chambre-01.jpg', slot: 'Chambre du duplex', texte: 'Frise géométrique en tête de lit, tête de lit tissu, palette claire.' },
      { label: 'Salle d’eau', ga: '3 / 4 / 5 / 5', surface: '—', lumiere: 'Jalousie', oeuvre: 'The Blue', img: '/photos/townhouse/sde-01.jpg', slot: 'Salle d’eau', texte: 'Vasque posée sur plan pierre, WC suspendu, jalousie ventilée.' },
      { label: 'Terrasse jardin', ga: '3 / 5 / 5 / 7', surface: 'Plain-pied', lumiere: 'Plein sud', oeuvre: 'Rise Like a Sun', img: '/photos/townhouse/terrasse-01.jpg', slot: 'Terrasse sous pergola', texte: 'Pergola bois, table teck, haie taillée et palmiers. De plain-pied avec le séjour — la terrasse est une pièce de plus.' },
    ],
  },
  {
    id: 'tamarin',
    nom: 'L’Appartement',
    lieu: 'Tamarin',
    coast: 'tamarin',
    statut: 'Visite sur demande', // À COMPLÉTER : à vendre / à louer
    prix: 'Prix sur demande', // À COMPLÉTER
    surface: 'Duplex · piscine privative', // À COMPLÉTER : surface
    tour: '/visite/?bien=tamarin',
    cover: '/photos/tamarin/piscine-01.jpg',
    desc: 'Duplex de plain-pied à Tamarin, séjour ouvert sur une terrasse couverte et sa piscine privative. Trois chambres, dont une suite sous grande hauteur.',
    specs: ['3 chambres', 'Piscine privative', 'Terrasse couverte', 'Résidence paysagée'],
    oeuvre: 'Deep Blue Lagoon',
    oeuvreImg: A + '2299265_1_l.jpg',
    slot: 'L’Appartement — piscine privative',
    pieces: [
      { label: 'Piscine', ga: '1 / 1 / 3 / 4', surface: 'Privative', lumiere: 'Plein soleil', oeuvre: 'Deep Blue', img: '/photos/tamarin/piscine-01.jpg', slot: 'Piscine privative', texte: 'Bassin à margelle basalte, deck carrelé, haie taillée jusqu’au regard : la piscine est à l’appartement, pas à la résidence.' },
      { label: 'Terrasse', ga: '1 / 4 / 3 / 7', surface: 'Couverte', lumiere: 'Abritée', oeuvre: 'Rise Like a Sun', img: '/photos/tamarin/terrasse-01.jpg', slot: 'Terrasse couverte', texte: 'Table huit couverts et barbecue sous dalle, claustra bois en fond. On y mange toute l’année.' },
      { label: 'Séjour', ga: '3 / 1 / 4 / 3', surface: 'Traversant', lumiere: 'Ouest', oeuvre: 'The Blue', img: '/photos/tamarin/salon-01.jpg', slot: 'Séjour', texte: 'Baie coulissante sur toute la largeur : le séjour, la terrasse et le bassin ne font qu’un seul volume.' },
      { label: 'Cuisine', ga: '3 / 3 / 5 / 5', surface: 'En L', lumiere: 'Nord', oeuvre: 'Summer', img: '/photos/tamarin/cuisine-01.jpg', slot: 'Cuisine', texte: 'Façades bois et laque, four et micro-ondes encastrés, plan traversant. La table de six est dans la cuisine, pas à côté.' },
      { label: 'Entrée', ga: '3 / 5 / 4 / 7', surface: '—', lumiere: 'Zénithale', oeuvre: 'The Curve', img: '/photos/tamarin/entree-01.jpg', slot: 'Entrée et escalier', texte: 'Claustra bois toute hauteur devant l’escalier : l’entrée sépare sans fermer, et laisse passer la lumière.' },
      { label: 'Chambre principale', ga: '4 / 5 / 5 / 7', surface: 'Suite', lumiere: 'Est', oeuvre: 'Breath of Light', img: '/photos/tamarin/chambre1-01.jpg', slot: 'Suite principale', texte: 'Sous grande hauteur, tête de lit velours, ventilateur de plafond et accès direct à la terrasse.' },
      { label: 'Chambres 2 & 3', ga: '4 / 1 / 5 / 3', surface: '2 chambres', lumiere: 'Sud', oeuvre: 'The 7 Hearts', img: '/photos/tamarin/chambre3-01.jpg', slot: 'Chambres', texte: 'Une chambre double en teck massif et une chambre à lits jumeaux — la configuration qui fait vendre en location familiale.' },
    ],
  },
]

export const TOILES = [
  { id: 'summer', titre: 'Summer', meta: 'Huile · 2025 · 120 × 120 × 3 cm', badge: '€2 900', img: 'https://www.julianahaggoo.art/images/summer.png', note: "Un été mauricien réduit à ses masses : chaleur, sable, un bleu qui coupe. Format carré, très présent au-dessus d'un canapé bas." },
  { id: 'theblue', titre: 'The Blue', meta: 'Huile · 2025 · 120 × 120 cm', badge: 'Vendu', img: 'https://www.julianahaggoo.art/images/the_blue.png', note: "Le bleu-signature de Juliana, posé au couteau en couches denses. Cette toile a longtemps tenu le mur d'un living à Flic en Flac." },
  { id: 'thered', titre: 'The Red', meta: 'Huile · 2025 · 130 × 130 cm', badge: 'Vendu', img: "uploads/Capture d'écran 2026-08-02 à 19.21.40.png", note: 'Le pendant rouge de The Blue : disques de rouge posés au couteau, dense au bord et respirant à gauche — même matière, température opposée.' },
  { id: 'serenity', titre: 'Serenity of Motion', meta: 'Huile · 2025 · 130 × 130 cm', badge: '€3 800', img: A + '2299225_1_l.jpg', note: "Le mouvement retenu juste avant qu'il ne devienne geste. Une pièce qui apaise un grand volume sans l'écraser." },
  { id: 'shadows', titre: 'Blue Shadows', meta: 'Huile · 2024 · 100 × 100 cm', badge: '€2 400', img: A + '2299265_1_l.jpg', note: "Bleu profond sur fond noir, formes superposées et textures riches : le contraste attire l'œil et tient un mur à lui seul." },
  { id: 'pink', titre: 'Whispers of Pink', meta: 'Huile · 2024 · 100 × 100 cm', badge: '€2 200', img: A + '2299234_1_l.jpg', note: 'Rose poudré et blancs cassés — la toile qui réchauffe une pièce entièrement claire.' },
  { id: 'sunset', titre: 'Sunset Silhouettes', meta: 'Huile · 2023 · 100 × 100 cm', badge: '€2 300', img: A + '2179467_1_l.jpg', note: 'Les silhouettes du couchant sur le lagon, ramenées à quelques masses sombres et un fond incandescent.' },
  { id: 'passion', titre: 'Passion Palette', meta: 'Huile · 2023 · 150 × 200 cm', badge: '€6 700', img: A + '2180780_1_l.jpg', note: "Le plus grand format de l'atelier. Rouges profonds, matière épaisse — une œuvre qui décide de la pièce entière." },
  { id: 'earth', titre: 'Earth Vision', meta: 'Huile · 2025 · 100 × 65 cm', badge: '€2 600', img: A + '2299255_1_l.jpg', note: 'Une sphère, deux visages. Entre illusion et réalité, la Terre et l’humain se reflètent.' },
  { id: 'circle', titre: 'The Circle', meta: 'Huile · 2012 · 100 × 100 cm', badge: '€2 100', img: A + '2288538_1_l.jpg', note: 'Une des premières toiles au couteau : le cercle comme centre de gravité de la composition.' },
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

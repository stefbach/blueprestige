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

export const FILTRES = [
  { key: 'all', label: 'Tous' },
  { key: 'flic', label: 'Flic en Flac' },
  { key: 'tamarin', label: 'Tamarin' },
]

export const BIENS = [
  {
    id: 'lagon',
    nom: 'Villa Lagon Bleu',
    lieu: 'Flic en Flac',
    coast: 'flic',
    statut: 'À vendre',
    prix: 'MUR 42 000 000',
    surface: '320 m² · 780 m² de terrain',
    desc: "Pieds dans l'eau, façade blanche et volumes ouverts sur le lagon. Les couchers de soleil y entrent jusqu'au fond du salon.",
    specs: ['4 chambres', '4 salles de bain', '320 m²', 'Piscine à débordement'],
    oeuvre: 'Blue Shadows',
    oeuvreImg: A + '2299265_1_l.jpg',
    slot: 'Villa Lagon Bleu — façade sur lagon',
    pieces: [
      { label: 'Salon', ga: '1 / 1 / 3 / 4', surface: '62 m²', lumiere: 'Ouest, dorée à 17 h', oeuvre: 'Deep Blue Lagoon', slot: 'Salon ouvert sur le lagon', texte: "Un seul volume de 62 m² qui glisse vers la terrasse. Mobilier bas, textiles écrus, une toile bleue pour tenir le mur du fond : tout est calibré pour que le regard aille jusqu'à l'eau sans rencontrer d'obstacle." },
      { label: 'Cuisine', ga: '1 / 4 / 2 / 7', surface: '24 m²', lumiere: 'Nord, constante', oeuvre: 'Blue Shadows', slot: 'Cuisine ouverte', texte: "Îlot central en basalte local, façades laquées blanches. La lumière du nord ne bouge pas de la journée — idéale pour cuisiner, parfaite pour photographier." },
      { label: 'Suite principale', ga: '2 / 4 / 4 / 6', surface: '38 m²', lumiere: 'Est, douce au réveil', oeuvre: 'Breath of Light', slot: 'Suite principale', texte: "Lit face à la baie vitrée, dressing dissimulé, salle de bain en enfilade. On a retiré deux cloisons pour laisser le matin traverser la pièce." },
      { label: 'Terrasse', ga: '3 / 1 / 5 / 4', surface: '75 m²', lumiere: 'Plein ouest', oeuvre: 'Sunset Silhouettes', slot: 'Terrasse et piscine', texte: "Deck en teck, piscine à débordement alignée sur l'horizon. C'est ici que la maison se vend : à 18 h, le lagon et la piscine ne font plus qu'une seule surface." },
      { label: 'Chambre 2', ga: '4 / 4 / 5 / 6', surface: '19 m²', lumiere: 'Est', oeuvre: 'Waves', slot: 'Deuxième chambre', texte: "Chambre d'amis pensée en camaïeu de blancs, une seule œuvre au mur pour donner le ton." },
      { label: 'Patio', ga: '2 / 6 / 5 / 7', surface: '12 m²', lumiere: 'Zénithale', oeuvre: 'Earth Vision', slot: 'Patio végétal', texte: "Un puits de lumière planté de fougères, respiration entre les chambres et le séjour." },
    ],
  },
  {
    id: 'tamarin',
    nom: 'Kaz Tamarin',
    lieu: 'Tamarin',
    coast: 'tamarin',
    statut: 'À vendre',
    prix: 'MUR 28 500 000',
    surface: '245 m² · vue montagne',
    desc: 'Sur les hauteurs de Tamarin, entre vagues sauvages et collines dorées. Une maison créole revisitée, murs chaulés et bois brut.',
    specs: ['3 chambres', '2 salles de bain', '245 m²', 'Vue Montagne du Rempart'],
    oeuvre: 'Earth Vision',
    oeuvreImg: A + '2299255_1_l.jpg',
    slot: 'Kaz Tamarin — vue collines',
    pieces: [
      { label: 'Séjour', ga: '1 / 1 / 3 / 4', surface: '48 m²', lumiere: 'Sud-ouest', oeuvre: 'The Dark and Light', slot: 'Séjour créole revisité', texte: "Charpente apparente, sol en pierre claire, cheminée conservée. On a chaulé les murs pour que la lumière de fin de journée s'y accroche." },
      { label: 'Cuisine d’été', ga: '1 / 4 / 2 / 7', surface: '22 m²', lumiere: 'Est', oeuvre: 'Feeling Flow', slot: "Cuisine d'été", texte: "Ouverte sur le jardin, plan de travail en béton ciré, four à bois. Elle prolonge la table plutôt que de s'en séparer." },
      { label: 'Suite', ga: '2 / 4 / 4 / 6', surface: '31 m²', lumiere: 'Nord-est', oeuvre: 'Serenity of Motion', slot: 'Suite avec vue montagne', texte: "La fenêtre cadre exactement la Montagne du Rempart : on a déplacé le lit pour que ce soit la première chose que l'on voie." },
      { label: 'Jardin', ga: '3 / 1 / 5 / 4', surface: '410 m²', lumiere: 'Plein sud', oeuvre: 'Rise Like a Sun', slot: 'Jardin et manguiers', texte: "Manguiers centenaires, douche extérieure, coin feu. Aucun vis-à-vis, un seul bruit : les vagues de Tamarin Bay." },
      { label: 'Atelier', ga: '4 / 4 / 5 / 7', surface: '26 m²', lumiere: 'Nord, égale', oeuvre: 'Passion Palette', slot: 'Atelier / bureau', texte: 'Ancienne dépendance transformée en atelier — lumière du nord, sol brut, deux murs libres pour accrocher.' },
      { label: 'Mezzanine', ga: '2 / 6 / 4 / 7', surface: '18 m²', lumiere: 'Ouest', oeuvre: 'Nightfall', slot: 'Mezzanine lecture', texte: 'Une plateforme de bois suspendue au-dessus du séjour, pour lire à hauteur de charpente.' },
    ],
  },
  {
    id: 'sunset',
    nom: 'Penthouse Sunset',
    lieu: 'Flic en Flac',
    coast: 'flic',
    statut: 'Location saisonnière',
    prix: 'MUR 12 500 / nuit',
    surface: '180 m² · dernier étage',
    desc: 'Dernier étage, terrasse plein ciel, vue frontale sur le coucher de soleil. Meublé et scénographié pièce par pièce.',
    specs: ['3 chambres', '3 salles de bain', '180 m²', 'Rooftop privatif'],
    oeuvre: 'Serenity of Motion',
    oeuvreImg: A + '2299225_1_l.jpg',
    slot: 'Penthouse Sunset — rooftop',
    pieces: [
      { label: 'Living', ga: '1 / 1 / 3 / 4', surface: '54 m²', lumiere: 'Ouest, spectaculaire', oeuvre: 'The Blue', slot: 'Living du penthouse', texte: "Baies coulissantes sur toute la longueur. Palette blanc-lin, une seule toile bleue au mur : le reste de la couleur vient du ciel." },
      { label: 'Rooftop', ga: '1 / 4 / 3 / 7', surface: '90 m²', lumiere: 'Plein ciel', oeuvre: 'Sunset Silhouettes', slot: 'Rooftop et bassin', texte: "Bassin en inox, banquettes basses, éclairage rasant. Conçu pour l'heure bleue plus que pour midi." },
      { label: 'Suite', ga: '3 / 1 / 5 / 3', surface: '34 m²', lumiere: 'Sud-ouest', oeuvre: 'Sensuality', slot: 'Suite du penthouse', texte: 'Tête de lit en cannage, lin lavé, occultants intégrés. On dort au calme malgré la façade entièrement vitrée.' },
      { label: 'Cuisine', ga: '3 / 3 / 4 / 5', surface: '20 m²', lumiere: 'Nord', oeuvre: 'Blue Bubble', slot: 'Cuisine du penthouse', texte: 'Cuisine fermée par une verrière noire, pour cuisiner sans rompre la ligne du séjour.' },
      { label: 'Chambre 2', ga: '4 / 3 / 5 / 5', surface: '17 m²', lumiere: 'Est', oeuvre: 'Whispers of Pink', slot: 'Deuxième chambre', texte: 'Deux lits jumeaux, rangements sur mesure, une œuvre rose pâle pour réchauffer les blancs.' },
      { label: 'Entrée', ga: '3 / 5 / 5 / 7', surface: '14 m²', lumiere: 'Indirecte', oeuvre: 'The Curve', slot: 'Entrée galerie', texte: "Un couloir traité comme une galerie : mur sombre, trois accroches, lumière rasante. L'arrivée fait déjà partie de la visite." },
    ],
  },
  {
    id: 'bayview',
    nom: 'Villa Bay View',
    lieu: 'Tamarin',
    coast: 'tamarin',
    statut: 'À louer',
    prix: 'MUR 180 000 / mois',
    surface: '290 m² · accès plage',
    desc: 'À deux pas de la baie, une villa contemporaine aux lignes nettes, pensée pour les longues locations familiales.',
    specs: ['4 chambres', '3 salles de bain', '290 m²', 'Accès plage privé'],
    oeuvre: 'Sunset Silhouettes',
    oeuvreImg: A + '2179467_1_l.jpg',
    slot: 'Villa Bay View — piscine',
    pieces: [
      { label: 'Séjour', ga: '1 / 1 / 3 / 4', surface: '58 m²', lumiere: 'Ouest', oeuvre: 'Waves', slot: 'Séjour Bay View', texte: "Double hauteur, sol en travertin, canapés en profondeur. Un grand format bleu-vert répond à la ligne d'horizon." },
      { label: 'Salle à manger', ga: '1 / 4 / 2 / 7', surface: '26 m²', lumiere: 'Nord-ouest', oeuvre: 'Harmony', slot: 'Salle à manger', texte: "Table de dix en manguier massif, suspensions en rotin. Pensée pour les dîners qui s'étirent." },
      { label: 'Suite parentale', ga: '2 / 4 / 4 / 6', surface: '40 m²', lumiere: 'Est', oeuvre: 'Breath of Light', slot: 'Suite parentale', texte: 'Aile séparée, salle de bain ouverte sur un patio privé, douche à ciel ouvert.' },
      { label: 'Piscine', ga: '3 / 1 / 5 / 4', surface: '68 m²', lumiere: 'Plein soleil', oeuvre: 'Deep Blue', slot: 'Piscine et pool house', texte: 'Bassin de 12 mètres bordé de filaos, pool house ombragé. Le bleu de l’eau a été choisi au plus proche de celui du lagon.' },
      { label: 'Chambres enfants', ga: '4 / 4 / 5 / 7', surface: '2 × 16 m²', lumiere: 'Sud-est', oeuvre: 'The 7 Hearts', slot: 'Chambres enfants', texte: 'Deux chambres jumelles reliées par une salle de jeux, rangements bas et murs clairs.' },
      { label: 'Buanderie', ga: '2 / 6 / 4 / 7', surface: '11 m²', lumiere: 'Technique', oeuvre: 'The Wall', slot: 'Espace de service', texte: 'Espace de service complet, indispensable en location longue durée — invisible depuis les pièces de vie.' },
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
}

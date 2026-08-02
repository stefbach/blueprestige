/**
 * Manifeste de la visite photo.
 *
 * La visite se fait sur les VRAIES photos du bien — pas sur un modèle reconstitué.
 * Chaque entrée pointe un fichier de `public/photos/`.
 *
 * `staged` désigne, quand elle existe, la version remise en scène de la même vue
 * (`public/photos/staged/`) : c'est elle qui alimente le comparateur avant/après.
 *
 * `room` fait le lien avec le plan (`src/villa/plan.js`) : cliquer une pièce du
 * plan amène aux photos correspondantes.
 */

export const TOUR = [
  // ─── Extérieur ──────────────────────────────────────────────────
  {
    id: 'exterieur',
    room: null,
    level: 0,
    titre: 'Façade et jardin',
    photos: [
      { file: 'ext-facade-01.jpg', caption: 'Façade sur jardin — deux niveaux, balcon filant, double porte d’entrée en bois sous auvent' },
      { file: 'ext-jardin-01.jpg', caption: 'Jardin clos engazonné, muret surmonté d’une clôture bois' },
      { file: 'ext-terrasse-01.jpg', caption: 'Terrasse de service — deck bois, store banne, évier extérieur' },
      { file: 'ext-escalier-01.jpg', caption: 'Escalier extérieur desservant l’étage de façon indépendante' },
    ],
  },

  // ─── Rez-de-chaussée ────────────────────────────────────────────
  {
    id: 'entree',
    room: 'entree',
    level: 0,
    titre: 'Entrée et escalier',
    photos: [
      { file: 'rez-entree-01.jpg', caption: 'Hall d’entrée — porte en bois massif à imposte vitrée, parquet à bâtons rompus' },
      { file: 'rez-entree-02.jpg', caption: 'Escalier bois vu du palier, départ à volute sur le hall' },
      { file: 'rez-entree-03.jpg', caption: 'Porte coulissante à galandage et arche vers l’escalier' },
      { file: 'rez-entree-04.jpg', caption: 'Depuis la salle à manger : la porte à galandage ouverte sur la circulation' },
      { file: 'rez-entree-05.jpg', caption: 'Vue plongeante de l’escalier vers la cuisine à travers l’arche' },
    ],
  },
  {
    id: 'salon',
    room: 'salon',
    level: 0,
    titre: 'Séjour',
    photos: [
      { file: 'rez-salon-01.jpg', caption: 'Séjour — canapé d’angle, double porte vitrée en bois, ouverture sur la salle à manger' },
      { file: 'rez-salon-02.jpg', caption: 'Baies vitrées plein sud et coin télévision', staged: 'rez-salon-02.jpg' },
      { file: 'rez-salon-03.jpg', caption: 'Le séjour depuis l’angle opposé' },
    ],
  },
  {
    id: 'sam',
    room: 'sam',
    level: 0,
    titre: 'Salle à manger',
    photos: [
      { file: 'rez-sam-01.jpg', caption: 'Salle à manger — table ovale dix couverts, baie sur le jardin, entrée à droite', staged: 'rez-sam-01.jpg' },
      { file: 'rez-sam-02.jpg', caption: 'Table en bois massif et enfilade vers le séjour' },
      { file: 'rez-sam-03.jpg', caption: 'Baie coulissante sur la terrasse et le salon de jardin' },
      { file: 'rez-sam-04.jpg', caption: 'Large ouverture cadrée bois sur la cuisine' },
    ],
  },
  {
    id: 'cuisine',
    room: 'cuisine',
    level: 0,
    titre: 'Cuisine',
    photos: [
      { file: 'rez-cuisine-01.jpg', caption: 'Îlot central plan de travail bois, trois tabourets, double four encastré' },
      { file: 'rez-cuisine-02.jpg', caption: 'Façades shaker crème, crédence et sol en carreaux à motifs, plaque gaz' },
    ],
  },
  {
    id: 'chambre0',
    room: 'chambre0',
    level: 0,
    titre: 'Chambre du rez',
    photos: [
      { file: 'rez-chambre-01.jpg', caption: 'Chambre avec espace bureau, climatiseur et store bateau' },
    ],
  },
  {
    id: 'buanderie',
    room: 'buanderie',
    level: 0,
    titre: 'Arrière-cuisine',
    photos: [
      { file: 'rez-buanderie-01.jpg', caption: 'Buanderie — plan de travail bois, rangements ouverts, sortie de service' },
    ],
  },

  // ─── Étage ──────────────────────────────────────────────────────
  {
    id: 'salon1',
    room: 'salon1',
    level: 1,
    titre: 'Salon d’étage',
    photos: [
      { file: 'etage-salon-01.jpg', caption: 'Plafond cathédrale, pignon vitré, baie coulissante sur la terrasse', staged: 'etage-salon-01.jpg' },
      { file: 'etage-salon-02.jpg', caption: 'Le salon vers la trémie et l’arrivée de l’escalier' },
    ],
  },
  {
    id: 'terrasse1',
    room: 'terrasse1',
    level: 1,
    titre: 'Terrasse',
    photos: [
      { file: 'etage-terrasse-01.jpg', caption: 'Grande terrasse carrelée, vue dégagée sur la végétation et la montagne' },
    ],
  },
  {
    id: 'chambre1',
    room: 'chambre1',
    level: 1,
    titre: 'Chambre 2',
    photos: [
      { file: 'etage-chambre2-01.jpg', caption: 'Baie coulissante sur balcon, parquet chêne, suspension en rotin', staged: 'etage-chambre2-01.jpg' },
    ],
  },
  {
    id: 'chambre2',
    room: 'chambre2',
    level: 1,
    titre: 'Chambre 3',
    photos: [
      { file: 'etage-chambre3-01.jpg', caption: 'Armoire et commode en bois massif, sous rampant' },
    ],
  },
  {
    id: 'chambre3',
    room: 'chambre3',
    level: 1,
    titre: 'Chambre 4',
    photos: [
      { file: 'etage-chambre4-01.jpg', caption: 'Armoire, miroir psyché et grande porte en bois' },
    ],
  },
  {
    id: 'chambre4',
    room: null,
    level: 1,
    titre: 'Chambre 5',
    photos: [
      { file: 'etage-chambre5-01.jpg', caption: 'Chambre sous rampant, climatiseur, chevets de part et d’autre' },
    ],
  },
  {
    id: 'sdb1',
    room: 'sdb1',
    level: 1,
    titre: 'Salle de bains',
    photos: [
      { file: 'etage-sdb-01.jpg', caption: 'Carrelage grand format effet marbre, baignoire et douche à l’italienne' },
    ],
  },
  {
    id: 'sde1',
    room: 'sde1',
    level: 1,
    titre: 'Salle d’eau',
    photos: [
      { file: 'etage-sde-01.jpg', caption: 'Douche paroi verre, WC suspendu, armoire de toilette miroir' },
    ],
  },

  // ─── Seconde unité ──────────────────────────────────────────────
  // Murs blancs, menuiseries métal noir, parquet foncé : ce salon ne correspond
  // à aucune pièce du corps principal. Même clôture bois au fond que le jardin,
  // donc même ensemble — vraisemblablement une seconde unité sur la parcelle.
  {
    id: 'annexe',
    room: null,
    level: 0,
    titre: 'Salon — seconde unité',
    photos: [
      { file: 'annexe-salon-01.jpg', caption: 'Grande baie à petits bois métal sur le jardin et le portail' },
      { file: 'annexe-salon-02.jpg', caption: 'Volume traversant, lustre à pampilles, parquet foncé' },
    ],
  },
]

/** Liste à plat, dans l'ordre de la visite. */
export const SEQUENCE = TOUR.flatMap((step) =>
  step.photos.map((p, i) => ({
    ...p,
    stepId: step.id,
    room: step.room,
    level: step.level,
    titre: step.titre,
    indexInStep: i,
    countInStep: step.photos.length,
  }))
)

export const stepById = Object.fromEntries(TOUR.map((s) => [s.id, s]))

/** Premier index de la séquence appartenant à une pièce du plan. */
export function firstIndexForRoom(roomId) {
  return SEQUENCE.findIndex((p) => p.room === roomId)
}

/** Premier index d'une étape. */
export function firstIndexForStep(stepId) {
  return SEQUENCE.findIndex((p) => p.stepId === stepId)
}

export const PHOTO_BASE = '/photos/'
export const STAGED_BASE = '/photos/staged/'

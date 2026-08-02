/**
 * Manifeste de la visite photo.
 *
 * La visite se fait sur les VRAIES photos du bien — pas sur un modèle reconstitué.
 * Chaque entrée pointe un fichier de `public/photos/`. Tant qu'un fichier est
 * absent, la vue affiche un emplacement explicite indiquant la photo attendue,
 * ce qui permet de préparer la scénographie avant que les images soient là.
 *
 * Pour ajouter une photo : déposer le fichier dans `public/photos/` et ajouter
 * une ligne ici. Aucun autre fichier à toucher.
 *
 * `room` fait le lien avec le plan (`src/villa/plan.js`) : cliquer une pièce du
 * plan amène aux photos correspondantes.
 */

export const TOUR = [
  // ─── Extérieur ──────────────────────────────────────────────────
  {
    id: 'facade',
    room: null,
    level: 0,
    titre: 'Façade jardin',
    photos: [
      { file: 'ext-facade-01.jpg', caption: 'Façade sur jardin — deux niveaux, balcon filant, double porte d’entrée sous auvent' },
      { file: 'ext-jardin-01.jpg', caption: 'Pelouse, arbres fruitiers et muret surmonté d’une clôture bois' },
      { file: 'ext-jardin-02.jpg', caption: 'Terrasse dallée et jardin clos' },
    ],
  },
  {
    id: 'exterieur-service',
    room: null,
    level: 0,
    titre: 'Accès et terrasse de service',
    photos: [
      { file: 'ext-escalier-01.jpg', caption: 'Escalier extérieur desservant l’étage' },
      { file: 'ext-terrasse-01.jpg', caption: 'Terrasse carrelée, deck bois, store banne et évier extérieur' },
    ],
  },

  // ─── Rez-de-chaussée ────────────────────────────────────────────
  {
    id: 'entree',
    room: 'entree',
    level: 0,
    titre: 'Entrée et escalier',
    photos: [
      { file: 'rez-entree-01.jpg', caption: 'Hall d’entrée — porte bois à imposte vitrée, parquet à bâtons rompus' },
      { file: 'rez-entree-02.jpg', caption: 'Escalier tournant vu du palier, départ à volute' },
      { file: 'rez-entree-03.jpg', caption: 'Arche vers la cuisine et porte coulissante à galandage' },
    ],
  },
  {
    id: 'salon',
    room: 'salon',
    level: 0,
    titre: 'Séjour',
    photos: [
      { file: 'rez-salon-01.jpg', caption: 'Séjour — canapé d’angle, double porte vitrée bois vers la salle à manger' },
      { file: 'rez-salon-02.jpg', caption: 'Baies vitrées plein sud et coin télévision' },
    ],
  },
  {
    id: 'sam',
    room: 'sam',
    level: 0,
    titre: 'Salle à manger',
    photos: [
      { file: 'rez-sam-01.jpg', caption: 'Table ovale en bois massif, dix couverts' },
      { file: 'rez-sam-02.jpg', caption: 'Baie coulissante sur la terrasse et le jardin' },
      { file: 'rez-sam-03.jpg', caption: 'Ouverture cadrée bois sur la cuisine' },
    ],
  },
  {
    id: 'cuisine',
    room: 'cuisine',
    level: 0,
    titre: 'Cuisine',
    photos: [
      { file: 'rez-cuisine-01.jpg', caption: 'Îlot central plan de travail bois, trois tabourets' },
      { file: 'rez-cuisine-02.jpg', caption: 'Façades shaker crème, crédence et sol en carreaux à motifs' },
      { file: 'rez-cuisine-03.jpg', caption: 'Double four encastré et accès terrasse' },
    ],
  },
  {
    id: 'chambre0',
    room: 'chambre0',
    level: 0,
    titre: 'Chambre du rez',
    photos: [
      { file: 'rez-chambre-01.jpg', caption: 'Chambre avec bureau, climatiseur et store bateau' },
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
      { file: 'etage-salon-01.jpg', caption: 'Plafond cathédrale, pignon vitré, baie coulissante sur la terrasse' },
      { file: 'etage-salon-02.jpg', caption: 'Vue vers la trémie et l’arrivée de l’escalier' },
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
      { file: 'etage-chambre2-01.jpg', caption: 'Baie coulissante sur balcon, parquet chêne, suspension rotin' },
    ],
  },
  {
    id: 'chambre2',
    room: 'chambre2',
    level: 1,
    titre: 'Chambre 3',
    photos: [
      { file: 'etage-chambre3-01.jpg', caption: 'Armoire et commode bois, miroir psyché' },
      { file: 'etage-chambre3-02.jpg', caption: 'Sous rampant, lit double et chevets' },
    ],
  },
  {
    id: 'chambre3',
    room: 'chambre3',
    level: 1,
    titre: 'Chambre 4',
    photos: [
      { file: 'etage-chambre4-01.jpg', caption: 'Chambre sous rampant, climatiseur mural' },
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

export const PHOTO_BASE = 'photos/'

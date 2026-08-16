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
 *
 * Titres et légendes sont bilingues (`{ fr, en }`), résolus à l'affichage par
 * `L()` — voir `src/i18n.js`.
 */

export const TOUR = [
  // ─── Extérieur ──────────────────────────────────────────────────
  {
    id: 'exterieur',
    room: null,
    level: 0,
    titre: { fr: 'Façade et jardin', en: 'Frontage and garden' },
    photos: [
      {
        file: 'ext-facade-01.jpg',
        caption: {
          fr: 'Façade sur jardin — deux niveaux, balcon filant, double porte d’entrée en bois sous auvent',
          en: 'Garden frontage — two levels, a running balcony, double timber entrance doors under a canopy',
        },
      },
      {
        file: 'ext-jardin-01.jpg',
        caption: {
          fr: 'Jardin clos engazonné, muret surmonté d’une clôture bois',
          en: 'Enclosed lawned garden, low wall topped with a timber fence',
        },
      },
      {
        file: 'ext-terrasse-01.jpg',
        caption: {
          fr: 'Terrasse de service — deck bois, store banne, évier extérieur',
          en: 'Service terrace — timber deck, retractable awning, outdoor sink',
        },
      },
      {
        file: 'ext-escalier-01.jpg',
        caption: {
          fr: 'Escalier extérieur desservant l’étage de façon indépendante',
          en: 'External staircase serving the upper floor independently',
        },
      },
    ],
  },

  // ─── Rez-de-chaussée ────────────────────────────────────────────
  {
    id: 'entree',
    room: 'entree',
    level: 0,
    titre: { fr: 'Entrée et escalier', en: 'Entrance and staircase' },
    photos: [
      {
        file: 'rez-entree-01.jpg',
        caption: {
          fr: 'Hall d’entrée — porte en bois massif à imposte vitrée, parquet à bâtons rompus',
          en: 'Entrance hall — solid timber door with a glazed transom, herringbone parquet',
        },
        staged: 'rez-entree-01.jpg',
      },
      {
        file: 'rez-entree-02.jpg',
        caption: {
          fr: 'Escalier bois vu du palier, départ à volute sur le hall',
          en: 'Timber staircase seen from the landing, scrolled first step onto the hall',
        },
      },
      {
        file: 'rez-entree-03.jpg',
        caption: {
          fr: 'Porte coulissante à galandage et arche vers l’escalier',
          en: 'Pocket sliding door and arch through to the staircase',
        },
      },
      {
        file: 'rez-entree-04.jpg',
        caption: {
          fr: 'Depuis la salle à manger : la porte à galandage ouverte sur la circulation',
          en: 'From the dining room: the pocket door open onto the circulation',
        },
      },
      {
        file: 'rez-entree-05.jpg',
        caption: {
          fr: 'Vue plongeante de l’escalier vers la cuisine à travers l’arche',
          en: 'Looking down from the staircase towards the kitchen through the arch',
        },
      },
    ],
  },
  {
    id: 'salon',
    room: 'salon',
    level: 0,
    titre: { fr: 'Séjour', en: 'Living room' },
    photos: [
      {
        file: 'rez-salon-01.jpg',
        caption: {
          fr: 'Séjour — canapé d’angle, double porte vitrée en bois, ouverture sur la salle à manger',
          en: 'Living room — corner sofa, double glazed timber doors, opening onto the dining room',
        },
        staged: 'rez-salon-01.jpg',
      },
      {
        file: 'rez-salon-02.jpg',
        caption: {
          fr: 'Baies vitrées plein sud et coin télévision',
          en: 'Full-south glazing and television corner',
        },
        staged: 'rez-salon-02.jpg',
      },
      {
        file: 'rez-salon-03.jpg',
        caption: { fr: 'Le séjour depuis l’angle opposé', en: 'The living room from the opposite corner' },
      },
    ],
  },
  {
    id: 'sam',
    room: 'sam',
    level: 0,
    titre: { fr: 'Salle à manger', en: 'Dining room' },
    photos: [
      {
        file: 'rez-sam-01.jpg',
        caption: {
          fr: 'Salle à manger — table ovale dix couverts, baie sur le jardin, entrée à droite',
          en: 'Dining room — oval table for ten, glazing onto the garden, entrance to the right',
        },
        staged: 'rez-sam-01.jpg',
      },
      {
        file: 'rez-sam-02.jpg',
        caption: {
          fr: 'Table en bois massif et enfilade vers le séjour',
          en: 'Solid timber table and the vista through to the living room',
        },
      },
      {
        file: 'rez-sam-03.jpg',
        caption: {
          fr: 'Baie coulissante sur la terrasse et le salon de jardin',
          en: 'Sliding doors onto the terrace and the garden furniture',
        },
      },
      {
        file: 'rez-sam-04.jpg',
        caption: {
          fr: 'Large ouverture cadrée bois sur la cuisine',
          en: 'Wide timber-framed opening through to the kitchen',
        },
      },
    ],
  },
  {
    id: 'cuisine',
    room: 'cuisine',
    level: 0,
    titre: { fr: 'Cuisine', en: 'Kitchen' },
    photos: [
      {
        file: 'rez-cuisine-01.jpg',
        caption: {
          fr: 'Îlot central plan de travail bois, trois tabourets, double four encastré',
          en: 'Central island with timber worktop, three stools, double built-in oven',
        },
        staged: 'rez-cuisine-01.jpg',
      },
      {
        file: 'rez-cuisine-02.jpg',
        caption: {
          fr: 'Façades shaker crème, crédence et sol en carreaux à motifs, plaque gaz',
          en: 'Cream shaker fronts, patterned splashback and floor tiles, gas hob',
        },
      },
    ],
  },
  {
    id: 'chambre0',
    room: 'chambre0',
    level: 0,
    titre: { fr: 'Chambre du rez', en: 'Ground-floor bedroom' },
    photos: [
      {
        file: 'rez-chambre-01.jpg',
        caption: {
          fr: 'Chambre avec espace bureau, climatiseur et store bateau',
          en: 'Bedroom with a desk area, air conditioning and a Roman blind',
        },
        staged: 'rez-chambre-01.jpg',
      },
    ],
  },
  {
    id: 'buanderie',
    room: 'buanderie',
    level: 0,
    titre: { fr: 'Arrière-cuisine', en: 'Utility kitchen' },
    photos: [
      {
        file: 'rez-buanderie-01.jpg',
        caption: {
          fr: 'Buanderie — plan de travail bois, rangements ouverts, sortie de service',
          en: 'Laundry — timber worktop, open storage, service door',
        },
      },
    ],
  },

  // ─── Étage ──────────────────────────────────────────────────────
  {
    id: 'salon1',
    room: 'salon1',
    level: 1,
    titre: { fr: 'Salon d’étage', en: 'Upstairs sitting room' },
    photos: [
      {
        file: 'etage-salon-01.jpg',
        caption: {
          fr: 'Plafond cathédrale, pignon vitré, baie coulissante sur la terrasse',
          en: 'Cathedral ceiling, glazed gable, sliding doors onto the terrace',
        },
        staged: 'etage-salon-01.jpg',
      },
      {
        file: 'etage-salon-02.jpg',
        caption: {
          fr: 'Le salon vers la trémie et l’arrivée de l’escalier',
          en: 'The sitting room towards the stairwell and the head of the staircase',
        },
      },
    ],
  },
  {
    id: 'terrasse1',
    room: 'terrasse1',
    level: 1,
    titre: { fr: 'Terrasse', en: 'Terrace' },
    photos: [
      {
        file: 'etage-terrasse-01.jpg',
        caption: {
          fr: 'Grande terrasse carrelée, vue dégagée sur la végétation et la montagne',
          en: 'Large tiled terrace, open view over the greenery and the mountain',
        },
        staged: 'etage-terrasse-01.jpg',
      },
    ],
  },
  {
    id: 'chambre1',
    room: 'chambre1',
    level: 1,
    titre: { fr: 'Chambre 2', en: 'Bedroom 2' },
    photos: [
      {
        file: 'etage-chambre2-01.jpg',
        caption: {
          fr: 'Baie coulissante sur balcon, parquet chêne, suspension en rotin',
          en: 'Sliding doors onto the balcony, oak parquet, rattan pendant',
        },
        staged: 'etage-chambre2-01.jpg',
      },
    ],
  },
  {
    id: 'chambre2',
    room: 'chambre2',
    level: 1,
    titre: { fr: 'Chambre 3', en: 'Bedroom 3' },
    photos: [
      {
        file: 'etage-chambre3-01.jpg',
        caption: {
          fr: 'Armoire et commode en bois massif, sous rampant',
          en: 'Solid timber wardrobe and chest of drawers, under the slope',
        },
        staged: 'etage-chambre3-01.jpg',
      },
    ],
  },
  {
    id: 'chambre3',
    room: 'chambre3',
    level: 1,
    titre: { fr: 'Chambre 4', en: 'Bedroom 4' },
    photos: [
      {
        file: 'etage-chambre4-01.jpg',
        caption: {
          fr: 'Armoire, miroir psyché et grande porte en bois',
          en: 'Wardrobe, cheval mirror and a tall timber door',
        },
        staged: 'etage-chambre4-01.jpg',
      },
    ],
  },
  {
    id: 'chambre4',
    room: null,
    level: 1,
    titre: { fr: 'Chambre 5', en: 'Bedroom 5' },
    photos: [
      {
        file: 'etage-chambre5-01.jpg',
        caption: {
          fr: 'Chambre sous rampant, climatiseur, chevets de part et d’autre',
          en: 'Bedroom under the slope, air conditioning, bedside tables either side',
        },
        staged: 'etage-chambre5-01.jpg',
      },
    ],
  },
  {
    id: 'sdb1',
    room: 'sdb1',
    level: 1,
    titre: { fr: 'Salle de bains', en: 'Bathroom' },
    photos: [
      {
        file: 'etage-sdb-01.jpg',
        caption: {
          fr: 'Carrelage grand format effet marbre, baignoire et douche à l’italienne',
          en: 'Large-format marble-effect tiling, bath and walk-in shower',
        },
      },
    ],
  },
  {
    id: 'sde1',
    room: 'sde1',
    level: 1,
    titre: { fr: 'Salle d’eau', en: 'Shower room' },
    photos: [
      {
        file: 'etage-sde-01.jpg',
        caption: {
          fr: 'Douche paroi verre, WC suspendu, armoire de toilette miroir',
          en: 'Glass-screened shower, wall-hung WC, mirrored cabinet',
        },
      },
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
    titre: { fr: 'Salon — seconde unité', en: 'Sitting room — second unit' },
    photos: [
      {
        file: 'annexe-salon-01.jpg',
        caption: {
          fr: 'Grande baie à petits bois métal sur le jardin et le portail',
          en: 'Large steel-framed glazing onto the garden and the gate',
        },
      },
      {
        file: 'annexe-salon-02.jpg',
        caption: {
          fr: 'Volume traversant, lustre à pampilles, parquet foncé',
          en: 'Dual-aspect volume, droplet chandelier, dark parquet',
        },
      },
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

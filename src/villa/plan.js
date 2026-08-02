/**
 * Relevé reconstruit de la villa, en mètres.
 *
 * ⚠️ Ces cotes sont ESTIMÉES à partir des photos, pas mesurées sur site.
 * Elles sont calées sur des références visibles dont la taille est normalisée :
 *   - portes intérieures ~0.80 × 2.05 m
 *   - éléments bas de cuisine 0.60 m de profondeur, 0.90 m de plan de travail
 *   - table de salle à manger ovale 10 places ≈ 2.80 × 1.20 m
 *   - marches d'escalier giron ~0.26 m / hauteur ~0.18 m
 *   - lit double 1.60 × 2.00 m
 * Tolérance réaliste : ±10 % par pièce. Voir docs/releve-villa.md.
 *
 * Repère : X vers l'est, Y vers le nord (en plan), origine à l'angle sud-ouest.
 * La façade sud (Y = 0) est celle du jardin, de la terrasse et de l'entrée.
 */

export const FOOTPRINT = { w: 14.0, d: 10.6 }

export const WALL = 0.1 // demi-épaisseur portée par chaque pièce (cloison = 0.20)

export const LEVELS = [
  {
    id: 0,
    name: 'Rez-de-chaussée',
    base: 0.0,
    height: 2.8,
  },
  {
    id: 1,
    name: 'Étage',
    base: 3.0,
    height: 2.4, // à l'égout ; les pièces sous rampant montent jusqu'à `ridge`
    ridge: 4.2,
  },
]

/**
 * floor : clé de matériau (voir materials.js)
 * ceiling : 'flat' | 'cathedral' | 'open' (terrasse)
 */
export const ROOMS = [
  // ─── Rez-de-chaussée ─────────────────────────────────────────────
  {
    id: 'salon',
    name: 'Salon / séjour TV',
    level: 0,
    x0: 0.1, y0: 0.1, x1: 6.3, y1: 5.1,
    floor: 'parquetFonce', ceiling: 'flat',
    note: 'Canapé d’angle, meuble TV, double porte vitrée bois vers la salle à manger.',
  },
  {
    id: 'sam',
    name: 'Salle à manger',
    level: 0,
    x0: 6.5, y0: 0.1, x1: 10.9, y1: 5.1,
    floor: 'parquetFonce', ceiling: 'flat',
    note: 'Table ovale 10 places, baie coulissante sur terrasse, large baie sur cuisine.',
  },
  {
    id: 'entree',
    name: 'Entrée / escalier',
    level: 0,
    x0: 11.1, y0: 0.1, x1: 13.9, y1: 5.1,
    floor: 'parquetChevrons', ceiling: 'open',
    note: 'Porte d’entrée bois à imposte vitrée, escalier tournant, arche vers la cuisine.',
  },
  {
    id: 'cuisine',
    name: 'Cuisine',
    level: 0,
    x0: 10.1, y0: 5.3, x1: 13.9, y1: 9.0,
    floor: 'carreauxCiment', ceiling: 'flat',
    note: 'Façades shaker crème, îlot plan de travail bois 3 tabourets, double four.',
  },
  {
    id: 'degagement',
    name: 'Dégagement',
    level: 0,
    x0: 6.3, y0: 5.3, x1: 9.9, y1: 9.0,
    floor: 'parquetFonce', ceiling: 'flat',
    note: 'Distribution entre séjour, cuisine, chambre et arrière-cuisine.',
  },
  {
    id: 'chambre0',
    name: 'Chambre 1 (rez)',
    level: 0,
    x0: 0.1, y0: 5.3, x1: 4.1, y1: 10.5,
    floor: 'parquetFonce', ceiling: 'flat',
    note: 'Lit double, bureau, climatiseur mural, store bateau.',
  },
  {
    id: 'sde0',
    name: 'Salle d’eau (rez)',
    level: 0,
    x0: 4.3, y0: 5.3, x1: 6.1, y1: 9.0,
    floor: 'gresPierre', ceiling: 'flat',
    note: 'Douche, WC suspendu, meuble miroir.',
  },
  {
    id: 'buanderie',
    name: 'Arrière-cuisine / buanderie',
    level: 0,
    x0: 4.3, y0: 9.2, x1: 13.9, y1: 10.5,
    floor: 'carreauxCiment', ceiling: 'flat',
    note: 'Lave-linge, plan de travail bois, rangements ouverts, sortie de service.',
  },

  // ─── Étage ────────────────────────────────────────────────────────
  {
    id: 'terrasse1',
    name: 'Terrasse (étage)',
    level: 1,
    x0: 0.1, y0: 0.1, x1: 13.9, y1: 2.4,
    floor: 'carrelageExt', ceiling: 'open',
    outdoor: true,
    note: 'Grande terrasse carrelée, garde-corps métal, vue dégagée sur la montagne.',
  },
  {
    id: 'salon1',
    name: 'Salon d’étage',
    level: 1,
    x0: 0.1, y0: 2.6, x1: 5.5, y1: 7.4,
    floor: 'parquetChene', ceiling: 'cathedral',
    note: 'Plafond cathédrale, pignon vitré, baie coulissante sur terrasse, lustre fer forgé.',
  },
  {
    id: 'palier',
    name: 'Palier',
    level: 1,
    x0: 5.7, y0: 2.6, x1: 8.3, y1: 7.4,
    floor: 'parquetChene', ceiling: 'flat',
    note: 'Trémie et rambarde bois au-dessus du hall d’entrée.',
  },
  {
    id: 'chambre1',
    name: 'Chambre 2',
    level: 1,
    x0: 8.5, y0: 2.6, x1: 13.9, y1: 6.0,
    floor: 'parquetChene', ceiling: 'cathedral',
    note: 'Baie coulissante sur terrasse, armoire et commode bois, suspension rotin.',
  },
  {
    id: 'chambre2',
    name: 'Chambre 3',
    level: 1,
    x0: 8.5, y0: 6.2, x1: 13.9, y1: 10.5,
    floor: 'parquetChene', ceiling: 'cathedral',
    note: 'Armoire, miroir psyché, climatiseur mural.',
  },
  {
    id: 'chambre3',
    name: 'Chambre 4',
    level: 1,
    x0: 0.1, y0: 7.6, x1: 4.1, y1: 10.5,
    floor: 'parquetChene', ceiling: 'cathedral',
    note: 'Chevets de part et d’autre, fenêtre haute, climatiseur.',
  },
  {
    id: 'sdb1',
    name: 'Salle de bains',
    level: 1,
    x0: 4.3, y0: 7.6, x1: 6.3, y1: 10.5,
    floor: 'gresBlanc', ceiling: 'flat',
    note: 'Carrelage grand format effet marbre, baignoire + douche à l’italienne.',
  },
  {
    id: 'sde1',
    name: 'Salle d’eau (étage)',
    level: 1,
    x0: 6.5, y0: 7.6, x1: 8.3, y1: 10.5,
    floor: 'gresPierre', ceiling: 'flat',
    note: 'Douche paroi verre, WC suspendu, armoire de toilette miroir.',
  },
]

/**
 * Ouvertures. `axis: 'x'` = mur horizontal (plan) situé à Y = `at`.
 *              `axis: 'y'` = mur vertical   (plan) situé à X = `at`.
 * `from`/`to` : emprise le long du mur. `sill`/`head` : altitudes depuis le sol du niveau.
 */
export const OPENINGS = [
  // ─── Rez : façade sud (jardin / terrasse) ────────────────────────
  { level: 0, axis: 'x', at: 0.05, from: 1.0, to: 3.4, sill: 0.0, head: 2.4, type: 'sliding', room: 'salon' },
  { level: 0, axis: 'x', at: 0.05, from: 4.2, to: 5.8, sill: 0.9, head: 2.3, type: 'window', room: 'salon' },
  { level: 0, axis: 'x', at: 0.05, from: 7.2, to: 9.6, sill: 0.0, head: 2.4, type: 'sliding', room: 'sam' },
  { level: 0, axis: 'x', at: 0.05, from: 11.9, to: 13.3, sill: 0.0, head: 2.5, type: 'entrance', room: 'entree' },

  // ─── Rez : cloisons intérieures ──────────────────────────────────
  { level: 0, axis: 'y', at: 6.4, from: 1.2, to: 3.4, sill: 0.0, head: 2.4, type: 'frenchDoor' }, // salon ↔ sam
  { level: 0, axis: 'y', at: 11.0, from: 1.4, to: 3.6, sill: 0.0, head: 2.4, type: 'opening' },   // sam ↔ entrée
  { level: 0, axis: 'x', at: 5.2, from: 10.6, to: 13.2, sill: 0.0, head: 2.4, type: 'opening' },  // sam ↔ cuisine (large baie)
  { level: 0, axis: 'y', at: 10.0, from: 6.0, to: 7.8, sill: 0.0, head: 2.4, type: 'arch' },      // cuisine ↔ dégagement
  { level: 0, axis: 'x', at: 5.2, from: 7.0, to: 8.0, sill: 0.0, head: 2.1, type: 'door' },       // salon ↔ dégagement
  { level: 0, axis: 'y', at: 4.2, from: 6.2, to: 7.0, sill: 0.0, head: 2.1, type: 'door' },       // chambre0 ↔ dégagement
  { level: 0, axis: 'y', at: 6.2, from: 6.2, to: 7.0, sill: 0.0, head: 2.1, type: 'door' },       // sde0 ↔ dégagement
  { level: 0, axis: 'x', at: 9.1, from: 7.0, to: 7.8, sill: 0.0, head: 2.1, type: 'door' },       // dégagement ↔ buanderie
  { level: 0, axis: 'x', at: 9.1, from: 11.4, to: 12.2, sill: 0.0, head: 2.1, type: 'door' },     // cuisine ↔ buanderie

  // ─── Rez : autres façades ────────────────────────────────────────
  { level: 0, axis: 'y', at: 13.95, from: 6.2, to: 8.0, sill: 0.9, head: 2.2, type: 'window', room: 'cuisine' },
  { level: 0, axis: 'x', at: 10.55, from: 12.4, to: 13.4, sill: 0.0, head: 2.1, type: 'door', room: 'buanderie' },
  { level: 0, axis: 'x', at: 10.55, from: 6.0, to: 7.4, sill: 1.2, head: 2.1, type: 'window', room: 'buanderie' },
  { level: 0, axis: 'y', at: 0.05, from: 6.4, to: 8.4, sill: 0.9, head: 2.2, type: 'window', room: 'chambre0' },
  { level: 0, axis: 'x', at: 10.55, from: 1.2, to: 2.4, sill: 1.2, head: 2.2, type: 'window', room: 'chambre0' },

  // ─── Étage : façade sud sur terrasse ─────────────────────────────
  { level: 1, axis: 'x', at: 2.5, from: 1.6, to: 4.0, sill: 0.0, head: 2.3, type: 'sliding', room: 'salon1' },
  { level: 1, axis: 'x', at: 2.5, from: 9.4, to: 11.4, sill: 0.0, head: 2.3, type: 'sliding', room: 'chambre1' },
  { level: 1, axis: 'x', at: 2.5, from: 6.2, to: 7.6, sill: 0.9, head: 2.2, type: 'window', room: 'palier' },

  // ─── Étage : cloisons ────────────────────────────────────────────
  { level: 1, axis: 'y', at: 5.6, from: 4.4, to: 5.4, sill: 0.0, head: 2.1, type: 'opening' },  // salon1 ↔ palier
  { level: 1, axis: 'y', at: 8.4, from: 3.4, to: 4.2, sill: 0.0, head: 2.1, type: 'door' },     // palier ↔ chambre1
  { level: 1, axis: 'y', at: 8.4, from: 6.6, to: 7.4, sill: 0.0, head: 2.1, type: 'door' },     // palier ↔ chambre2
  { level: 1, axis: 'x', at: 7.5, from: 6.6, to: 7.4, sill: 0.0, head: 2.1, type: 'door' },     // palier ↔ sde1
  { level: 1, axis: 'x', at: 7.5, from: 4.6, to: 5.4, sill: 0.0, head: 2.1, type: 'door' },     // sdb1
  { level: 1, axis: 'x', at: 7.5, from: 1.4, to: 2.2, sill: 0.0, head: 2.1, type: 'door' },     // chambre3
  { level: 1, axis: 'y', at: 4.2, from: 8.2, to: 9.0, sill: 0.0, head: 2.1, type: 'door' },     // chambre3 ↔ sdb1

  // ─── Étage : fenêtres extérieures ────────────────────────────────
  { level: 1, axis: 'y', at: 0.05, from: 3.6, to: 5.6, sill: 0.9, head: 2.2, type: 'window', room: 'salon1' },
  { level: 1, axis: 'y', at: 13.95, from: 3.4, to: 5.2, sill: 0.9, head: 2.2, type: 'window', room: 'chambre1' },
  { level: 1, axis: 'y', at: 13.95, from: 7.2, to: 9.2, sill: 0.9, head: 2.2, type: 'window', room: 'chambre2' },
  { level: 1, axis: 'x', at: 10.55, from: 10.2, to: 12.0, sill: 0.9, head: 2.2, type: 'window', room: 'chambre2' },
  { level: 1, axis: 'x', at: 10.55, from: 1.2, to: 2.2, sill: 1.5, head: 2.2, type: 'window', room: 'chambre3' },
  { level: 1, axis: 'x', at: 10.55, from: 4.8, to: 5.8, sill: 1.5, head: 2.2, type: 'window', room: 'sdb1' },
  { level: 1, axis: 'x', at: 10.55, from: 6.9, to: 7.9, sill: 1.5, head: 2.2, type: 'window', room: 'sde1' },
]

/**
 * Escalier droit, adossé au mur est du hall.
 * 3.00 m de niveau à niveau / 17 contremarches = 0.176 m ; giron 0.27 m.
 * Reculement 4.32 m, à comparer aux 5.00 m de profondeur du hall.
 */
export const STAIR = {
  x0: 12.55, y0: 0.55,
  width: 1.05,
  steps: 17,
  riser: 3.0 / 17,
  tread: 0.27,
  from: 0, to: 1,
}

export const STAIR_FOOTPRINT = {
  x0: STAIR.x0 - 0.15,
  y0: STAIR.y0,
  x1: STAIR.x0 + STAIR.width,
  y1: STAIR.y0 + STAIR.steps * STAIR.tread,
}

/**
 * Points de vue prédéfinis. Chacun est posé hors de l'emprise du mobilier
 * implanté dans staging.js — sinon la visite démarre le nez dans un canapé.
 */
export const VIEWPOINTS = [
  { id: 'entree', label: 'Entrée', level: 0, pos: [11.8, 1.0], look: [12.6, 4.6] },
  { id: 'salon', label: 'Salon', level: 0, pos: [5.6, 1.2], look: [2.2, 3.8] },
  { id: 'sam', label: 'Salle à manger', level: 0, pos: [10.2, 4.4], look: [7.8, 1.4] },
  // vue cadrée depuis le dégagement, à travers l'arche : dans la cuisine même,
  // l'îlot est à moins d'un mètre et il n'y a pas de recul.
  { id: 'cuisine', label: 'Cuisine', level: 0, pos: [9.0, 6.9], look: [13.2, 7.2] },
  { id: 'chambre0', label: 'Chambre rez', level: 0, pos: [3.4, 9.9], look: [1.6, 6.4] },
  { id: 'buanderie', label: 'Buanderie', level: 0, pos: [5.2, 9.85], look: [12.8, 9.85] },
  { id: 'terrasse0', label: 'Terrasse jardin', level: 0, pos: [7.0, -3.4], look: [8.4, 0.4] },
  { id: 'salon1', label: 'Salon d’étage', level: 1, pos: [4.4, 6.8], look: [1.6, 3.4] },
  { id: 'terrasse1', label: 'Terrasse', level: 1, pos: [8.6, 1.5], look: [2.6, 0.8] },
  { id: 'chambre1', label: 'Chambre 2', level: 1, pos: [12.3, 5.6], look: [9.6, 3.4] },
  { id: 'chambre2', label: 'Chambre 3', level: 1, pos: [12.6, 9.8], look: [9.4, 7.0] },
  { id: 'sdb1', label: 'Salle de bains', level: 1, pos: [5.6, 10.1], look: [5.2, 7.8] },
]

export const roomById = Object.fromEntries(ROOMS.map((r) => [r.id, r]))

export const area = (r) => (r.x1 - r.x0) * (r.y1 - r.y0)

export const levelRooms = (level) => ROOMS.filter((r) => r.level === level)

export const levelArea = (level) =>
  levelRooms(level)
    .filter((r) => !r.outdoor)
    .reduce((sum, r) => sum + area(r), 0)

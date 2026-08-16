/**
 * Manifeste de la visite photo — Rooftop (penthouse).
 *
 * Le zip d'origine mélangeait deux logements du même programme. Les sept vues
 * à murs vert-de-gris, travertin et escalier intérieur appartiennent au Town
 * House et sont traitées à part (`townhouse.js`) — les laisser ici ferait
 * croire à un bien deux fois plus grand qu'il n'est.
 *
 * Ce bien n'a pas de plan relevé : la visite se fait au parcours seul.
 */

export const ROOFTOP_TOUR = [
  // ─── Penthouse ──────────────────────────────────────────────────
  {
    id: 'terrasse',
    titre: 'Terrasse rooftop',
    photos: [
      { file: 'terrasse-01.jpg', caption: 'Terrasse privative — deck bois, salon et table dix couverts, vue montagne et océan' },
      { file: 'terrasse-04.jpg', caption: 'Coin repas abrité, miroir mural et végétation en pots' },
      { file: 'terrasse-02.jpg', caption: 'La baie coulissante depuis la terrasse, ouverte sur le séjour' },
      { file: 'terrasse-03.jpg', caption: 'Claustra bois, orchidées suspendues et fauteuils cordage' },
    ],
  },
  {
    id: 'salon',
    titre: 'Séjour',
    photos: [
      { file: 'salon-01.jpg', caption: 'Séjour — claustra-bibliothèque, canapé d’angle, suspensions design et triptyque' },
      { file: 'salon-02.jpg', caption: 'Coin télévision et mur d’accent bleu nuit habillé de miroirs, ouvert sur la cuisine' },
    ],
  },
  {
    id: 'cuisine',
    titre: 'Cuisine',
    photos: [
      { file: 'cuisine-01.jpg', caption: 'Colonne four et micro-ondes Bosch, crédence pierre, réfrigérateur américain' },
      { file: 'cuisine-02.jpg', caption: 'Linéaire laqué, plan quartz, plaque induction et sortie directe sur le balcon' },
    ],
  },
  {
    id: 'chambre1',
    titre: 'Chambre principale',
    photos: [
      { file: 'chambre1-01.jpg', caption: 'Suite principale — papier peint graphique, tête de lit capitonnée, vue mer' },
      { file: 'chambre1-02.jpg', caption: 'Baie vitrée toute hauteur sur la végétation et l’océan' },
    ],
  },
  {
    id: 'chambre2',
    titre: 'Chambre 2',
    photos: [
      { file: 'chambre2-01.jpg', caption: 'Chambre double avec accès balcon, tête de lit tissu et climatiseur' },
    ],
  },
  {
    id: 'chambre3',
    titre: 'Chambre 3',
    photos: [
      { file: 'chambre3-01.jpg', caption: 'Chambre en camaïeu rose, rosaces murales en fibre tressée' },
    ],
  },
  {
    id: 'residence',
    titre: 'La résidence',
    photos: [
      { file: 'residence-01.jpg', caption: 'Bassin miroir et cheminement dallé entre les corps de bâtiment' },
      { file: 'residence-02.jpg', caption: 'Piscine à débordement, façades bois et pierre, vasques en contrepoint' },
    ],
  },
]

/**
 * Manifeste de la visite photo — Town House.
 *
 * Ces sept vues étaient mélangées au lot Rooftop ; elles forment en réalité un
 * logement distinct du même programme : murs vert-de-gris, sols travertin,
 * escalier intérieur à garde-corps verre, terrasse de plain-pied sous pergola.
 *
 * Pas de plan relevé — la visite se fait au parcours seul.
 */

export const TOWNHOUSE_TOUR = [
  {
    id: 'salon',
    titre: 'Séjour et cuisine',
    photos: [
      { file: 'salon-02.jpg', caption: 'Séjour traversant — cuisine ouverte, coin repas et escalier au fond' },
      { file: 'salon-01.jpg', caption: 'Canapé d’angle, méridienne moutarde et grand format vert au mur' },
    ],
  },
  {
    id: 'cuisine',
    titre: 'Cuisine',
    photos: [
      { file: 'cuisine-01.jpg', caption: 'Cuisine ouverte — plan granit noir, plaque gaz, hotte inox et four encastré' },
    ],
  },
  {
    id: 'escalier',
    titre: 'Escalier',
    photos: [
      { file: 'escalier-01.jpg', caption: 'Escalier en pierre claire, garde-corps verre et main courante bois' },
    ],
  },
  {
    id: 'chambre',
    titre: 'Chambre',
    photos: [
      { file: 'chambre-01.jpg', caption: 'Chambre à la frise géométrique, tête de lit tissu' },
    ],
  },
  {
    id: 'sde',
    titre: 'Salle d’eau',
    photos: [
      { file: 'sde-01.jpg', caption: 'Vasque posée sur plan pierre, WC suspendu, jalousie ventilée' },
    ],
  },
  {
    id: 'terrasse',
    titre: 'Terrasse et jardin',
    photos: [
      { file: 'terrasse-01.jpg', caption: 'Terrasse de plain-pied sous pergola bois, table teck, jardin paysagé' },
    ],
  },
]

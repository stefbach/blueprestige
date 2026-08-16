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
    titre: { fr: 'Séjour et cuisine', en: 'Living room and kitchen' },
    photos: [
      {
        file: 'salon-02.jpg',
        caption: {
          fr: 'Séjour traversant — cuisine ouverte, coin repas et escalier au fond',
          en: 'Dual-aspect living room — open kitchen, dining corner and staircase at the far end',
        },
      },
      {
        file: 'salon-01.jpg',
        caption: {
          fr: 'Canapé d’angle, méridienne moutarde et grand format vert au mur',
          en: 'Corner sofa, mustard chaise longue and a large green canvas on the wall',
        },
      },
    ],
  },
  {
    id: 'cuisine',
    titre: { fr: 'Cuisine', en: 'Kitchen' },
    photos: [
      {
        file: 'cuisine-01.jpg',
        caption: {
          fr: 'Cuisine ouverte — plan granit noir, plaque gaz, hotte inox et four encastré',
          en: 'Open kitchen — black granite worktop, gas hob, stainless extractor and built-in oven',
        },
      },
    ],
  },
  {
    id: 'escalier',
    titre: { fr: 'Escalier', en: 'Staircase' },
    photos: [
      {
        file: 'escalier-01.jpg',
        caption: {
          fr: 'Escalier en pierre claire, garde-corps verre et main courante bois',
          en: 'Pale stone staircase, glass balustrade and timber handrail',
        },
      },
    ],
  },
  {
    id: 'chambre',
    titre: { fr: 'Chambre', en: 'Bedroom' },
    photos: [
      {
        file: 'chambre-01.jpg',
        caption: {
          fr: 'Chambre à la frise géométrique, tête de lit tissu',
          en: 'Bedroom with a geometric frieze, fabric headboard',
        },
      },
    ],
  },
  {
    id: 'sde',
    titre: { fr: 'Salle d’eau', en: 'Shower room' },
    photos: [
      {
        file: 'sde-01.jpg',
        caption: {
          fr: 'Vasque posée sur plan pierre, WC suspendu, jalousie ventilée',
          en: 'Countertop basin on a stone surround, wall-hung WC, ventilated louvre',
        },
      },
    ],
  },
  {
    id: 'terrasse',
    titre: { fr: 'Terrasse et jardin', en: 'Terrace and garden' },
    photos: [
      {
        file: 'terrasse-01.jpg',
        caption: {
          fr: 'Terrasse de plain-pied sous pergola bois, table teck, jardin paysagé',
          en: 'Level-access terrace under a timber pergola, teak table, landscaped garden',
        },
      },
    ],
  },
]

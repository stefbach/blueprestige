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
    titre: { fr: 'Terrasse rooftop', en: 'Rooftop terrace' },
    photos: [
      {
        file: 'terrasse-01.jpg',
        caption: {
          fr: 'Terrasse privative — deck bois, salon et table dix couverts, vue montagne et océan',
          en: 'Private terrace — timber deck, seating and a table for ten, mountain and ocean view',
        },
      },
      {
        file: 'terrasse-04.jpg',
        caption: {
          fr: 'Coin repas abrité, miroir mural et végétation en pots',
          en: 'Sheltered dining corner, wall mirror and potted planting',
        },
      },
      {
        file: 'terrasse-02.jpg',
        caption: {
          fr: 'La baie coulissante depuis la terrasse, ouverte sur le séjour',
          en: 'The sliding doors from the terrace, open onto the living room',
        },
      },
      {
        file: 'terrasse-03.jpg',
        caption: {
          fr: 'Claustra bois, orchidées suspendues et fauteuils cordage',
          en: 'Timber screen, hanging orchids and rope armchairs',
        },
      },
    ],
  },
  {
    id: 'salon',
    titre: { fr: 'Séjour', en: 'Living room' },
    photos: [
      {
        file: 'salon-01.jpg',
        caption: {
          fr: 'Séjour — claustra-bibliothèque, canapé d’angle, suspensions design et triptyque',
          en: 'Living room — slatted bookcase, corner sofa, designer pendants and a triptych',
        },
      },
      {
        file: 'salon-02.jpg',
        caption: {
          fr: 'Coin télévision et mur d’accent bleu nuit habillé de miroirs, ouvert sur la cuisine',
          en: 'Television corner and midnight-blue accent wall dressed with mirrors, open to the kitchen',
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
          fr: 'Colonne four et micro-ondes Bosch, crédence pierre, réfrigérateur américain',
          en: 'Bosch oven and microwave tower, stone splashback, American fridge-freezer',
        },
      },
      {
        file: 'cuisine-02.jpg',
        caption: {
          fr: 'Linéaire laqué, plan quartz, plaque induction et sortie directe sur le balcon',
          en: 'Lacquered run, quartz worktop, induction hob and direct access to the balcony',
        },
      },
    ],
  },
  {
    id: 'chambre1',
    titre: { fr: 'Chambre principale', en: 'Principal bedroom' },
    photos: [
      {
        file: 'chambre1-01.jpg',
        caption: {
          fr: 'Suite principale — papier peint graphique, tête de lit capitonnée, vue mer',
          en: 'Principal suite — graphic wallpaper, upholstered headboard, sea view',
        },
      },
      {
        file: 'chambre1-02.jpg',
        caption: {
          fr: 'Baie vitrée toute hauteur sur la végétation et l’océan',
          en: 'Full-height glazing onto the greenery and the ocean',
        },
      },
    ],
  },
  {
    id: 'chambre2',
    titre: { fr: 'Chambre 2', en: 'Bedroom 2' },
    photos: [
      {
        file: 'chambre2-01.jpg',
        caption: {
          fr: 'Chambre double avec accès balcon, tête de lit tissu et climatiseur',
          en: 'Double bedroom with balcony access, fabric headboard and air conditioning',
        },
      },
    ],
  },
  {
    id: 'chambre3',
    titre: { fr: 'Chambre 3', en: 'Bedroom 3' },
    photos: [
      {
        file: 'chambre3-01.jpg',
        caption: {
          fr: 'Chambre en camaïeu rose, rosaces murales en fibre tressée',
          en: 'Bedroom in shades of pink, woven fibre rosettes on the wall',
        },
      },
    ],
  },
  {
    id: 'residence',
    titre: { fr: 'La résidence', en: 'The residence' },
    photos: [
      {
        file: 'residence-01.jpg',
        caption: {
          fr: 'Bassin miroir et cheminement dallé entre les corps de bâtiment',
          en: 'Mirror pool and paved walkway between the blocks',
        },
      },
      {
        file: 'residence-02.jpg',
        caption: {
          fr: 'Piscine à débordement, façades bois et pierre, vasques en contrepoint',
          en: 'Infinity pool, timber and stone façades, water bowls as counterpoint',
        },
      },
    ],
  },
]

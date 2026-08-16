/**
 * Registre des biens visitables.
 *
 * Un bien = un manifeste de parcours, un dossier de photos, et éventuellement
 * un plan relevé. La villa en a un ; le rooftop non — le viewer masque alors
 * le panneau de plan plutôt que d'inventer une géométrie.
 *
 * La visite lit `?bien=` dans l'URL et retombe sur le premier bien par défaut.
 */
import { TOUR as VILLA_TOUR } from './photos.js'
import { ROOFTOP_TOUR } from './rooftop.js'
import { TOWNHOUSE_TOUR } from './townhouse.js'
import { TAMARIN_TOUR } from './tamarin.js'
import { LEVELS } from '../villa/plan.js'

/** Aplatit un manifeste en séquence linéaire, en propageant le contexte d'étape. */
function flatten(steps, base, stagedBase) {
  return steps.flatMap((step) =>
    step.photos.map((p, i) => ({
      ...p,
      src: base + p.file,
      stagedSrc: p.staged ? stagedBase + p.staged : null,
      stepId: step.id,
      room: step.room ?? null,
      level: step.level ?? null,
      titre: step.titre,
      indexInStep: i,
      countInStep: step.photos.length,
    }))
  )
}

export const PROPERTIES = [
  {
    id: 'villa',
    nom: 'La Villa',
    sousTitre: 'Deux niveaux · jardin clos',
    steps: VILLA_TOUR,
    sequence: flatten(VILLA_TOUR, '/photos/', '/photos/staged/'),
    hasPlan: true,
    levels: LEVELS,
    note: 'Plan indicatif, cotes estimées — sans valeur contractuelle.',
  },
  {
    id: 'rooftop',
    nom: 'Le Rooftop',
    sousTitre: 'Penthouse · terrasse privative · vue mer',
    steps: ROOFTOP_TOUR,
    sequence: flatten(ROOFTOP_TOUR, '/photos/rooftop/', '/photos/rooftop/staged/'),
    hasPlan: false,
    levels: [],
    note: 'Résidence avec piscine à débordement et jardins paysagés.',
  },
  {
    id: 'townhouse',
    nom: 'Le Town House',
    sousTitre: 'Duplex · terrasse jardin de plain-pied',
    steps: TOWNHOUSE_TOUR,
    sequence: flatten(TOWNHOUSE_TOUR, '/photos/townhouse/', '/photos/townhouse/staged/'),
    hasPlan: false,
    levels: [],
    note: 'Même programme que Le Rooftop, logement distinct.',
  },
  {
    id: 'tamarin',
    nom: 'L’Appartement',
    sousTitre: 'Tamarin · piscine privative',
    steps: TAMARIN_TOUR,
    sequence: flatten(TAMARIN_TOUR, '/photos/tamarin/', '/photos/tamarin/staged/'),
    hasPlan: false,
    levels: [],
    note: 'Duplex avec piscine privative, résidence paysagée.',
  },
]

export const propertyById = Object.fromEntries(PROPERTIES.map((p) => [p.id, p]))

/** Bien demandé par l'URL, sinon le premier. */
export function currentProperty() {
  const id = new URLSearchParams(location.search).get('bien')
  return propertyById[id] ?? PROPERTIES[0]
}

# Relevé de la villa — méthode et limites

Le modèle 3D et le plan interactif de `/visite-3d/` sont tous deux générés depuis
un seul fichier de données : [`src/villa/plan.js`](../src/villa/plan.js). Il n'y a
pas de plan dessiné à la main quelque part ailleurs — le plan SVG et la géométrie
three.js lisent les mêmes rectangles, donc ils ne peuvent pas diverger.

## D'où viennent les cotes

**Elles sont estimées à partir de 31 photos, pas mesurées sur site.** Aucune cote
n'a été relevée au télémètre. Le calage s'appuie sur des objets dont la taille est
normalisée et qui apparaissent dans les photos :

| Référence | Dimension retenue |
|---|---|
| Portes intérieures | 0.80 × 2.05 m |
| Éléments bas de cuisine | 0.60 m de profondeur, plan à 0.90 m |
| Table de salle à manger ovale 10 places | ≈ 2.80 × 1.20 m |
| Marches d'escalier | giron ~0.26 m, hauteur ~0.18 m |
| Lit double | 1.60 × 2.00 m |
| Lave-linge | 0.60 × 0.60 m |

**Tolérance réaliste : ±10 % par pièce.** Sur une pièce de 5 m, cela fait ±50 cm.
C'est suffisant pour se projeter dans les volumes et les circulations ; ce n'est
pas suffisant pour commander du mobilier sur mesure ou déposer un permis.

**Ce plan n'a aucune valeur contractuelle.** La mention figure dans le panneau
latéral du viewer et doit rester si le composant est réutilisé ailleurs.

## Ce qui est déduit, pas observé

Certaines choses ne sont visibles sur aucune photo et ont été reconstituées de
manière plausible plutôt que constatées :

- **La position exacte des cloisons entre le dégagement, la salle d'eau du rez et
  la chambre du rez.** Les photos ne montrent jamais ces trois espaces ensemble.
- **L'orientation cardinale.** La façade « sud » du modèle est celle du jardin et
  de l'entrée, parce que c'est là que donnent les baies coulissantes et la porte
  d'entrée sur la photo de façade. Le vrai nord n'est pas connu — la course du
  soleil dans le viewer est donc indicative.
- **La distribution de l'étage.** On voit le salon cathédrale, la terrasse, trois
  chambres et deux pièces d'eau, mais jamais leur enchaînement. L'implantation
  retenue est cohérente avec la trémie d'escalier et les fenêtres visibles en
  façade, sans être établie.
- **Les hauteurs sous plafond** : 2.80 m au rez, 2.40 m à l'égout et 4.20 m au
  faîtage à l'étage, déduites des proportions portes/plafond.

## Ce qui est observé et fiable

- L'enchaînement du rez : entrée → salle à manger → cuisine, avec l'arche et la
  porte coulissante à galandage visibles sur plusieurs photos.
- Les finitions : parquet à bâtons rompus dans l'entrée, lames larges foncées dans
  les pièces de vie, chêne clair à l'étage, carreaux de ciment à motifs en cuisine
  et buanderie, grès effet marbre dans la salle de bains.
- L'existence d'un escalier extérieur desservant l'étage, et d'une terrasse
  d'étage avec vue dégagée.
- Le mobilier en place, reproduit dans la variante de staging « État actuel ».

## Deux ensembles distincts

Le tout premier salon photographié — canapés verts, lustre à pampilles, murs
blancs, menuiseries métal noir, fenêtre verticale étroite — ne correspond à aucune
pièce du corps principal (murs beiges, menuiseries bois). La clôture à lames bois
visible par sa baie est en revanche la même que sur les photos de jardin.

Il s'agit donc vraisemblablement d'une **seconde unité sur la même parcelle ou du
même programme**, pas d'une pièce de la villa modélisée. Elle n'est pas incluse
dans le modèle. Si elle doit l'être, il faut des photos supplémentaires qui
montrent comment elle se raccorde au reste.

## Corriger le relevé

Tout se corrige dans `src/villa/plan.js` :

- `ROOMS` — un rectangle par pièce (`x0, y0, x1, y1` en mètres). Laisser 0.20 m
  entre deux pièces voisines : c'est l'épaisseur de cloison, chaque pièce en
  portant la moitié.
- `OPENINGS` — portes, baies et fenêtres. `axis: 'x'` pour un mur horizontal en
  plan, `'y'` pour un mur vertical ; `at` est la coordonnée du plan de mur,
  `from`/`to` l'emprise, `sill`/`head` les altitudes.
- `VIEWPOINTS` — points de départ de la visite. Vérifier qu'ils tombent hors de
  l'emprise du mobilier de `staging.js`, sinon la visite démarre dans un canapé.
- `STAIR` — l'escalier, et `STAIR_FOOTPRINT` qui en interdit la traversée.

Après modification, le plan 2D, la 3D et le masque de circulation se mettent à
jour ensemble, sans autre intervention.

## Passer à un relevé réel

Si les cotes doivent devenir exploitables, l'ordre de priorité est :

1. **Un relevé au télémètre laser** des pièces principales (10 minutes sur place)
   suffit à passer de ±10 % à ±2 cm.
2. À défaut, un **scan LiDAR au téléphone** (iPhone Pro / iPad Pro) exporté en
   `.usdz` ou `.ply` donne un nuage de points directement mesurable.

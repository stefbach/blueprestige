# Home staging de la villa

La visite affiche, sur certaines photos, un comparateur avant / après : la photo
réelle et la même vue remise en scène. Les images « après » vivent dans
`public/photos/staged/` et portent **exactement le même nom** que leur original
dans `public/photos/`. Une vue devient comparable dès qu'on ajoute `staged:` à
son entrée dans `src/tour/photos.js` — c'est le seul branchement nécessaire.

## Règle de fidélité

Une image « après » qui ne montre pas la pièce annoncée est pire que pas
d'image du tout : sur une annonce, elle promet un volume qui n'existe pas. La
mise en scène ne change donc **que ce qui est meuble** — mobilier, textiles,
luminaires non encastrés, décoration, rangement. Restent intouchés : le
cadrage, la perspective, les murs, les ouvertures, les sols, les plafonds et
toute la menuiserie fixe.

Chaque image générée est comparée à son original avant d'être branchée. Une
image qui ne passe pas ce contrôle reste dans le dossier mais n'est pas
référencée.

## État actuel

**Branchées (12 vues, 11 pièces)** — entrée et escalier, séjour (2 vues),
salle à manger, cuisine, chambre du rez, salon d'étage, terrasse d'étage,
chambre 2, chambre 3, chambre 4, chambre 5. Les cinq chambres de la villa
sont couvertes.

`staged/etage-chambre3-01.jpg` a été **refaite** : la version précédente
montrait une autre pièce — fenêtre à gauche, pas d'armoire. La nouvelle
conserve le rampant, la fenêtre à gauche et la grande armoire en bois massif
contre le mur de droite.

**À produire (3 vues)** — arrière-cuisine, salon de la seconde unité, jardin
clos. Consignes ci-dessous.

## Consignes de génération

Modèle utilisé : `nano_banana_pro`, la photo d'origine passée en média de
référence (rôle `image`), sortie en 2k, ratio calé sur l'original. Coût
constaté : 2 crédits par image.

Préambule commun à toutes les consignes :

> Virtual home staging of this exact room. Keep the architecture, camera
> position, focal length and perspective EXACTLY as in the reference
> photograph: same walls, same window and door positions, same floor and
> ceiling finishes, same built-in joinery. Do not move the camera, do not
> re-proportion the room, do not add or remove openings. Change only loose
> furniture, textiles, non-recessed light fittings and decoration. Remove
> clutter, cables, personal effects and cleaning products. Photorealistic
> interior photography, natural daylight, Mauritian coastal villa, calm
> neutral palette — linen, rattan, pale timber, muted greens. No people, no
> text, no watermark.

### Intérieurs

| Vue | Ce qui doit rester | Mise en scène demandée |
| :--- | :--- | :--- |
| `rez-buanderie-01` | Couloir étroit, carreaux de ciment à motifs, fenêtre à cadre bleu, plan de travail bois et lave-linge à droite, étagères ouvertes à gauche, porte de service au fond | Tout désencombrer (cartons, sacs, bacs plastique, bouilloire). Paniers en fibre alignés, linge plié, panier à linge, une plante. Une buanderie rangée se lit comme un rangement, pas comme un débarras. |
| `annexe-salon-01` | Parquet foncé, grande baie acier noir sur le jardin et la clôture bois, fenêtre haute étroite à droite, applique murale | Déjà meublé : affiner. Tapis pour asseoir les fauteuils, table basse habillée, coussins, rideaux mieux tombés, une toile au mur nu. |

Deux pièces d'eau restent hors périmètre pour l'instant — la salle de bains
(`etage-sdb-01`) et la salle d'eau d'étage (`etage-sde-01`) —, la demande
portant sur les chambres, l'arrière-cuisine, la seconde unité, l'entrée et le
jardin. Leur consigne serait la même : désencombrer, serviettes assorties,
plante, tapis, volumétrie strictement conservée.

Consignes déjà utilisées, conservées pour référence :

| Vue | Ce qui devait rester | Mise en scène appliquée |
| :--- | :--- | :--- |
| `rez-entree-01` | Porte d'entrée bois massif à imposte vitrée à gauche, escalier tournant à balustres bois montant à droite, parquet à bâtons rompus foncé | Console sous l'escalier, miroir rond en rotin, tapis de couloir, lanterne, frangipaniers, palmier en pot. Chaise parasite retirée. |
| `etage-chambre3-01` | Rampant à gauche, fenêtre et rideau clair à gauche, **grande armoire bois massif à droite**, commode à gauche du lit, parquet chêne clair | Lit en lin blanc, plaid, coussins, chevet et lampe, tapis berbère, toile bleue au-dessus du lit. |
| `etage-chambre4-01` | Rampant, armoire bois haute à droite du lit, miroir psyché, porte bois foncé à droite, suspension rotin, parquet chêne | Lit en lin, coussins, plaid, tapis clair, lampe, cadre au mur, olivier en panier. |
| `etage-chambre5-01` | Rampant, petite fenêtre haute et store gris à gauche, climatiseur mural, porte bois foncé à droite, deux petits chevets bois, parquet chêne | Literie refaite, tête de lit bois, coussins, deux liseuses, cadre au mur, tapis. |

### Extérieurs

| Vue | Remarque |
| :--- | :--- |
| `ext-jardin-01` | Pelouse close, clôture bois, arbres au fond, dallage au premier plan. Mise en scène : salon de jardin ou bains de soleil sur le dallage, parasol, jardinières. Le panneau STOP visible au-delà de la clôture est à laisser — il est dans le paysage réel. |
| `ext-terrasse-01` | **Déconseillé.** Ce n'est pas une terrasse d'agrément mais un espace technique : citerne de gaz, évier extérieur, escalier de service, coffret. Y installer un salon de jardin ferait passer un local de service pour un lieu de vie. Proposition de remplacement : `rez-sam-03`, qui montre la vraie terrasse accessible depuis la salle à manger. |

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

**Branchées (8 vues, 7 pièces)** — séjour (2 vues), salle à manger, cuisine,
chambre du rez, salon d'étage, terrasse d'étage, chambre 2.

**Écartée** — `staged/etage-chambre3-01.jpg` ne correspond pas à la pièce.
L'original est une chambre sous rampant, fenêtre et grande armoire en bois
massif à droite ; l'image montre une autre géométrie, fenêtre à gauche et sans
armoire. À refaire.

**À produire (10 vues)** — voir les consignes ci-dessous.

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
| `rez-entree-01` | Porte d'entrée bois massif à imposte vitrée à gauche, escalier tournant blanc à balustres bois montant à droite, parquet à bâtons rompus foncé | Console fine sous l'escalier, grand miroir, tapis de couloir, lanterne, bouquet de frangipaniers. L'arrivée doit donner le ton. |
| `rez-buanderie-01` | Couloir étroit, carreaux de ciment à motifs, fenêtre à cadre bleu, plan de travail bois et lave-linge à droite, étagères ouvertes à gauche, porte de service au fond | Tout désencombrer (cartons, sacs, bacs plastique, bouilloire). Paniers en fibre alignés, linge plié, panier à linge, une plante. Une buanderie rangée se lit comme un rangement, pas comme un débarras. |
| `etage-chambre3-01` | Rampant à gauche, fenêtre et rideau clair à gauche, **grande armoire bois massif à droite**, commode à gauche du lit, parquet chêne clair | Lit habillé en lin blanc, plaid, deux chevets assortis, lampe, tapis berbère, une toile bleue au mur. Reprise de l'image ratée. |
| `etage-chambre4-01` | Rampant, armoire bois haute à droite du lit, miroir psyché, porte bois foncé à droite, suspension rotin, parquet chêne | Lit en lin, coussins, plaid, tapis clair, chevets, plante en pot. |
| `etage-chambre5-01` | Rampant, petite fenêtre haute et store gris à gauche, climatiseur mural, porte bois foncé à droite, deux petits chevets bois, parquet chêne | Literie repassée, tête de lit textile, coussins, liseuses, tapis. Faire disparaître l'aspect « lit défait ». |
| `etage-sdb-01` | Carrelage grand format effet marbre, douche à l'italienne vitrée à gauche, baignoire à droite sous la fenêtre, WC, vasque, sol beige | Désencombrer le plan (panier noir, câbles). Serviettes roulées, peignoir, savon, plateau, orchidée, tapis de bain. |
| `etage-sde-01` | Armoire de toilette miroir, vasque sur plan maçonné, WC suspendu, grande douche vitrée, fenêtre à cadre bleu, faïence blanche | Serviettes assorties, distributeur, plante, tapis. Volumétrie strictement conservée. |
| `annexe-salon-01` | Parquet foncé, grande baie acier noir sur le jardin et la clôture bois, fenêtre haute étroite à droite, applique murale | Déjà meublé : affiner. Tapis pour asseoir les fauteuils, table basse habillée, coussins, rideaux mieux tombés, une toile au mur nu. |

### Extérieurs

| Vue | Remarque |
| :--- | :--- |
| `ext-jardin-01` | Pelouse close, clôture bois, arbres au fond, dallage au premier plan. Mise en scène : salon de jardin ou bains de soleil sur le dallage, parasol, jardinières. Le panneau STOP visible au-delà de la clôture est à laisser — il est dans le paysage réel. |
| `ext-terrasse-01` | **Déconseillé.** Ce n'est pas une terrasse d'agrément mais un espace technique : citerne de gaz, évier extérieur, escalier de service, coffret. Y installer un salon de jardin ferait passer un local de service pour un lieu de vie. Proposition de remplacement : `rez-sam-03`, qui montre la vraie terrasse accessible depuis la salle à manger. |

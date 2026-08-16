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

## Objectif : toutes les vues

La cible est la couverture complète — chaque photographie de chaque bien
dispose de sa mise en scène. État du chantier :

| Bien | Photos | Mises en scène | Restant | Crédits |
| :--- | ---: | ---: | ---: | ---: |
| La Villa | 31 | 12 | **19** | 38 |
| Le Rooftop | 14 | 0 | **14** | 28 |
| Le Town House | 7 | 0 | **7** | 14 |
| L'Appartement | 10 | 0 | **10** | 20 |
| **Total** | **62** | **12** | **50** | **100** |

À 2 crédits la génération. Les vues se produisent par lots de 12 au maximum
(limite de `generate_image_batch`).

### Villa — les 19 vues restantes

Extérieurs : `ext-facade-01`, `ext-jardin-01`, `ext-terrasse-01`,
`ext-escalier-01`.

Rez-de-chaussée : `rez-entree-02`, `rez-entree-03`, `rez-entree-04`,
`rez-entree-05`, `rez-salon-03`, `rez-sam-02`, `rez-sam-03`, `rez-sam-04`,
`rez-cuisine-02`, `rez-buanderie-01`.

Étage et seconde unité : `etage-salon-02`, `etage-sdb-01`, `etage-sde-01`,
`annexe-salon-01`, `annexe-salon-02`.

Sur les vues secondaires d'une pièce déjà traitée — deuxième angle du séjour,
de la salle à manger, de la cuisine —, le mobilier introduit doit être **le
même que sur la vue principale** : deux angles de la même pièce meublés
différemment se contredisent et se remarquent immédiatement.

### Les trois autres biens

Aucune mise en scène à ce jour. Ils sont déjà meublés et habités sur les
photos : le travail y relève davantage du désencombrement et de l'harmonisation
que de l'ameublement. Créer les dossiers `public/photos/<bien>/staged/` — le
manifeste les attend déjà (`flatten()` dans `src/tour/properties.js` compose
`'/photos/<bien>/staged/'`).

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

| `etage-sdb-01` | Carrelage grand format effet marbre, douche à l'italienne vitrée à gauche, baignoire à droite sous la fenêtre, WC, vasque, sol beige | Désencombrer le plan (panier noir, câbles). Serviettes roulées, peignoir, savon, plateau, orchidée, tapis de bain. |
| `etage-sde-01` | Armoire de toilette miroir, vasque sur plan maçonné, WC suspendu, grande douche vitrée, fenêtre à cadre bleu, faïence blanche | Serviettes assorties, distributeur, plante, tapis. Volumétrie strictement conservée. |
| `annexe-salon-02` | Volume traversant, lustre à pampilles, parquet foncé | Cohérent avec `annexe-salon-01` : mêmes fauteuils, même tapis, même table. |
| `rez-entree-02` à `-05` | Escalier, arche de cuisine, porte à galandage, parquet | Prolonger la mise en scène de `rez-entree-01` : mêmes console, miroir et tapis vus sous d'autres angles. |
| `rez-salon-03` | Séjour, angle opposé | Mêmes canapé, tapis et tables que `rez-salon-01` / `-02`. |
| `rez-sam-02` à `-04` | Salle à manger, baie sur terrasse, ouverture sur cuisine | Mêmes table, chaises et art de la table que `rez-sam-01`. |
| `rez-cuisine-02` | Façades shaker crème, crédence et sol à motifs, plaque gaz | Mêmes accessoires que `rez-cuisine-01` : jarres, planche, plante aromatique. |
| `etage-salon-02` | Trémie, arrivée d'escalier, plafond cathédrale | Mêmes assises et tapis que `etage-salon-01`. |

Consignes déjà utilisées, conservées pour référence :

| Vue | Ce qui devait rester | Mise en scène appliquée |
| :--- | :--- | :--- |
| `rez-entree-01` | Porte d'entrée bois massif à imposte vitrée à gauche, escalier tournant à balustres bois montant à droite, parquet à bâtons rompus foncé | Console sous l'escalier, miroir rond en rotin, tapis de couloir, lanterne, frangipaniers, palmier en pot. Chaise parasite retirée. |
| `etage-chambre3-01` | Rampant à gauche, fenêtre et rideau clair à gauche, **grande armoire bois massif à droite**, commode à gauche du lit, parquet chêne clair | Lit en lin blanc, plaid, coussins, chevet et lampe, tapis berbère, toile bleue au-dessus du lit. |
| `etage-chambre4-01` | Rampant, armoire bois haute à droite du lit, miroir psyché, porte bois foncé à droite, suspension rotin, parquet chêne | Lit en lin, coussins, plaid, tapis clair, lampe, cadre au mur, olivier en panier. |
| `etage-chambre5-01` | Rampant, petite fenêtre haute et store gris à gauche, climatiseur mural, porte bois foncé à droite, deux petits chevets bois, parquet chêne | Literie refaite, tête de lit bois, coussins, deux liseuses, cadre au mur, tapis. |

### Extérieurs

| Vue | Ce qui doit rester | Mise en scène demandée |
| :--- | :--- | :--- |
| `ext-jardin-01` | Pelouse close, clôture bois, arbres au fond, dallage au premier plan | Salon de jardin ou bains de soleil sur le dallage, parasol, jardinières. Le panneau STOP visible au-delà de la clôture reste : il fait partie du paysage réel. |
| `ext-facade-01` | Façade deux niveaux, balcon filant, double porte d'entrée sous auvent, pelouse | Jardinières de part et d'autre de l'entrée, allée nette, massifs. Ne rien ajouter qui masque la façade — c'est elle qu'on vient voir. |
| `ext-terrasse-01` | Deck bois, store banne, évier extérieur, escalier de service, **citerne de gaz** | Rangement, pas ameublement. Désencombrer, enrouler les tuyaux, dégager le plan de l'évier, une plante en pot. La citerne et l'évier restent visibles : c'est un espace de service, et une terrasse de service propre se vend très bien comme telle. Ne pas y installer de salon de jardin. |
| `ext-escalier-01` | Escalier extérieur desservant l'étage de façon indépendante | Jardinières le long de la volée, éclairage extérieur. Accès indépendant = argument locatif, il doit se lire soigné. |

Sur `ext-terrasse-01`, la consigne s'écarte de la demande initiale d'un salon
de jardin : la vue est prise sur un local technique, et l'y meubler comme un
lieu de vie tromperait le visiteur, qui le découvrirait à la première visite.
Elle est donc mise en scène — mais rangée, pas transformée.

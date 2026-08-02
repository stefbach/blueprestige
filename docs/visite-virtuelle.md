# Visite virtuelle — comment ça marche, et jusqu'où ça va

La visite est servie sur `/visite-3d/`. Elle ne dépend d'aucun service tiers :
tout est calculé dans le navigateur, il n'y a ni fichier de modèle à télécharger,
ni texture, ni appel réseau après le chargement de la page.

## Ce qui est livré

| | |
|---|---|
| **Visite** | Déplacement à la première personne, collisions sur les murs, passage par les ouvertures uniquement |
| **Maquette** | Vue orbitale toiture retirée, les deux niveaux visibles |
| **Plan** | Plan SVG interactif coté, cliquable — la pastille suit la caméra en direct |
| **Niveaux** | Rez-de-chaussée / Étage |
| **Home staging** | 4 partis pris + variante sans mobilier, changement instantané |
| **Heure** | Course du soleil de 6 h à 18 h, la lumière et le ciel suivent |

Commandes : glisser pour regarder, <kbd>Z</kbd><kbd>Q</kbd><kbd>S</kbd><kbd>D</kbd>
(ou <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / flèches) pour marcher,
<kbd>Maj</kbd> pour courir. Sur mobile, un joystick tactile remplace le clavier.

## Architecture

```
src/villa/plan.js        le relevé — source unique du plan 2D ET de la 3D
src/villa/model.js       génération du bâti (sols, cloisons percées, menuiseries,
                         escalier, toiture, terrain)
src/villa/materials.js   matériaux procéduraux générés sur canvas
src/villa/staging.js     bibliothèque de mobilier + implantations par variante
src/viewer/walkable.js   masque de circulation (où la caméra a le droit d'aller)
src/viewer/walkControls.js  déplacement première personne
src/viewer/plan2d.js     plan SVG interactif
src/main.js              scène, lumières, modes, interface
```

Deux points de conception qui portent le reste :

**Un seul relevé.** Le plan SVG et la géométrie three.js lisent les mêmes
rectangles. Corriger une cote met les deux à jour ; ils ne peuvent pas diverger.

**Les cloisons naissent des trous.** Chaque pièce porte ses quatre parois, d'une
demi-épaisseur chacune ; deux pièces voisines remplissent donc exactement la
cloison de 0.20 m laissée entre leurs rectangles. Les ouvertures découpent ces
parois en morceaux pleins (`wallPieces()`), ce qui évite d'avoir à faire du CSG.

**On ne traverse pas les murs.** `walkable.js` construit une grille booléenne au
pas de 10 cm : les pièces sont praticables, les cloisons ne le sont pas, et les
passages ne se rouvrent qu'au droit des portes, baies et arches franchissables.
L'emprise de l'escalier est explicitement retirée.

## Home staging

Quatre partis pris, définis dans `PALETTES` (`materials.js`) et implantés dans
`buildStaging()` (`staging.js`) :

| Variante | Intention |
|---|---|
| **État actuel** | Reproduit le mobilier des photos — sert de référence de comparaison |
| **Épuré — lin & chêne** | Moins de pièces, circulations élargies, volumes bas |
| **Tropical — bois & végétal** | Bois foncés, rotin, verts profonds, densité végétale |
| **Contemporain — graphite** | Contraste fort sur les parquets sombres |

Les variantes ne changent pas que les couleurs : `epure` retire des assises et
élargit les passages, `tropical` ajoute du végétal. C'est ce qui rend la
comparaison utile plutôt que décorative.

Ajouter une variante = ajouter une entrée dans `PALETTES`, elle apparaît
automatiquement dans le sélecteur.

## Ce que ça n'est pas

**Ce n'est pas photoréaliste, et ça ne peut pas l'être depuis ces photos.**

Les 31 photos fournies sont des photos perspective classiques, une ou deux par
pièce. Il n'y a ni le recouvrement ni la parallaxe nécessaires à une
reconstruction photographique. Concrètement :

- **La photogrammétrie** demande 30 à 100 photos *par pièce*, avec 60-80 % de
  recouvrement entre vues successives.
- **Le Gaussian splatting** (le rendu « plus vrai que la 3D » type Matterport
  récent) se nourrit d'une **vidéo continue** : on marche lentement dans chaque
  pièce, caméra stable, en balayant murs, sols et plafonds.
- **Une visite 360° classique** demande une caméra 360 (Insta360, Ricoh Theta)
  posée sur trépied à hauteur d'œil, un point de vue tous les 2-3 mètres.

Ce qui est livré est donc un **jumeau reconstruit** : les volumes, les
circulations, la lumière et le mobilier sont justes en intention et en
proportion, pas au centimètre ni au pixel.

## Passer au photoréalisme

Par ordre d'effort croissant :

**1. Textures PBR réelles** — le plus rapide. Les matériaux procéduraux de
`materials.js` sont remplaçables un à un par des textures Poly Haven (parquet,
carreaux de ciment, marbre, enduit), récupérables via le serveur MCP `blender`
déjà configuré. Gain visuel important, une demi-journée de travail, aucune
capture supplémentaire.

**2. Éclairage précalculé** — construire la scène dans Blender depuis le même
relevé, faire un rendu Cycles et cuire les lightmaps. On garde la navigation
temps réel avec une lumière de qualité rendu.

**3. Gaussian splatting** — c'est la seule voie vers le « plus que du 3D ».
Il faut une **vidéo par niveau** : marche lente, caméra à hauteur d'œil, chaque
pièce balayée deux fois (une passe basse, une passe haute), sans coupure, en
évitant les surfaces réfléchissantes. Le traitement se fait ensuite hors ligne
(Postshot, Nerfstudio, Luma). Le viewer accepte déjà une couche supplémentaire :
le splat se substitue au bâti procédural en gardant le plan, les points de vue et
le masque de circulation.

**4. Home staging photoréaliste sur les vraies photos** — pour produire des
« avant / après » à partir des photos elles-mêmes plutôt que de la 3D, il faut
les **fichiers image**, que le serveur d'images génératif peut alors remeubler
pièce par pièce. C'est ce qui alimenterait le comparateur avant/après de la page
d'accueil.

## Performance

Le bundle de la visite pèse ~560 ko (~147 ko gzip), three.js compris. Le modèle
fait quelques centaines de mailles et se génère en moins d'une seconde. Les
ombres sont en `PCFSoft` sur une carte 2048² ; sur machine faible, réduire
`sun.shadow.mapSize` dans `src/main.js` est le premier levier.

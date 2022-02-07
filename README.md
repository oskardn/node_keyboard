![](https://img.shields.io/badge/node_keyboard-1.1.0-blue)  
![](https://img.shields.io/badge/express-4.17.2-red) ![](https://img.shields.io/badge/sendinput-0.2.0-red) ![](https://img.shields.io/badge/socket.io-4.4.1-red) ![](https://img.shields.io/badge/winaudio-2.0.2-red)

# node_keyboard

Projet destiné à pouvoir controller l'audio de son pc depuis son téléphone.  
Ce projet fonctionne seulement sur Windows, puisque la librairie utilisée pour l'envois de macros est utilisatble uniquement par Windows.

## Installation

------

Pour installer ce projet chez vous, clonez d'abord ce dossier sur votre machine.

```console
git clone https://github.com/oskardrevetnitschke/node_keyboard
```

Puis ouvrez un terminal à l'intérieur du dossier que vous venez de cloner et ajoutez y les modules [**body-parser**](https://www.npmjs.com/package/body-parser), [**dotenv**](https://www.npmjs.com/package/dotenv), [**expressjs**](https://expressjs.com), [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken), [**node-audio-volume-mixer**](https://www.npmjs.com/package/node-audio-volume-mixer), [**sendinput**](https://www.npmjs.com/package/sendinput), [**socket.io**](https://socket.io/) et [**win-audio**](https://www.npmjs.com/package/win-audio) avec la commande suivante :

```console
npm install
```

Pensez à lire les prérequis en fonction de votre système d'exploitation avant d'installer les librairies.  
  
En effet certaines librairies sont dépendantes de [**node-gyp**](https://www.npmjs.com/package/node-gyp) qui nécessite une version de Python supérieure ou égale à 3.6 ainsi qu'un compilateur C/C++.  
     
[**Documentation de node-gyp**](https://www.npmjs.com/package/node-gyp#on-windows) 

## Lancement de l'instance

---

Pour exécuter le programme rendez vous dans le dossier du projet et faites:

```console
node server.js
```

ou 

```console
npm start
```
## Accéder à l'interface

---

Une fois le serveur lancé, rendez vous sur [localhost:3000](http://localhost:3000) sauf si vous avez changé le port dans le fichier `server.js`.  
Vous devriez avoir une interface de ce style qui devrait s'afficher :  

![](https://sikelio.s-ul.eu/6oXZmtAM)  
Les boutons indiquent déjà les actions que vous pouvez faire.  

Premier bouton : Piste audio précédente  
Deuxième bouton : Mettre en plause ou continuer la piste audio  
Troisième Bouton : Piste audio suivante  

Une barre de volume qui va de 1 en 1 avec un indicateur du niveau actuel.

## Contributeurs

---
[![Oskar DN, Anthony Bosco](https://contrib.rocks/image?repo=oskardrevetnitschke/node_keyboard)](https://github.com/oskardrevetnitschke/node_keyboard/graphs/contributors)
# node_keyboard

Projet destiné à pouvoir controller l'audio de son pc depuis son téléphone.  
Ce projet fonctionne seulement sur Windows, puisque la librairie utilisée pour l'envois de macros est utilisatble uniquement par Windows.

## Installation

------

Pour installer ce projet chez vous, clonez d'abord ce dossier sur votre machine.

```console
git clone https://github.com/oskardrevetnitschke/node_keyboard
```

Puis ouvrez un terminal à l'intérieur du dossier que vous venez de cloner et ajoutez y les modules [**expressjs**](https://expressjs.com), [**sendinput**](https://www.npmjs.com/package/sendinput), [**socket.io**]() et [**win-audio**]() avec la commandes suivante :

```console
npm install express sendinput socket.io win-audio
```

Pensez à lire les prérequis en fonction de votre système d'exploitation avant d'installer les librairies.  
  
En effet certaines librairies sont dépendantes de [**node-gyp**](https://www.npmjs.com/package/node-gyp) qui nécessite une version de Python supérieure ou égale à 3.6 ainsi qu'un compilateur C/C++.  
  
Python :  

Soit vous téléchargez l'exécutable depuis le site officiel de [**Python**](https://www.python.org/downloads/). Soit vous téléchargez Python directement depuis le [**Microsoft Store**]().

Compilateur C/C++ :  

Pour installer le compilateur C/C++, installez d'abord [**Visual Studio Community**](https://visualstudio.microsoft.com/fr/). Ensuite lors de l'installation ajoutez `Desktop development with C++` (ou `Développement Desktop en C++` si vous avez l'installateur français) dans les paramètres d'installation.  

![](https://sikelio.s-ul.eu/PScB0BZL)

Une fois ces étapes suivies, vous devriez être en mesure d'utiliser le projet correctement. Si vous avez d'éventuelles questions, n'hésitez pas à lire la documentation ci dessous (attention elle est en anglais) :
     
[**Documentation**](https://www.npmjs.com/package/node-gyp#on-windows) 

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

![](https://sikelio.s-ul.eu/bOPAmKH6)  
Les boutons indique déjà les actions que vous pouvez faire.  

Premier bouton : Piste audio précédente  
Deuxième bouton : Mettre en plause ou continuer la piste audio  
Troisième Bouton : Piste audio suivante

## Changer les macros

---

Vous pouvez retrouver la liste des keycodes à l'adresse suivante :  
[Keycodes](https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)  

Il vous suffit de soit prendre la valeur hexadecimale de type : `0xB1`, soit de convertir la valeur hexadecimale en décimale `0xB1 <-> 177`, ou encore créer une variable avec le code hexadecimal ou décimal :  

Exemple:  

Hex :
```javascript
sendInput.SendInput
([
    {val: 0xB1, type: 0 }
]);
```
Dec :
```javascript
sendInput.SendInput
([
    {val: 177, type: 0 }
]);
```
Hex & Dec :
```javascript
const INPUT_DEC = 177, INPUT_HEX = 0xB1;

sendInput.SendInput
([
    {val: INPUT_DEC, type: 0 }
]);

sendInput.SendInput
([
    {val: INPUT_HEX, type: 0 }
]);
```

## Contributeurs

---
[![Sikelio, Anthony Bosco](https://contrib.rocks/image?repo=oskardrevetnitschke/node_keyboard)](https://github.com/oskardrevetnitschke/node_keyboard/graphs/contributors)
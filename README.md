# node_keyboard

Projet destiné à envoyé des hotkeys à un ordinateur depuis son téléphone.

## Installation

------

Pour installer ce projet chez vous, clonez d'abord ce dossier sur votre machine.

```console
git clone https://github.com/oskardrevetnitschke/node_keyboard
```

Puis ouvrez un terminal à l'intérieur du dossier que vous venez de cloner et ajoutez y le module node-key-sender avec la commande suivante:

```console
npm install sendinput
```

Pensez à lire les prérequis en fonction de votre système d'exploitation avant d'installer la librairie [**sendinput**](https://www.npmjs.com/package/sendinput) avant de lancer le script.  
  
En effet la librairie [**sendinput**](https://www.npmjs.com/package/sendinput) est dépendante de [**node-gyp**](https://www.npmjs.com/package/node-gyp) qui nécessite une version de Python supérieure ou égale à 3.6 ainsi qu'un compilateur C/C++.  
  
Python:  

Windows: Soit vous téléchargez l'exécutable depuis le site officiel de [**Python**](https://www.python.org/downloads/). Soit vous téléchargez Python directement depuis le [**Microsoft Store**](ms-windows-store:).

Pour plus d'explications vous retrouverez la documentation ci dessous:  
     
[**Windows**](https://www.npmjs.com/package/node-gyp#on-windows) 

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

## Changer les macros

---

Pour Windows, vous pouvez retrouver la liste des keycodes à l'adresse suivante: [Lien](https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes)  

Il vous suffit de soit prendre la valeur hexadecimale de type : `0xB1`, soit de convertir la valeur hexadecimale en décimale `0xB1 <-> 177`, ou encore créer une variable avec le code hexadecimal ou décimal :  

Exemple:  

Hex
```javascript
sendInput.SendInput
([
    {val: 0xB1, type: 0 }
]);
```
Dec
```javascript
sendInput.SendInput
([
    {val: 177, type: 0 }
]);
```
Hex & Dec
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
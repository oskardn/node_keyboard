![](https://img.shields.io/badge/node_keyboard-1.0.0-blue)  

# Node Keyboard

Projet destiné à pouvoir controller l'audio de son pc depuis son téléphone (Une application pour téléphone est actuellement en cours de développement).  
Ce projet fonctionne seulement sur Windows, puisque la librairie utilisée pour l'envois de macros est utilisatble uniquement par Windows.

## Installation

------

Pour installer ce projet chez vous, clonez d'abord ce dossier sur votre machine.

```console
git clone https://github.com/oskardn/node_keyboard.git
```

Puis ouvrez un terminal à l'intérieur du dossier que vous venez de cloner et ajoutez y les dépendance avec la commande suivante :

```console
yarn install
```

Pensez à lire les prérequis en fonction de votre système d'exploitation avant d'installer les librairies.  

## Lancement de l'instance

---

Pour exécuter le programme rendez vous dans le dossier du projet et éxécutez depuis un terminal :

```console
yarn start
```
Si vous souhaitez installer le logiciel sur votre ordinateur exécutez la commande suivante :  

```console
yarn dist
```
Vous aurez un dossier ("dist") qui va créer dans la racine du projet dans lequel vous trouverez l'installateur.

## Accéder à l'interface

---

Une fois l'application lancée, vous accéderez à l'interface suivante :  

![](https://sikelio.s-ul.eu/XacVa10S)  

Vous pouvez choisir entre "App" et "Config"?  
 - App : Permet d'accéder à une interface permettant de controller le son de votre ordinateur. ![](https://sikelio.s-ul.eu/uZhHxiYE)
 - Config : Permet de changer les paramètres de connection au serveur comme le mot de passe d'accès ainsi que le port. ![](https://sikelio.s-ul.eu/OXTGV6zx)

## Contributeurs

---
[![Sik', AnthoDingo](https://contrib.rocks/image?repo=oskardrevetnitschke/node_keyboard)](https://github.com/oskardrevetnitschke/node_keyboard/graphs/contributors)
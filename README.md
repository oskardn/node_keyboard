![](https://img.shields.io/badge/sikontrol-1.0.0-blue)

# Sikontrol

Projet destiné à pouvoir controller l'audio de son pc depuis son téléphone.  
Ce projet fonctionne seulement sur Windows, puisque la librairie utilisée pour l'envois de macros est utilisatble uniquement par Windows.  
  
**L'application est déjà disponible ici : [sikontrol-app](https://github.com/oskardn/sikontrol-app)**

## Installation

---

Pour installer ce projet chez vous, clonez d'abord ce dossier sur votre machine.

```console
git clone https://github.com/oskardn/sikontrol.git
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

![](https://sikelio.s-ul.eu/MB1hdpix)

Vous pouvez choisir entre "App" et "Config"?

-   App : Permet d'accéder à une interface permettant de controller le son de votre ordinateur.  
    ![](https://sikelio.s-ul.eu/AD2g0B3m)

-   Config : Permet de changer les paramètres de connection au serveur comme le mot de passe d'accès ainsi que le port.  
    ![](https://sikelio.s-ul.eu/86X94O1T)

## Type de variables

---

Chacune des varibales possède un attribut qui définit le type du contenu :

| Attritut | Type      | Définition          |
| -------- | --------- | ------------------- |
| a        | Array     | Tableau             |
| c        | Class     | Classe              |
| e        | Element   | Objjet DOM          |
| io       | Socket.IO | Requête Socket.IO   |
| n        | Number    | Nombre              |
| o        | Object    | JSON                |
| s        | String    | Chaine de caractère |
| v        | Void      | Pas de typage       |

## Contributeurs

---

[![Sik', AnthoDingo](https://contrib.rocks/image?repo=oskardn/sikontrol-desktop)](https://github.com/oskardn/sikontrol-desktop/graphs/contributors)

![](https://img.shields.io/badge/sikontrol-1.0.0-blue)

# Sikontrol

Projet destiné à pouvoir controller l'audio de son pc depuis son téléphone.  
Ce projet fonctionne seulement sur Windows, puisque la librairie utilisée pour l'envois de macros est utilisatble uniquement par Windows.  
  
**L'application est déjà disponible ici : [sikontrol-app](https://github.com/sikelio/sikontrol-app)**

## Installation

---

Pour installer ce projet chez vous, vous pouvez télécharger la dernière [**release**](https://github.com/sikelio/sikontrol-desktop/releases/tag/v1.0.0).  

Soit vous clonez ce dossier sur votre machine.

```console
git clone https://github.com/sikelio/sikontrol.git
```

Puis ouvrez un terminal à l'intérieur du dossier que vous venez de cloner et ajoutez y les dépendance avec la commande suivante :

```console
yarn install
```

Pensez à lire les prérequis en fonction de votre système d'exploitation avant d'installer les librairies.


## Lancement de l'instance

---

Pour exécuter le programme, éxécutez le depuis le menu démarrer ou rendez vous dans le dossier du projet et éxécutez depuis un terminal :

```console
yarn start
```

Par défaut le token vaut **`1234`** et le port vaut **`3000`**

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

## Contributeurs

---

[![Sik', AnthoDingo](https://contrib.rocks/image?repo=sikelio/sikontrol-desktop)](https://github.com/sikelio/sikontrol-desktop/graphs/contributors)

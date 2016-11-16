# Vita Cena Health App

Im Rahmen des Master-Wahlfach IoT-Hackathon an der Hochschule Reutlingen wurde eine Smart-Health-Geschäftsanwendungsfall erdacht und umgesetzt. Der Anwendungsfall sieht eine IoT-Umsetzung für einen Fitnesstracker vor, um Mahlzeiten mit detailierten Informationen aus Essen-Kantinen über eine App dem Fitnesstracker hinzuzufügen.

### MVP

Aufgrund der begrenzten Zeit des Hackathon wurden folgende MVP-Anforderungen für ein minimales akzeptables Produkt definiert:

* Implementierung von Beacons, die Mahlzeiten-IDs versenden, mit diesen lassen sich Mahlzeiten vorauswählen
* Auf der IBM Bluemix Platform sind die Nährwertangeben und Informationen zu den Mahlzeiten persistent gespeichert, zusätzlich werden die Mahlzeiten den entsprechenden Mahlzeiten zugeordnet
* Implementierung einer REST-Schnittstelle über welche die Informationen einer Mahlzeit über die Beacon-ID abgefragt werden kann
* Umsetzung einer nutzerfreundlichen IONIC App, welche detailierte Informationen zu angebotenen Mahlzeiten anbietet

### Architektur

![Overview](https://github.com/VitaCena/HealthApp/blob/master/Architektur.PNG)


Die Geschäftslogik ist über IBM Bluemix als 'Node-RED' Cloud Anwendung abgebildet und bietet eine REST-Kommunikations-Schnittstelle zur Jawbone-API und stellt eine REST-Schnittstelle zum Hinzufügen von Mahlzeiten zur Verfügung


### Eingesetzte Komponenten

* Fitnesstracker Jawbone UP
* iBeacon
* IBM Bluemix
* Raspberry 3

### Links

* [Endpoint Meals](https://jawbone.com/up/developer/endpoints/meals)
* [Jawbone Doku] (https://jawbone.com/up/developer/)
* [IoT Kaffeekanne on Twitter](https://twitter.com/kaffeekanne1)
* [IONIC Framework] (http://ionicframework.com/)

### Projektteam

* Simon Bantle
* Andreas Hellmann
* Moritz Kornmeier
* Adrian Reh

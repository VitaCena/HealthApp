# Vita Cena Health App

Im Rahmen des Master-Wahlfach IoT-Hackathon an der Hochschule Reutlingen wurde eine Smart-Health-Geschäftsanwendungsfall erdacht und umgesetzt. Der Anwendungsfall sieht eine IoT-Umsetzung für einen Fitnesstracker vor, um Mahlzeiten mit detailierten Informationen aus Essen-Kantinen über eine App dem Fitnesstracker hinzuzufügen. In der Kantine werden iBeacons jeweils einer Mahlzeit zugeordnet. Diese senden ihre jeweilige Beacon-ID, welche in der Datenbank auf eine bestimmten Mahlzeit gemappt ist. Die Informationen dieser Mahlzeit werden über die IBM Bluemix Anwendung abgefragt und dem Nutzer auf der App angezeigt. Der Nutzer kann eine angezeigte Mahlzeit auswählen und bestätigen. Nach Bestätigung wird die Mahlzeit über IBM Bluemix mithilfe der Jawbone API dem Jawbone UP hinzugefügt. Über Jawbone UP App können die hinzugefügten Mahlzeiten überprüft werden.

### MVP

Aufgrund der begrenzten Zeit des Hackathon wurden folgende MVP-Anforderungen für ein minimales akzeptables Produkt definiert:

* Implementierung von Beacons, die Mahlzeiten-IDs versenden, mit diesen lassen sich Mahlzeiten vorauswählen
* Auf der IBM Bluemix Platform sind die Nährwertangeben und Informationen zu den Mahlzeiten persistent gespeichert, zusätzlich werden die Mahlzeiten den entsprechenden Mahlzeiten zugeordnet
* Implementierung einer REST-Schnittstelle über welche die Informationen einer Mahlzeit über die Beacon-ID abgefragt werden kann
* Umsetzung einer nutzerfreundlichen IONIC App, welche detailierte Informationen zu angebotenen Mahlzeiten anbietet

### Architektur

![Overview](https://github.com/VitaCena/HealthApp/blob/master/Architektur.PNG)


Die Geschäftslogik ist über IBM Bluemix als ['Node-RED'](http://vita-cena.mybluemix.net/) Cloud Anwendung abgebildet und bietet eine REST-Kommunikations-Schnittstelle zur Jawbone-API und stellt eine REST-Schnittstelle zum Hinzufügen von Mahlzeiten zur Verfügung


### Eingesetzte Komponenten

* Fitnesstracker Jawbone UP (als Essenstracker)
* iBeacon
* [IBM Bluemix] (https://hub.jazz.net/project/vitacena/Vita%20Cena/overview)
* Raspberry 3
* [Cita Vena App] (https://github.com/VitaCena/HealthApp/blob/master/www/)

### Links

* [Endpoint Meals](https://jawbone.com/up/developer/endpoints/meals)
* [Jawbone Doku] (https://jawbone.com/up/developer/)
* [IONIC Framework] (http://ionicframework.com/)

### Projektteam

* Simon Bantle
* Andreas Hellmann
* Moritz Kornmeier
* Adrian Reh

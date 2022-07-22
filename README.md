# **PianoFlow**

## Beschreibung

'PianoFlow' ist eine musikalische Anwendung zum Erstellen von eigenen Soundtracks. Mithilfe der ausgewählten Klaviertasten können Melodien live gespielt, aufgenommen und gespeichert werden. Die Effekt-Buttons kreieren weitere Möglichkeiten der Bearbeitung und Wiedergabe.

## **Features**

folgend eine kurze visuelle Darstellung der Anwendung und deren Funktionen:
**Bild von Anwendung*
### 1. Sound Visualisierung
Hier werden die Audio-Inputs analysiert, gezeichnet und in einer Animation wiedergegeben.
### 2. Piano
Über die Klaviatur wird mittels der WebAudioAPI der korrespondierende Ton für diese Taste erzeugt und damit ein Klavier simuliert.
Die Tasten erzeugen solange einen Ton, wie die angeklickt und gehalten werden.
### 2. Aufnahme eigener Titel
Über die Buttons "Rec." und "Save" können eigene Melodien aufgenommen und gespeichert werden.
Dazu muss zuerst der "Rec" Button betätigt werden, um eine Aufnahme zu starten.
Danach wird die gewünschte Melodie auf der Klaviatur eingespielt und mit einem erneuten klicken auf "Save" wird die Aufnahme beendet.

Was passiert wenn kein Titel eingegeben wurde?

### 3. gespeicherte Titel
Die gespeicherten Titel werden in einer chronologischen Liste aus Playern dargestellt.
Die Wiedergabe der separaten Titel kann einzeln über die Button des jeweiligen Players gestartet, gestoppt und zurückgesetzt werden.

TODO: Soll die Anpassung der Abspielgeschwindigkeit hier auch rein?

### 4. anwendbare Effekte

## 4.1 Beats
Beats werden über die 3 Buttons in der oberen linken Ecke durch einen Klick gestartet.
Ein weiterer Klick beendet den Beat wieder.
## 4.2 OktavenWahl 
In der Oktavenwahl kann im Dropdown aus 8 verschiedenen Tonhöhen gewählt werden. 
Dabei wird die Frequenz der Töne entsprechend der gewählten Oktave geändert.
## 4.3 Lautstärke
TODO: Gilt das für alles oder nur gespeicherte Titel?
## 4.4 Wiedergabegeschwindigkeit 
TODO: wird es im player gemacht oder hier
### 5. Laufzeit des Titels
Hier wird die Laufzeit des spielenden Titels dargestellt.
## Demo

TODO: Wie wollen wir die Demo machen
Genau den Userflow planen

##Installation
Zum Starten der Anwendung wird Node.js benötigt. Bitte der Verlinkung zur Installation folgen, falls nötig. Ist Node.js installiert. Dann kann die Anwendung über die Eingabe des Befehls npm start in das Terminal gestartet werden. Meist öffnet sich der Browser automatisch, sollte dies nicht der Fall sein, so ist 'PianoFlow' über http://localhost:3000 aufrufbar.
Wir empfehlen den Browser Google Chrome, Chrome basierte Browser, oder Microsoft Edge zu nutzen in anderen Browsern kann es sein, dass die Anwendung nicht richtig funktioniert.

```links
git clone git@github.com:Ktechen/avpiano.git (SSH) oder
git clone https://github.com/Ktechen/avpiano.git (HTTPS)
```

```bash
npm install
npm start
open http://localhost:3000
```

##Projekt
'PianoFlow' ist das Ergebnis der Projektarbeit im Modul "Multimedia Audio- und Videotechnik" im Sommersemster 2022. "PianoFlow" soll eine Anwendung zum Erstellen von eigenen Soundtracks bieten. Mithilfe des Designs und den anwendbaren Features soll das Kreieren von Musik leicht und spielerisch werden.


##genutzte Technologien
Web Audio API

## Autoren
Kevin Techen
Kurt-Kester Leißering
Marvin Meitzner
Sophia Piyamit

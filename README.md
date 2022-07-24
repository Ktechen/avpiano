# **PianoFlow**

## Beschreibung

'PianoFlow' ist eine musikalische Anwendung zum Erstellen von eigenen Soundtracks. Mithilfe der ausgewählten Klaviertasten können Melodien live gespielt, aufgenommen und gespeichert werden. Die Effekt-Buttons kreieren weitere Möglichkeiten der Bearbeitung und Wiedergabe.

## Technologien

- Web Audio API
- Vanilla JS
- HTML
- CSS
- Node.js (live-server)
- MediaStream Recording API


# **Features**

## 1. Mediaplayer

Umfangreicher Mediaplayer mit diversen Optionen für die Regelung der Lautstärke, Wiedergabegeschwindigkeit, einer Option für das Wiederholen ("loopen") von Audiospuren, einem Mute-Button für alle Audiospuren und Ähnliches.

## 2. Piano

Über die Klaviatur wird mittels der WebAudioAPI der korrespondierende Ton für diese Taste erzeugt und damit ein Klavier simuliert.
Die Tasten erzeugen solange einen Ton, wie die angeklickt und gehalten werden.

In der Oktavenwahl kann im Dropdown aus 8 verschiedenen Tonhöhen gewählt werden.
Dabei wird die Frequenz der Töne entsprechend der gewählten Oktave geändert.


## 3. Sound Visualisierung für das Piano

Hier werden die Audio-Inputs analysiert, gezeichnet und in einer Animation wiedergegeben.


## 4. Aufnahme eigener Titel

Über die Buttons "Rec." und "Save" können eigene Melodien aufgenommen und gespeichert werden.
Dazu muss zuerst der "Rec" Button betätigt werden, um eine Aufnahme zu starten.
Danach wird die gewünschte Melodie auf der Klaviatur eingespielt und mit einem erneuten klicken auf "Save" wird die Aufnahme beendet.
Ein Name kann zusätzlich über das Texteingabefeld vergeben werden.
Die gespeicherten Titel werden in einer chronologischen Liste aus Audio-Tracks im Audio-Dropdown dargestellt.

## 5. Audio Dropdown

Die Selektierung der Audio-Tracks erfolgt über ein Dropdown-Menü. Die Variablen der veränderbaren Eigenschaften der Audio-Tracks sind Play, Stop, Reset und Mute.
Außerdem stehen noch zusätzliche Optionen zur Manipulation von Audiospuren zur Verfügung, siehe Kategorie "Mediaplayer".

## 6. Beatkit

![Piano Abspiel Funktionen](/documentation/Drums.gif)

Eine Art "Mini-Schlagzeug" mit dem man manuell eigene Beats kreieren kann, die sich automatisch loopen.


## Demo

### Piano + Aufnahme

![Piano Aufnahme Funktionen](/documentation/Piano_Record.gif)

### Song Abspielen

![Piano Abspiel Funktionen](/documentation/Piano_Play.gif)

## Installation

Zum Starten der Anwendung wird Node.js benötigt. Bitte der Verlinkung zur Installation folgen, falls nötig. Ist Node.js installiert. Dann kann die Anwendung über die Eingabe des Befehls npm start in das Terminal gestartet werden. Meist öffnet sich der Browser automatisch, sollte dies nicht der Fall sein, so ist 'PianoFlow' über http://127.0.0.1:8090 aufrufbar.
Wir empfehlen den Browser Google Chrome, Chrome basierte Browser oder Microsoft Edge zu nutzen.


Clonen des Repositorys
```links
git clone git@github.com:Ktechen/avpiano.git (SSH) 
```

#### Installieren der Bibliotheken

```bash
npm install
```

#### Starten des Webservers

```bash
npm start
```

Web-Anwendung startet unter: http://127.0.0.1:8090

## Projekt

'PianoFlow' ist das Ergebnis der Projektarbeit im Modul "Multimedia Audio- und Videotechnik" im Sommersemster 2022. "PianoFlow" soll eine Anwendung zum Erstellen von eigenen Soundtracks bieten. Mithilfe des Designs und den anwendbaren Features soll das Kreieren von Musik leicht und spielerisch gestaltet werden.

## Zukünftige Ideen
- REST API Backend zum speichern (POST) und Abrufen (GET) der Audio-Tracks.
- Hinzufügen von Youtube Links als Audio-Track
- Wechseln zwischen dem aktuellen Piano und einem vollständigen Piano mit einer Visualisierung aller Oktaven
- Piano Steuerung über die Tastatur

## Autoren

Kevin Techen

Kurt-Kester Leißering

Marvin Meitzner

Sophia Piyamit

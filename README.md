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


### ` 1. Sound Visualisierung für das Piano`

![Piano_Visualizer](https://user-images.githubusercontent.com/72447271/180659911-ab37350b-9f30-453c-ba68-e7d2435bc4c1.gif)

Hier werden die Audi-Inputs der Klaviatur analysiert, gezeichnet und in einer Animation wiedergegeben.

### `2. Piano`

Über die Klaviatur wird mittels der WebAudioAPI der korrespondierende Ton für diese Taste erzeugt und damit ein Klavier simuliert.
Die Tasten erzeugen solange einen Ton, wie diese angeklickt und gehalten werden.


### `3. Beatkit`

![Piano Abspiel Funktionen](/documentation/Drums.gif)

Eine Art "Mini-Schlagzeug" mit dem man manuell eigene Beats kreieren kann, die sich automatisch loopen.

### `4. Aufnahme eigener Titel`

Über die Buttons "Rec." und "Save" können eigene Melodien aufgenommen und gespeichert werden.
Dazu muss zuerst der "Rec" Button betätigt werden, um eine Aufnahme zu starten.
Danach wird die gewünschte Melodie auf der Klaviatur eingespielt und mit einem erneuten klicken auf "Save" wird die Aufnahme beendet.
Ein Name kann zusätzlich über das Texteingabefeld vergeben werden.
Die gespeicherten Titel werden in einer chronologischen Liste aus Audio-Tracks im Audio-Dropdown dargestellt.



### `5. Pitch Auswahl`

In der Pitch-Auswahl kann im Dropdown aus 8 verschiedenen Tonhöhen gewählt werden.
Dabei wird die Frequenz der Töne entsprechend des gewählten Pitches geändert.

### `6. Wiedergabe gespeicherter Titel`

Die Selektierung der Audio-Tracks erfolgt über ein Dropdown-Menü. Die gespeicherten Titel können über die 4 Mediaplayer Buttons gestartet, gestopt, zurückgesetzt und stumm geschaltet werden.
Außerdem stehen noch zusätzliche Optionen zur Manipulation von Audiospuren zur Verfügung. Mittels des Sliders "Track Time" kann im Titel ein beliebige Zeitpunkt ausgewählt werden. Der "Volume" Slider ermöglicht das verändern der Lautstärke des ausgewählten Titels. Die Geschwindigkeit des Titels kann über den Slider "PLay Rate" abgesenkt oder angehoben werden.

### `7. Kontrollpanel für alle gespeicherten Titel`

In diesem Bereich lassen sich alle gespeicherten Titel zeitgleich starten, stoppen, neustarten und stummschalten. Es ist möglich mit dem Button "Loop On" die Titel in einer Dauerschleife spielen zu lassen. Mit dem "Loop Off" Button lässt sich die Dauerschleife beenden. 

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

Die Projektplanung und Kommunikation wurde mit dem Online Whiteboard Tool [Miro](https://miro.com/app/board/uXjVOuTjv_o=/?share_link_id=937947553747) umgesetzt.

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

import {PianoDataSet} from "./PianoDataSet.js";

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscList = [];
let mainGainNode = null;
let keyboard = document.querySelector(".keys");
let volumeControl = document.getElementById("volume x mt1");
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;

const noteFreq = new PianoDataSet().createNoteTable();

const octaveDropdown = document.getElementById("octave-dropdown");
octaveDropdown.addEventListener("change", (e) => changeOctave(e.target.value));

setup();

function setup() {
    changeOctave(4);

    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);

    sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    cosineTerms = new Float32Array(sineTerms.length);
    customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

    for (let i = 0; i < 9; i++) {
        oscList[i] = {};
    }
}

function changeOctave(layer) {
    noteFreq.forEach((keys, index) => {
        let keyList = Object.entries(keys);
        if (index === Number(layer)) {
            keyList.forEach(key => {
                setupKey(key[0], layer, key[1], document.getElementById(key[0]))
            });
            console.log(keyList);
        }
    });
}

function setupKey(note, octave, freq, key) {
    key.dataset["octave"] = octave;
    key.dataset["note"] = note;
    key.dataset["frequency"] = freq;

    key.addEventListener("mousedown", notePressed, false);
    key.addEventListener("mouseup", noteReleased, false);
    key.addEventListener("mouseover", notePressed, false);
    key.addEventListener("mouseleave", noteReleased, false);
}


function playTone(freq) {
    let osc = audioContext.createOscillator();
    osc.connect(mainGainNode);

    let type = "sine";

    if (type === "custom") {
        osc.setPeriodicWave(customWaveform);
    } else {
        osc.type = type;
    }

    osc.frequency.value = freq;
    osc.start();

    return osc;
}

function notePressed(event) {
    if (event.buttons & 1) {
        let dataset = event.target.dataset;

        if (!dataset["pressed"]) {
            let octave = +dataset["octave"];
            oscList[octave][dataset["note"]] = playTone(dataset["frequency"]);
            dataset["pressed"] = "yes";
        }
    }
}

function noteReleased(event) {
    let dataset = event.target.dataset;

    if (dataset && dataset["pressed"]) {
        let octave = +dataset["octave"];
        oscList[octave][dataset["note"]].stop();
        delete oscList[octave][dataset["note"]];
        delete dataset["pressed"];
    }
}

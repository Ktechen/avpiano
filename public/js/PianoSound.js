import { getMediaStreamDestination } from "./Recorder.js";
import { PianoDataSet } from "./PianoDataSet.js";

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscList = [];
let osc;
let mainGainNode = null;
let volumeControl = document.getElementById("volume-button");
const octaveDropdown = document.getElementById("octave-dropdown");
let sineTerms = null;
let noteFreq = new PianoDataSet().createNoteTable();


export function getPianoAudioContext() {
  return audioContext;
}

/**
 * saves frequency to a certain note on the equivalent key on the UI and sets up corresponding eventlisteners
 */
function setupKey(note, octave, freq, key) {
  key.dataset["octave"] = octave;
  key.dataset["note"] = note;
  key.dataset["frequency"] = freq;

  key.addEventListener("mousedown", notePressed);
  key.addEventListener("mouseup", noteReleased);
  key.addEventListener("mouseover", notePressed);
  key.addEventListener("mouseleave", noteReleased);
}

/**
 * triggers oscillator with given frequency and produces the desired note-sound
 */
function playTone(freq) {
  osc = audioContext.createOscillator();
  osc.connect(mainGainNode);
  let dest = getMediaStreamDestination();
  mainGainNode.connect(dest);

  let type = "sine";

  osc.frequency.value = freq;
  osc.start();

  return osc;
}

/**
 * responsible for keeping the "states" of the buttons up to date and responsible for triggering "playTone" whenever the state allows it to
 */
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

/**
 * another function to alter states of the keys and kills oscillator on demand
 */
function noteReleased(event) {
  let dataset = event.target.dataset;

  if (dataset && dataset["pressed"]) {
    let octave = +dataset["octave"];
    oscList[octave][dataset["note"]].stop();
    delete oscList[octave][dataset["note"]];
    delete dataset["pressed"];
  }
}

/**
 * changes keys on the piano to the desired octave (layer)
 */
function changeOctave(layer) {
  noteFreq.forEach((keys, index) => {
    let keyList = Object.entries(keys);
    if (index === Number(layer)) {
      keyList.forEach((key) => {
        setupKey(key[0], layer, key[1], document.getElementById(key[0]));
      });
    }
  });
}

function changeVolume(event) {
	mainGainNode.gain.value = volumeControl.value
}

/**
 * sets up eventlisteners for utility-functions, gives piano a default octave (4) and defines the form the of the sinus-wave used to create sounds in the oscillators
 */
function setup() {
  changeOctave(4);
  octaveDropdown.addEventListener("change", (e) => changeOctave(e.target.value));
  volumeControl.addEventListener("change", changeVolume, false);
  mainGainNode = audioContext.createGain();
  mainGainNode.connect(audioContext.destination);
  mainGainNode.gain.value = volumeControl.value;

  sineTerms = new Float32Array([0, 0, 1, 0, 1]);


  for (let i = 0; i < 9; i++) {
    oscList[i] = {};
  }
}

setup();

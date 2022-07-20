let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscList = [];
let mainGainNode = null;
let keyboard = document.querySelector(".keys");
let volumeControl = document.getElementById("volume x mt1");
let noteFreq = null;
let customWaveform = null;
let sineTerms = null;
let cosineTerms = null;


function createNoteTable() {
	let noteFreq = [];
	for (let i=0; i< 9; i++) {
	  noteFreq[i] = [];
	}


	noteFreq[4]["C"] = 261.625565300598634;
	noteFreq[4]["C#"] = 277.182630976872096;
	noteFreq[4]["D"] = 293.664767917407560;
	noteFreq[4]["D#"] = 311.126983722080910;
	noteFreq[4]["E"] = 329.627556912869929;
	noteFreq[4]["F"] = 349.228231433003884;
	noteFreq[4]["F#"] = 369.994422711634398;
	noteFreq[4]["G"] = 391.995435981749294;
	noteFreq[4]["G#"] = 415.304697579945138;
	noteFreq[4]["A"] = 440.000000000000000;
	noteFreq[4]["A#"] = 466.163761518089916;
	noteFreq[4]["B"] = 493.883301256124111;


	return noteFreq;
  }

function setup() {
	noteFreq = createNoteTable();


	noteFreq.forEach(function(keys, idx) {
		let keyList = Object.entries(keys);
	
		keyList.forEach(function(key) {
		  
			setupKey(key[0], 4, key[1], document.getElementById(key[0]))
		  
		});
	
	  });


	mainGainNode = audioContext.createGain();
	mainGainNode.connect(audioContext.destination);
	//mainGainNode.gain.value = volumeControl.value;

 
	sineTerms = new Float32Array([0, 0, 1, 0, 1]);
	cosineTerms = new Float32Array(sineTerms.length);
	customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);
  
	for (let i=0; i<9; i++) {
		oscList[i] = {};
	}

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
  
	if (type == "custom") {
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


setup();

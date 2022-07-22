let context = new (window.AudioContext || window.webkitAudioContext)();

let flag = false; 
let volumeControl = document.getElementById("volume x mt1");


function Kick(context) {
	this.context = context;
};

function Snare(context) {
	this.context = context;
};

function SnapKick(context) {
	this.context = context;
};


Snare.prototype.noiseBuffer = function() {
	var bufferSize = this.context.sampleRate;
	var buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
	var output = buffer.getChannelData(0);

	for (var i = 0; i < bufferSize; i++) {
		output[i] = Math.random() * 2 - 1;
	}

	return buffer;
};

Snare.prototype.setup = function() {
	this.noise = this.context.createBufferSource();
	this.noise.buffer = this.noiseBuffer();
	var noiseFilter = this.context.createBiquadFilter();
	noiseFilter.type = 'highpass';
	noiseFilter.frequency.value = 1000;
	this.noise.connect(noiseFilter);
	this.noiseEnvelope = this.context.createGain();
    noiseFilter.connect(this.noiseEnvelope);
    this.noiseEnvelope.connect(this.context.destination);
    this.osc = this.context.createOscillator();
    this.osc.type = 'triangle';
    this.oscEnvelope = this.context.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.context.destination);
};

Snare.prototype.trigger = function(time) {
	this.setup();

	this.noiseEnvelope.gain.setValueAtTime(1, time);
	this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
	this.noise.start(time)

	this.osc.frequency.setValueAtTime(100, time);
	this.oscEnvelope.gain.setValueAtTime(0.7, time);
	this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
	this.osc.start(time)

	this.osc.stop(time + 0.2);
	this.noise.stop(time + 0.2);
};

Kick.prototype.setup = function() {
    
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination)
};

Kick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(150, time);
	this.gain.gain.setValueAtTime(1, time);

	this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

	this.osc.start(time);

	this.osc.stop(time + 0.5);
};

SnapKick.prototype.setup = function() {
    
	this.osc = this.context.createOscillator();
	this.gain = this.context.createGain();
	this.osc.connect(this.gain);
	this.gain.connect(this.context.destination)
};

SnapKick.prototype.trigger = function(time) {
	this.setup();

	this.osc.frequency.setValueAtTime(500, time);
	this.gain.gain.setValueAtTime(1, time);

	this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.25);
	this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

	this.osc.start(time);

	this.osc.stop(time + 0.3);
};

function runSnare() {

	console.log("snare");
	let snare = new Snare(context);
	runBeat(snare);
}

function runKick() {

	let kick = new Kick(context);
	runBeat(kick);
}

function runSnapKick() {

	let snapkick = new SnapKick(context);
	runBeat(snapkick);
}



function setup() {
	let snareButton = document.getElementById("snare");
	let kickButton = document.getElementById("kick");
	let skButton = document.getElementById("snapkick");
    snareButton.addEventListener("mousedown", runSnare);
	kickButton.addEventListener("mousedown", runKick);
	skButton.addEventListener("mousedown", runSnapKick);
}

function runBeat(beatkit) {
 
    flag = !flag;

    
    setTimeout(function loop () {
        beatkit.trigger(context.currentTime);
      
        if (flag) 
          setTimeout(loop, 1000);
      }, 1000);
    console.log("beat is starting...");

}

setup(); 

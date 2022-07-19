import { getPianoAudioContext } from "./PianoSound.js";
import { AudioHandler } from "./AudioHandler.js";
import { AudioVisualizer } from "./AudioVisualizer.js";
import { getAudioInstance } from "./AudioController.js";
import { AudioContextDto } from "./AudioContextDto.js";

const record = document.querySelector("#record");
const saveSong = document.querySelector("#save_song");

// disable saveSong button while not recording
saveSong.disabled = true;

let audioContext = getPianoAudioContext();
let dest = audioContext.createMediaStreamDestination();

export function getMediaStreamDestination() {
  return dest;
}

let chunks = [];

const mediaRecorder = new MediaRecorder(dest.stream);

record.onclick = function () {
  mediaRecorder.start();
  console.log(mediaRecorder.state);
  console.log("recorder started");
  record.style.background = "red";

  saveSong.disabled = false;
  record.disabled = true;
};

saveSong.onclick = function () {
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
  record.style.background = "";
  record.style.color = "";
  // mediaRecorder.requestData();

  saveSong.disabled = true;
  record.disabled = false;
};

mediaRecorder.onstop = function (e) {
  let clipName = document.getElementById("song_name").value;

  if (!clipName) {
    clipName = "My unnamed clip";
  }

  const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  chunks = [];
  const audioURL = window.URL.createObjectURL(blob);
  console.log("recorder stopped");

  //Create Option
  let songs = document.getElementById("song_names");
  let newOption = document.createElement("option");
  newOption.innerHTML = clipName;
  newOption.value = audioURL;

  songs.appendChild(newOption);

  const audioHandler = new AudioHandler(new Audio(audioURL));
  let audioVisualizer = new AudioVisualizer(audioHandler.getAudio());
  let audioContextDto = new AudioContextDto(audioVisualizer, audioHandler);

  const audioInstance = getAudioInstance();
  audioInstance.addToDict(audioURL, audioContextDto);
};

mediaRecorder.ondataavailable = function (e) {
  chunks.push(e.data);
};

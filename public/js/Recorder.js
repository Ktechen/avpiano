import { getPianoAudioContext } from "./PianoSound.js";
import { AudioHandler } from "./AudioHandler.js";
import { AudioVisualizer } from "./AudioVisualizer.js";
import { getAudioInstance } from "./AudioController.js";
import { AudioContextDto } from "./AudioContextDto.js";

const record = document.querySelector("#record");
const saveSong = document.querySelector("#save_song");
const soundClips = document.querySelector(".sound-clips");

// disable saveSong button while not recording

saveSong.disabled = true;

let audioContext = getPianoAudioContext();
let dest = audioContext.createMediaStreamDestination();

export function getMediaStreamDestination() {
  return dest;
}
//main block for doing the audio recording

const constraints = { audio: true };
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
  console.log("data available after MediaRecorder.stop() called.");

  const clipContainer = document.createElement("article");
  const clipLabel = document.createElement("p");
  let clipName = document.getElementById("song_name").value;
  const audio = document.createElement("audio");
  const deleteButton = document.createElement("button");

  clipContainer.classList.add("clip");
  audio.setAttribute("controls", "");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";

  if (!clipName) {
    clipName = "My unnamed clip";
  }
  clipLabel.textContent = clipName;

  clipContainer.appendChild(clipLabel);
  clipContainer.appendChild(audio);
  clipContainer.appendChild(deleteButton);
  soundClips.appendChild(clipContainer);

  audio.controls = true;
  const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
  chunks = [];
  const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;
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

  deleteButton.onclick = function (e) {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
  };
};

mediaRecorder.ondataavailable = function (e) {
  chunks.push(e.data);
};

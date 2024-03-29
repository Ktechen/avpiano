import { AudioInstance } from "./AudioInstance.js";
import { AudioVisualizer } from "./AudioVisualizer.js";

let audioHandler;
let audioVisualizer;
let audioInstance;

const volumeStartRateDefault = 0.3;
const playbackRateDefault = 1;
const timeSlideRateDefault = 0;
const intervalTimerDefault = 250;

initAudioHandler();

function initAudioHandler() {
  audioInstance = new AudioInstance();
  initListener();
  const firstStartAudio = audioInstance.InstanceDict["default_sound.mp3"];
  audioHandler = firstStartAudio._AudioHandler;
  audioVisualizer = new AudioVisualizer();
}

function initListener() {
  const startButton = document.getElementById("start-button");
  const CurrentTime = document.getElementById("CurrentTime");
  const pauseButton = document.getElementById("pause-button");
  const restartButton = document.getElementById("restart-button");
  const restartAllButton = document.getElementById("restartAll-button");
  const volumeButton = document.getElementById("volume-button");
  const timeSlide = document.getElementById("timeSlide-Button");
  const playbackRateButton = document.getElementById("playbackRate-button");
  const loopButtonFalse = document.getElementById("loopFalse-button");
  const loopButtonTrue = document.getElementById("loopTrue-button");
  const EndingTime = document.getElementById("EndingTime");
  const enableMute = document.getElementById("enableMute-button");
  const enableAllMute = document.getElementById("enableAllMute-button");
  const stopAll = document.getElementById("stopAll-button");
  const startAll = document.getElementById("startAll-button");
  const select = document.getElementById("song_names");
  const currentVolume = document.getElementById("currentVolume");
  const currentPlayRate = document.getElementById("currentPlayRate");

  //Init all
  document.addEventListener("DOMContentLoaded", () => {
    audioVisualizer.drawAudio();
    volumeButton.value = volumeStartRateDefault;
    playbackRateButton.value = playbackRateDefault;
    timeSlide.value = timeSlideRateDefault;

    volumeButton.value = getVolumeButtonListener();

    //waiting for audioContext
    EndingTime.textContent = "0";
    timeSlide.setAttribute("max", getEndingTimeListener());
  });

    // Start button
    startButton.addEventListener("click", startButtonListener);
    startButton.addEventListener("click", () => {
        timeSlide.setAttribute("max", getEndingTimeListener());
        EndingTime.textContent = getEndingTimeListener();
        currentVolume.textContent = (Number(getVolumeButtonListener()) * 100).toString();
        currentPlayRate.textContent = getPlaybackRateButtonListener();
        volumeButton.value = getVolumeButtonListener();
        setInterval(() => (CurrentTime.textContent = getCurrentTimeListener()), intervalTimerDefault);
        setInterval(() => timeSlide.value = getCurrentTimeListener(), intervalTimerDefault);
        volumeButton.value = 0.5;
        currentVolume.textContent = "50";
        setVolumeButtonListener(volumeButton.value);
    });

  //Pause Button
  pauseButton.addEventListener("click", pauseButtonListener);

  // Restart Button
  restartButton.addEventListener("click", restartButtonListener);

  // RestartAll Button
  restartAllButton.addEventListener("click", restartAllButtonListener);

    // volume Button
    volumeButton.addEventListener("change", () => {
        setVolumeButtonListener(volumeButton.value);
        currentVolume.textContent = (Number(getVolumeButtonListener()) * 100).toString();
    });

  // Time slide Button
  timeSlide.addEventListener("change", () => {
    setCurrentTimeListener(timeSlide.value);
    CurrentTime.textContent = timeSlide.value;
  });

  // playbackRate Button
  playbackRateButton.addEventListener("change", () => {
    playbackRateButtonListener(playbackRateButton.value);
    currentPlayRate.textContent = getPlaybackRateButtonListener();
  });

  // loop Button
  loopButtonFalse.addEventListener("click", () => loopListener(false));
  loopButtonTrue.addEventListener("click", () => loopListener(true));

    //mute
    enableMute.addEventListener("click", muteListener);
    enableMute.addEventListener("click", ()=> {
        currentVolume.textContent = "0";
        volumeButton.value = 0;
    });

    //mute
    enableAllMute.addEventListener("click", muteAllListener);
    enableAllMute.addEventListener("click", ()=> {
        currentVolume.textContent = "0";
        volumeButton.value = 0;
    });

  //stop all
  stopAll.addEventListener("click", stopAllListener);

  //start all
  startAll.addEventListener("click", startAllListener);

  // Change chosen sound
  select.addEventListener("change", (event) => {
    console.log(event.target.value);
    let dictElement = audioInstance.InstanceDict[event.target.value];
    audioHandler = dictElement._AudioHandler;
    timeSlide.setAttribute("max", getEndingTimeListener());
    EndingTime.textContent = getEndingTimeListener();
  });
}

/**
 * Starts a Track
 */
function startButtonListener() {
  if (!audioHandler.getIsPlaying()) {
    audioHandler.startAudio();
  } else {
    audioHandler.restartAudio();
    audioHandler.pauseAudio();
    audioHandler.startAudio();
  }
}

/**
 * Stops a Track
 */
function pauseButtonListener() {
  audioHandler.pauseAudio();
}

/**
 * Restarts a Track
 */
function restartButtonListener() {
  audioHandler.restartAudio();
}

/**
 * volume of Track
 */
function setVolumeButtonListener(volume) {
    audioHandler.setVolume(volume);
}

/**
 * get Volume from Track
 */
function getVolumeButtonListener() {
  return audioHandler.getVolume();
}

/**
 * get playbackRate from Track
 */
function getPlaybackRateButtonListener() {
  return audioHandler.getPlaybackRate();
}

/**
 * playbackRate of Track
 */
function playbackRateButtonListener(playbackRate) {
  audioHandler.setPlaybackRate(playbackRate);
}

/**
 * Reset all of Track
 */
function restartAllButtonListener() {
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    console.log(key, value);
    value._AudioHandler.resetAll();
  }
}

/**
 * CurrentTimeListener of Track
 */
function getCurrentTimeListener() {
  return audioHandler.getCurrentTime().toFixed(2);
}

/**
 * SetCurrentTimeListener of Track
 */
function setCurrentTimeListener(time) {
  audioHandler.setCurrentTime(time);
}

/**
 * loopListener of Track
 */
function loopListener(bool) {
  if (!bool) {
    for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
      value._AudioHandler.setLoop(bool);
    }
  }

  audioHandler.setLoop(bool);
}

/**
 *
 * @returns AudioInstance Object
 */
export function getAudioInstance() {
  return audioInstance;
}

/**
 * Mute Listener
 */
function muteListener() {
  audioHandler.enableMute();
}

/**
 * MuteAll Listener
 */
function muteAllListener() {
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    value._AudioHandler.enableMute();
  }
}

/**
 *  StartAll Listener
 */
function startAllListener() {
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    value._AudioHandler.startAudio();
  }
}

/**
 * StopAll listener
 */
function stopAllListener() {
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    console.log(key, value);
    value._AudioHandler.pauseAudio();
  }
}

/**
 * Get Time
 */
function getEndingTimeListener() {
  return audioHandler.getEndingTime().toFixed(2);
}


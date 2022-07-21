import {AudioInstance} from "./AudioInstance.js";

let audioHandler;
let audioVisualizer;
let audioInstance

initAudioHandler();

function initAudioHandler() {
  audioInstance = new AudioInstance();
  initListener();
  const firstStartAudio = audioInstance.InstanceDict["default_sound.mp3"];
  audioHandler = firstStartAudio._AudioHandler;
  audioVisualizer = firstStartAudio._AudioVisualizer;
}

function initListener() {

  //Record
  getUserMedia();

  // Start button
  const startButton = document.getElementById("play-button");

  startButton.addEventListener("click", startButtonListener);
  startButton.addEventListener(
    "click",
    () => (playbackRateButton.value = getPlaybackRateButtonListener)
  );
  startButton.addEventListener(
    "click",
    () => (volumeButton.value = getVolumeButtonListener)
  );

  //Pause Button
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener("click", pauseButtonListener);

  // Restart Button
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", restartButtonListener);

  // RestartAll Button
  const restartAllButton = document.getElementById("restartAll-button");
  restartAllButton.addEventListener("click", restartAllButtonListener);

  // volume Button
  const volumeButton = document.getElementById("volume-button");
  volumeButton.addEventListener("change", () =>
    volumeButtonListener(volumeButton.value)
  );

  // playbackRate Button
  const playbackRateButton = document.getElementById("playbackRate-button");
  playbackRateButton.addEventListener("change", () =>
    playbackRateButtonListener(playbackRateButton.value)
  );

  // loop Button
  const loopButtonFalse = document.getElementById("loopFalse-button");
  loopButtonFalse.addEventListener("click", () => loopListener(false));

  const loopButtonTrue = document.getElementById("loopTrue-button");
  loopButtonTrue.addEventListener("click", () => loopListener(true));

  // Time Span
  const CurrentTime = document.getElementById("CurrentTime");
  startButton.addEventListener("click", () => {
    setInterval(() => (CurrentTime.textContent = currentTimeListener()), 500);
  });

  //mute
  const enableMute = document.getElementById("enableMute-button");
  enableMute.addEventListener("click", muteListener)

  //mute
  const enableAllMute = document.getElementById("enableAllMute-button");
  enableAllMute.addEventListener("click", muteAllListener)

  //stop all
  const stopAll = document.getElementById("stopAll-button");
  stopAll.addEventListener("click", stopAllListener);

  //start all
  const startAll = document.getElementById("startAll-button");
  startAll.addEventListener("click", startAllListener);

  // Change chosen sound
  const select = document.getElementById("song_names");
  select.addEventListener("change", (event) => {
    console.log(event.target.value)
    let dictElement = audioInstance.InstanceDict[event.target.value];
    audioHandler = dictElement._AudioHandler;
    audioVisualizer = dictElement._AudioVisualizer;
    console.log(dictElement)
  });

}

/**
 * Starts a Track
 */
function startButtonListener() {
  if (!audioHandler.getIsPlaying()) {
    audioHandler.startAudio();
    audioVisualizer.drawAudio();
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
function volumeButtonListener(volume) {
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
function currentTimeListener() {
  return audioHandler.getCurrentTime();
}

/**
 * loopListener of Track
 */
function loopListener(bool) {
  audioHandler.setLoop(bool);
}

/**
 * Mute Listener
 */
function muteListener(){
  audioHandler.enableMute();
}

/**
 * MuteAll Listener
 */
function muteAllListener(){
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
function stopAllListener(){
  for (const [key, value] of Object.entries(audioInstance.InstanceDict)) {
    console.log(key, value);
    value._AudioHandler.pauseAudio();
  }
}

function getUserMedia(){
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
        .getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
        )
        // Success callback
        .then(function (stream) {

        })

        // Error callback
        .catch(function (err) {
          console.log("The following getUserMedia error occurred: " + err);
        });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }
}

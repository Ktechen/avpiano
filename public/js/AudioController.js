import {AudioInstance} from "./AudioInstance.js";

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
    audioVisualizer = firstStartAudio._AudioVisualizer;
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

    //Init all
    document.addEventListener('DOMContentLoaded', ()=> {
        EndingTime.textContent = endingTimeListener().toString();
        volumeButton.value = volumeStartRateDefault;
        playbackRateButton.value = playbackRateDefault;
        timeSlide.value = timeSlideRateDefault;
    });

    // Start button
    startButton.addEventListener("click", startButtonListener);
    startButton.addEventListener("click", () => {
        playbackRateButton.value = getPlaybackRateButtonListener;
        setInterval(() => (CurrentTime.textContent = getCurrentTimeListener()), intervalTimerDefault);
        setInterval(()=> {timeSlide.value = getCurrentTimeListener()}, intervalTimerDefault);
    });

    //Pause Button
    pauseButton.addEventListener("click", pauseButtonListener);

    // Restart Button
    restartButton.addEventListener("click", restartButtonListener);

    // RestartAll Button
    restartAllButton.addEventListener("click", restartAllButtonListener);

    // volume Button
    volumeButton.addEventListener("change", () => {
        volumeButtonListener(volumeButton.value);
    });

    // Time slide Button
    timeSlide.addEventListener("change", () =>
        setCurrentTimeListener(timeSlide.value)
    );

    // playbackRate Button
    playbackRateButton.addEventListener("change", () =>
        playbackRateButtonListener(playbackRateButton.value)
    );

    // loop Button
    loopButtonFalse.addEventListener("click", () => loopListener(false));
    loopButtonTrue.addEventListener("click", () => loopListener(true));

    //mute
    enableMute.addEventListener("click", muteListener)

    //mute
    enableAllMute.addEventListener("click", muteAllListener)

    //stop all
    stopAll.addEventListener("click", stopAllListener);

    //start all
    startAll.addEventListener("click", startAllListener);

    // Change chosen sound
    select.addEventListener("change", (event) => {
        console.log(event.target.value)
        let dictElement = audioInstance.InstanceDict[event.target.value];
        audioHandler = dictElement._AudioHandler;
        audioVisualizer = dictElement._AudioVisualizer;
        console.log(dictElement)
        timeSlide.setAttribute("max", endingTimeListener());
        EndingTime.textContent = endingTimeListener();
    });
}

/**
 * Starts a Track
 */
function startButtonListener() {
    if (!audioHandler.getIsPlaying()) {
        audioHandler.startAudio();
        audioVisualizer.drawAudio();
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
function endingTimeListener() {
    return audioHandler.getEndingTime().toFixed(2);
}

function getUserMedia() {
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

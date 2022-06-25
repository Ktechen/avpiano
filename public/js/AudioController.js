initAudioHandler()
function initAudioHandler() {
  // Start button
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", startButtonListener);
  // //Pause Button
  // const pauseButton = document.getElementById("pause-button");
  // pauseButton.addEventListener("click", pauseButtonListener);
  // // Restart Button
  // const restartButton = document.getElementById("restart-button");
  // restartButton.addEventListener("click", restartButtonListener);
}
/**
 * Starts a Track 
 */
function startButtonListener() {
    const audioHandler = new AudioHandler("sounds/default_sound.mp3");
    audioHandler.startAudio();

    const audioVisualizer = new AudioVisualizer(audioHandler.getAudio());
    audioVisualizer.drawAudio();
}
/**
 * Stops a Track
 */
function pauseButtonListener() {
}
/**
 * Restarts a Track
 */
function restartButtonListener() {}

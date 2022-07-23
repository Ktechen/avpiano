let storeInstance = null;
export function getAudioContext() {
  if (storeInstance === null) {
    storeInstance = new AudioContext();
  }
  return storeInstance;
}

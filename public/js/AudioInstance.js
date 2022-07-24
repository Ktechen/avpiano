import { AudioHandler } from "./AudioHandler.js";
import { AudioVisualizer } from "./AudioVisualizer.js";
import { AudioContextDto } from "./AudioContextDto.js";

export class AudioInstance {
  InstanceDict = {};

  constructor() {
    const sound1 = "default_sound.mp3";
    const audioHandler1 = new AudioHandler(new Audio("../sounds/" + sound1));

    const sound2 = "LassDieSonneindeinHerz.mp3";
    const audioHandler2 = new AudioHandler(new Audio("../sounds/" + sound2));

    this.InstanceDict[sound1] = new AudioContextDto(audioHandler1);
    this.InstanceDict[sound2] = new AudioContextDto(audioHandler2);
  }

  addToDict(index, AudioContextDto) {
    this.InstanceDict[index] = AudioContextDto;
  }
}

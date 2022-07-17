import {AudioHandler} from "./AudioHandler.js";
import {AudioVisualizer} from "./AudioVisualizer.js";

export class AudioInstance{

    InstanceDict = {};

    constructor() {
        const sound1 = "default_sound.mp3";
        const audioHandler1 = new AudioHandler(
            new Audio("../sounds/" + sound1)
        );

        let audioVisualizer1 = new AudioVisualizer(audioHandler1.getAudio());

        const sound2 = "LassDieSonneindeinHerz.mp3";
        const audioHandler2 = new AudioHandler(
            new Audio("../sounds/" + sound2)
        );

        let audioVisualizer2 = new AudioVisualizer(audioHandler1.getAudio());

        this.InstanceDict[sound1] = new AudioContextDto(audioVisualizer1, audioHandler1);
        this.InstanceDict[sound2] = new AudioContextDto(audioVisualizer2, audioHandler2);
    }
}

class AudioContextDto {
    constructor(AudioVisualizer, AudioHandler) {
        this._AudioVisualizer = AudioVisualizer;
        this._AudioHandler = AudioHandler;
    }
}




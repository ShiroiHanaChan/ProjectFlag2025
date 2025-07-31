

export default class AudioEngine {
    #mp3URL = "/sfx/hit-fx.mp3";
    constructor() {
        this.audioBuffer = null;
    }
    async loadMP3() {
        try {
            const response = await fetch(this.#mp3URL);
            const arrayBuffer = await response.arrayBuffer();
            this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
        } catch (error) {
            console.error('An error has occurred while trying to load and decode MP3', error);
        }
    }
    initAudioContext() {
        if (!this.audioCtx) {
            this.audioCtx = new AudioContext();
        }
    }
    playSFX() {
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume().then(_ => null);
        }
        const src = this.audioCtx.createBufferSource();
        const gainNode = this.audioCtx.createGain();
        src.buffer = this.audioBuffer;
        // Return a randomized pitch so sound effects don't get annoying!
        src.playbackRate.value = Math.floor(Math.random() * (4 - 1) ) + 1;
        // Set volume
        gainNode.gain.value = 0.2;
        src.connect(gainNode);
        gainNode.connect(this.audioCtx.destination);
        src.start();

        return src
    }
}
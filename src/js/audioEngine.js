

export default class AudioEngine {
    #mp3URL = "/sfx/hit-fx.mp3";
    constructor() {
        this.audioCtx = new AudioContext();
        this.audioBuffer = null;
    }
    async loadMP3() {
        try {
            const response = await fetch(this.#mp3URL);
            const arrayBuffer = await response.arrayBuffer();
            this.audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
            console.info('MP3 loaded');
        } catch (error) {
            console.error('An error has occurred while trying to load and decode MP3', error);
        }
    }
    playSFX() {
        if (this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
        const src = this.audioCtx.createBufferSource();
        src.buffer = this.audioBuffer;
        // Return a randomized pitch so sound effects don't get annoying!
        src.playbackRate.value = Math.floor(Math.random() * (4 - 1) ) + 1;
        src.connect(this.audioCtx.destination);
        src.start();

        return src
    }
}
import {sC} from "./config.js";

export class Tester {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.canvasSize = 450;

        this.spritesheet = new Image();
        this.spritesheet.onload = () => {
            if (this.ctx) //                 img    x   y     w     h   x   y   w   h
                this.ctx.drawImage(this.spritesheet, sC[0].x, sC[0].y, sC[0].width, sC[0].height, 50, 50, 128, 64);
            console.log('Done');
        }
        this.spritesheet.src = '/spriteSheet.png';
        this.spriteCoords = sC;
    }

    launcher() {
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.canvasSize * 1.25;

        console.log(this.canvas);
        console.log(this.ctx);
        console.log(this.spritesheet);
        console.log(this.spriteCoords);

        if (this.spritesheet.complete) {
            this.ctx.drawImage(this.spritesheet, 0, 0, 64, 32, 10, 10, 64, 32);
            console.log('Image was already loaded');
        }

        // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) or use bind


        /*const root = document.querySelector('#root');
        root.innerHTML += `<img alt="" src='${this.spritesheet.src}'/>`*/
    }
}

export let lives = 3;
/*
* TODO:
*  Draw:
*   - Canvas ✅
*   - Gfx Renderer
*   - OOP interfaces for objects
*   - Ball acceleration function
*   - Collision detector
*   - Function that detects all collisions
*   - Paddle and adjuster
*   - Check target collisions
* */



/* CONFIG CONFIG CONFIG CONFIG */

const canvas = document.querySelector('#blockBreaker');
const ctx = canvas.getContext('2d');

// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP
const canvasSize = 450;
canvas.width = canvasSize;
canvas.height = canvasSize * 1.25;
canvas.style.width = '450px';
canvas.style.height = '562,5px';
// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP

const canvasHeight = canvas.clientHeight;
const canvasWidth = canvas.clientWidth;

const BLOCKS_WIDE = canvasWidth * 0.05; // % of canvas and equals 1 square
const BLOCKS_TALL = canvasHeight * 0.04; // %

let gameEntities = [];

console.log(canvasHeight);
console.log(canvasWidth);
console.log(canvas);

/* CONFIG CONFIG CONFIG CONFIG */

/* Classes */

// Entity super class, shares common properties and methods
// Each entity must contain it's very own position property and rendering and hitbox methods

/*super*/ class Entity {
    // Constructor able to assign position and physical height and width properties
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // Gfx Renderer
    render(ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    // Returns a hitbox based on dimensions of our created object
    hitbox() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}

class Paddle extends Entity {
    static WIDTH = 3 * BLOCKS_WIDE;
    static HEIGHT = .5 * BLOCKS_TALL;
    static OFFSET = 1 * BLOCKS_TALL;

    constructor(x, y) {
        super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
    }

}

// Initial ball position and self updating method
class Ball extends Entity {
    static SIZEX = BLOCKS_WIDE * .4;
    static SIZEY = BLOCKS_TALL * .4;
    constructor() {
        super(0, 0, Ball.SIZEX, Ball.SIZEY);
        this.init();
    }
    // Init
    init() {
        this.x = canvasWidth / 2;
        this.y = 8 * BLOCKS_TALL;
        this.dx = BLOCKS_WIDE * .1;
        this.dy = BLOCKS_TALL * .15;
    }
    // Ball position updater
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    // Paddle collision temp method
}

/* * * * * */

/* Functions */

function wallCollision() {

}

function gfxRenderer(gameEntities) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    gameEntities.forEach(entity => {
        entity.render(ctx);
    });
}

/* * * * * * */

// Init

let paddle = new Paddle(canvasWidth / 2 - BLOCKS_WIDE * 1.5, canvasHeight - 1.75 * BLOCKS_TALL);
let ball = new Ball();

gameEntities.push(paddle);
gameEntities.push(ball);
console.log(gameEntities);

canvas.addEventListener('mousemove', (eventObj) => {
    paddle.x = eventObj.x - Paddle.WIDTH / 2 * 1.5;
}, false)

console.log(canvas)

function gameLoop() {
    const gameTick = 30; // ms
    gfxRenderer(gameEntities);
    ball.update();
    setTimeout(gameLoop, gameTick);
}
gameLoop();
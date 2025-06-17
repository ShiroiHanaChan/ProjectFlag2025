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

/* LEVELS LEVELS LEVELS LEVELS LEVELS */

const levelOne = [
    /* Row */
    '___x__x___', /* Col */
    '___x__x___',
    '___x__x___',
    '__________',
    '_x______x_',
    '_x__xx__x_',
    '_x_x__x_x_',
    '__x____x__',
    '__________',
];

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
    static OFFSET = BLOCKS_TALL;

    constructor(x, y) {
        super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
    }

}

// Initial ball position and self updating method
class Ball extends Entity {
    static SIZEX = BLOCKS_WIDE * .1;
    static SIZEY = BLOCKS_TALL * .1;
    constructor() {
        super(0, 0, Ball.SIZEX, Ball.SIZEY);
        this.init();
    }
    // Init
    init() {
        this.x = canvasWidth / 2;
        this.y = 20 * BLOCKS_TALL;
        this.dx = BLOCKS_WIDE * .1;
        this.dy = BLOCKS_TALL * -.15;
    }
    // Ball position updater
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    // Wall collision handler
    wallCollision() {
        if (ball.x > canvasWidth || ball.x < 0)
            ball.dx = -ball.dx;
        if (ball.y > canvasHeight || ball.y < 0)
            ball.dy = -ball.dy;
    }
    // Paddle collision temp method
}

class Target extends Entity {
    static SIZEX = 1.8 * BLOCKS_WIDE;
    static SIZEY = .9 * BLOCKS_TALL;
    constructor(x, y) {
        super(x, y, Target.SIZEX, Target.SIZEY);
    }
    selfDestruct() {
        gameEntities = gameEntities.filter(Entity => Entity !== this);
    }
}

/* * * * * */

/* Functions */

function mapBuilder(array) {
    // Get starting height as 2nd block
    console.log(array);
    console.log(array[0][0]);
    console.log(array[0][1]);
    console.log(array[0][2]);
    console.log(array[0][3]);

    let COL = BLOCKS_TALL;
    for (let i = 0; i < array.length; i++) {
        console.log('i:', i);
        for (let j = 0; j < array[i].length ; j++) {
            // Row iterator to build targets
            console.log('j:', j);
            if (array[i][j] === 'x') {
                // Create new target, rendering will be handled by another function
                let ROW = BLOCKS_WIDE * 2 * j;
                let target = new Target(ROW, COL);
                console.log('COL:', COL);
                console.log('ROW:', ROW);
                gameEntities.push(target);
                ROW += 2 * BLOCKS_WIDE;
            }
        }
        COL += BLOCKS_TALL;
    }
}

// This callback function will iterate all entities and check for a potential collision on every game tick and return a boolean value
// a = Ball, b = spread of all other entities
function collisionDetection(a, b) {
    return b.some(obj => (
        obj.hitbox().top < a.hitbox().bottom &&
        obj.hitbox().bottom > a.hitbox().top &&
        obj.hitbox().left < a.hitbox().right &&
        obj.hitbox().right > a.hitbox().left
    ));
}


function gfxRenderer(gameEntities) {
    ctx.fillStyle = 'black';
    /*ctx.fillStyle = 'rgba(0,0,0,0.3)';*/
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    gameEntities.forEach(entity => {
        entity.render(ctx);
    });
}

/* * * * * * */

// Init

let paddle = new Paddle(canvasWidth / 2 - BLOCKS_WIDE * 1.5, canvasHeight - 2.75 * BLOCKS_TALL);
let ball = new Ball();

gameEntities.push(ball);
gameEntities.push(paddle);

canvas.addEventListener('mousemove', (eventObj) => {
    paddle.x = eventObj.x - Paddle.WIDTH / 2 * 1.5;
}, false)

canvas.addEventListener('click', (eventObj) => {
    console.log('--------------------');
    console.log('Debug X:', eventObj.x);
    console.log('Debug Y:', eventObj.y);
}, false)

console.log(canvas)

function gameLoop() {
    const gameTick = 30; // ms
    gfxRenderer(gameEntities);
    ball.update();
    ball.wallCollision();
    //collisionDetection(ball, [, ...gameEntities] = b);
    /*collisionDetection(ball, [...gameEntities.slice(1)]);*/

    gameEntities.slice(2).forEach(entity => {
        if (entity instanceof Target && collisionDetection(ball, [entity])) {
            console.log(entity)
            entity.selfDestruct();
            console.log(gameEntities);
        }
    });

    setTimeout(gameLoop, gameTick);
}

mapBuilder(levelOne);
gameLoop();
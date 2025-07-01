/*
* BUG REPORT
* TODO:
*  - Somehow the ball managed to escape the canvas when hit in an odd angle
*
*/



console.log('Loading...')

/* INIT INIT INIT INIT INIT INIT INIT INIT INIT INIT */
/* INIT INIT INIT INIT INIT INIT INIT INIT INIT INIT */

const GAME_STATES = [''];

/* LEVELS LEVELS LEVELS LEVELS LEVELS */

const levelOne = [
    /* Row */
    'x________x', /* Col */
    'xx______xx',
    'x________x',
    'x__x__x__x',
    '___x__x___',
    '_x______x_',
    '_x__xx__x_',
    '_x_x__x_x_',
    '__x____x__',
];

const levelTwo = [
    /* Row */
    '_______x__', /* Col */
    '_________x',
    '_x________',
    '__________',
    '____x_____',
    '_________x',
    '__x_______',
    '__________',
    '__________',
];

/* CONFIG CONFIG CONFIG CONFIG */

const canvas = document.querySelector('#blockBreaker');
const ctx = canvas.getContext('2d');

// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP
// TODO: Redo canvas properties
const canvasSize = 450;
canvas.width = canvasSize;
canvas.height = canvasSize * 1.25;
canvas.style.width = '450px';
canvas.style.height = '562.5px';
// TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP TEMP

const canvasHeight = canvas.clientHeight;
const canvasWidth = canvas.clientWidth;

const BLOCKS_WIDE = canvasWidth * 0.05; // % of canvas and equals 1 square
const BLOCKS_TALL = canvasHeight * 0.04; // %

let gameEntities = [];

/* CONFIG CONFIG CONFIG CONFIG */

/* Classes */

// TODO: Build codeRunner (game) and gameUI classes

class GAME {
    // Declare entities
    constructor() {
        this.paddle = new Paddle(canvasWidth / 2 - BLOCKS_WIDE * 1.5, canvasHeight - 2.75 * BLOCKS_TALL);
        this.ball = new Ball();
    }

    // Methods
    init() {
        console.log(this.paddle);
        console.log(this.ball);

        gameEntities.push(this.paddle);
        gameEntities.push(this.ball);
    }

    gameLoop () {
        gfxRenderer(gameEntities);
        this.ball.update();
        this.ball.wallCollision(this.ball);
        gameEntities.slice(0, -2).forEach(entity => {
            if (entity instanceof Target && collisionDetection(this.ball, [entity])) {
                entity.selfDestruct();
                this.ball.targetHitBounce(collisionDirection(this.ball, entity));
            }
        });

        if (collisionDetection(this.ball, [this.paddle]))
            this.paddle.bounceAngle(this.ball);

        /*setTimeout(gameLoop, gameTick);*/
        requestAnimationFrame(() => this.gameLoop());
    }
}

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

    constructor(x, y) {
        super(x, y, Paddle.WIDTH, Paddle.HEIGHT);
    }
    // TODO: Redo speed function so it's consistent between dx/dy angles with absolute value
    bounceAngle(ball) {
        // TODO: fix this so it uses ball.dx ✅
        // Ultra weak sauce formula
        //ball.dx = Ball.DeltaX * this.distanceFromCenter(ball) * 0.1;
        // b = c × cos(θ) -> dy
        // a = c × sin(θ) -> dx
        ball.dy = 0;
        ball.dx = 0;
        const speed = BLOCKS_TALL * .25; // FPS
        ball.dy = -(speed * Math.cos((Math.PI / 2) * this.distanceFromCenter(ball)));
        ball.dx = speed * Math.sin((Math.PI / 2) * this.distanceFromCenter(ball));
    }

    distanceFromCenter(obj) {
        return (((obj.x + Ball.WIDTH / 2) - (this.x + Paddle.WIDTH / 2)) / Paddle.WIDTH);
    }

}

// Initial ball position and self updating method
class Ball extends Entity {

    static WIDTH = BLOCKS_WIDE * .3;
    static HEIGHT = BLOCKS_TALL * .3;

    // TODO: remove DeltaX and find fix to use exclusively this.dx ✅
    // static DeltaX = BLOCKS_WIDE * .1;

    constructor() {
        super(0, 0, Ball.WIDTH, Ball.HEIGHT);
        this.init();
    }
    // Init
    init() {
        this.x = canvasWidth / 2;
        this.y = 22 * BLOCKS_TALL;
        this.dx = BLOCKS_WIDE * .05;
        this.dy = BLOCKS_TALL * -.225;
    }
    // Ball position updater
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    // Wall collision handler
    wallCollision(ball) {
        if (ball.x > canvasWidth || ball.x < 0)
            ball.dx = -ball.dx;
        if (ball.y > canvasHeight || ball.y < 0)
            ball.dy = -ball.dy;
    }
    // Target collision bounce
    targetHitBounce(side) {
        switch (side) {
            case 'Top':
                this.dy = -Math.abs(this.dy);
                break;
            case 'Bottom':
                this.dy = Math.abs(this.dy);
                break;
            case 'Left':
                this.dx = -Math.abs(this.dx);
                break;
            case 'Right':
                this.dx = Math.abs(this.dx);
                break;
            default:
                console.log('Error occurred with targetHitBounce()');
        }
    }
}

class Target extends Entity {
    static WIDTH = 1.8 * BLOCKS_WIDE;
    static HEIGHT = .9 * BLOCKS_TALL;
    constructor(x, y) {
        super(x, y, Target.WIDTH, Target.HEIGHT);
    }

    selfDestruct() {
        gameEntities = gameEntities.filter(Entity => Entity !== this);
    }
}

/* * * * * */

/* Functions */

function mapBuilder(array) {
    // Get starting height as 2nd block
    let COL = BLOCKS_TALL;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length ; j++) {
            // Row iterator to build targets
            if (array[i][j] === 'x') {
                // Create new target, rendering will be handled by another function
                let ROW = BLOCKS_WIDE * 2 * j;
                let target = new Target(ROW, COL);
                gameEntities.push(target);
                ROW += 2 * BLOCKS_WIDE;
            }
        }
        COL += BLOCKS_TALL;
    }
}

// This callback function will iterate all entities and check for a potential collision on every game tick and return a boolean value
// a = Ball, b = spread of all other entities
// Calculates next game frame
function collisionDetection(a, b) {
    return b.some(obj => (
        obj.hitbox().top < a.hitbox().bottom + a.dy &&
        obj.hitbox().bottom > a.hitbox().top + a.dy &&
        obj.hitbox().left < a.hitbox().right + a.dx &&
        obj.hitbox().right > a.hitbox().left + a.dx
    ));
}

// Use ball as parameter for 'a', any other object for 'b'
/*TODO: - Consider TypeScript for stronger type security
        - Consider subtracting by this.dx and this.dy for more accurate hitbox tagging*/

/*
Breakdown of this awesome big brain callback function: '+' signifies positive and '-' negative
    dx+ && dy+ travelling Up and Right
    if b.hitbox().top < a.hitbox().bottom && b.hitbox().bottom > a.hitbox().top it's a side hit
*/
function collisionDirection(a, b) {
    //const sideHit = a.hitbox().top > b.hitbox().top && a.hitbox().top < b.hitbox().bottom;

    const sideHit =
        (a.hitbox().top > b.hitbox().top && a.hitbox().top < b.hitbox().bottom) &&
        (a.hitbox().bottom > b.hitbox().top && a.hitbox().bottom < b.hitbox().bottom);

    if (sideHit) {
        return a.dx > 0 ? 'Left' : 'Right';
    } else {
        return a.dy > 0 ? 'Top' : 'Bottom';
    }
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

console.log(canvas);

// Game mode switch case
mapBuilder(levelOne);
const Game = new GAME();
Game.init();
Game.gameLoop();

canvas.addEventListener('mousemove', (eventObj) => {
    Game.paddle.x = eventObj.offsetX - Paddle.WIDTH / 2 * 1.5;
}, false)

canvas.addEventListener('click', (eventObj) => {
    console.log('--------------------');
    console.log('Debug X:', eventObj.x);
    console.log('Debug Y:', eventObj.y);
}, false);
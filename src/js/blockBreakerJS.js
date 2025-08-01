/*
* BUG REPORT
* TODO:
*  - Somehow the ball managed to escape the canvas when hit in an odd angle ✅-> resolved by adding ball width to wall detection calc
*
*/

/* INIT INIT INIT INIT INIT INIT INIT INIT INIT INIT */

// constructor needs to receive level -> constructor(canvas, level), placeholder is temporary

import {levels, sC} from "./config.js";
import AudioEngine from "./audioEngine.js";

export class gameLauncher {
    constructor(canvas, signalEnd, signalPoints, signalHearts) {
        // Build canvas
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        /* canvasSizeCalibrator */
        // Tracks all spawned game entities
        this.lives = 3;
        this.gameEntities = [];
        this.points = 0;
        this.gfxRenderer = new gfxRenderer();
        this.mute = false;
        this.signalEnd = signalEnd;
        this.signalPoints = signalPoints;
        this.signalHearts = signalHearts;
    }
    canvasSizeCalibrator() {
        // TODO: - Determine best canvasSize dynamically ✅
        this.canvasSize = window.innerWidth > 768 ? 450 : 380;
        // Important game logic fr
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
        // % of canvas and equals 1 square
        this.BLOCKS_WIDE = this.canvasWidth * 0.05;
        this.BLOCKS_TALL = this.canvasWidth * 0.04;
    }
    canvasFormatter() {
        // Mounts canvas, use as callback optionally
        document.documentElement.style.setProperty('--menu-width', `${this.canvasSize}px`);
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.canvasSize * 1.25;
    }
    async launcher() {
        this.canvasSizeCalibrator();
        this.canvasFormatter();
        // Build the arena and run game loop
        this.canvasSizeCalibrator();
        Entity.setProperties(this);
        mapBuilder(levels[Math.floor(Math.random() * levels.length)], this.BLOCKS_WIDE, this.BLOCKS_TALL, this.gameEntities);
        await this.gfxRenderer.loadSpriteSheet();
        this.codeRunner();
    }
    launchEventListeners() {
        // Mouse controls
        this.canvas.addEventListener('mousemove', (eventObj) => {
            this.Game.paddle.x = eventObj.offsetX - Paddle.WIDTH / 2 * 1.5;
        }, false);
        // Touchscreen controls
        this.canvas.addEventListener('touchmove', (eventObj) => {
            // Prevents scrolling the web page
            eventObj.preventDefault();
            const rect = this.canvas.getBoundingClientRect();
            const touch = eventObj.touches[0];
            this.Game.paddle.x = (touch.clientX - rect.left) - Paddle.WIDTH / 2 * 1.5;
        }, false);
    }
    codeRunner() {
        // Launches new instance, initializes paddle and ball, and runs the loop
        this.Game = new GAME(this, this.signalEnd, this.signalPoints, this.signalHearts);
        this.launchEventListeners();
        this.Game.init();
    }
}

/* INIT INIT INIT INIT INIT INIT INIT INIT INIT INIT */

/* GFX HANDLER GFX HANDLER GFX HANDLER GFX HANDLER */

class gfxRenderer {
    constructor() {
        this.spritesheet = new Image();
        // sC = sprite coordinates array
        this.sC = sC;
    }
    // Async method to counter the fact the spritesheet needs to be loaded upon game start, otherwise game logic runs before sprites are rendered and makes for a confusing experience under lag
    loadSpriteSheet() {
        new Promise((resolve, reject) => {
            this.spritesheet.onload = resolve;
            this.spritesheet.onerror = reject;
            this.spritesheet.src = '/gameArt/spriteSheet.png';
        }).catch(error => console.error(error));
    };
    // Render canvas and entities
    render(gameClass, gameState) {

        gameClass.ctx.clearRect(0, 0, gameClass.canvasWidth, gameClass.canvasHeight);

        // Entity renderer
        Entity.ref.gameEntities.forEach(entity => {
            // Switch compares values directly, not expressions, use if statement for type checking
            if (entity instanceof Target && gameState === 'play') {
                entity.render(gameClass.ctx, this.spritesheet, this.sC[entity.color]);
            } else if (entity instanceof Ball) {
                entity.render(gameClass.ctx, this.spritesheet, this.sC[this.sC.length -2]);
            } else if (entity instanceof Paddle) {
                entity.render(gameClass.ctx, this.spritesheet, this.sC[this.sC.length -1]);
            } else {
                console.error('Error in gfxRenderer')
            }
        });
    }
}

/* GFX HANDLER GFX HANDLER GFX HANDLER GFX HANDLER */

/* Classes */

// TODO: Build codeRunner (game) and gameUI classes

class GAME {
    // Declare entities
    constructor(gameLauncher, signalEnd, signalPoints, signalHearts) {
        // gameLauncher reference
        this.ref = gameLauncher;
        // Init
        this.canvasWidth = this.ref.canvasWidth;
        this.canvasHeight = this.ref.canvasHeight;
        this.BLOCKS_WIDE = this.ref.BLOCKS_WIDE;
        this.BLOCKS_TALL = this.ref.BLOCKS_TALL;
        this.ctx = this.ref.ctx;
        this.gameEntities = this.ref.gameEntities;
        // Spawn entities
        this.paddle = new Paddle(this.canvasWidth / 2 - this.BLOCKS_WIDE * 1.5, this.canvasHeight - 4 * this.BLOCKS_TALL);
        this.ball = new Ball();
        this.gfxRenderer = this.ref.gfxRenderer;
        this.lives = this.ref.lives;
        this.points = this.ref.points;
        this.multiplier = 1;
        this.signalEnd = signalEnd;
        this.signalPoints = signalPoints;
        this.signalHearts = signalHearts;
    }
    async loadAudioEngine() {
        this.sfxPlayer = new AudioEngine();
        this.sfxPlayer.initAudioContext();
        await this.sfxPlayer.loadMP3().catch(error => console.error(error));
    }
    // Point system, use as callback when detecting collisions
    // Helper method for cleaner game mode setting
    // Game modes: 0 -> New, 1 -> Play, 2 -> Paused, 3 -> Game over,
    setGameMode(mode) {
        // Declare mode received from outside sources
        switch (mode) {
            case 'new':
                this.gameMode = 'new';
                break;
            case 'play':
                this.gameMode = 'play';
                this.loadAudioEngine().catch(error => console.error(error));
                this.gameLoop();
                break;
            case 'pause':
                this.gameMode = 'pause';
                break;
            case 'over':
                this.gameMode = 'over';
                break;
        }
        if (this.signalEnd)
            this.signalEnd(mode);
    }
    deductLives() {
        this.lives--;
        this.ball.init();
    }
    // Methods
    init() {
        this.gameEntities.push(this.paddle);
        this.gameEntities.push(this.ball);

    }
    gameLoop() {
        //gfxRenderer(gameEntities);
        this.ball.update();
        this.ball.wallCollision(this.ball);
        if (this.ball.y > this.canvasHeight)
            this.deductLives();
        Entity.ref.gameEntities.slice(0, -2).forEach(entity => {
            if (entity instanceof Target && collisionDetection(this.ball, [entity])) {
                if (!this.ref.mute)
                    this.sfxPlayer.playSFX();
                entity.selfDestruct(this.gameEntities);
                this.ball.targetHitBounce(collisionDirection(this.ball, entity));
                // Point incrementor, uses a multiplier to encourage hit streaks for higher scores! Resets if the consequent hit inst a target
                this.points += 800 * this.multiplier;
                this.multiplier += .25;
                if (this.signalPoints)
                    this.signalPoints(this.points);
            }
        });

        if (collisionDetection(this.ball, [this.paddle])) {
            if (!this.ref.mute)
                this.sfxPlayer.playSFX();
            this.paddle.bounceAngle(this.ball);
            this.multiplier = 1;
        }

        // Send lives information to React to display the heart container properly
        if (this.signalHearts)
            this.signalHearts(this.lives);

        /*setTimeout(gameLoop, gameTick);*/
        // TODO: Remove (this.ball.y < canvasHeight) and implement 3 lives system ✅
        if (this.gameMode === 'play' && (this.lives > 0) && this.ref.gameEntities.some(entity => entity instanceof Target)) {
            this.gfxRenderer.render(this, this.gameMode);
            requestAnimationFrame(() => this.gameLoop());
            //                          Check for no targets left
        } else if ((this.lives < 1) || !this.ref.gameEntities.some(entity => entity instanceof Target)) {
            // Signal that the game has ended
            this.setGameMode('over');
            // Add points to player if lives remain as a bonus!
            if (this.lives > 0) {
                this.points += 500 * this.lives;
                if (this.signalPoints)
                    this.signalPoints(this.points);
            }
        } else {
        }
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
    static setProperties(reference) {
        Entity.ref = reference;
    }
    static get BLOCKS_WIDE() {
        return Entity.ref?.BLOCKS_WIDE;
    }
    static get BLOCKS_TALL() {
        return Entity.ref?.BLOCKS_TALL;
    }
    static get canvasWidth() {
        return Entity.ref?.canvasWidth;
    }
    static get canvasHeight() {
        return Entity.ref?.canvasHeight;
    }
    // Gfx Renderer
    // TODO: - Overhaul, redo such as to accept coordinates from the spritesheet to build itself
    render(ctx, img, arr) {
        // Fallback entity renderer
        // drawImage settings
        // img -> src x y w h
        // cnv -> x y w h
        ctx.drawImage(img, arr.x, arr.y, arr.width, arr.height, this.x, this.y, this.width, this.height)
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
    // static WIDTH = 3 * Entity.BLOCKS_WIDE;
    // static HEIGHT = .5 * Entity.BLOCKS_TALL;

    static get WIDTH() {
        return Entity?.BLOCKS_WIDE * 3;
    }
    static get HEIGHT() {
        return Entity?.BLOCKS_TALL * .5;
    }

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
        const speed = Paddle.BLOCKS_TALL * .25; // FPS
        ball.dy = -(speed * Math.cos((Math.PI / 2) * this.distanceFromCenter(ball)));
        ball.dx = speed * Math.sin((Math.PI / 2) * this.distanceFromCenter(ball));
    }

    distanceFromCenter(obj) {
        return (((obj.x + Ball.WIDTH / 2) - (this.x + Paddle.WIDTH / 2)) / Paddle.WIDTH);
    }

}

// Initial ball position and self updating method
class Ball extends Entity {

    // static WIDTH = Entity.BLOCKS_WIDE * .3;
    // static HEIGHT = Entity.BLOCKS_TALL * .3;

    static get WIDTH() {
        return Entity?.BLOCKS_WIDE * .35;
    }
    static get HEIGHT() {
        return Entity?.BLOCKS_TALL * .35;
    }

    // TODO: remove DeltaX and find fix to use exclusively this.dx ✅

    constructor() {
        super(0, 0, Ball.WIDTH, Ball.HEIGHT);
        this.init();
    }
    // Init
    init() {
        this.x = Ball.canvasWidth / 2;
        this.y = 20 * Ball.BLOCKS_TALL;
        this.dx = 0;
        this.dy = Ball.BLOCKS_TALL * .09;
    }
    // Ball position updater
    update() {
        this.x += this.dx;
        this.y += this.dy;
    }
    // Wall collision handler
    wallCollision(ball) {
        if (ball.x + Ball.WIDTH * 1.25 > Entity.canvasWidth || ball.x - Ball.WIDTH * .25 < 0)
            ball.dx = -ball.dx;
        if (ball.y > Entity.canvasHeight || ball.y < 0)
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
                console.error('Error occurred with targetHitBounce()');
        }
    }
}

class Target extends Entity {
    // static WIDTH = 2 * Entity.BLOCKS_WIDE;
    // static HEIGHT = 1 * Entity.BLOCKS_TALL;

    static get WIDTH() {
        return Entity?.BLOCKS_WIDE * 2;
    }
    static get HEIGHT() {
        return Entity?.BLOCKS_TALL;
    }

    constructor(x, y) {
        super(x, y, Target.WIDTH, Target.HEIGHT);
        this.color = Math.floor(Math.random() * 6);
    }

    selfDestruct() {
        Entity.ref.gameEntities = Entity.ref.gameEntities.filter(Entity => Entity !== this);
    }
}

/* * * * * */

/* Functions */

function mapBuilder(array, BLOCKS_WIDE, BLOCKS_TALL, gameEntities) {
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

/* * * * * * */
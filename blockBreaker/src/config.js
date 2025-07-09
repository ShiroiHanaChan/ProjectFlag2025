export const dataURL = 'https://my-json-server.typicode.com/shiroihanachan/leaderboardAPI/leaderboard';

/* Testing purposes */

export const Score = 23855;

export class Entry {
    constructor(name, score) {
        this.id = Math.floor(Math.random() * Date.now());
        this.name = name;
        this.score = score;
        this.timestamp = Date.now();
    }
}

export function verifyDuplicates(name, score, array) {
    return !array.some(
        entry => (name === entry.name && score === entry.score)
    )
}

// Sprite coordinates

export const sC = [
    {
        "name": "block_red",
        "x": 92,
        "y": 127,
        "width": 247,
        "height": 133
    },
    {
        "name": "block_orange",
        "x": 381,
        "y": 127,
        "width": 247,
        "height": 133
    },
    {
        "name": "block_green",
        "x": 684,
        "y": 127,
        "width": 247,
        "height": 133
    },
    {
        "name": "block_blue_dark",
        "x": 92,
        "y": 315,
        "width": 247,
        "height": 133
    },
    {
        "name": "block_blue",
        "x": 381,
        "y": 315,
        "width": 247,
        "height": 133
    },
    {
        "name": "block_teal",
        "x": 684,
        "y": 315,
        "width": 247,
        "height": 133
    },
    {
        "name": "ball",
        "x": 457,
        "y": 517,
        "width": 109,
        "height": 108
    },
    {
        "name": "paddle",
        "x": 221,
        "y": 705,
        "width": 582,
        "height": 95
    }
]
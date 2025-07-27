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

// Levels

export const levels = [
    [
        /* Row */
      /* 1234567890 */
        'x________x', /* Col 1 */
        'xx______xx', /* Col 2 */
        'x________x', /* Col 3 */
        'x__x__x__x', /* Col 4 */
        '___x__x___', /* Col 5 */
        '_x______x_', /* Col 6 */
        '_x__xx__x_', /* Col 7 */
        '_x_x__x_x_', /* Col 8 */
        '__x____x__', /* Col 9 */
    ],
    [
        /* Row */
      /* 1234567890 */
        '_x______x_', /* Col 1 */
        'x_x____x_x', /* Col 2 */
        'x_x_xx_x_x', /* Col 3 */
        'x________x', /* Col 4 */
        'x_x____x_x', /* Col 5 */
        'x_x____x_x', /* Col 6 */
        'x___xx___x', /* Col 7 */
        'x________x', /* Col 8 */
        '_xxxxxxxx_', /* Col 9 */
    ],
];

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
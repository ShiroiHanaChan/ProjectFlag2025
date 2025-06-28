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
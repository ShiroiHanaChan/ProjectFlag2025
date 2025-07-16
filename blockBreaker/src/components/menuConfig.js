
export const menuStates = {
    new: [
        {id: 'new', txt: "Let's play!", action: 'play'},
        {id: 'instruction', txt: 'How to play', action: 'instructions'},
        {id: 'leaderboard', txt: 'Leaderboard', action: 'leaderboard'},
    ],
    pause: [
        {id: 'quit', txt: 'Quit', jsx: () => console.info('Clicked')},
        {id: 'retry', txt: 'Retry', action: 'new'},
        {id: 'continue', txt: 'Continue', action: 'play'},
    ],
    over: [

    ],
}
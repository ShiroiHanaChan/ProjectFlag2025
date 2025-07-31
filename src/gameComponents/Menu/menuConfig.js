export const menuStates = {
    new: [
        {id: 'leaderboard', txt: 'Leaderboard', action: 'leaderboard'},
        {id: 'instructions', txt: 'How to play', action: 'instructions'},
        {id: 'new', txt: "Let's play!", action: 'play'},
    ],
    pause: [
        {id: 'quit', txt: 'Quit', action: 'over'},
        {id: 'retry', txt: 'Retry',},
        {id: 'continue', txt: 'Continue', action: 'play'},
    ],
}

/* Organize by least important to most important, most relevant option should be at the bottom to be more accessible in mobile */
import React from 'react';
import ScoreCard from "./ScoreCard.jsx";

function Leaderboard({lbScores}) {
    const sortedEntries = [...lbScores].sort((a, b) => b.score - a.score);

    return (
        <>
            <ul className={'leaderboard-ul'}>
                {
                    [...sortedEntries.slice(0, 8)].map(entry =>
                        <ScoreCard
                            key={entry.id}
                            name={entry.name}
                            score={entry.score}
                        />)
                }
            </ul>
        </>
    );
}

/*{lbScores: {entries}}*/

export default Leaderboard;
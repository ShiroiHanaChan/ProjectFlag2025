import React from 'react';
import ScoreCard from "./ScoreCard.jsx";
import WaveSectionTop from "../waveComponents/WaveSectionTop.jsx";

function Leaderboard({lbScores}) {
    const sortedEntries = [...lbScores].sort((a, b) => b.score - a.score);

    return (
        <>
            <article className="leaderboard pretendo-background-inverse">
                <h3>Top 10 players!</h3>
                <WaveSectionTop/>
                <ul className={'leaderboard-ul'}>
                    {
                        [...sortedEntries.slice(0, 10)].map((entry, index) =>
                            <ScoreCard
                                key={entry.id}
                                name={entry.name}
                                score={entry.score}
                                index={index}
                            />)
                    }
                </ul>
            </article>
        </>
    );
}

/*{lbScores: {entries}}*/

export default Leaderboard;
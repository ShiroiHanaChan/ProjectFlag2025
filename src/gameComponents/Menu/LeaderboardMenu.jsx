import React, {useContext} from 'react';
import {breakerContext} from "../../App.jsx";

function LeaderboardMenu(props) {

    const context = useContext(breakerContext);
    const scores = [...context.reduxState.scores].sort((a, b) => b.score - a.score);

    return (
        <>
            <section className="game-ui visible content-grid">
                <h2>Leaderboard!</h2>
                <article className="leaderboard-game-menu">
                {
                    context && Array.isArray(scores) ? scores.map((entry, index) =>
                        <p key={entry.id} index-data={index + 1} >{entry.name} {entry.score}</p>
                    ) : <span className="loader"></span>
                }
                </article>
                <button onClick={() => props.function('new')}>Go back!</button>
            </section>
        </>
    );
}

/**/ {/**/}

export default LeaderboardMenu;
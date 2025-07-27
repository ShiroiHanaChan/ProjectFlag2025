import React from 'react';

function Instructions(props) {
    return (
        <>
            <section className="game-ui visible content-grid">
            <h3>How to play:</h3>
            <p>1 - Bounce the ball off the paddle to direct it towards the targets!</p>
            <p>2 - Breaking targets will net you points, keep a streak to get a multiplier to rack them up faster!</p>
            <p>3 - You are given {props.hearts} lives, if the ball falls off the bottom, you lose one. Keep as many as you can for a bonus!</p>
            <button onClick={() => props.function('new')} >Go back!</button>
            </section>
        </>
    );
}

export default Instructions;
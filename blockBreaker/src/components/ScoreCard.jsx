import React from 'react';

function ScoreCard({name, score}) {
    return (
        <>
            <li>{name}</li>
            <li>{score}</li>
        </>
    );
}

export default ScoreCard;
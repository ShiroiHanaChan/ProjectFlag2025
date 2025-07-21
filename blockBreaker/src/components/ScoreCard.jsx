import React from 'react';

function ScoreCard({name, score}) {
    return (
            <li className="score-card">
                <span>{name}</span>
                <span>{score}</span>
            </li>
    )
}

export default ScoreCard;
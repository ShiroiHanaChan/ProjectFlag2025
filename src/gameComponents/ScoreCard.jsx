import React from 'react';

function ScoreCard({name, score, index}) {

    const data = index + 1;

    function suffix(number) {
        if (['11', '12', '13'].includes(number.toString().slice(-2))) {
            return `${number}th`;
        } else if (number.toString().slice(-1) === '1') {
            return `${number}st`;
        } else if (number.toString().slice(-1) === '2') {
            return `${number}nd`;
        } else if (number.toString().slice(-1) === '3') {
            return `${number}rd`;
        } else {
            return `${number}th`;
        }
    }

    return (
            <li className="score-card">
                <p index-data={suffix(data)}>{name} {score}</p>
            </li>
    )
}

export default ScoreCard;
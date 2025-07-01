import React from 'react';
import "./../../../scss/scssFile.css"

function BlockMenu() {
    return (
        <>
            <section className="game-ui visible liquify">
                    <img src="/src/assets/gameArt/logo.png" alt=""/>
                    <p>Leaderboard</p>
                    <p>Instructions</p>
                    <p>Quit</p>
                    <p>Retry</p>
                    <p>Continue</p>
            </section>
        </>
    );
}

export default BlockMenu;
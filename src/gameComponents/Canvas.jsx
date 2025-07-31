import React, {useEffect, useRef, useState} from 'react';
import {gameLauncher} from "../js/blockBreakerJS.js";
import BlockMenu from "./Menu/BlockMenu.jsx";
import GameOver from "./Menu/GameOver.jsx";
import LeaderboardMenu from "./Menu/LeaderboardMenu.jsx";
import Instructions from "./Instructions.jsx";


function Canvas() {

    const [mode, setMode] = useState('new');
    const [points, setPoints] = useState(0);
    const [hearts, setHearts] = useState(3);

    // Create canvas, and bootstrap the game

    const canvasRef = useRef(null);
    const gameRef = useRef(null);

    const resetAudio = () => {
        document.querySelectorAll('.mute-button').forEach((el) => {
            el.style.setProperty('--opacity', 0);
        });
    };

    const handleMode = (mode) => {
        if (gameRef.current.Game)
            gameRef.current.Game.setGameMode(mode);
        setMode(mode);
    }

    const buildCanvas = async (mode) => {
        gameRef.current = new gameLauncher(canvasRef.current, setMode, setPoints, setHearts);
        await gameRef.current.launcher();
        if (gameRef.current.Game)
            gameRef.current.Game.setGameMode(mode);
        setPoints(0);
        resetAudio();
    };


    useEffect(() => {
        setMode('new');
        // Bootstrapper for Block Breaker!
        if (canvasRef.current)
            (async () => {
                await buildCanvas(mode)
            })();
    }, []);

    return (
        <>
            <section className="game-render">
                <article className="game-status">
                    {/*TODO:
                            - Add heart container ✅
                            - Add score tab ✅
                            - Add cog for settings ✅
                            - Add sound switch ✅
                    */}
                    {/* Lives display*/}
                    <section>
                        {Array.from({length: hearts}, (_, index) => (
                            <img key={index} src="/gameArt/heart-o.png" alt=""/>
                        ))}
                    </section>
                    {/* Score display */}
                    <section><span>Score</span> {points}</section>
                    <section className="game-status-settings">

                        <button className="mute-button" onClick={() => {
                            document.querySelectorAll('.mute-button').forEach((el) => {
                                el.style.setProperty('--opacity', gameRef.current.mute ? 0 : 1);
                            });
                            gameRef.current.mute = !gameRef.current.mute;
                        }}>
                            <img src="/gameArt/sound-o.png" alt="Turn sound on or off"/></button>

                        <button onClick={() => {
                            if (gameRef.current && gameRef.current.Game) {
                                gameRef.current.Game.gameMode = gameRef.current.Game.gameMode === 'pause' ? 'play' : 'pause';
                                switch (gameRef.current.Game.gameMode) {
                                    case 'play':
                                        handleMode('play')
                                        break;
                                    case 'pause':
                                        handleMode('pause')
                                        break;
                                }
                            }
                        }} ><img src={"/gameArt/config-o.png"} alt="Menu"/></button>
                    </section>
                </article>

                <section className="breaker-section">
                    <canvas className="block-breaker" ref={canvasRef} width={0} height={0}></canvas>

                    {/* Pause menu component */}
                    {mode === 'new' || (gameRef.current && gameRef.current.Game && mode === 'pause') ? <BlockMenu key="menu" mode={mode} function={handleMode} rebuild={buildCanvas} setLives={setHearts} /> : null}

                    {/* Game over menu component */}
                    {gameRef.current && gameRef.current.Game && mode === 'over' ? <GameOver key="gameOver" mode={mode} bonus={hearts} function={handleMode} rebuild={buildCanvas} points={points} /> : null}

                    {/* Leaderboard menu component */}
                    {gameRef.current && gameRef.current.Game && mode === 'leaderboard' ? <LeaderboardMenu key="leaderBoard" mode={mode} bonus={hearts} function={handleMode} /> : null}

                    {/* Instructions menu component */}
                    {gameRef.current && gameRef.current.Game && mode === 'instructions' ? <Instructions key="leaderBoard" mode={mode} hearts={hearts} function={handleMode} /> : null}
                </section>
            </section>
        </>
    );
}
/*block-breaker*/
export default Canvas;

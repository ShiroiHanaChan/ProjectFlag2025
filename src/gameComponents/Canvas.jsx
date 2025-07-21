import React, {useEffect, useRef, useState} from 'react';
import {gameVroomVroom} from "../js/blockBreakerJS.js";
import BlockMenu from "./BlockMenu.jsx";
import GameOver from "./GameOver.jsx";
// import {Tester} from "../js/tester.js";


function Canvas() {

    const [mode, setMode] = useState('new');
    const [points, setPoints] = useState(0);
    const [hearts, setHearts] = useState(3);

    const handleMode = (mode) => {
        gameRef.current.Game.setGameMode(mode);
        setMode(mode);
    }

    const buildCanvas = (mode) => {
        gameRef.current = new gameVroomVroom(canvasRef.current, setMode, setPoints, setHearts);
        gameRef.current.launcher();
        if (gameRef.current.Game)
            gameRef.current.Game.setGameMode(mode);
        setPoints(0);
    };

    // Create canvas, and bootstrap the game

    const canvasRef = useRef(null);
    const gameRef = useRef(null);



    useEffect(() => {
        // Bootstrapper for Block Breaker!
        if (canvasRef.current)
            buildCanvas(mode);
    }, []);

    return (
        <>
            <section className="game-render">
                {/*<div className="dev-help">
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
                    }}>+</button>
                    <button onClick={() => {
                        gameRef.current.Game.setGameMode('over');
                    }}>-</button>
                </div>*/}

                <article className="game-status">
                    {/*TODO:
                            - Add heart container
                            - Add score tab
                            - Add cog for settings
                            - Add sound switch
                    */}
                    {/* Lives display*/}
                    <section>
                        {Array.from({length: hearts}, () => (
                            <img src="/public/gameArt/heart-o.png" alt=""/>
                        ))}
                    </section>
                    {/* Score display */}
                    <section><span>Score</span> {points}</section>
                    <section className="game-status-settings">
                        <button><img src="/public/gameArt/sound-o.png" alt="Turn off sound"/></button>
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
                        }} ><img src="/public/gameArt/config-o.png" alt="Menu"/></button>
                    </section>
                </article>

                <section className="breaker-section">
                    <canvas className="block-breaker" ref={canvasRef} width={0} height={0}></canvas>

                    {gameRef.current && gameRef.current.Game && (mode === 'pause' || mode === 'new') ? <BlockMenu key="menu" mode={mode} function={handleMode} rebuild={buildCanvas} /> : null}

                    {gameRef.current && gameRef.current.Game && mode === 'over' ? <GameOver key="gameOver" mode={mode} bonus={hearts} function={handleMode} rebuild={buildCanvas} points={points} /> : null}
                </section>
            </section>
        </>
    );
}
/*block-breaker*/
export default Canvas;

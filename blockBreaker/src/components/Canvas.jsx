import React, {useEffect, useRef, useState} from 'react';
import {gameVroomVroom} from "../js/blockBreakerJS.js";
import BlockMenu from "./BlockMenu.jsx";
import GameOver from "./GameOver.jsx";
// import {Tester} from "../js/tester.js";


function Canvas() {

    const [mode, setMode] = useState('new')

    const handleMode = (mode) => {
        gameRef.current.Game.setGameMode(mode);
        setMode(mode);
    }

    const buildCanvas = () => {
        gameRef.current = new gameVroomVroom(canvasRef.current, setMode);
        gameRef.current.launcher();
        if (gameRef.current.Game)
            gameRef.current.Game.setGameMode(mode);
    };

    // Create canvas, and bootstrap the game

    const canvasRef = useRef(null);
    const gameRef = useRef(null);



    useEffect(() => {
        // Bootstrapper for Block Breaker!
        if (canvasRef.current)
            buildCanvas();
    }, []);



    return (
        <>
            <div>
            <article className="game-status">
                <button onClick={() => {
                    if (gameRef.current && gameRef.current.Game) {
                        gameRef.current.Game.gameMode = gameRef.current.Game.gameMode === 'pause' ? 'play' : 'pause';
                        switch (gameRef.current.Game.gameMode) {
                            case 'play':
                                gameRef.current.Game.setGameMode('play');
                                setMode('play');
                                break;
                            case 'pause':
                                gameRef.current.Game.setGameMode('pause');
                                setMode('pause');
                                break;
                        }
                    }
                }}>+</button>
                <button onClick={() => {
                    gameRef.current.Game.setGameMode('over');
                }}>-</button>
            </article>

            <section className="breaker-section">
                <canvas className="block-breaker liquify" ref={canvasRef} width={0} height={0}></canvas>

                {gameRef.current && gameRef.current.Game && (mode === 'pause' || mode === 'new') ? <BlockMenu key="menu" mode={gameRef.current.Game.gameMode} function={handleMode} /> : null}

                {gameRef.current && gameRef.current.Game && mode === 'over' ? <GameOver key="gameOver" mode={gameRef.current.Game.gameMode} function={handleMode} /> : null}
            </section>
            </div>
        </>
    );
}
/*block-breaker*/
export default Canvas;

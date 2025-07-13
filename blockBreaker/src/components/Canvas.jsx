import React, {useEffect, useRef, useState} from 'react';
import {gameVroomVroom} from "../js/blockBreakerJS.js";
import BlockMenu from "./BlockMenu.jsx";
// import {Tester} from "../js/tester.js";


function Canvas() {

    const [mode, setMode] = useState('new');

    // Create canvas, and bootstrap the game

    const canvasRef = useRef(null);
    const gameRef = useRef(null)

    useEffect(() => {
        // Bootstrapper for Block Breaker!
        if (canvasRef.current) {
            gameRef.current = new gameVroomVroom(canvasRef.current);
            gameRef.current.launcher();
            gameRef.current.Game.setGameMode(mode);
            // new Tester(canvasRef.current).launcher();
        }
    }, []);

    // Pause menu event


    return (
        <>
            <article className="game-status">
                <button onClick={() => {
                    if (gameRef.current) {
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
                        console.info('JS:', gameRef.current.Game.gameMode);
                        console.info('React:', mode);
                    }
                }}></button>
            </article>
            <section className="breaker-section">
                <canvas className="block-breaker liquify" ref={canvasRef} width={0} height={0}></canvas>
                {gameRef.current && mode === 'pause' ? <BlockMenu key="menu" /> : null}
            </section>
        </>
    );
}
/*block-breaker*/
export default Canvas;
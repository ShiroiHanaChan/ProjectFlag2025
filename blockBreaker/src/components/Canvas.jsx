import React, {useEffect, useRef, useState} from 'react';
import {gameVroomVroom} from "../js/blockBreakerJS.js";
import BlockMenu from "./BlockMenu.jsx";
// import {Tester} from "../js/tester.js";


function Canvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            new gameVroomVroom(canvasRef.current).launcher();
            // new Tester(canvasRef.current).launcher();
        }
    }, []);

    return (
        <>
            <article className="game-status">
                <p>SCORE: </p>
                <p>LIVES: </p>
            </article>
            <section className="breaker-section">
                <canvas className="block-breaker liquify" ref={canvasRef} width={0} height={0}></canvas>
                <BlockMenu/>
            </section>
        </>
    );
}
/*block-breaker*/
export default Canvas;
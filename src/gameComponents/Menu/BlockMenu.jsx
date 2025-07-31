import React from 'react';
import "../../scss/scssFile.css"
import {menuStates} from "./menuConfig.js";

function BlockMenu(props) {

    return (
        <>
            <section className="game-ui visible content-grid">
                <img src={"/gameArt/logo.png"} alt=""/>
                {menuStates[props.mode].map(
                        entry => <button key={entry.id}
                        onClick={entry.jsx ||
                            (entry.id === 'retry' ? async () => {
                                await props.rebuild('new');
                                props.function('play');
                            } : undefined) ||
                            (entry.id === 'quit' ? () => {
                                props.setLives(0);
                                props.function(entry.action);
                            } : undefined) ||
                            (entry.action ? () => props.function(entry.action) : undefined)}
                        >{entry.txt}</button>
                    )
                }
            </section>
        </>
    );
}

export default BlockMenu;
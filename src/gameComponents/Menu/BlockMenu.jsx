import React from 'react';
import "../../scss/scssFile.css"
import {menuStates} from "./menuConfig.js";

function BlockMenu(props) {

    return (
        <>
            <section className="game-ui visible content-grid">
                <img src={"/src/assets/gameArt/logo.png"} alt=""/>
                {menuStates[props.mode].map(
                        entry => <button key={entry.id}
                        onClick={entry.jsx ||
                            (entry.id === 'retry' ? () => {
                                props.rebuild('new');
                                props.function('play');
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
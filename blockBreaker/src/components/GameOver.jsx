import React, {useCallback, useEffect} from 'react';
import "./../../../scss/scssFile.css"
import {useDispatch, useSelector} from "react-redux";
import {Entry, Score, verifyDuplicates} from "../config.js";
import {submitScore} from "../redux/blockSlice.js";

function GameOver(props) {

    const reduxState = useSelector(state => state);
    const dispatch = useDispatch();

    const handleNewEntry = useCallback((eventObj) => {
        const scoreName = document.querySelector('#scoreName');
        //
        eventObj.preventDefault();
        // Tests if scores has changed, if the name input is 3 characters long and letters and if there's no duplicates present
        if ( reduxState && (scoreName.value.length === 3 && [...scoreName.value].every(ch => /^[a-zA-Z]$/.test(ch))) && verifyDuplicates(scoreName.value, Score, reduxState.blockStore.scores) ) {
            const updateEntries = [...reduxState.blockStore.scores, new Entry(scoreName.value.toUpperCase(), Score)];
            // TODO: - Serialize the lastUpdated
            updateEntries.lastUpdated = Date.now();
            dispatch(submitScore(updateEntries));
        } else {
            console.error('Input err');
        }
    }, [reduxState]);

    useEffect(() => {
        addEventListener('submit', handleNewEntry, false);
        return () => removeEventListener('submit', handleNewEntry, false);
    }, [handleNewEntry]);

    return (
        <>
            <section className="game-ui visible liquify content-grid">
                <img src={"/src/assets/gameArt/logo.png"} alt=""/>
                <div>Score: 23855</div>
                <p key={'retry'} onClick={() => props.function('new')}>Retry</p>
                <form action="">
                    <label form="scoreName">Name:</label>
                    <input type="text" name="name" id="scoreName" placeholder="Input 3 characters!" />
                    <button type="submit">Bombs Away!!</button>
                </form>
            </section>
        </>
    );
}

export default GameOver;
import React, {useCallback, useEffect} from 'react';
import "../../scss/scssFile.css"
import {useDispatch, useSelector} from "react-redux";
import {Entry, Score, verifyDuplicates} from "../../js/config.js";
import {submitScore} from "../../redux/blockSlice.js";

function GameOver(props) {

    const reduxState = useSelector(state => state);
    const dispatch = useDispatch();

    const handleNewEntry = useCallback((eventObj) => {
        const scoreName = document.querySelector('#scoreName');
        //
        eventObj.preventDefault();
        // Tests if scores has changed, if the name input is 3 characters long and letters and if there's no duplicates present
        if ( reduxState && (scoreName.value.length === 3 && [...scoreName.value].every(ch => /^[a-zA-Z]$/.test(ch))) && verifyDuplicates(scoreName.value.toUpperCase(), props.points, reduxState.blockStore.scores) ) {
            const updateEntries = [...reduxState.blockStore.scores, new Entry(scoreName.value.toUpperCase(), props.points)];
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
            <section className="game-ui visible content-grid">
                <img src={"/src/assets/gameArt/logo.png"} alt=""/>
                <div>Score: {props.points}</div>
                {props.bonus > 0 ? <div>Bonus: {props.bonus} * 500!</div> : <div>No bonus :c</div>}
                <form action="" className="score-submit">
                    <label form="scoreName">Name:</label>
                    <input type="text" name="name" id="scoreName" placeholder="Input 3 characters!" />
                    <button type="submit">Submit</button>
                </form>
                <p key={'retry'} onClick={() => props.rebuild('new')}>Play again!</p>
            </section>
        </>
    );
}

export default GameOver;
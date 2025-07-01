import './App.scss'
import {useCallback, useEffect, useState} from "react";
import {dataURL, Entry, Score, verifyDuplicates} from "./config.js";
import Leaderboard from "./components/Leaderboard.jsx";
import BlockMenu from "./components/BlockMenu.jsx";

/*
* TODO:
*  - Make sure score name and exact same score do not duplicate ✅
* */

function App() {

    const [scores, setScores] = useState(null);
    const scoreName = document.querySelector('#scoreName');

    // TODO: Fix event handler to prevent event duplication on renders, causing major lag ✅

    const handleNewEntry = useCallback((eventObj) => {
        eventObj.preventDefault();
        // Tests if scores has changed, if the name input is 3 characters long and letters and if there's no duplicates present
        if ( scores && (scoreName.value.length === 3 && [...scoreName.value].every(ch => /^[a-zA-Z]$/.test(ch))) && verifyDuplicates(scoreName.value, Score, scores.entries) ) {
            const updateEntries = {...scores};
            updateEntries.entries = [new Entry(scoreName.value.toUpperCase(), Score), ...updateEntries.entries];
            updateEntries.lastUpdated = Date.now();
            setScores(updateEntries);
            console.log(scores);
        } else {
            console.error('Input err');
        }
    }, [scoreName.value, scores]);

    useEffect(() => {
        addEventListener('submit', handleNewEntry, false);
        return () => removeEventListener('submit', handleNewEntry, false);
    }, [handleNewEntry]);


    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(dataURL);
                    if (!response.ok)
                        throw Error(`Data fetch error! ${response.status}`);
                    const data = await response.json();
                    setScores(data);
                } catch (error) {
                    console.log('Error:', error)
                }
            }
        )();
    }, []);



    if (scores !== null) {
        return (
            <>
                <h2>High Scores!!</h2>
                <article>
                    <Leaderboard
                        lbScores={scores}
                    />
                    <BlockMenu/>
                </article>
            </>
        )
    } else {
        return (
            <>
                <span className="loader"></span>
            </>
        )
    }

}

export default App

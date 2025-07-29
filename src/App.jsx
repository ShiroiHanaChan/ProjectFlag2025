import {useDispatch, useSelector} from "react-redux";
import Leaderboard from "./gameComponents/Leaderboard.jsx";
import Canvas from "./gameComponents/Canvas.jsx";
import React, {useEffect} from "react";
import {leaderboardDataFetch} from "./redux/blockSlice.js";
import SkeletonGrid from "./skeletonLoaders/SkeletonNav.jsx";
import SkeletonHero from "./skeletonLoaders/SkeletonHero.jsx";

/*
* TODO:
*  - Make sure score name and exact same score do not duplicate ✅
* */

export const breakerContext = React.createContext(undefined);

function App() {

    // Build state
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(leaderboardDataFetch());
    }, [dispatch]);

    // Fetch state
    const reduxState = useSelector(state => state.blockStore);

    // TODO: Fix event handler to prevent event duplication on renders, causing major lag ✅
    /*
        const scoreName = document.getElementById('#scoreName');

        /*console.log('reduxState.blockStore:', reduxState.blockStore);
        console.log('reduxState.blockStore.scores:', reduxState.blockStore.scores);*/

    /*const handleNewEntry = useCallback((eventObj) => {
        debugger
        console.info(eventObj);
        //
        eventObj.preventDefault();
        // Tests if scores has changed, if the name input is 3 characters long and letters and if there's no duplicates present
        if ( reduxState && (scoreName.value.length === 3 && [...scoreName.value].every(ch => /^[a-zA-Z]$/.test(ch))) && verifyDuplicates(scoreName.value, Score, reduxState.blockStore.scores) ) {
            const updateEntries = [...reduxState.blockStore.scores, new Entry(scoreName.value, Score)];
            updateEntries.lastUpdated = Date.now();
            dispatch(submitScore(updateEntries))
        } else {
            console.error('Input err');
        }
    }, [scoreName.value, reduxState]);

    useEffect(() => {
        addEventListener('submit', handleNewEntry, false);
        return () => removeEventListener('submit', handleNewEntry, false);
    }, [handleNewEntry]);*/

/*
    const [scores, setScores] = useState(null);
    const scoreName = document.querySelector('#scoreName');

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
*/


/*    useEffect(() => {
        (
            async () => {
                try {
                    const response = await fetch(dataURL);
                    if (!response.ok)
                        throw Error(`Data fetch error! ${response.status}`);
                    dispatch(importData([...await response.json()]));
                } catch (error) {
                    console.error('Error using dispatch:', error)
                }
            }
        )();
    }, []);*/

    console.log(reduxState);

    if (reduxState.scores && !reduxState.loading) {
        return (
            <>
                <breakerContext.Provider value={ { reduxState } }>
                <article className="game-component">
                        <Canvas/>
                        <Leaderboard
                            lbScores={reduxState.scores}
                        />
                </article>
                </breakerContext.Provider>
            </>
        )
    } else {
        return (
            <>
                <section className="skeleton-grid">
                    <SkeletonHero />
                    <SkeletonHero />
                </section>
            </>
        )
    }

}

export default App

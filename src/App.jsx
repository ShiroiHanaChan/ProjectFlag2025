import {useDispatch, useSelector} from "react-redux";
import Leaderboard from "./gameComponents/Leaderboard.jsx";
import Canvas from "./gameComponents/Canvas.jsx";
import React, {useEffect} from "react";
import {leaderboardDataFetch} from "./redux/blockSlice.js";
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

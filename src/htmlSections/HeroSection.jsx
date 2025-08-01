import React from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import SkeletonHero from "../skeletonLoaders/SkeletonHero.jsx";


function HeroSection() {

    const navigate = useNavigate();
    const reduxState = useSelector(state => state.blockStore);

    if (!reduxState.loading) {
        return (
            <>
                <section className="hero-section liquify">
                    <article>
                        <h1 className="annoying-h1">Hey there! I’m Marina!</h1>
                        <br/>
                        <p>Currently residing in Portugal, I am a passionate front-end developer who is dedicated to creating accessible web applications that users love. Come check out my work! ₍⑅ᐢ..ᐢ₎</p>
                        <br/>
                        <p>Introducing my latest project, a game inspired by the classic Arkanoid. Get ready to break bricks and set new high scores in this beloved classic with all new fresh mechanics, vivid graphics, and engaging gameplay!</p>
                        <br/>
                        <button onClick={() => navigate('/game')}>Let's play!</button>
                    </article>
                </section>
            </>
        );
    } else {
        return (
            <>
                <SkeletonHero/>
            </>
        )
    }
}

export default HeroSection;
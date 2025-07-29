import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function DynamicNav() {

    const navigate = useNavigate();

    /* Checked -> Light theme */
    /* Theming works with a boolean value, true means light and false means dark
    * When the page is loading, a constant is set to either true or false depending
    * on the user's preference, if it is dark the state is set to truth and vice versa */
    const [theme, setTheme] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);


    const handleTheme = () => {
        /* Theme handler set the boolean to the inverse, and the data-theme is set
        * to white if the boolean is true, or dark if the boolean is false */
        setTheme(!theme);
        document.documentElement.setAttribute('data-theme', theme ? 'light' : 'dark');
    }



    return (
        <>
            <nav className={'liquify full-width'}>
                <ul className="nav-ul">
                    <li><button aria-label="Go to landing page!"><img src="/logo.png" alt="" onClick={() => navigate('/')}/></button></li>
                    <li><button onClick={() => {
                        navigate('/');
                        // Setting a timeout gives the router enough time to finish loading so scrolling is consistent
                        setTimeout(() => document.getElementById('rootFooter').scrollIntoView({behavior: "smooth", block: "end"}),20);

                    }}>Contact!</button></li>
                    <li><button onClick={() => navigate('/game')}>Let's play!</button></li>
                    <li>
                        <label className="theme-picker" aria-label="Pick either a light or dark theme, take care of your eyes!">
                            <input
                                onChange={handleTheme}
                                data-theme-picker
                                type="checkbox"
                                name="themer"
                                id="themer"/>
                        </label>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default DynamicNav;
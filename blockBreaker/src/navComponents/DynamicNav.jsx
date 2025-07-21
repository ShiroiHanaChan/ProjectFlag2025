import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function DynamicNav() {

    const navigate = useNavigate();

    /* Checked -> Light theme */
    const [theme, setTheme] = useState(true);

    const handleTheme = () => {
        setTheme(!theme);
        document.documentElement.setAttribute('data-theme', theme ? 'light' : 'dark');
        console.info('Theme changed!', theme ? 'light' : 'dark');
    }

    return (
        <>
            <nav className={'liquify full-width'}>
                <ul className="nav-ul">
                    <li><img src="/logo.png" alt=""/></li>
                    <li><button onClick={() => navigate('/instructions')}>Instructions</button></li>
                    <li><button onClick={() => navigate('/game')}>Let's play!</button></li>
                    <li>
                        <label className="theme-picker" alt="Theme selector">
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
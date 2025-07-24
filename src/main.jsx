import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store.js";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import DynamicNav from "./navComponents/DynamicNav.jsx";
import Footer from "./htmlSections/Footer.jsx";
import HeroSection from "./htmlSections/HeroSection.jsx";
import SocialLinks from "./htmlSections/SocialLinks.jsx";
import {createPortal} from "react-dom";

const rootHeader = createRoot(document.getElementById('rootHeader'));

const routerConfig = {
    '/': {
        // Return following components
        header: () => (
            <>
                <DynamicNav />
                <HeroSection />
            </>
        ),
        main: () => (
            <>
                <App />
            </>
        ),
        footer: () => (
            <>
                <Footer />
                <SocialLinks />
            </>
        ),
    },
    '/game': {
        // Return following components
        header: () => (
            <>
                <DynamicNav />
            </>
        ),
        main: () => (
            <>
                <App />
            </>
        ),
        footer: () => (
            <>
                <SocialLinks />
            </>
        ),
    },
};

function Wrapper({section}) {
    return (
        /*<StrictMode>
            <Provider store={store}>
                <BrowserRouter>*/
                    <Render section={section} />
                /*</BrowserRouter>
            </Provider>
        </StrictMode>*/
    )
}

function Render({section}) {
    const location = useLocation();
    const config = routerConfig[location.pathname];
    if (config && config[section]) {
        return config[section]();
    }
    return console.error('This URL is not valid!')
}

rootHeader.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/"
                           element={
                               <>
                                   {createPortal(<Wrapper section="header" />, document.getElementById('rootHeader'))}
                                   {createPortal(<Wrapper section="main" />, document.getElementById('root'))}
                                   {createPortal(<Wrapper section="footer" />, document.getElementById('rootFooter'))}
                               </>
                           }
                    ></Route>
                    <Route path="/game"
                           element={
                               <>
                                   {createPortal(<Wrapper section="header" />, document.getElementById('rootHeader'))}
                                   {createPortal(<Wrapper section="main" />, document.getElementById('root'))}
                                   {createPortal(<Wrapper section="footer" />, document.getElementById('rootFooter'))}
                               </>
                           }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

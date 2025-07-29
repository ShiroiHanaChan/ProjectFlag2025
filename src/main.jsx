import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store.js";
import {Provider, useSelector} from "react-redux";
import {BrowserRouter, Route, Routes, useLocation} from "react-router-dom";
import DynamicNav from "./navComponents/DynamicNav.jsx";
import Footer from "./htmlSections/Footer.jsx";
import HeroSection from "./htmlSections/HeroSection.jsx";
import SocialLinks from "./htmlSections/SocialLinks.jsx";
import {createPortal} from "react-dom";
import NotFound from "./htmlSections/NotFound.jsx";
import SkeletonGrid from "./skeletonLoaders/SkeletonGrid.jsx";
import SkeletonHero from "./skeletonLoaders/SkeletonHero.jsx";
import SkeletonNav from "./skeletonLoaders/SkeletonNav.jsx";

function spookySkeletonLoaders() {
    const loading = useSelector((state => state.block.loading));

    if (loading) {

    }
}

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
    '/skeleton': {
        // Return following components
        header: () => (
            <>
                <SkeletonNav />
                <SkeletonHero />
            </>
        ),
        main: () => (
            <>
                <SkeletonGrid />
            </>
        ),
        footer: () => (
            <>
                <SkeletonGrid />
            </>
        ),
    },
};

function Wrapper({section}) {
    return (
        <Render section={section} />
    )
}

function Render({section}) {
    const location = useLocation();
    const config = routerConfig[location.pathname];
    if (config && config[section]) {
        return config[section]();
    }
    // 404 Fallback c:
    return (
        <NotFound />
    )
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
                                   {createPortal(<Wrapper section="main" />, document.getElementById('rootMain'))}
                                   {createPortal(<Wrapper section="footer" />, document.getElementById('rootFooter'))}
                               </>
                           }
                    ></Route>
                    <Route path="/game"
                           element={
                               <>
                                   {createPortal(<Wrapper section="header" />, document.getElementById('rootHeader'))}
                                   {createPortal(<Wrapper section="main" />, document.getElementById('rootMain'))}
                                   {createPortal(<Wrapper section="footer" />, document.getElementById('rootFooter'))}
                               </>
                           }
                    ></Route>
                    <Route path="/skeleton"
                           element={
                               <>
                                   {createPortal(<Wrapper section="header" />, document.getElementById('rootHeader'))}
                                   {createPortal(<Wrapper section="main" />, document.getElementById('rootMain'))}
                                   {createPortal(<Wrapper section="footer" />, document.getElementById('rootFooter'))}
                               </>
                           }
                    ></Route>
                    <Route path="*"
                           element={
                               <>
                                   {createPortal(<Wrapper section="main" />, document.getElementById('rootMain'))}
                               </>
                           }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
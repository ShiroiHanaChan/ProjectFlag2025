import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import store from "./redux/store.js";
import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DynamicNav from "./navComponents/DynamicNav.jsx";
import Footer from "./sections/Footer.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import SocialLinks from "./sections/SocialLinks.jsx";

const rootHeader = createRoot(document.getElementById('rootHeader'));
rootHeader.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'
                           element={
                                <>
                                    <DynamicNav />
                                    <HeroSection />
                                </>
                           }
                    >
                    </Route>
                    <Route path='/game'
                            element={<DynamicNav />}
                    >
                    </Route>
                </Routes>
            </BrowserRouter>

        </Provider>
    </StrictMode>,
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path='/'
                         element={
                            <>
                                <App />
                            </>
                  }
                  ></Route>
                  <Route path='/game'
                         element={<App />}
                  ></Route>
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)

const rootFooter = createRoot(document.getElementById('rootFooter'));
rootFooter.render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/'
                           element={
                                <>
                                    <Footer />
                                    <SocialLinks />
                                </>
                            }
                    ></Route>
                    <Route path='/game'
                           element={<SocialLinks />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)


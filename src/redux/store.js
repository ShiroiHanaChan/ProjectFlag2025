/* creates the Redux store instance (manages the global state of
the app) */

import {configureStore} from "@reduxjs/toolkit";
import blockSlice from "./blockSlice.js";

const store = configureStore ({
   reducer: {
       // to fill with one of each feature slice reducer
      blockStore: blockSlice,
   },
});

 export default store;
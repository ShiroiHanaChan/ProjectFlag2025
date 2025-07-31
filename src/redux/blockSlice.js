/* the Redux logic for the Block Breaker! feature (used to define the
reducers object with functions for the actions [add, delete, clear] ) */

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {dataURL} from "../js/config.js";

export const leaderboardDataFetch = createAsyncThunk(
    'blockSlice/fetchData',
    async () => {
        try {
            const response = await fetch(dataURL);
            return await response.json();
        } catch (error) {
            console.error('An error has occurred loading data from the server:', error);
        }
    }
)

const blockSlice = createSlice ({
   name: "[BlockBreaker] Slice",
   initialState: {
       leaderboardData: [],
       scores: [],
       sortedScores: [],
       gameState: [],
       loading: true,
       error: null,
   },
    reducers: { // AKA methods
        /*importData: (state, action) => {
            state.leaderboardData = [... action.payload];
            state.scores = [... state.leaderboardData.entries];
        },*/
        submitScore: (state, action) => {
            state.leaderboardData = action.payload;
            state.scores = state.leaderboardData.entries;
        },
        changeGamemode: (state, action) => {
            state.gameState = ['', ...action.payload];
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(leaderboardDataFetch.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(leaderboardDataFetch.fulfilled, (state, action) => {
            state.loading = false;
            state.leaderboardData = action.payload;
            state.scores = state.leaderboardData.entries;
        })
        .addCase(leaderboardDataFetch.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

        // Reducers
export const {
    importData,
    submitScore,
    changeGamemode} = blockSlice.actions;
export default blockSlice.reducer;
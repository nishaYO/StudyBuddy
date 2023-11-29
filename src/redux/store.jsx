import { configureStore } from "@reduxjs/toolkit";
import breaksReducer from "./breakslice";
import sessionDurationReducer from "./sessionDuration";
import sessionIntervalsReducer from "./sessionIntervals";

export const store = configureStore({
    reducer: {
        breaks: breaksReducer,
        sessionDuration: sessionDurationReducer,
        sessionIntervals: sessionIntervalsReducer,
    },
});

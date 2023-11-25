import { configureStore } from "@reduxjs/toolkit";
import breaksReducer from "./breakslice";
import sessionDurationReducer from "./sessionDuration";

export const store = configureStore({
    reducer: {
        breaks: breaksReducer,
        sessionDuration: sessionDurationReducer
    },
});

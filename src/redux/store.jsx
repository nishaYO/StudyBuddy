import { configureStore } from "@reduxjs/toolkit";
import breaksReducer from "./breakslice";

export const store = configureStore({
    reducer: {
        breaks: breaksReducer,
    },
})
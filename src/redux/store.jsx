// store.js
import { configureStore } from "@reduxjs/toolkit";
import breaksReducer from "./breakslice";

// Creating and configuring the Redux store
export const store = configureStore({
    reducer: {
        breaks: breaksReducer, // Adding breaksReducer to manage breaks state
    },
});

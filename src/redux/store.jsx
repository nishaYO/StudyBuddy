import { configureStore } from "@reduxjs/toolkit";
import breaksReducer from "./breakslice";
import sessionDurationReducer from "./sessionDuration";
import sessionIntervalsReducer from "./sessionIntervals";
import sessionStartTimeReducer from "./sessionStartTime";
import notificationsReducer from "./notifications";

export const store = configureStore({
    reducer: {
        breaks: breaksReducer,
        sessionDuration: sessionDurationReducer,
        sessionIntervals: sessionIntervalsReducer,
        sessionStartTime: sessionStartTimeReducer,
        notifications: notificationsReducer,
    },
});

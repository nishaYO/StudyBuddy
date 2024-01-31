import { createSlice } from "@reduxjs/toolkit";

const {hours, minutes} = JSON.parse(localStorage.getItem("streakGoal")) || {
  hours: 4,
  minutes: 0,
};

const sessionDuration = createSlice({
  name: "sessionDuration",
  initialState: { hours: parseInt(hours), minutes: parseInt(minutes), seconds: 0 },
  reducers: {
    setSessionDuration: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSessionDuration } = sessionDuration.actions;
export default sessionDuration.reducer;

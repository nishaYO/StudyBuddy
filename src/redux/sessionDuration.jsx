import { createSlice } from "@reduxjs/toolkit";

const storedGoal = JSON.parse(localStorage.getItem("streakGoal")) || {
  hours: "04",
  minutes: "0",
};

const sessionDuration = createSlice({
  name: "sessionDuration",
  initialState: { hours: storedGoal.hours, minutes: storedGoal.minutes, seconds: "0" },
  reducers: {
    setSessionDuration: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSessionDuration } = sessionDuration.actions;
export default sessionDuration.reducer;

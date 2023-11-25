import { createSlice } from '@reduxjs/toolkit';

// Creating a Redux slice for managing break durations
const sessionDuration = createSlice({
  name: 'sessionDuration', // Name of the slice
  initialState: {hours: '2', minutes: '30', seconds: '0'}, // Initial state with a default break entry
  reducers: {
    // Reducer function to set breaks in the state
    setSessionDuration: (state, action) => {
      return action.payload; // Set the state to the payload value (new breaks)
    },
  },
});

// Exporting action creator and reducer from the slice
export const { setSessionDuration } = sessionDuration.actions;
export default sessionDuration.reducer;

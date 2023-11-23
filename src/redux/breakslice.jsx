// breaksSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Creating a Redux slice for managing break durations
const breaksSlice = createSlice({
  name: 'breaks', // Name of the slice
  initialState: [
    {
      breakDuration: { hours: '', minutes: '', seconds: '' },
      studyDuration: { hours: '', minutes: '', seconds: '' },
    },
  ], // Initial state with a default break entry
  reducers: {
    // Reducer function to set breaks in the state
    setBreaks: (state, action) => {
      return action.payload; // Set the state to the payload value (new breaks)
    },
  },
});

// Exporting action creator and reducer from the slice
export const { setBreaks } = breaksSlice.actions;
export default breaksSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const sessionIntervals = createSlice({
  name: 'sessionIntervals', 
  initialState: [], 
  reducers: {
    setSessionIntervals: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setSessionIntervals } = sessionIntervals.actions;
export default sessionIntervals.reducer;

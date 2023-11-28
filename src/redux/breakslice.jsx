import { createSlice } from '@reduxjs/toolkit';

const breaksSlice = createSlice({
  name: 'breaks', 
  initialState: [], 
  reducers: {
    setBreaks: (state, action) => {
      return action.payload; // Set the state to the payload value (new breaks)
    },
  },
});

export const { setBreaks } = breaksSlice.actions;
export default breaksSlice.reducer;


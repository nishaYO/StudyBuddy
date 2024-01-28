import { createSlice } from '@reduxjs/toolkit';

const sessionStartTime = createSlice({
  name: 'sessionStartTime', 
  initialState: null, 
  reducers: {
    setSessionStartTime: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setSessionStartTime } = sessionStartTime.actions;
export default sessionStartTime.reducer;

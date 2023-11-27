import { createSlice } from '@reduxjs/toolkit';

const sessionDuration = createSlice({
  name: 'sessionDuration', 
  initialState: {hours: '3', minutes: '30', seconds: '0'},
  reducers: {
    
    setSessionDuration: (state, action) => {
      return action.payload; 
    },
  },
});

export const { setSessionDuration } = sessionDuration.actions;
export default sessionDuration.reducer;

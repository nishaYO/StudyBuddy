// breaksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const breaksSlice = createSlice({
  name: 'breaks',
  initialState: [
    {
      breakDuration: { hours: '', minutes: '', seconds: '' },
      studyDuration: { hours: '', minutes: '', seconds: '' },
    },
  ],
  reducers: {
    setBreaks: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBreaks } = breaksSlice.actions;
export default breaksSlice.reducer;

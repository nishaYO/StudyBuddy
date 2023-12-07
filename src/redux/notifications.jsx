import { createSlice } from '@reduxjs/toolkit';

const notifications = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    setNotifications: (state, action) => {
      return action.payload;
    },
    addNotification: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setNotifications, addNotification } = notifications.actions;
export default notifications.reducer;

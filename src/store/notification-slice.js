import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notification: null },
  reducers: {
    clearNotification(state) {
      state.notification = null;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
  },
});

export const notificationActions = notificationSlice.actions;

export default notificationSlice;

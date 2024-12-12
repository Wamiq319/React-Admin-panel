// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  visible: false,
  duration: 2000,
  className: "",
  autoHide: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.message = action.payload.message;
      state.visible = true;
      state.duration = action.payload.duration || 2000;
      state.className = action.payload.className || "";
      state.autoHide =
        action.payload.autoHide !== undefined ? action.payload.autoHide : true;
    },
    hideNotification: (state) => {
      state.visible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

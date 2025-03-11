// notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setAuth: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;

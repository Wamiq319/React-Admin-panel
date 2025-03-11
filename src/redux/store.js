import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./slices/langSlice";
import notificationReducer from "./slices/notificationslice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    lang: langReducer,
    notification: notificationReducer,
    auth: authReducer,
  },
});

export default store;

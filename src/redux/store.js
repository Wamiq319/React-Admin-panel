import { configureStore } from "@reduxjs/toolkit";
import langReducer from "./slices/langSlice";
import notificationReducer from "./slices/notificationslice";

const store = configureStore({
  reducer: {
    lang: langReducer,
    notification: notificationReducer,
  },
});

export default store;

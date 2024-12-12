import { createSlice } from "@reduxjs/toolkit";
import { urd } from "../../lang/urd"; // Ensure the Urdu language file is imported correctly
import { eng } from "../../lang/eng"; // Ensure the English language file is imported correctly

// Initial state with default language as English
const initialState = {
  lang: eng,
  words: eng,
};

// Create a slice for managing language
const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;

      // Change the language words based on the selected language
      if (action.payload === "eng") {
        state.words = eng; // load English words
      } else if (action.payload === "urd") {
        state.words = urd; // load Urdu words
      }
    },
  },
});

// Export the action and the reducer
export const { setLanguage } = langSlice.actions;
export default langSlice.reducer;

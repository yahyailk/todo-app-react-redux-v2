import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: JSON.parse(localStorage.getItem("isDarkMode")) || false,
  },

  reducers: {
    switchTheme: (state, action) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import todosSlice from "./todosSlice";

export const store = configureStore({
    reducer: {
        todo: todosSlice,
        theme: themeSlice
    },
})
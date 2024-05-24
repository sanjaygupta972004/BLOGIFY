import { createSlice } from "@reduxjs/toolkit";
import React from "react";
const initialState = {
    theme: "light",
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer
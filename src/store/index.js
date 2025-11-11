// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import publicationsReducer from "./publicationsSlice";

const store = configureStore({
  reducer: {
    publications: publicationsReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import imagesReducer from './imageSlice'

const store = configureStore({
  reducer: {
    news: newsReducer,
    images: imagesReducer,
  },
});

export default store;

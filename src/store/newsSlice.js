import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define an async thunk to fetch the news data
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await fetch('http://localhost:5000/api/gaming-news');
  const data = await response.json();
  return data;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;

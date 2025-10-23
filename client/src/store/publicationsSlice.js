// src/store/publicationsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch publications dynamically with tag + category ID
export const fetchPublications = createAsyncThunk(
  "publications/fetchPublications",
  async ({ categoryId, tagId }) => {
    const response = await fetch(
      `https://igamingafrika.com/wp-json/wp/v2/posts?tags=${tagId}&categories=${categoryId}&page=1&per_page=10`
    );
    const data = await response.json();
    return data;
  }
);

const publicationsSlice = createSlice({
  name: "publications",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPublications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default publicationsSlice.reducer;

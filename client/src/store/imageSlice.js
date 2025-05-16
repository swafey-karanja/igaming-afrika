import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchImages = createAsyncThunk("images/fetchImages", async () => {
  const response = await fetch("../../public/images.json");
   const data = await response.json();
  return data;
})

const imagesSlice = createSlice({
  name: 'images',
  initialState: {
    images: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default imagesSlice.reducer;

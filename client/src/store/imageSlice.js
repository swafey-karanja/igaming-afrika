import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Replace with your proxy server or Cloudinary function
const CLOUDINARY_API = 'http://localhost:5000/api/images';

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const response = await axios.get(CLOUDINARY_API);
  return response.data.resources.map(img => img.secure_url); // extract URLs
});

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

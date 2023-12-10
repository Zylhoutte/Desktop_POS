// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from './productService'; // Adjust the path based on your project structure

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  return productService.getAllProducts();
});

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (productId) => {
  return productService.deleteProduct(productId);
});

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((product) => product._id !== action.payload._id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const token = `${localStorage.getItem('authData')}` ? JSON.parse(localStorage.getItem('authData')).token : null;
const USER_TOKEN = `Bearer ${token}`;

// async thunk to fetch products for admin dashboard
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAdminProducts',
  async () => {
    const response = await axios.get(`${API_URL}/admin/products`, {
      headers: {
        Authorization: USER_TOKEN
      }
    });
    return response.data;
  }
);

// async thunk to create a new product
export const createProduct = createAsyncThunk(
  'adminProducts/createProduct',
  async (productData) => {
    const response = await axios.post(`${API_URL}/admin/products`, productData, {
      headers: {
        Authorization: USER_TOKEN
      }
    });
    return response.data;
  }
);

// async thunk to update an existing product
export const updateProduct = createAsyncThunk(
  'adminProducts/updateProduct',
  async (productData) => {
    const response = await axios.put(`${API_URL}/admin/products`, productData, {
      headers: {
        Authorization: USER_TOKEN
      }
    });
    return response.data;
  }
);

// async Thunk to delete a product
export const deleteProduct = createAsyncThunk(
  'adminProducts/deleteProduct',
  async (productId) => {
    await axios.delete(`${API_URL}/admin/products/${productId}`, {
      headers: {
        Authorization: USER_TOKEN 
      }
    });
    return productId;
  }
);

const adminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState: {
    products: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // async thunk cases for fetching products
        .addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        // async thunk cases for creating, updating, and deleting products
        .addCase(createProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products.push(action.payload);
        })
        // async thunk cases for updating a product
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.products.findIndex((product) => product._id === action.payload._id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
        })
        // async thunk cases for deleting a product
        .addCase(deleteProduct.fulfilled, (state, action) => {
          state.loading = false;
          state.products = state.products.filter((product) => product._id !== action.payload._id);
        })
  }
});

export default adminProductsSlice.reducer;
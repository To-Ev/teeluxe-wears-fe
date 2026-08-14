import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const authData = localStorage.getItem('authData');
const token = authData ? JSON.parse(authData).token : null;

const USER_TOKEN = `Bearer ${token}`;

// async thunk to fetch products for admin dashboard
export const fetchAdminProducts = createAsyncThunk(
  'adminProducts/fetchAdminProducts',
  async () => {
    const response = await api.get(`${API_URL}/admin/products`, {
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
    const response = await api.post(`${API_URL}/products`, productData, {
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
    const response = await api.put(`${API_URL}/products/${productData._id}`, productData, {
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
    await api.delete(`${API_URL}/products/${productId}`, {
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
    error: null,
    success: null
  },
  reducers: {
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
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
        state.error = action.error.message || "Failed to fetch products";
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.newProduct || action.payload);
        state.success = action.payload.msg || "Product created successfully!";
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product";
      })

      // Update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        state.success = "Product updated successfully!";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
        state.success = "Product deleted successfully!";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete product";
      });
  }
});

export const { clearStatus } = adminProductsSlice.actions;
export default adminProductsSlice.reducer;
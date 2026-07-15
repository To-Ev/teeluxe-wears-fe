import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';  

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`; // Base URL for your backend API
// Async thunk to handle checkout process
export const createCheckout = createAsyncThunk(
  'checkout/createCheckout',
  async (checkoutData, { rejectWithValue }) => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      const response = await api.post(`${API_URL}/checkout`, checkoutData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Checkout failed! check network connection");
    }
  }
);


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        checkout: null,
        loading: false,
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckout.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckout.fulfilled, (state, action) => {
                state.loading = false;
                state.checkout = action.payload;
            })
            .addCase(createCheckout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default checkoutSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';  

// Async thunk to handle checkout process
export const createCheckout = createAsyncThunk(
  'checkout/createCheckout',
    async (checkoutData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/checkout', checkoutData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
        },
      });
      return response.data; // Assuming the API returns the order details
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error message from API
    }}
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
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch user orders
export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders", async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data; // Assuming the API returns an array of orders
        } catch(err) {
            return rejectWithValue(err.response.data); // Return error message from API
        }
    }
);

// Async Thunk to fetch order details
export const fetchOrderDetails = createAsyncThunk(
    "orders/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data; // Assuming the API returns an array of orders
        } catch(err) {
            return rejectWithValue(err.response.data); // Return error message from API
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orders: [],
        totalOrders: 0,
        OrderDetails: null,
        loading: false,
        error: null,
    },
    reducers: {
        // You can add synchronous reducers here if needed
       },
        extraReducers: (builder) => {
            builder
            // fetch user orders
                .addCase(fetchOrders.pending, (state) => {
                   state.loading = true;
                   state.error = null;
                })
                .addCase(fetchOrders.fulfilled, (state, action) => {
                    state.loading = false;
                    state.orders = action.payload;
                })
                .addCase(fetchOrders.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
                //    fetch order details
                    .addCase(fetchOrderDetails.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchOrderDetails.fulfilled, (state, action) => {
                    state.loading = false;
                    state.orders = action.payload;
                })
                .addCase(fetchOrderDetails.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                })
        },
});

export default orderSlice.reducer;
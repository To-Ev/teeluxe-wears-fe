import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../api";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const authData = localStorage.getItem('authData');
const token = authData ? JSON.parse(authData).token : null;

const USER_TOKEN = `Bearer ${token}`;

// fetch all orders for admin
export const fetchAdminOrders = createAsyncThunk(
  'adminOrders/fetchAdminOrders',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(`${API_URL}/admin/orders`, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.err || 'Failed to fetch orders');
        }
    }
);

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async ({id, status}, {rejectWithValue}) => {
        try {
            const response = await api.put(`${API_URL}/admin/orders/${id}`, { status }, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.err || 'Failed to update order status');
        }
    }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
    'adminOrders/deleteOrder',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await api.delete(`${API_URL}/admin/orders/${id}`, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.err || 'Failed to delete order');
        }
    }
);

const adminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // fetch all admin orders
            .addCase(fetchAdminOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
                state.totalOrders = action.payload.length;

                // calculate total sales
                const totalSales = action.payload.reduce((total, order) => total + order.totalPrice, 0);
                state.totalSales = totalSales;
            })
            .addCase(fetchAdminOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch orders';
            })
            // update order status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                const updateOrder = action.payload;
                const orderIndex = state.orders.findIndex(order => order._id === updateOrder._id);
                if (orderIndex !== -1) {
                    state.orders[orderIndex] = updateOrder;
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.error = action.payload || 'Failed to update order status';
            })
            // delete order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order._id !== action.payload._id);
            })
        }
});

export default adminOrderSlice.reducer;

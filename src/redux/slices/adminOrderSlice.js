import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;
const token = `${localStorage.getItem('authData')}` ? JSON.parse(localStorage.getItem('authData')).token : null;
const USER_TOKEN = `Bearer ${token}`;
console.log('USER_TOKEN:', USER_TOKEN);

// fetch all orders for admin
export const fetchAdminOrders = createAsyncThunk(
  'adminOrders/fetchAdminOrders',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_URL}/admin/orders`, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// update order delivery status
export const updateOrderStatus = createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async ({id, status}, {rejectWithValue}) => {
        try {
            const response = await axios.put(`${API_URL}/admin/orders/${id}`, { status }, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Delete an order
export const deleteOrder = createAsyncThunk(
    'adminOrders/deleteOrder',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`${API_URL}/admin/orders/${id}`, {
                headers: {
                    Authorization: USER_TOKEN,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
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
            // delete order
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter(order => order._id !== action.payload._id);
            })
        }
});

export default adminOrderSlice.reducer;

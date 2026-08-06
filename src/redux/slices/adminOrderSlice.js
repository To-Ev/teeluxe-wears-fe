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
            return rejectWithValue(error?.response?.data?.err || 'Failed to fetch orders! check network connection');
        }
    }
);

//Get admin order details
export const fetchOrderDetails = createAsyncThunk(
  'orders/fetchOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_URL}/admin/orders/${orderId}`, {
            headers: {
                Authorization: USER_TOKEN,
            }
        });
        return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || 'Failed to fetch order');
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
            return rejectWithValue(error?.response?.data?.err || 'Failed to update order status! check network connection');
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
            return rejectWithValue(error?.response?.data?.err || 'Failed to delete order! check network connection');
        }
    }
);

// End of year closing thunks
export const closeYear = createAsyncThunk(
  "adminOrders/closeYear",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/orders/year-closing");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Failed to close year");
    }
  }
);

export const fetchClosingLogs = createAsyncThunk(
  "adminOrders/fetchClosingLogs",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/orders/closing-logs");
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Failed to fetch logs");
    }
  }
);


const adminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        logs: [],
        loading: false,
        error: null,
        closingMessage: null,
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
        state.totalSales = action.payload.reduce((total, order) => total + order.totalPrice, 0);
        })
        .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })

        // fetch single order details
        .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload; // add selectedOrder to initialState
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })

        // update order status
        .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        })
        .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(o => o._id === updatedOrder._id);
        if (index !== -1) state.orders[index] = updatedOrder;
        state.selectedOrder = updatedOrder; // keep detail page in sync
        })
        .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        })

        // delete order
        .addCase(deleteOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = state.orders.filter(order => order._id !== action.payload._id);
        })
        .addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(closeYear.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(closeYear.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = [];
            state.totalOrders = action.payload.totalOrders;
            state.totalSales = action.payload.totalSales;
            state.closingMessage = action.payload.message;
        })
        .addCase(closeYear.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchClosingLogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchClosingLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
        })
        .addCase(fetchClosingLogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }

});

export default adminOrderSlice.reducer;

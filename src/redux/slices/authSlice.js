import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Retrieve user info and token from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

// check for an existing guest ID in the local storage or generate a new one
const initialGuestId = 
    localStorage.getItem('guestId') || `guest_${new Date().getTime()}`; 
localStorage.setItem('guestId', initialGuestId);

// initial state
const initialState = {
    user: userInfoFromStorage,
    guestId: initialGuestId,
    loading: false,
    error: null,
};

// async thunk for user login
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
            localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store user info and token in localStorage
            localStorage.setItem('userToken', response.data.token); // Store user token in localStorage
            return response.data.user; // Assuming the response contains user info and token
        } catch (error) {
            return rejectWithValue(error.response.data.err || 'Login failed');  
        }
    }
);

// async thunk for user registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/register`, userData);
            localStorage.setItem('userInfo', JSON.stringify(response.data)); // Store user info and token in localStorage
            localStorage.setItem('userToken', response.data.token); // Store user token in localStorage
            return response.data.user; // Assuming the response contains user info and token
        } catch (error) {
            return rejectWithValue(error.response.data.err || 'Registration failed');  
        }
    }
);

// slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        logout: (state) => {
            state.user = null; // Clear user info from the slice
            state.guestId = `guest_${new Date().getTime()}`; // Generate a new guest ID on logout
            localStorage.removeItem('userInfo'); // Clear user info from localStorage
            localStorage.removeItem('userToken'); // Clear user token from localStorage
            localStorage.setItem('guestId', state.guestId); // Store the new guest ID in localStorage
        },
        generateGuestId: (state) => {
            state.guestId = `guest_${new Date().getTime()}`; // Generate a new guest ID
            localStorage.setItem('guestId', state.guestId); // Store the new guest ID in localStorage
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.err;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.err;
            });
    },
});
export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;
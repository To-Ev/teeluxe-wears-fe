import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// Retrieve user info and token from localStorage
const storedAuth = localStorage.getItem('authData')
  ? JSON.parse(localStorage.getItem('authData'))
  : null;

const initialGuestId =
  localStorage.getItem('guestId') || `guest_${new Date().getTime()}`;
  localStorage.setItem('guestId', initialGuestId);

// initial state
const initialState = {
  user: storedAuth?.user || null,
  token: storedAuth?.token || null,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      const authData = { user: response.data.user, token: response.data.token };
      localStorage.setItem('authData', JSON.stringify(authData));
      return authData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.err || 'Login failed');
    }
  }
);

// async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      const authData = { user: response.data.user, token: response.data.token };
      localStorage.setItem('authData', JSON.stringify(authData));
      return authData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.err || 'Registration failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      await api.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {},
        { withCredentials: true } // ensures cookie is sent
      );
    } catch (err) {
      console.error("Logout error:", err);
    }
    dispatch(logout()); // clears localStorage and Redux state
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem('authData');
      localStorage.setItem('guestId', state.guestId);
    },
    generateGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem('guestId', state.guestId);
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
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});



export const { logout, generateGuestId } = authSlice.actions;
export default authSlice.reducer;

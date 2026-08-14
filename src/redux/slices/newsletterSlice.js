import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async thunk for subscribing
export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/subscribe", { email });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Failed to subscribe to newsletter");
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(subscribeNewsletter.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(subscribeNewsletter.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.msg;
      })
      .addCase(subscribeNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.err;
      });
  },
});

export default newsletterSlice.reducer;

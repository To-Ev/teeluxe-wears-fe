import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Thunk: fetch reviews for a product
export const fetchProductReviews = createAsyncThunk(
  "reviews/fetchProductReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${productId}/reviews`);
      return { productId, reviews: data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Failed to fetch reviews");
    }
  }
);

// Thunk: add a review
export const addProductReview = createAsyncThunk(
  "reviews/addProductReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
      return { productId, review: data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.err || "Failed to add review");
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    byProduct: {}, // keyed by productId
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.byProduct[action.payload.productId] = action.payload.reviews;
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        const { productId, review } = action.payload;
        if (!state.byProduct[productId]) {
          state.byProduct[productId] = [];
        }
        state.byProduct[productId].push(review); //  now review is a single object
      });
  },
});

export default reviewsSlice.reducer;

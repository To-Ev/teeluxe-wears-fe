import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

// helper function to get cart from localStorage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { items: [] };
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// fetch cart from API for a user or guest
export const fetchCart = createAsyncThunk('cart/fetchCart', async ({userId, guestId}, { rejectWithValue }) => {
  try {
    const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
      params: { userId, guestId },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    return rejectWithValue(error.response?.data?.err);
    }
});

// add item to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, size, color, quantity, userId, guestId }, { rejectWithValue }) => {
  try { 
    const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        productId,
        size,
        color,
        quantity,
        userId,
        guestId,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return rejectWithValue(error.response?.data?.err);
  } 
});

// Update item quantity in cart
export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ productId, size, color, quantity, userId, guestId }, { rejectWithValue }) => {
  try {
    const response = await api.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart/`, {
        productId,
        size,
        color,
        quantity,
        userId,
        guestId,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return rejectWithValue(error.response?.data?.err);
  }
});

// Remove item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, size, color, userId, guestId }, { rejectWithValue }) => {
  try {
    const response = await api.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
        data: {
          productId,
          size,
          color,
          userId,
          guestId,
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return rejectWithValue(error.response?.data?.err);
  }
});

// merge guest cart with user cart on login
export const mergeCart = createAsyncThunk('cart/mergeCart', async ({ userId, guestId }, { rejectWithValue }) => {
  try {
    const response = await api.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, {
        userId,
        guestId,
    },
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error merging cart:', error);
    return rejectWithValue(error.response?.data?.err);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    cart: getCartFromLocalStorage(),
    loading: false,
    error: null,
},
  reducers: {
    clearCart(state) {
        state.cart = { products: [] };
        localStorage.removeItem('cart');
    },
  },
  extraReducers: (builder) => {
    builder      
    .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
    })
    .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart';
    })
    .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
    })
    .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add to cart';
    })
    .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
    })
    .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update cart item';
    })
    .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
    })
    .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove from cart';
    })
    .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
    })
    .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to merge cart';
    });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
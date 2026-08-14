import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
import adminProductsReducer from "./slices/adminProductsSlice";
import adminOrderReducer from "./slices/adminOrderSlice";
import reviewsReducer from "./slices/reviewsSlice";
import newsletterReducer from "./slices/newsletterSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductsReducer,
    adminOrders: adminOrderReducer,
    reviews: reviewsReducer,
    newsletter: newsletterReducer,
  },
});

export default store;
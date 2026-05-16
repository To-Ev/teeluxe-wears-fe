import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch products from the API
export const fetchByFilters = createAsyncThunk(
    "products/fetchByFilters", 
    async ({
        collection,
        size,
        color,
        section,
        minPrice,
        maxPrice,
        sortBy,
        search,
        category,
        material,
        brand,
        limit,
    }) =>{
        const queryParams = new URLSearchParams();
        if (collection) queryParams.append("collection", collection);
        if (size) queryParams.append("size", size);
        if (color) queryParams.append("color", color);
        if (section) queryParams.append("section", section);
        if (minPrice) queryParams.append("minPrice", minPrice);
        if (maxPrice) queryParams.append("maxPrice", maxPrice);
        if (sortBy) queryParams.append("sortBy", sortBy);
        if (search) queryParams.append("search", search);
        if (category) queryParams.append("category", category);
        if (material) queryParams.append("material", material);
        if (brand) queryParams.append("brand", brand);
        if (limit) queryParams.append("limit", limit);

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?${queryParams.toString()}`);
        return response.data; 
    });

    // Async thunk to fetch a single product by ID
    export const fetchProductDetails = createAsyncThunk(
        "products/fetchProductDetails",
        async (productId) => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${productId}`);
            return response.data;
        });

// Async thunk to update based on category
export const updateProduct = createAsyncThunk("products/updateProduct", async ({ productId, updatedData }) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${productId}`, updatedData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
});

// Async thunk to fetch related products based on category
export const fetchSimilarProducts = createAsyncThunk(
    "products/fetchSimilarProducts",
    async (productId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/similar/${productId}`);
        return response.data;
    }
);

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        selectedProduct: null, // store details of the selected product
        similarProducts: [], // store similar products
        loading: false,
        error: null,
        filters: {
            category: "",
            size: "",
            color: "",
            gender: "",
            brand: "",
            minPrice: "",
            maxPrice: "",
            sortBy: "",
            search: "",
            material: "",
            collection: "",
        },
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                gender: "",
                brand: "",
                minPrice: "",
                maxPrice: "",
                sortBy: "",
                search: "",
                material: "",
                collection: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder
        // handle fetchByFilters lifecycle actions
            .addCase(fetchByFilters.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchByFilters.fulfilled, (state, action) => {
                state.loading = false;
                state.products = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchByFilters.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // handle fetchProductDetails lifecycle actions
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.selectedProduct = null;
            })
            // handle fetchSimilarProducts lifecycle actions
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.similarProducts = [];
            })
            // handle updateProduct lifecycle actions
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
                const index = state.products.findIndex((product) => product._id === updateProduct._id);
                if (index !== -1) {
                    state.products[index] = updateProduct;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // handle fetchSimilarProducts lifecycle actions
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.similarProducts = [];
            });
    },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
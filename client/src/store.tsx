import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Redux/authSlice";
import productsReducer from "./Redux/productsSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const getUser = (state: RootState) => state.auth.user;
export const getSelectedProduct = (state: RootState) =>
	state.products.selectedProduct;

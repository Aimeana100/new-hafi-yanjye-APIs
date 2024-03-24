import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { product } from "../shared/types";

interface productsState {
	selectedProduct: product | null;
}

const initialState: productsState = {
	selectedProduct: null,
};

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		selectProduct: (state, action: PayloadAction<product | null>) => {
			return {
				...state,
				selectedProduct: action.payload,
			};
		},
	},
});

export const { selectProduct } = productsSlice.actions;
export default productsSlice.reducer;

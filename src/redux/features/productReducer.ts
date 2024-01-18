import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProductsRequest,
  fetchSingleProductRequest,
} from "../../helpers";
import { RootState } from "../store";

export interface productState {
  products: Array<any>;
  product: any;
  status: string;
  error: string | null;
}

export const initialState: productState = {
  products: [],
  product: {},
  status: "idle",
  error: "null",
};

export const fetchAllProducts = createAsyncThunk(
  "fetch/allproducts",
  async () => {
    try {
      const res: any = await fetchAllProductsRequest();
      const { data, status } = res;
      // console.log(data);

      return {
        data,
        code: status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "fetch/singleProduct",
  async (id: string | number) => {
    try {
      const res: any = await fetchSingleProductRequest(id);
      const { data, status } = res;
      // console.log(data);

      return {
        data,
        code: status,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
      const { data, status }: any = payload;
      state.products = data;
      state.status = "success";
    });
    builder.addCase(fetchAllProducts.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.status = "idle";
    });
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
      const { data, status }: any = payload;
      state.product = data;
      state.status = "success";
    });
    builder.addCase(fetchSingleProduct.rejected, (state, { payload }) => {
      state.error = payload as string;
      state.status = "idle";
    });
  },
});

export default productSlice.reducer;

export const productsSelector = (state: RootState) => state.product.products;
export const singleProductSelector = (state: RootState) =>
  state.product.product;
export const statusSelector = (state: RootState) => state.product.status;

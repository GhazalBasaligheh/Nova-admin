import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestStatus } from '@/types/Enums/RequestStatus';
import type { NewProduct, Product } from '@/types/product';
import { serializeApiError, type SerializedApiError } from '@/Utils/api/ApiError';
import * as productsService from '@/Utils/services/products';
import { uniqueId } from '@/Utils/uniqueId';

interface ProductsState {
  items: Product[];
  categories: string[];
  listStatus: RequestStatus;
  listError: SerializedApiError | null;
  createStatus: RequestStatus;
  createError: SerializedApiError | null;
}

const initialState: ProductsState = {
  items: [],
  categories: [],
  listStatus: RequestStatus.Idle,
  listError: null,
  createStatus: RequestStatus.Idle,
  createError: null,
};

type ThunkConfig = { state: { products: ProductsState }; rejectValue: SerializedApiError };

// Products and categories load together. `condition` skips the request once data is loaded,
// so revisiting the page (or a create) never refetches and drops locally added products.
export const fetchProducts = createAsyncThunk<
  { items: Product[]; categories: string[] },
  void,
  ThunkConfig
>(
  'products/fetch',
  async (_arg, { rejectWithValue }) => {
    try {
      const [items, categories] = await Promise.all([
        productsService.getProducts(),
        productsService.getCategories(),
      ]);
      return { items, categories };
    } catch (error) {
      return rejectWithValue(serializeApiError(error));
    }
  },
  {
    condition: (_arg, { getState }) => {
      const { listStatus } = getState().products;
      return listStatus === RequestStatus.Idle || listStatus === RequestStatus.Failed;
    },
  },
);

export const createProduct = createAsyncThunk<Product, NewProduct, ThunkConfig>(
  'products/create',
  async (input, { rejectWithValue }) => {
    try {
      return await productsService.createProduct(input);
    } catch (error) {
      return rejectWithValue(serializeApiError(error));
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = RequestStatus.Idle;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.listStatus = RequestStatus.Loading;
        state.listError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.listStatus = RequestStatus.Succeeded;
        state.items = payload.items;
        state.categories = payload.categories;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listStatus = RequestStatus.Failed;
        state.listError = action.payload ?? null;
      })
      .addCase(createProduct.pending, (state) => {
        state.createStatus = RequestStatus.Loading;
        state.createError = null;
      })
      // The API doesn't persist creates, so the new product is added to the local list
      // (newest first). It disappears on a full reload; documented in the README.
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.createStatus = RequestStatus.Succeeded;
        state.items.unshift({ ...payload, id: uniqueId(payload.id, state.items) });
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = RequestStatus.Failed;
        state.createError = action.payload ?? null;
      });
  },
});

export const { resetCreateStatus } = productsSlice.actions;
export default productsSlice.reducer;

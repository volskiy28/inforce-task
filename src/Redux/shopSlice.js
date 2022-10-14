import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  items: [],
  error: "",
  open: false,
};

export const fetchItems = createAsyncThunk("shop/fetchProducts", () => {
  return axios
    .get("http://localhost:8000/products")
    .then((response) => response.data);
});

export const deleteItem = createAsyncThunk("shop/delete", (id) => {
  return axios.delete("http://localhost:8000/products/" + id);
});

export const itemsSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.open = !state.open;
    },
    sortBy: (state) => {
      state.items.sort((a, b) => {
        if (a.count > b.count) return 1;
        if (a.count < b.count) return -1;
        return 0;
      });
    },
    sortByName: (state) => {
      state.items.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
    },
    removeFromCart: (state, action, productToRemove) => {
      productToRemove = action.payload;
      let updatedState = {};
      updatedState = {
        ...state,
        comments: state.items.comments.filter(
          (item) => item.id !== productToRemove.id
        ),
      };

      return updatedState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
      state.items.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      });
      state.error = "";
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.loading = false;
      state.items = [];
      state.error = action.error.message;
    });
  },
});

export default itemsSlice.reducer;
export const {  setOpen, sortBy, sortByName } =
  itemsSlice.actions;

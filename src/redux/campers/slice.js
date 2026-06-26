import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const initialState = {
  items: [],
  loading: false,
  error: null,

  page: 1,

  total: 0,
  filters: {
    location: "",
    form: "",
    engine: "",
    transmission: "",
    AC: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },

  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },

    resetCampersList(state) {
      state.items = [];
      state.page = 1;
    },

    incrementPage(state) {
      state.page += 1;
    },

    toggleFavorite(state, action) {
      const camperId = action.payload;
      const isExist = state.favorites.includes(camperId);

      if (isExist) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites.push(camperId);
      }

      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;

        const newItems = action.payload.items;
        state.total = action.payload.total;

        if (action.meta.arg?.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }
      })

      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setFilters, resetCampersList, incrementPage, toggleFavorite } =
  campersSlice.actions;

export const campersReducer = campersSlice.reducer;

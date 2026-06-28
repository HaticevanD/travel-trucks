import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const getInitialFavorites = () => {
  const saved = localStorage.getItem("favorites");
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("LocalStorage favori verisi hatalı, temizleniyor:", e);
    return [];
  }
};

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
  favorites: getInitialFavorites(),
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
      const camperId = String(action.payload);
      if (state.favorites.includes(camperId)) {
        state.favorites = state.favorites.filter((id) => id !== camperId);
      } else {
        state.favorites = [...state.favorites, camperId];
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
        state.total = action.payload.total;

        const normalizedItems = action.payload.items.map((item) => ({
          ...item,
          id: String(item.id || item._id),
        }));
        if (action.payload.isFetchAll) {
          state.items = normalizedItems;
        } else if (action.meta.arg?.page === 1 || action.meta.arg === 1) {
          state.items = normalizedItems;
        } else {
          const existingIds = new Set(state.items.map((i) => i.id));
          state.items = [
            ...state.items,
            ...normalizedItems.filter((item) => !existingIds.has(item.id)),
          ];
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

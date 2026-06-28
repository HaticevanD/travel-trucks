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
        state.total = action.payload.total;

        // 🚨 VERİ DÜZENLEME: API'den gelen _id'leri id'ye eşitleyelim
        // Böylece UI tarafında her zaman 'id' kullanabilirsin
        const normalizedItems = action.payload.items.map((item) => ({
          ...item,
          id: item.id || item._id,
        }));

        if (action.meta.arg?.page === 1) {
          state.items = normalizedItems;
        } else {
          // Çift kayıt oluşmaması için basit bir kontrol
          const existingIds = new Set(state.items.map((i) => i.id));
          const uniqueNewItems = normalizedItems.filter(
            (item) => !existingIds.has(item.id),
          );
          state.items = [...state.items, ...uniqueNewItems];
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

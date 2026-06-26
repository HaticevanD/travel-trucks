import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

const initialState = {
  items: [], // Buranın her zaman dizi kalması şart
  loading: false,
  error: null,
  page: 1,
  filters: {
    location: "",
    form: "",
    features: [],
  },
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    incrementPage: (state) => {
      state.page += 1;
    },
    resetCampersList: (state) => {
      state.items = []; // Listeyi temizlerken dizi olarak kalmasını garanti ediyoruz
      state.page = 1;
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

        // API'den gelen verinin dizi mi yoksa iç içe geçmiş bir nesne mi olduğunu kontrol ediyoruz
        // Eğer action.payload bir dizi ise direkt onu alır, değilse içindeki .items dizisini arar.
        const newItems = Array.isArray(action.payload)
          ? action.payload
          : action.payload.items || [];

        if (state.page === 1) {
          state.items = newItems;
        } else {
          state.items = [...state.items, ...newItems];
        }
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, incrementPage, resetCampersList } =
  campersSlice.actions;
export const campersReducer = campersSlice.reducer;

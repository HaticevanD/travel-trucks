import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (payload = {}, thunkAPI) => {
    try {
      const page = typeof payload === "number" ? payload : payload.page || 1;
      const filters = payload.filters || {};

      const queryParams = {
        page: page,
        limit: 4,
      };

      // Boş filtrelerin MockAPI'yi bozmasını engellemek için filtre temizliği
      if (filters.location && filters.location.trim() !== "") {
        queryParams.location = filters.location.trim();
      }
      if (filters.form && filters.form.trim() !== "") {
        queryParams.form = filters.form;
      }
      if (filters.engine && filters.engine.trim() !== "") {
        queryParams.engine = filters.engine;
      }
      if (filters.transmission && filters.transmission.trim() !== "") {
        queryParams.transmission = filters.transmission;
      }

      const response = await api.get("/campers", { params: queryParams });

      // 🟢 ÖNERİLEN SEÇENEK 2 UYARLAMASI:
      // Ham response nesnesini göndermek yerine, sadece ihtiyacımız olan
      // array'i ve varsa toplam sayfa/öğe bilgisini seçip dönüyoruz.
      return {
        items: response.data?.items || [],
        total: response.data?.total || 0, // İleride Load More'u gizlemek için kullanılabilir
      };
    } catch (error) {
      console.error("Thunk Fetch Error:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

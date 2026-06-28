import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (payload = {}, thunkAPI) => {
    try {
      // 1. Yeni parametre: fetchAll true gelirse tüm veriyi çek
      const isFetchAll = payload.fetchAll === true;
      const page = isFetchAll
        ? 1
        : typeof payload === "number"
          ? payload
          : payload.page || 1;
      const filters = payload.filters || {};

      const queryParams = {
        page: page,
        // 2. Eğer tümünü istiyorsak limiti çok yüksek tut
        limit: isFetchAll ? 1000 : 4,
      };

      // Filters
      if (filters.location?.trim())
        queryParams.location = filters.location.trim();
      if (filters.form?.trim()) queryParams.form = filters.form;
      if (filters.engine?.trim()) queryParams.engine = filters.engine;
      if (filters.transmission?.trim())
        queryParams.transmission = filters.transmission;

      const response = await api.get("/campers", { params: queryParams });

      return {
        items: response.data?.items || [],
        total: response.data?.total || 0,
        // Hangi modda çalıştığımızı slice'a gönderiyoruz
        isFetchAll: isFetchAll,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

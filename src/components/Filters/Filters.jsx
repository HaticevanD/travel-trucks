import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetCampersList } from "../../redux/campers/slice";
import { fetchCampers } from "../../redux/campers/operations";
import styles from "./Filters.module.css";
import Button from "../Button/Button";

const Filters = () => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.campers.filters);

  // Stateler (Sadece gerekli olanlar bırakıldı)
  const [location, setLocation] = useState(globalFilters?.location || "");
  const [form, setForm] = useState(globalFilters?.form || "");
  const [engine, setEngine] = useState(globalFilters?.engine || "");
  const [transmission, setTransmission] = useState(
    globalFilters?.transmission || "",
  );
  // Arama Tetikleyici
  const handleSearch = () => {
    const newFilters = {
      location: location || "",
      form: form || "",
      engine: engine || "",
      transmission: transmission || "",
    };

    dispatch(setFilters(newFilters));
    dispatch(resetCampersList());
    dispatch(fetchCampers({ page: 1, filters: newFilters }));
  };

  // Filtreleri Sıfırlama Fonksiyonu
  const handleClearFilters = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");

    const emptyFilters = {
      location: "",
      form: "",
      engine: "",
      transmission: "",
    };

    dispatch(setFilters(emptyFilters));
    dispatch(resetCampersList());
    dispatch(fetchCampers({ page: 1, filters: emptyFilters }));
  };

  return (
    <div className={styles.sidebar}>
      {/* Location */}
      <div className={styles.locationSection}>
        <label className={styles.label}>Location</label>
        <input
          type="text"
          className={styles.input}
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className={styles.filterGroupWrapper}>
        <p className={styles.label} style={{ marginBottom: "12px" }}>
          Filters
        </p>

        {/* 1. Sıra: Camper form */}
        <h3 className={styles.sectionTitle}>Camper form</h3>
        <div className={styles.listStack}>
          {[
            { id: "panelTruck", label: "Panel Van" },
            { id: "fullyIntegrated", label: "Integrated" },
            { id: "alcove", label: "Alcove" },
            { id: "semiIntegrated", label: "Semi Integrated" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.listRowBtn} ${form === item.id ? styles.activeText : ""}`}
              onClick={() => setForm(form === item.id ? "" : item.id)}
            >
              <span
                className={`${styles.radioCircle} ${form === item.id ? styles.radioChecked : ""}`}
              ></span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* 2. Sıra: Engine */}
        <h3 className={styles.sectionTitle}>Engine</h3>
        <div className={styles.listStack}>
          {[
            { id: "diesel", label: "Diesel" },
            { id: "petrol", label: "Petrol" },
            { id: "hybrid", label: "Hybrid" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.listRowBtn} ${engine === item.id ? styles.activeText : ""}`}
              onClick={() => setEngine(engine === item.id ? "" : item.id)}
            >
              <span
                className={`${styles.radioCircle} ${engine === item.id ? styles.radioChecked : ""}`}
              ></span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* 3. Sıra: Transmission */}
        <h3 className={styles.sectionTitle}>Transmission</h3>
        <div className={styles.listStack}>
          {[
            { id: "automatic", label: "Automatic" },
            { id: "manual", label: "Manual" },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.listRowBtn} ${transmission === item.id ? styles.activeText : ""}`}
              onClick={() =>
                setTransmission(transmission === item.id ? "" : item.id)
              }
            >
              <span
                className={`${styles.radioCircle} ${transmission === item.id ? styles.radioChecked : ""}`}
              ></span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Butonlar Alanı */}
      <div className={styles.actionWrapper}>
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>

        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClearFilters}
        >
          <span className={styles.clearIcon}>×</span> Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;

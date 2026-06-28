import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetCampersList } from "../../redux/campers/slice";
import { fetchCampers } from "../../redux/campers/operations";
import styles from "./Filters.module.css";
import Button from "../Button/Button";
import { HiOutlineMapPin } from "react-icons/hi2";

const Filters = () => {
  const dispatch = useDispatch();
  const globalFilters = useSelector((state) => state.campers.filters);

  const [location, setLocation] = useState(globalFilters?.location || "");
  const [form, setForm] = useState(globalFilters?.form || "");
  const [engine, setEngine] = useState(globalFilters?.engine || "");
  const [transmission, setTransmission] = useState(
    globalFilters?.transmission || "",
  );

  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    const newFilters = { location, form, engine, transmission };
    dispatch(setFilters(newFilters));
    dispatch(resetCampersList());
    dispatch(fetchCampers({ page: 1, filters: newFilters }));
    setIsOpen(false);
  };

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
    setIsOpen(false);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterHeader} onClick={() => setIsOpen(!isOpen)}>
        <h2 className={styles.filterTitle}>Filters</h2>
        <span className={`${styles.arrow} ${isOpen ? styles.open : ""}`}>
          ▼
        </span>
      </div>

      <div className={`${styles.filterContent} ${isOpen ? styles.open : ""}`}>
        {/* Location Section - Güncellenmiş yapı */}
        <h3 className={styles.sectionTitle}>Location</h3>
        <div className={styles.inputWrapper}>
          <HiOutlineMapPin className={styles.inputIcon} size={18} />
          <input
            type="text"
            className={styles.input}
            placeholder="City, Country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        {/* Filter Groups */}
        <div className={styles.filterGroupWrapper}>
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

        <div className={styles.actionWrapper}>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
          <Button
            className={`${styles.btn} ${styles.secondary}`}
            onClick={handleClearFilters}
          >
            X Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;

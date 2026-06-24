import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import styles from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader";

const CatalogPage = () => {
  const dispatch = useDispatch();

  // Redux store'dan verileri çekiyoruz
  const { items, loading, error } = useSelector((state) => state.campers);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Camper Catalog</h1>

      {loading && <Loader />}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <div>
          <p>Successfully fetched {items.length} campers from API!</p>
          {/* Gelen ilk veriyi konsola basıp inceleyebilirsin */}
          {console.log("API'den gelen veriler:", items)}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;

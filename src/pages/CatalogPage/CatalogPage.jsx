import React from "react";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Camper Catalog</h1>
      <p>All our available camper models will be listed here.</p>
    </div>
  );
};

export default CatalogPage;

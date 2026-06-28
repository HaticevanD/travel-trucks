import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.spinnerWrapper}>
      <span className={styles.spinner}></span>
    </div>
  );
};

export default Loader;

import React from "react";
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Camper Details</h1>
      <p>
        Detailed information, reviews, and the booking form will be displayed
        here.
      </p>
    </div>
  );
};

export default CamperDetailsPage;

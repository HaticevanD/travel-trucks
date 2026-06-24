import React from "react";
import styles from "./HomePage.module.css"; // CSS Modülünü import ettik

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>TravelTrucks - Home</h1>
      <p className={styles.description}>
        Find your dream camper for the perfect road trip.
      </p>
    </div>
  );
};

export default HomePage;

import React from "react";
import styles from "./HomePage.module.css";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";

const HomePage = () => {
  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.title}>TravelTrucks - Home</h1>
        <p className={styles.description}>
          Find your dream camper for the perfect road trip.
        </p>

        {/* Butonlarımızı test ediyoruz */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <Button variant="primary">View Now</Button>
          <Button variant="secondary">Explore More</Button>
        </div>

        {/* Loader'ımızı test ediyoruz */}
        <p style={{ color: "#475467" }}>Testing Loader Component Below:</p>
        <Loader />
      </div>
    </Container>
  );
};

export default HomePage;

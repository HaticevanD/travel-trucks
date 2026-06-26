import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate("/catalog");
  };

  return (
    <Container>
      <div className={styles.hero}>
        {/* Hero Background Image */}
        <div className={styles.heroBackground}>
          <img
            src="https://picsum.photos/id/1015/1920/1080"
            alt="Camper van at sunset"
            className={styles.heroImage}
          />
        </div>

        {/* Overlay Content */}
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.subtitle}>
              You can find everything you want in our catalog
            </p>

            <Button
              variant="primary"
              onClick={handleViewNow}
              className={styles.viewNowBtn}
            >
              View Now
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;

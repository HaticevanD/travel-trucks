import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import Container from "../../components/Container/Container";
import Button from "../../components/Button/Button"; // Kendi Button bileşenini kullanıyoruz

import hero1x from "../../assets/hero.jpg";
import hero2x from "../../assets/hero@2x.jpg";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <section className={styles.uniqueHeroBox}>
        {/* Arka Plan Görseli */}
        <img
          src={hero1x}
          srcSet={`${hero1x} 1x, ${hero2x} 2x`}
          alt="Campers of your dreams"
          className={styles.uniqueHeroImg}
          loading="eager"
        />
        {/* Karartma Katmanı */}
        <div className={styles.uniqueHeroMask} />

        {/* Metin ve Buton İçeriği */}
        <div className={styles.uniqueHeroContent}>
          <h1 className={styles.uniqueHeroTitle}>Campers of your dreams</h1>
          <p className={styles.uniqueHeroSubtitle}>
            You can find everything you want in our catalog
          </p>

          <Button variant="primary" onClick={() => navigate("/catalog")}>
            View Now
          </Button>
        </div>
      </section>
    </Container>
  );
};

export default HomePage;

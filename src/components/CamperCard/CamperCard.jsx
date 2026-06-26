import React from "react";
import styles from "./CamperCard.module.css";
import Button from "../Button/Button";

const CamperCard = ({ camper }) => {
  // Şartnamedeki ondalık fiyat kuralı: 8000 -> 8000.00
  const formattedPrice = Number(camper.price).toFixed(2);

  // "Show More" butonuna basınca yeni sekmede detay sayfasını açma kuralı
  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, "_blank");
  };

  return (
    <div className={styles.card}>
      {/* Sol Taraf: Görsel */}
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery && camper.gallery[0]?.thumb}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      {/* Sağ Taraf: İçerik */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>€{formattedPrice}</span>
            <button className={styles.favBtn} type="button">
              🖤{" "}
              {/* Favori mantığını LocalStorage ile kurunca burayı dinamik yapacağız */}
            </button>
          </div>
        </div>

        {/* Puan ve Konum Bilgisi */}
        <div className={styles.infoRow}>
          <span>
            ⭐ {camper.rating} ({camper.reviews?.length} Reviews)
          </span>
          <span>📍 {camper.location}</span>
        </div>

        {/* Kısa Açıklama */}
        <p className={styles.description}>{camper.description}</p>

        {/* Kategoriler / Özellik Rozetleri */}
        <div className={styles.categories}>
          <span className={styles.badge}>{camper.transmission}</span>
          <span className={styles.badge}>{camper.motor}</span>
          {camper.AC && <span className={styles.badge}>AC</span>}
          {camper.kitchen && <span className={styles.badge}>Kitchen</span>}
          {camper.bathroom && <span className={styles.badge}>Bathroom</span>}
        </div>

        {/* Aksiyon Butonu */}
        <div>
          <Button variant="primary" onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;

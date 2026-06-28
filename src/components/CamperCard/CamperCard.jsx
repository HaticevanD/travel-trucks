import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleFavorite } from "../../redux/campers/slice";
import Button from "../Button/Button";
import { HiOutlineMapPin, HiOutlineCog6Tooth } from "react-icons/hi2";
import { FaGasPump } from "react-icons/fa";
import { BsGrid3X3Gap } from "react-icons/bs";

import styles from "./CamperCard.module.css";

const CamperCard = ({ camper }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.campers.favorites || []);

  const camperId = String(camper.id || camper._id);
  const isFavorite = favorites.includes(camperId);
  const formattedPrice = Number(camper.price).toFixed(2);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(camperId));
  };

  const handleShowMore = () => {
    navigate(`/catalog/${camperId}`);
  };

  // Helper: Form verisini kullanıcı dostu formata çevirme
  const getFormLabel = (form) => {
    if (!form) return "";
    return form === "panelTruck"
      ? "Panel Van"
      : form === "fullyIntegrated"
        ? "Fully Integrated"
        : form.charAt(0).toUpperCase() + form.slice(1);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={
            camper.gallery?.[0]?.thumb ||
            "https://via.placeholder.com/290x310?text=No+Image"
          }
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{camper.name}</h2>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>€{formattedPrice}</span>
            <button
              className={styles.favBtn}
              type="button"
              onClick={handleFavoriteClick}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill={isFavorite ? "#E74C3C" : "none"}
                stroke={isFavorite ? "#E74C3C" : "#101828"}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.infoRow}>
          <span className={styles.rating}>
            ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <HiOutlineMapPin size={16} /> {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        {/* Sadece 3 Temel Özellik (Form, Transmission, Engine) */}
        <div className={styles.categories}>
          {camper.form && (
            <span className={styles.badge}>
              <BsGrid3X3Gap size={18} /> {getFormLabel(camper.form)}
            </span>
          )}
          {camper.transmission && (
            <span className={styles.badge}>
              <HiOutlineCog6Tooth size={18} /> {camper.transmission}
            </span>
          )}
          {camper.engine && (
            <span className={styles.badge}>
              <FaGasPump size={18} /> {camper.engine}
            </span>
          )}
        </div>

        <div className={styles.actionWrapper}>
          <Button variant="primary" onClick={handleShowMore}>
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CamperCard;

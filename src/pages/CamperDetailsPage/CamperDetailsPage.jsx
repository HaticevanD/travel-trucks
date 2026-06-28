import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader"; 
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const allCampers = useSelector((state) => state.campers.items);
  const isLoading = useSelector((state) => state.campers.loading);
  const camper = allCampers.find((item) => item.id === id);

  const [formData, setFormData] = useState({ name: "", email: "" });
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {

    if (allCampers.length === 0) {
      dispatch(fetchCampers());
    }

    const timer = setTimeout(() => setIsPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, [dispatch, allCampers.length]);

  if (isLoading || isPageLoading) return <Loader />;

  if (!camper) return <div className={styles.error}>Camper not found!</div>;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Booking request sent for ${formData.name}!`);
    setFormData({ name: "", email: "" });
  };

  return (
    <div className={styles.container}>
      {/* ÜST BÖLÜM: Galeri ve Bilgiler */}
      <div className={styles.topSection}>
        <div className={styles.galleryWrapper}>
          <div className={styles.mainImageWrapper}>
            <img
              src={
                camper.gallery[activeImgIndex]?.original ||
                camper.gallery[0]?.original
              }
              alt={camper.name}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailsGrid}>
            {camper.gallery.map((img, index) => (
              <img
                key={index}
                src={img.thumb}
                alt={`${camper.name} thumb ${index}`}
                onClick={() => setActiveImgIndex(index)}
                className={`${styles.thumbnail} ${activeImgIndex === index ? styles.activeThumbnail : ""}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.cardHeader}>
            <h1 className={styles.title}>{camper.name}</h1>
            <div className={styles.metaRow}>
              <span className={styles.rating}>
                <span className={styles.starYellow}>★</span> {camper.rating} (
                {camper.reviews.length} Reviews)
              </span>
              <span className={styles.location}>📍 {camper.location}</span>
            </div>
            <div className={styles.price}>
              €{Number(camper.price).toFixed(2)}
            </div>
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.vehicleDetailsBlock}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>
            <div className={styles.badgesRow}>
              <span className={styles.badge}>{camper.transmission}</span>
              {camper.AC && <span className={styles.badge}>AC</span>}
              <span className={styles.badge}>{camper.engine}</span>
              {camper.kitchen && <span className={styles.badge}>Kitchen</span>}
              {camper.radio && <span className={styles.badge}>Radio</span>}
              <span className={styles.badge}>{camper.form}</span>
            </div>

            <ul className={styles.specsList}>
              <li>
                <span>Form</span>
                <strong>{camper.form}</strong>
              </li>
              <li>
                <span>Length</span>
                <strong>{camper.length}</strong>
              </li>
              <li>
                <span>Width</span>
                <strong>{camper.width}</strong>
              </li>
              <li>
                <span>Height</span>
                <strong>{camper.height}</strong>
              </li>
              <li>
                <span>Tank</span>
                <strong>{camper.tank}</strong>
              </li>
              <li>
                <span>Consumption</span>
                <strong>{camper.consumption}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ALT BÖLÜM: Yorumlar ve Form */}
      <div className={styles.bottomSection}>
        <div className={styles.reviewsWrapper}>
          <h2 className={styles.sectionTitleLeft}>Reviews</h2>
          <div className={styles.reviewsList}>
            {camper.reviews.map((review, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.reviewHeader}>
                  <div className={styles.avatar}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.reviewerInfo}>
                    <h4 className={styles.reviewerName}>
                      {review.reviewer_name}
                    </h4>
                    <div className={styles.stars}>
                      {"★".repeat(review.reviewer_rating)}
                      {"☆".repeat(5 - review.reviewer_rating)}
                    </div>
                  </div>
                </div>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formWrapper}>
          <h3 className={styles.formTitle}>Book your campervan now</h3>
          <p className={styles.formSubtitle}>
            Stay connected! We are always ready to help you.
          </p>
          <form onSubmit={handleFormSubmit} className={styles.bookingForm}>
            <input
              type="text"
              placeholder="Name*"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={styles.inputField}
            />
            <input
              type="email"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={styles.inputField}
            />
            <Button variant="primary" type="submit">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;

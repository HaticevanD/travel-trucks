import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");

  // Rezervasyon Form State'i
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/campers/${id}`);
        setCamper(response.data);

        // İlk resmi ana görsel olarak ayarla
        if (response.data.gallery && response.data.gallery.length > 0) {
          const firstImg = response.data.gallery[0];
          setMainImage(firstImg.original || firstImg.thumb || firstImg);
        }
      } catch (err) {
        console.error("Error fetching camper details:", err);
        setError("Camper not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  // Görsel değiştirme fonksiyonu
  const handleImageClick = (img) => {
    setMainImage(img.original || img.thumb || img);
  };

  // Form input kontrolü
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  // Rezervasyon Gönderimi
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.bookingDate) {
      alert("Please fill in all required fields!");
      return;
    }

    // Ödev isterine uygun başarı bildirimi (Notification)
    alert("✅ Booking request sent successfully!");

    // Formu sıfırla
    setBookingForm({ name: "", email: "", bookingDate: "", comment: "" });
  };

  // CamelCase form tiplerini UI için okunaklı metne dönüştürür (Örn: panelVan -> Panel van)
  const formatFormType = (formType) => {
    if (!formType) return "-";
    const spaced = formType.replace(/([A-Z])/g, " $1").toLowerCase();
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };

  // Yükleniyor ve Hata durumları kontrolü (Kritik Kriter)
  if (loading) return <Loader />;
  if (error || !camper) {
    return (
      <div className={styles.errorContainer}>{error || "Camper not found"}</div>
    );
  }

  // UI'da kiralama fiyatının her zaman .00 ondalık gösterimi (İster #5)
  const formattedPrice = Number(camper.price).toFixed(2);

  return (
    <div className={styles.container}>
      {/* Üst Başlık Alanı */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.metaRow}>
          <span className={styles.rating}>
            ⭐ {camper.rating} ({camper.reviews?.length || 0} Reviews)
          </span>
          <span className={styles.location}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {camper.location}
          </span>
        </div>
        <div className={styles.price}>€{formattedPrice}</div>
      </div>

      {/* Ana İçerik Bloğu */}
      <div className={styles.mainLayout}>
        {/* SOL TARAF: Galeri, Açıklama ve Yorumlar */}
        <div className={styles.leftContent}>
          {/* Görsel Galerisi */}
          <div className={styles.galleryContainer}>
            <div className={styles.mainImageWrapper}>
              <img
                src={mainImage}
                alt={camper.name}
                className={styles.mainImage}
              />
            </div>
            <div className={styles.thumbnailsGrid}>
              {camper.gallery?.map((img, index) => {
                const currentSrc = img.original || img.thumb || img;
                return (
                  <img
                    key={index}
                    src={img.thumb || img.original || img}
                    alt={`${camper.name} view ${index + 1}`}
                    className={`${styles.thumbnail} ${mainImage === currentSrc ? styles.activeThumbnail : ""}`}
                    onClick={() => handleImageClick(img)}
                  />
                );
              })}
            </div>
          </div>

          {/* Açıklama Metni */}
          <div className={styles.descriptionBlock}>
            <p className={styles.descriptionText}>{camper.description}</p>
          </div>

          {/* Kullanıcı Yorumları (5 Yıldızlı Sistem) */}
          <div className={styles.reviewsSection}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            {camper.reviews && camper.reviews.length > 0 ? (
              camper.reviews.map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>
                      {(review.reviewer || "U").charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.reviewerInfo}>
                      <span className={styles.reviewerName}>
                        {review.reviewer}
                      </span>
                      <div className={styles.starsRow}>
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < review.rating
                                ? styles.starFilled
                                : styles.starEmpty
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))
            ) : (
              <p className={styles.noReviews}>
                No reviews yet for this camper van.
              </p>
            )}
          </div>
        </div>

        {/* SAĞ TARAF: Araç Detay Rozetleri, Teknik Tablo ve Rezervasyon Formu */}
        <div className={styles.sidebar}>
          {/* Teknik Detaylar Paneli */}
          <div className={styles.detailsCard}>
            <h3 className={styles.sidebarTitle}>Vehicle details</h3>
            <hr className={styles.divider} />

            {/* Özellik Rozetleri */}
            <div className={styles.badgesContainer}>
              {camper.transmission && (
                <span className={styles.badge}>{camper.transmission}</span>
              )}
              {camper.engine && (
                <span className={styles.badge}>{camper.engine}</span>
              )}
              {camper.AC && <span className={styles.badge}>AC</span>}
              {camper.kitchen && <span className={styles.badge}>Kitchen</span>}
              {camper.bathroom && (
                <span className={styles.badge}>Bathroom</span>
              )}
              {camper.TV && <span className={styles.badge}>TV</span>}
              {camper.radio && <span className={styles.badge}>Radio</span>}
              {camper.refrigerator && (
                <span className={styles.badge}>Refrigerator</span>
              )}
              {camper.microwave && (
                <span className={styles.badge}>Microwave</span>
              )}
              {camper.gas && <span className={styles.badge}>Gas</span>}
              {camper.water && <span className={styles.badge}>Water</span>}
            </div>

            {/* Detay Parametre Tablosu (İster #2) */}
            <div className={styles.specsTable}>
              <div className={styles.tableRow}>
                <span>Form</span>
                <span>{formatFormType(camper.form)}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Length</span>
                <span>{camper.length || "-"}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Width</span>
                <span>{camper.width || "-"}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Height</span>
                <span>{camper.height || "-"}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Tank</span>
                <span>{camper.tank || "-"}</span>
              </div>
              <div className={styles.tableRow}>
                <span>Consumption</span>
                <span>{camper.consumption || "-"}</span>
              </div>
            </div>
          </div>

          {/* Rezervasyon Formu Kartı */}
          <div className={styles.bookingCard}>
            <h3 className={styles.sidebarTitle}>Book your campervan now</h3>
            <p className={styles.bookingSubtitle}>
              Stay connected! We are always ready to help you.
            </p>

            <form onSubmit={handleBookingSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="date"
                  name="bookingDate"
                  placeholder="Booking date*"
                  value={bookingForm.bookingDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <textarea
                  name="comment"
                  placeholder="Comment"
                  value={bookingForm.comment}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="4"
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                className={styles.submitBtn}
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamperDetailsPage;

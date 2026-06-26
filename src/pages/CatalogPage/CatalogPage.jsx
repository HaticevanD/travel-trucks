import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations"; // Thunk fonksiyonumuz
import { incrementPage, resetCampersList } from "../../redux/campers/slice"; // Slice içindeki action'lar

import styles from "./CatalogPage.module.css";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import CamperCard from "../../components/CamperCard/CamperCard";
import Button from "../../components/Button/Button";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error, page } = useSelector((state) => state.campers);

  // Sayfa ilk açıldığında listeyi temizle ve 1. sayfayı çek
  useEffect(() => {
    dispatch(resetCampersList());
    dispatch(fetchCampers(1));
  }, [dispatch]);

  // "Load More" butonuna basıldığında tetiklenecek fonksiyon
  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage()); // Store'daki sayfa numarasını 1 artırır
    dispatch(fetchCampers(nextPage)); // Yeni sayfayı API'den ister
  };

  // Eğer mevcut yüklenen veri sayısı 4'ün katıysa ve yükleme devam etmiyorsa butonu göster
  const showLoadMoreButton =
    items.length > 0 && items.length % 4 === 0 && !loading;

  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.title}>Camper Catalog</h1>

        <div style={{ marginTop: "30px" }}>
          {Array.isArray(items) &&
            items.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}
        </div>

        {loading && <Loader />}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {showLoadMoreButton && (
          <div className={styles.loadMoreWrapper}>
            <Button variant="secondary" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CatalogPage;

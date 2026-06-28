import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import CamperCard from "../../components/CamperCard/CamperCard";
import styles from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const allCampers = useSelector((state) => state.campers.items);
  const favoriteIds = useSelector((state) => state.campers.favorites);
  const isLoading = useSelector((state) => state.campers.loading);

  useEffect(() => {
    if (allCampers.length === 0) {
      dispatch(fetchCampers());
    }
  }, [dispatch, allCampers.length]);

  const favoriteCampers = allCampers.filter((camper) =>
    favoriteIds.includes(camper.id),
  );

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.pageTitle}>Your Favorite Campers</h1>

      {isLoading && (
        <p className={styles.loadingText}>Loading your favorites...</p>
      )}

      <div className={styles.listSection}>
        <div className={styles.cardsGrid}>
          {favoriteCampers.length > 0
            ? favoriteCampers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))
            : // 🟢 Süslü parantezler temizlendi, Vite artık sorunsuz derleyecek!
              !isLoading && (
                <p className={styles.noResults}>
                  You haven't added any campers to your favorites yet.
                </p>
              )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;

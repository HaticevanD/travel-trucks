import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import { incrementPage, resetCampersList } from "../../redux/campers/slice";
import Filters from "../../components/Filters/Filters";
import CamperCard from "../../components/CamperCard/CamperCard";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import styles from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.items);
  const isLoading = useSelector((state) => state.campers.loading);
  const page = useSelector((state) => state.campers.page);
  const filters = useSelector((state) => state.campers.filters);
  const total = useSelector((state) => state.campers.total);

  useEffect(() => {
    dispatch(resetCampersList());
    dispatch(fetchCampers({ page: 1, filters }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(incrementPage());
    dispatch(fetchCampers({ page: nextPage, filters }));
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.layout}>
        <aside className={styles.sidebarSection}>
          <Filters />
        </aside>

        <main className={styles.listSection}>
          <div className={styles.cardsGrid}>
            {campers.length > 0 &&
              campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
          </div>

          {isLoading && campers.length === 0 ? (
            <Loader />
          ) : (
            isLoading && <p className={styles.loadingText}>Loading more...</p>
          )}

          {campers.length > 0 && campers.length < total && (
            <div className={styles.loadMoreWrapper}>
              <Button
                variant="secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}

          {!isLoading && campers.length === 0 && (
            <p className={styles.noResults}>
              No campers found matching your criteria.
            </p>
          )}
        </main>
      </div>
    </div>
  );
};

export default CatalogPage;

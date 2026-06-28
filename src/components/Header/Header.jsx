import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const favoriteCount = useSelector(
    (state) => state.campers.favorites?.length || 0,
  );

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logoText}>
          Travel<span className={styles.logoAccent}>Trucks</span>
        </Link>

        {/* Navigasyon */}
        <nav className={styles.headerNav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Catalog
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
          >
            Favorites
            {favoriteCount > 0 && (
              <span className={styles.favBadge}>{favoriteCount}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

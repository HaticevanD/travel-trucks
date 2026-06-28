import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = () => {
  const favoriteCount = useSelector(
    (state) => state.campers.favorites?.length || 0,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        {/* Logo */}
        <Link to="/" className={styles.logoText} onClick={closeMenu}>
          Travel<span className={styles.logoAccent}>Trucks</span>
        </Link>

        {/* Hamburger Button - Mobile */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        {/* Navigation */}
        <nav
          className={`${styles.headerNav} ${isMenuOpen ? styles.active : ""}`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.activeLink}`
                : styles.navLink
            }
            onClick={closeMenu}
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
            onClick={closeMenu}
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
            onClick={closeMenu}
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

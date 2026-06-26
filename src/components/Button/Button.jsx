import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  variant = "primary",
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      // Class'ları güvenli bir şekilde birleştiriyoruz
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

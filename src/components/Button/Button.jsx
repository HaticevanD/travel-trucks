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
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

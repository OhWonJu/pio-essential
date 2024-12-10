import React from "react";

import styles from "./loadingDots.module.css";

interface LoadingDotsProps {
  size?: "sm" | "md" | "lg";
}

export const LoadingDots = ({ size = "sm" }: LoadingDotsProps) => {
  return (
    <span className={styles.root}>
      <span className={styles.dot} data-dotSize={size} key={`dot_1`} />
      <span className={styles.dot} data-dotSize={size} key={`dot_2`} />
      <span className={styles.dot} data-dotSize={size} key={`dot_3`} />
    </span>
  );
};

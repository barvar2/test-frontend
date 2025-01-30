import React from "react";
import styles from "./SkeletonMeme.module.css";

const SkeletonMeme: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonButton}></div>
    </div>
  );
};

export default SkeletonMeme;

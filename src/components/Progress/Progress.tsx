import React from "react";
import styles from "./styles.module.scss";

interface ProgressProps {
  percentage: number;
}

const Progress: React.FC<ProgressProps> = ({ percentage }) => (
  <div className={styles.progressContainer}>
    <div
      className={styles.progressBar}
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export default Progress;
